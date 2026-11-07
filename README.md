# Yehuda's Luach (GPS edition)

**Live app:** https://allinsideconstruction.github.io/Luach-/

A single-file copy of the luach that asks the phone for its GPS position, so candle lighting and havdalah are worked out for exactly where you are.

## How it handles location
- Choose **Follow my GPS** in the "Times for" box (it is the default in this copy).
- The phone asks for location permission the first time. After that it updates each time you open the page or switch back to it.
- The last position is remembered, so the times show straight away even before the new GPS fix arrives.
- The top of the dashboard shows the town you're in ("You're in Salford"). To get the town name, the phone sends its rough position (to about 1 km) to BigDataCloud's free lookup service, once per new place. If that service can't be reached, it shows the nearest city on the built-in list instead.
- It does not run in the background or keep a history of where you have been.

## Where your entries are saved
The checklist, learning log, tzedakah and weekly goal are saved **in this browser on this phone only**. They don't sync with the claude.ai version or with other devices. Clearing the browser's site data deletes them.

## Putting it online (free, about 5 minutes) with GitHub Pages
GPS only works on a secure (https) web address, so the file has to be hosted, not opened from Downloads.

1. Sign in at github.com and create a new repository, for example `Luach-`.
2. Click **Add file → Upload files**, upload `index.html` and click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch", choose `main` and `/ (root)`, then click **Save**.
4. After a minute your luach is live at `https://allinsideconstruction.github.io/Luach-/`.
5. Open that link on the phone and allow location. Then use **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android) so it opens like an app.

Netlify Drop (app.netlify.com/drop) also works: drag the folder onto the page.
