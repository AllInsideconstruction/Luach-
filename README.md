# Yehuda's Luach (GPS edition)

**Live app:** https://allinsideconstruction.github.io/Luach-/

A copy of the luach that asks the phone for its GPS position, so candle lighting, havdalah and the daily zmanim are worked out for exactly where you are.

## How it handles location
- Choose **Follow my GPS** in the "Times for" box (it is the default in this copy).
- The phone asks for location permission the first time. After that it updates each time you open the page or switch back to it.
- The last position is remembered, so the times show straight away even before the new GPS fix arrives.
- The top of the dashboard shows the town you're in ("You're in Salford"). To get the town name, the phone sends its rough position (to about 1 km) to BigDataCloud's free lookup service, once per new place. If that service can't be reached, it shows the nearest city on the built-in list instead.
- It does not run in the background or keep a history of where you have been.

## Your day circle
At the top, a 24-hour circle shows your day: midnight at the bottom and midday at the top. The gold band is daylight (netz to shkiah), with dawn and dusk shaded either side. The dotted outer arcs are the times for Shacharis, Mincha and Maariv, and each turns green once you tick it off in the daily practice checklist. The inner green ring fills as you complete the checklist. The white hand is now, and the middle shows the next zman and how long until it.

## Zmanim, Tehillim and Tefillos (weekdays)
- **Zmanim today** for your GPS position: alos, misheyakir, netz, sof zman Shema (Magen Avraham and Gra), sof zman tefillah, chatzos, mincha gedolah and ketanah, plag, shkiah and tzeis. The next zman is highlighted, with a line saying which tefillah it's time for now. Times are calculated on the phone and are approximate.
- **Daily Tehillim** on the monthly cycle (or the weekly cycle), with larger and smaller text buttons. On Sunday it also offers the portion that fell on Shabbos.
- **Tefillos**: weekday Shacharis (with Upon Arising), Mincha, Maariv and Birkat Hamazon in **Nusach Sefard**. It opens on the right tefillah for the time of day and lists what to add today, such as Yaaleh Veyavo, Al Hanisim, Mashiv haruach or Morid hatal, Bareich Aleinu or Barcheinu, no Tachanun and the Omer count.
- **Shabbos and Yom Tov**: from candle lighting until tzeis, the Tehillim and Tefillos sections are hidden. Yom Tov follows the diaspora calendar, or the Israel one when you're in Israel.

### Text sources
- Tehillim: *Tanach with Nikkud* (tanach.us), via Sefaria. Public domain. File: `tehillim.json`.
- Siddur: *The Metsudah Siddur* (1981), Nusach Sefard, via Sefaria. CC-BY. File: `siddur.json`.

## Where your entries are saved
The checklist, learning log, tzedakah and weekly goal are saved **in this browser on this phone only**. They don't sync with the claude.ai version or with other devices. Clearing the browser's site data deletes them.

## Putting it online (free, about 5 minutes) with GitHub Pages
GPS only works on a secure (https) web address, so the file has to be hosted, not opened from Downloads.

1. Sign in at github.com and create a new repository, for example `Luach-`.
2. Click **Add file → Upload files**, upload `index.html`, `tehillim.json` and `siddur.json`, then click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch", choose `main` and `/ (root)`, then click **Save**.
4. After a minute your luach is live at `https://allinsideconstruction.github.io/Luach-/`.
5. Open that link on the phone and allow location. Then use **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android) so it opens like an app.

Netlify Drop (app.netlify.com/drop) also works: drag the folder onto the page.
