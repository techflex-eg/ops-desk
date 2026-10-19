TECHFLEX APP   (the page, with alerts and a sound, on its own web address)
====================================================================

What is this?
-------------
The same TechFlex page that you use today, but it opens straight from GitHub Pages with NO Google page around it.
So it does not matter how many Google accounts are signed in to the browser: the page opens, you sign in with your
PIN, and it works. It talks to your Google Sheet only through the web app address of Apps Script (see config.js).
It keeps no data: every PIN, entry and notice stays in your Google Sheet.
It also gives an alert with a sound on a phone or a computer, even when the app is closed.

The files
---------
  index.html             the page (and the alerts part)
  config.js              the ONLY file you may need to change: the web app address of Apps Script
  sw.js                  the part that receives the alerts
  manifest.webmanifest   the name (TechFlex) and the icons ("Add to Home Screen")
  icons/                 the pictures (the TF logo)

Put it on GitHub (one time)
---------------------------
1. Open your repository  ops-desk  on github.com.
2. Click  Add file > Upload files.
3. Open this folder on your computer, select EVERYTHING inside it (index.html, config.js, sw.js,
   manifest.webmanifest, README.txt and the folder  icons ), and drag it all into the GitHub page.
   (Drag the contents of the folder, not the .zip file.)
4. Wait until the files are listed, then click  Commit changes.
5. Wait 1 or 2 minutes. Open  https://techflex-eg.github.io/ops-desk/  and press Ctrl+Shift+R (or close and open the page).
   You should see the TechFlex tab title and the TechFlex sign in.
   If the tab still shows the old small picture, close the tab and open it again (the browser keeps old pictures; this version has new picture names).

First time on each phone or computer
------------------------------------
Sign in with the PIN once (this address is new for the browser, so it asks again; after that it remembers).
A bar appears above the tabs: tap "Turn on alerts" and allow notifications.
A new device tests itself once: you get an alert with a sound.

iPhone and iPad  (the page works in Safari on iOS 15 or newer; alerts need iOS 16.4 or newer)
---------------------------------------------------------------------------------------------
1. Open  https://techflex-eg.github.io/ops-desk/  in SAFARI (not inside WhatsApp or another app).
2. Tap the Share button, then  Add to Home Screen,  then  Add.
3. Close Safari. Open TechFlex from its new icon on the Home Screen. Alerts work only from that icon.
4. Sign in with the PIN, tap  Turn on alerts,  and tap  Allow.
5. If you tapped Don't Allow by mistake: Settings > Notifications > TechFlex > Allow Notifications.
The sound of an alert follows the rules of the iPhone: the silent switch and the Focus modes can mute it.
The Excel download opens the share sheet of the iPhone: choose  Save to Files  (or send it by Mail or WhatsApp).

Updating to a new version (every time you get a new index.html)
---------------------------------------------------------------
1. On github.com open the repository  ops-desk,  then  Add file > Upload files.
2. Drag the new  index.html  (and any other file that came with it) into the page, then  Commit changes.
3. Wait 1 or 2 minutes. Open the app and press Ctrl+Shift+R. On a phone: close the app and open it again, two times.
4. Look at the top of the page, under the office name: it shows the version (for example  Owner - v30).
   If it shows an older version, the browser kept the old page: do step 3 again.
5. The Apps Script files (WebApp.gs, PocApp.html, Sidebar.html) are a separate update: paste them in Apps Script, then
   Deploy > Manage deployments > pencil > Version: New version > Deploy.  The page and the script should be the same version.

If the Apps Script address changes
----------------------------------
Only if you make a NEW deployment in Apps Script (Deploy > New deployment). Then the address changes:
open config.js on GitHub, click the pencil, paste the new address between the quotes, Commit changes.
(If you use Deploy > Manage deployments > Edit > Version: New version, the address stays the same.)

The old Apps Script link still works
------------------------------------
It opens the same page inside Google, as before. Use it only if this address is not available.
