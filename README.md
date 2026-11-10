# Yehuda's Luach

**Live app:** https://allinsideconstruction.github.io/Luach-/

This repository also holds a separate **Meeting Recorder** app at https://allinsideconstruction.github.io/Luach-/recorder/. See [recorder/README.md](recorder/README.md).

A daily Jewish life and learning app. This is the GPS edition: it asks the phone for its location, so zmanim and Shabbos times are worked out for exactly where you are.

## Sections (bottom bar on phones, tabs on a computer)
- **Today**: Hebrew date (and the date that starts after shkiah), "Times are for…" with quick location switching, **My day** circle with your own schedule (Edit times), zmanim, a davening checklist (Shacharis, Mincha, Maariv, Tefillin), today's reminders, this week's parsha with candle lighting and havdalah, what's coming up, and today's learning.
- **Calendar**: month view with Hebrew dates, Yom Tov, fasts and Rosh Chodesh; yahrzeits, Hebrew birthdays and anniversaries; **reminders** (once, daily, weekly, monthly, yearly, or yearly on the Hebrew date), with an alert bar when one is due while the app is open.
- **Learning**: Ha'amek Davar on the weekly parsha (one aliyah a day, with Onkelos and Rashi, and a bookmark), Daf Yomi, Tehillim on the monthly cycle, 14-day streaks, and a learning log with minutes by subject.
- **Siddur**: Nusach Sefard weekday tefillos and brachos, opened at the right tefillah for the time of day, with a "Today in davening" box (Yaaleh Veyavo, Al Hanisim, Morid hatal or Mashiv haruach, Barcheinu or Bareich Aleinu, Tachanun, Omer).
- **Tools**: meat and dairy timer, Omer counter, tzedakah with a monthly goal, and a brachos guide.

On Shabbos and Yom Tov, from candle lighting until nightfall, the Siddur and Tehillim show "Shabbat Shalom" or "Gut Yom Tov" instead of the text.

## Reminders app
**Open it:** https://allinsideconstruction.github.io/Luach-/reminders.html (or tap **Open Reminders** in the Luach). Add it to your home screen and it works like its own app, even offline.

- **Type it the way you'd say it:** "Call Moshe tomorrow 7pm", "Pay rent every month on 1st", "Shiur every Tue and Thu at 8pm #Learning", "Yahrzeit 12/3 every Hebrew year", "Check oven in 20 min", "Challah erev Shabbos". Add `!` to flag, `!!` or `!!!` for priority, `#list` to file it.
- **Smart lists:** Today (split into overdue, all day, morning, afternoon, tonight), Scheduled (by day, with the Hebrew date), Flagged, All and Completed, plus your own coloured lists.
- **Repeats:** daily, weekdays, weekly on chosen days, every N days/weeks/months/years, monthly, yearly, yearly on the Hebrew date (with an "after sunset" option for yahrzeits), monthly on the Hebrew date, and an end date.
- **Details:** notes, steps (a checklist inside a reminder), flag, priority, alert time (at the time, 5 min up to a day before).
- **Alerts:** a pop-up, sound and banner when a reminder is due while the app is open, with Done, Snooze 10 min, 1 hour or Tomorrow. Undo after completing or deleting.
- **Phone calendar:** "Add to phone calendar" on any reminder, or "Add all to phone" in Settings, downloads a calendar file with alarms, so your phone alerts you even when the app is closed.
- **Backup:** download and restore a backup file from Settings.

It shares its reminders with the Luach's Calendar and Today tabs (same browser), so a reminder added in either place shows in both.

## Phone alerts
Tick "Also add to my phone's calendar" when saving a reminder, or tap **Alert my phone for candle lighting** in the Calendar tab. This app downloads a calendar file (.ics); open it and your phone adds the events with alerts, so they work even when the app is closed. A Hebrew-date reminder adds the next 10 years. (The claude.ai version adds them straight to Google Calendar and shows your Google events.)

## Location
The app asks the phone for its position each time it opens and looks up the town name (it sends the rough position to BigDataCloud's free lookup service). You can also pick a city or enter coordinates. It never runs in the background or keeps a history of where you've been.

## Where your data is saved
In this browser on this phone only (the Reminders app too: use its Settings to download a backup). It doesn't sync with the claude.ai version. Clearing the browser's site data deletes it.

## Text sources
- Calendar, zmanim, parsha and Daf Yomi: @hebcal/core, bundled in the page.
- Tehillim: Westminster Leningrad Codex, embedded in the page.
- Siddur (`siddur.json`): Nusach Sefard, from Sefaria's open siddur texts.
- Chumash with Onkelos, Rashi and Ha'amek Davar (`hd/*.json`): from Sefaria.

Zmanim are approximate; check your community's luach.
