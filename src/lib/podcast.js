/* mm:ss for a running time in seconds — shared by AudioPlayer, PodcastCard
   and PodcastEpisode so the three can't format it differently. Renders
   "--:--" until a real number arrives: AudioPlayer's `preload="none"` means
   the element's own duration isn't known until playback starts, and a
   listing card has only whatever `length` content supplies. */
export const duration = (s) => {
  if (!Number.isFinite(s)) return "--:--";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/* The id out of any YouTube URL people actually paste. Null when it is not one.
   ⚠ Mirrored in the CMS API's src/validators/fields.js, which refuses anything
   this cannot read; change both. */
const YOUTUBE = [
  /[?&]v=([A-Za-z0-9_-]{11})/,
  /youtu\.be\/([A-Za-z0-9_-]{11})/,
  /youtube(?:-nocookie)?\.com\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/,
];

export const youtubeId = (value = "") => {
  const text = String(value);
  if (!/^https?:\/\/([\w-]+\.)*(youtube(-nocookie)?\.com|youtu\.be)\//i.test(text)) {
    return null;
  }
  for (const re of YOUTUBE) {
    const m = text.match(re);
    if (m) return m[1];
  }
  return null;
};

export default duration;
