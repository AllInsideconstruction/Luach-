# Yehuda's Luach

**Live app:** https://allinsideconstruction.github.io/Luach-/

A daily Jewish life and learning app. This is the GPS edition: it asks the phone for its location, so zmanim and Shabbos times are worked out for exactly where you are.

## Sections (bottom bar on phones, tabs on a computer)
- **Today**: Hebrew date (and the date that starts after shkiah), "Times are for…" with quick location switching, **My day** circle with your own schedule (Edit times), zmanim, a davening checklist (Shacharis, Mincha, Maariv, Tefillin), today's reminders, this week's parsha with candle lighting and havdalah, what's coming up, and today's learning.
- **Calendar**: month view with Hebrew dates, Yom Tov, fasts and Rosh Chodesh; yahrzeits, Hebrew birthdays and anniversaries; **reminders** (once, daily, weekly, monthly, yearly, or yearly on the Hebrew date), with an alert bar when one is due while the app is open.
- **Learning**: Ha'amek Davar on the weekly parsha (one aliyah a day, with Onkelos and Rashi, and a bookmark), Daf Yomi, Tehillim on the monthly cycle, 14-day streaks, and a learning log with minutes by subject.
- **Siddur**: Nusach Sefard weekday tefillos and brachos, opened at the right tefillah for the time of day, with a "Today in davening" box (Yaaleh Veyavo, Al Hanisim, Morid hatal or Mashiv haruach, Barcheinu or Bareich Aleinu, Tachanun, Omer).
- **Tools**: meat and dairy timer, Omer counter, tzedakah with a monthly goal, and a brachos guide.

On Shabbos and Yom Tov, from candle lighting until nightfall, the Siddur and Tehillim show "Shabbat Shalom" or "Gut Yom Tov" instead of the text.

## Phone alerts
Tick "Also add to my phone's calendar" when saving a reminder, or tap **Alert my phone for candle lighting** in the Calendar tab. This app downloads a calendar file (.ics); open it and your phone adds the events with alerts, so they work even when the app is closed. A Hebrew-date reminder adds the next 10 years. (The claude.ai version adds them straight to Google Calendar and shows your Google events.)

## Location
The app asks the phone for its position each time it opens and looks up the town name (it sends the rough position to BigDataCloud's free lookup service). You can also pick a city or enter coordinates. It never runs in the background or keeps a history of where you've been.

## Where your data is saved
In this browser on this phone only. It doesn't sync with the claude.ai version. Clearing the browser's site data deletes it.

## Text sources
- Calendar, zmanim, parsha and Daf Yomi: @hebcal/core, bundled in the page.
- Tehillim: Westminster Leningrad Codex, embedded in the page.
- Siddur (`siddur.json`): Nusach Sefard, from Sefaria's open siddur texts.
- Chumash with Onkelos, Rashi and Ha'amek Davar (`hd/*.json`): from Sefaria.

Zmanim are approximate; check your community's luach.
