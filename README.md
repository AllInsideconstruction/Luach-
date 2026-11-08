# Yehuda's Luach (GPS edition)

**Live app:** https://allinsideconstruction.github.io/Luach-/

A copy of the luach that asks the phone for its GPS position, so candle lighting, havdalah and the daily zmanim are worked out for exactly where you are.

## How it handles location
- Choose **Follow my GPS** in the "Times for" box (it is the default in this copy).
- The phone asks for location permission the first time. After that it updates each time you open the page or switch back to it.
- The last position is remembered, so the times show straight away even before the new GPS fix arrives.
- The top of the dashboard shows the town you're in ("You're in Salford"). To get the town name, the phone sends its rough position (to about 1 km) to BigDataCloud's free lookup service, once per new place. If that service can't be reached, it shows the nearest city on the built-in list instead.
- It does not run in the background or keep a history of where you have been.

## Sections
A bar along the bottom splits the luach into five sections: **Today** (date, day circle, today's schedule, zmanim and checklist), **Calendar** (month view and coming chagim), **Learning** (Daf Yomi, weekly stats and log), **Siddur** (Tehillim and tefillos) and **Tools** (location and tzedakah). Tap "You're in…" at the top to change your location. Under the date, a gold line gives the Hebrew date that starts at shkiah.

## Your day circle
At the top, a 24-hour circle shows your day: midnight at the bottom and midday at the top. The gold band is daylight (netz to shkiah), with dawn and dusk shaded either side. The dotted outer arcs are the times for Shacharis, Mincha and Maariv, and each turns green once you tick it off in the daily practice checklist. The inner green ring fills as you complete the checklist. The white hand is now, and the middle shows the next zman and how long until it.

## Calendar and reminders
- **Calendar**: a month view with English and Hebrew dates. Shabbos and Yom Tov are shaded gold, Rosh Chodesh and chagim blue, and fasts amber. Fridays show candle-lighting time. Tap a day to see its schedule.
- **Today**: netz, shkiah, candle lighting, chagim and your reminders for the selected day, in time order.
- **Reminders**: add your own, either once, every day, every week, every month, every year, or every year on the Hebrew date (for a yahrzeit). While the app is open, a bar appears at the top when one is due. Tick **Done** to clear it for the day.
- **Phone alerts**: tick "Also add to my phone's calendar" when saving a reminder, or tap **Alert my phone for candle lighting**. This copy downloads a calendar file (.ics); open it and your phone adds the events with alerts, so they work even when the app is closed. A Hebrew-date reminder adds the next 10 years.
- **Google Calendar**: your Google events show only in the claude.ai version, which can also add reminders straight to Google Calendar.

## Zmanim, Tehillim and Tefillos (weekdays)
- **Zmanim today** for your GPS position: alos, misheyakir, netz, sof zman Shema (Magen Avraham and Gra), sof zman tefillah, chatzos, mincha gedolah and ketanah, plag, shkiah and tzeis. The next zman is highlighted, with a line saying which tefillah it's time for now. Times are calculated on the phone and are approximate.
- **Daily Tehillim** on the monthly cycle (or the weekly cycle), with larger and smaller text buttons. On Sunday it also offers the portion that fell on Shabbos.
- **Tefillos**: weekday Shacharis (with Upon Arising), Mincha, Maariv and Birkat Hamazon in **Nusach Sefard**. It opens on the right tefillah for the time of day and lists what to add today, such as Yaaleh Veyavo, Al Hanisim, Mashiv haruach or Morid hatal, Bareich Aleinu or Barcheinu, no Tachanun and the Omer count.
- **Shabbos and Yom Tov**: from candle lighting until tzeis, the Tehillim and Tefillos sections are hidden. Yom Tov follows the diaspora calendar, or the Israel one when you're in Israel.

### Text sources
- Tehillim: *Tanach with Nikkud* (tanach.us), via Sefaria. Public domain. File: `tehillim.json`.
- Siddur: *The Metsudah Siddur* (1981), Nusach Sefard, via Sefaria. CC-BY. File: `siddur.json`.

## Meeting recorder
Open **Tools → Meeting recorder** (or go straight to `meetings.html`) to record a meeting with the phone's microphone.
- Tap the red button to start, the square to stop and save. **Pause** and **Discard** are next to it.
- **Live transcript** writes down the words as you speak (Chrome on Android, Safari on iPhone). It is automatic and can contain mistakes; the audio is always kept.
- **Bookmarks** mark a key moment with a note. Tap the time later to jump to that point in the playback.
- **Keep screen on** stops the phone from sleeping, because most phones stop recording when the screen locks. Keep the page open while recording.
- Saved meetings can be played back, renamed, searched, shared, and downloaded as audio (.m4a or .webm) and as a text file of the notes, bookmarks and transcript.
- Recordings are saved **in this browser on this phone only** and are never uploaded. Download anything important. Remember to tell people in the meeting that you are recording.

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
