// Ops Desk app - service worker (version 1.1)
// It shows the alerts that the Ops Desk server sends, even when the app is closed.
// It keeps nothing for offline use: the pages always come from the network.
'use strict';

var UA = (self.navigator && self.navigator.userAgent) || '';
// Apple wants a visible alert for every message, so there an alert is always shown (quietly when the app is in front).
var APPLE = /iPhone|iPad|iPod/.test(UA) ||
  (/Macintosh/.test(UA) && /Safari\//.test(UA) && !/Chrome|Chromium|Edg|OPR|Firefox/.test(UA));

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// A fetch listener is needed by some browsers to offer "Install". It does nothing: the network answers.
self.addEventListener('fetch', function () { });

function readData(event) {
  try { return event.data ? event.data.json() : null; } catch (e) { return null; }
}

function windows() {
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
}

self.addEventListener('push', function (event) {
  event.waitUntil(onPush(event));
});

function onPush(event) {
  var data = readData(event);
  if (data && typeof data !== 'object') data = null;
  var id = data && Number(data.id) > 0 ? Number(data.id) : 0;
  var hasText = !!(data && (data.title || data.body));
  var kindText = data && typeof data.kind === 'string' ? data.kind.slice(0, 12) : '';

  return windows().then(function (list) {
    // Open windows are told to ask the server for the news now (they show their own banner and sound).
    // They also learn what arrived: a message with its text (full) or an empty one (plain). A test uses this.
    list.forEach(function (c) {
      try { c.postMessage({ od: 1, type: 'poke', id: id, kind: kindText, full: hasText }); } catch (e) { }
    });
    var front = list.some(function (c) { return c.focused && c.visibilityState === 'visible'; });
    var isTest = !!(data && data.kind === 'TEST');
    if (front && !isTest && !APPLE) return null;

    var title = hasText ? String(data.title || 'Ops Desk') : 'Ops Desk';
    var body = hasText ? String(data.body || '') : 'You have a new notice. Tap to open.';
    var tag = hasText ? 'od-' + (id || Date.now()) : 'od-new';
    var info = {
      id: id,
      entryId: data && typeof data.entryId === 'string' ? data.entryId : '',
      kind: data && typeof data.kind === 'string' ? data.kind : ''
    };

    var quiet = front && APPLE && !isTest;          // the person is looking at the app: no sound
    var full = {
      body: body, tag: tag, dir: 'auto', lang: 'en',
      icon: 'icons/icon-192.png', badge: 'icons/badge-96.png',
      timestamp: Date.now(), data: info
    };
    if (quiet) {
      full.silent = true;
    } else {
      full.renotify = true;
      full.vibrate = [200, 100, 200];
    }
    return self.registration.showNotification(title, full).catch(function () {
      // an option that this browser does not like: show the simple one, so an alert is always shown
      return self.registration.showNotification(title, { body: body, tag: tag, data: info, icon: 'icons/icon-192.png' });
    });
  });
}

self.addEventListener('notificationclick', function (event) {
  var info = (event.notification && event.notification.data) || {};
  event.notification.close();
  event.waitUntil(openApp(info));
});

function openApp(info) {
  return windows().then(function (list) {
    var target = null;
    for (var i = 0; i < list.length; i++) { if (list[i].focused) { target = list[i]; break; } }
    if (!target && list.length) target = list[0];

    if (target) {
      var done = function (c) {
        try { c.postMessage({ od: 1, type: 'open', id: info.id || 0, entryId: info.entryId || '' }); } catch (e) { }
      };
      if (target.focus) {
        return target.focus().then(function (c) { done(c || target); }, function () { done(target); });
      }
      done(target);
      return null;
    }

    // The app is closed: open it. The open window reads the numbers from the address.
    var url = new URL('./', self.registration.scope);
    if (info.id) url.searchParams.set('open', String(info.id));
    if (info.entryId) url.searchParams.set('e', String(info.entryId));
    return self.clients.openWindow(url.href);
  });
}

// The browser changed the alert address of this device: the app is told and gets a new one when it is opened
self.addEventListener('pushsubscriptionchange', function (event) {
  event.waitUntil(windows().then(function (list) {
    list.forEach(function (c) {
      try { c.postMessage({ od: 1, type: 'resub' }); } catch (e) { }
    });
  }));
});
