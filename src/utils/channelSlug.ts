/**
 * Converts a channel name to a URL-friendly slug.
 * e.g. "Tolo TV" → "tolo-tv", "BBC News HD" → "bbc-news-hd"
 */
export const toChannelSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/**
 * Find a channel in a list by matching its slug.
 */
export const findChannelBySlug = (
  channels: { name: string }[],
  slug: string
): number => {
  const normalizedSlug = slug.toLowerCase();
  return channels.findIndex(ch => toChannelSlug(ch.name) === normalizedSlug);
};
