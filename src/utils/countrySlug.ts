import { countries, Country } from '@/data/countries';

export const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const slugMap = new Map<string, Country>();
countries.forEach(c => slugMap.set(toSlug(c.name), c));

export const getCountryBySlug = (slug: string): Country | undefined =>
  slugMap.get(slug.toLowerCase());

export const getAllCountrySlugs = (): string[] =>
  Array.from(slugMap.keys());
