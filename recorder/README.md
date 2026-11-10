# Meeting Recorder

A separate app for recording meetings and getting a transcript, all on your phone.

**Address:** https://allinsideconstruction.github.io/Luach-/recorder/

## Put it on your home screen
Open the address on your phone, then:
- **iPhone (Safari):** Share → **Add to Home Screen**
- **Android (Chrome):** ⋮ → **Install app** (or **Add to Home screen**)

It opens as its own app called **Recorder**, with a microphone icon. It is not connected to the Luach.

## Layout
A bar along the bottom has three sections:
- **Record**: the big record button, and bookmarks and notes for during the meeting.
- **Meetings**: your saved meetings with their transcripts, search, and Save to Notes.
- **Settings**: automatic transcript, keep screen on, live captions, transcript quality and language, and how to add the app to your home screen.

While recording, a red timer shows at the top whichever section you're in. While a transcript is being made, the top shows how far it has got. When you stop recording, the app opens **Meetings** so you can watch the transcript appear.

## Recording
- Tap the red button to start and the square to stop. **Pause** and **Discard** are on either side.
- **Bookmarks** mark a key moment with a note. Later, tap the time to jump to that point in the recording.
- **Keep screen on** stops the phone from sleeping, because most phones stop recording when the screen locks. Keep the app open while recording.
- **Live captions** (optional) show rough words while you record, where the phone supports it.

## Transcript after recording
- With **Transcribe when I stop** ticked, a full transcript with timestamps is made as soon as you stop. You can also tap **Transcribe** on any saved meeting.
- It runs on the phone with the Whisper speech model. Nothing is uploaded. The first time, the phone downloads the model once (about 80 MB on Standard, so use Wi-Fi). After that it works offline.
- Tap a timestamp to play from that moment. While the recording plays, the matching line is highlighted.
- **Settings** sets the quality (Quick, Standard or Best) and the language (English, automatic, Hebrew or Yiddish).
- A transcript takes about as long as the meeting, often less. Keep the app open until it finishes. If it's interrupted, tap **Continue**.
- Transcripts are made automatically and can contain mistakes, especially names.

## Saving to Notes
- **Save to Notes** on a meeting opens the phone's Share menu. Choose **Notes** (or Google Keep, Samsung Notes and so on). The note gets the transcript, bookmarks and your notes as text, with the audio attached.
- **Save all to Notes** does the same for every saved meeting at once, or for the meetings matching your search. If the recordings together are over 200 MB, only the text is shared, so save the audio one meeting at a time.
- An app in the browser can't write into Notes by itself, so it always goes through the Share menu (one tap).
- On a computer, which has no Share menu, the text is copied to paste into a note and the audio is downloaded.

## Where recordings are kept
Recordings are saved in the browser on this phone only. Download them, or save them to Notes, to keep them safe. Clearing the browser's site data deletes them. Remember to tell people in the meeting that you are recording.

## Files
- `index.html`: the app
- `worker.js`: makes the transcript in the background
- `sw.js`: lets the app work offline and run faster
- `vendor/`: the transformers.js speech library (v3.8.1, Apache-2.0, see `LICENSE-transformers.txt`)
