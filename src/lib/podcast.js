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

export default duration;
