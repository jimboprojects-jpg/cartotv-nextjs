import { africaSEO } from './africa';
import { americasSEO } from './americas';
import { europeSEO } from './europe';
import { asiaOceaniaSEO } from './asia-oceania';

const countrySEOContent: Record<string, string> = {
  ...africaSEO,
  ...americasSEO,
  ...europeSEO,
  ...asiaOceaniaSEO,
};

export const getCountrySEO = (countryName: string): string | undefined =>
  countrySEOContent[countryName];
