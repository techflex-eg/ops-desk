OPS DESK APP  (alerts with a sound, even when the page is closed)
=================================================================

What is this?
-------------
A very small web site. It opens your Ops Desk page inside it and adds one thing:
an alert with a sound on the phone or the computer, even when Ops Desk is closed.
It keeps no data. Every PIN, entry and notice stays in your Google Sheet.

The files
---------
  config.js              the ONLY file you change (your Ops Desk address goes here)
  index.html             the app page
  sw.js                  the part that receives the alerts
  manifest.webmanifest   the name and the icons ("Add to Home Screen")
  icons/                 the pictures

Set up (one time)
-----------------
1. In Apps Script: Deploy > Manage deployments. Copy the "Web app" address.
   It starts with https://script.google.com/macros/s/ and ends with /exec
   (Who has access must be "Anyone", like it is today.)
2. Open config.js with Notepad. Replace PASTE-THE-WEB-APP-ADDRESS-HERE with that address.
   Keep the quotes. Save the file.
3. Put the whole folder on a free web host. The easy ways:
     - Netlify Drop: open app.netlify.com/drop, sign in (a free account is enough),
       drag this folder onto the page.
       IMPORTANT: a new Netlify project can start as PRIVATE. Then only you can open it.
       Open the project and click "Make public"
       (or Project configuration > General > Visitor access > Project visibility > Public).
     - GitHub Pages: make a PUBLIC repository, upload these files, then
       Settings > Pages > Deploy from a branch > main > Save.
   You get an address like https://something.netlify.app  (or https://name.github.io/repo/)
   CHECK: open that address in a private (incognito) window. You must see the Ops Desk sign in.
   If you see a Netlify page, or a password or login question, the site is still private.
4. Open that address on your phone or computer, sign in with your PIN.
   A bar appears at the bottom: tap "Turn on alerts" and allow notifications.
   A new device tests itself once: you get an alert "Ops Desk test" with a sound.
5. Open the bell. The line at the top says if alerts are on. Tap "Send test" to test again:
   the page waits for the test to arrive and tells you what happened.
   If the full message does not arrive but a short alert does, this device gets short alerts
   ("You have a new notice") and the page shows the details when you open it.

Everybody who wants alerts opens Ops Desk from THIS address (add it to the bookmarks).
The old Apps Script link still works, but it cannot give alerts when it is closed.

iPhone and iPad
---------------
Alerts work on iOS 16.4 or newer, and only for an app on the Home Screen:
open the address in Safari > Share > Add to Home Screen > open Ops Desk from that icon > sign in > Turn on alerts.

Computers
---------
The browser must be running (it can be minimized). If the browser is fully closed, the alert waits
and arrives when the browser starts.

If you change the files later
-----------------------------
Upload all the files again to the same place (on Netlify: drag the folder onto the drop zone at the
bottom of the project's Deploys page). Keep your own config.js (with your address).
