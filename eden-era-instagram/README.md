# Eden Era Events · Instagram content system

4 weeks · 24 posts (Sun–Fri) · 14 education / 6 kit / 4 consult

| Folder / file | What's in it |
|---|---|
| `brand-voice.md` | Interview answers: ideal client, fears, voice, faith, offers, differentiators |
| `site-fixes.md` | Problems found on edeneraevents.com and in the blog source docs (not edited) |
| `posting-calendar.md` | Dates, times (Metricool best time), formats, Story stickers, keyword auto-replies, bio |
| `copy/W1–W4-captions.md` | Hook, caption, hashtags, CTA, slide text / on-screen beats, Story idea per post |
| `copy/kit-facts.md`, `copy/sources/` | Every fact used, with its source |
| `designs/<post-id>/NN.png` | Carousel slides, 1080×1350 |
| `reels/<post-id>.mp4` | Version (a): text-and-motion Reel, 1080×1920, 30fps, H.264, ~16 s |
| `reels/w1-talk-upcoming-news.mp4` | Talking-to-camera Reel from Rebeca's real footage (captions, trims, end card) |
| `scripts/teleprompter.md` | 12–20 s script for every Reel, plus outfit and set rotation |
| `scripts/shot-list.md` | Batch filming plan, framing, light, sound, what happens after upload |
| `scripts/*.words.json` | Whisper word timings for footage |

## Rebuild
```
npm install
node src/build.js                         # copy, calendar, scripts + QA rules (fails on violations)
node src/render-posts.js [id ...]         # carousel PNGs
node src/render-reel.js <id>              # text Reel (--audio muxes a voice-over; word-timed VO captions are added once the first VO files arrive)
node src/render-talking.js <id>           # real footage → captioned Reel (spec in copy/talking.json)
node src/qa.js && python3 src/qa_zones.py # format/duration checks + unsafe-zone text check
```

## Hard limits
Only Rebeca's real footage and real voice. No AI video of her, no voice cloning or synthesis, no digital outfit or background swaps. Her photo is used only as a still.
