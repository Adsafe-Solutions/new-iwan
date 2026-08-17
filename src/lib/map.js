import { BRAND } from "../config/brand.js";

/* Builds the embed + directions URLs for a venue.

   Two routes, in order of preference:

   1. `coords: [lat, lng]` → OpenStreetMap's official embed. Keyless, no
      tracking, and it pins the exact spot. Use this once a venue's real
      position is known.

   2. an address string → Google's `output=embed` query. This is what makes
      a map possible at all when all we have is text, since the OSM embed
      needs a bounding box rather than a search term. It needs no API key,
      but it is NOT part of Google's documented Embed API — for a site that
      must not break, swap in the official Embed API with a key, or add
      coordinates and let route 1 handle it.

   Venue names in events.js are placeholders ("Iwan Hall, 14 Main Street"),
   and searching those would drop a pin somewhere arbitrary — so anything
   without its own `coords` or `mapQuery` falls back to Iwan's real address.
*/

/* roughly a 400m box around the point — close enough to read the street */
const SPAN = 0.004;

export function mapEmbed(event = {}) {
  if (Array.isArray(event.coords) && event.coords.length === 2) {
    const [lat, lng] = event.coords;
    const bbox = [lng - SPAN, lat - SPAN, lng + SPAN, lat + SPAN].join(",");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  }

  const q = event.mapQuery || BRAND.address;
  if (!q) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

/** Opens the location in whatever maps app the visitor actually uses. */
export function mapLink(event = {}) {
  const q =
    Array.isArray(event.coords) && event.coords.length === 2
      ? event.coords.join(",")
      : event.mapQuery || BRAND.address;
  if (!q) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
