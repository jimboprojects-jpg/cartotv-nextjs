/**
 * Pre-build script to fetch all M3U channel lists and generate a channel manifest.
 * Run: npx tsx scripts/fetch-channel-manifest.ts
 * Outputs: scripts/channel-manifest.json
 */

import fs from 'fs';
import path from 'path';

const COUNTRIES = [
  { name: "Afghanistan", url: "https://iptv-org.github.io/iptv/countries/af.m3u" },
  { name: "Albania", url: "https://iptv-org.github.io/iptv/countries/al.m3u" },
  { name: "Algeria", url: "https://iptv-org.github.io/iptv/countries/dz.m3u" },
  { name: "Andorra", url: "https://iptv-org.github.io/iptv/countries/ad.m3u" },
  { name: "Angola", url: "https://iptv-org.github.io/iptv/countries/ao.m3u" },
  { name: "Antigua and Barbuda", url: "https://iptv-org.github.io/iptv/countries/ag.m3u" },
  { name: "Argentina", url: "https://iptv-org.github.io/iptv/countries/ar.m3u" },
  { name: "Armenia", url: "https://iptv-org.github.io/iptv/countries/am.m3u" },
  { name: "Australia", url: "https://iptv-org.github.io/iptv/countries/au.m3u" },
  { name: "Austria", url: "https://iptv-org.github.io/iptv/countries/at.m3u" },
  { name: "Azerbaijan", url: "https://iptv-org.github.io/iptv/countries/az.m3u" },
  { name: "Bahamas", url: "https://iptv-org.github.io/iptv/countries/bs.m3u" },
  { name: "Bahrain", url: "https://iptv-org.github.io/iptv/countries/bh.m3u" },
  { name: "Bangladesh", url: "https://iptv-org.github.io/iptv/countries/bd.m3u" },
  { name: "Barbados", url: "https://iptv-org.github.io/iptv/countries/bb.m3u" },
  { name: "Belarus", url: "https://iptv-org.github.io/iptv/countries/by.m3u" },
  { name: "Belgium", url: "https://iptv-org.github.io/iptv/countries/be.m3u" },
  { name: "Belize", url: "https://iptv-org.github.io/iptv/countries/bz.m3u" },
  { name: "Benin", url: "https://iptv-org.github.io/iptv/countries/bj.m3u" },
  { name: "Bhutan", url: "https://iptv-org.github.io/iptv/countries/bt.m3u" },
  { name: "Bolivia", url: "https://iptv-org.github.io/iptv/countries/bo.m3u" },
  { name: "Bosnia and Herzegovina", url: "https://iptv-org.github.io/iptv/countries/ba.m3u" },
  { name: "Botswana", url: "https://iptv-org.github.io/iptv/countries/bw.m3u" },
  { name: "Brazil", url: "https://iptv-org.github.io/iptv/countries/br.m3u" },
  { name: "Brunei", url: "https://iptv-org.github.io/iptv/countries/bn.m3u" },
  { name: "Bulgaria", url: "https://iptv-org.github.io/iptv/countries/bg.m3u" },
  { name: "Burkina Faso", url: "https://iptv-org.github.io/iptv/countries/bf.m3u" },
  { name: "Burundi", url: "https://iptv-org.github.io/iptv/countries/bi.m3u" },
  { name: "Côte d'Ivoire", url: "https://iptv-org.github.io/iptv/countries/ci.m3u" },
  { name: "Cabo Verde", url: "https://iptv-org.github.io/iptv/countries/cv.m3u" },
  { name: "Cambodia", url: "https://iptv-org.github.io/iptv/countries/kh.m3u" },
  { name: "Cameroon", url: "https://iptv-org.github.io/iptv/countries/cm.m3u" },
  { name: "Canada", url: "https://iptv-org.github.io/iptv/countries/ca.m3u" },
  { name: "Central African Republic", url: "https://iptv-org.github.io/iptv/countries/cf.m3u" },
  { name: "Chad", url: "https://iptv-org.github.io/iptv/countries/td.m3u" },
  { name: "Chile", url: "https://iptv-org.github.io/iptv/countries/cl.m3u" },
  { name: "China", url: "https://iptv-org.github.io/iptv/countries/cn.m3u" },
  { name: "Colombia", url: "https://iptv-org.github.io/iptv/countries/co.m3u" },
  { name: "Comoros", url: "https://iptv-org.github.io/iptv/countries/km.m3u" },
  { name: "Congo", url: "https://iptv-org.github.io/iptv/countries/cg.m3u" },
  { name: "Costa Rica", url: "https://iptv-org.github.io/iptv/countries/cr.m3u" },
  { name: "Croatia", url: "https://iptv-org.github.io/iptv/countries/hr.m3u" },
  { name: "Cuba", url: "https://iptv-org.github.io/iptv/countries/cu.m3u" },
  { name: "Cyprus", url: "https://iptv-org.github.io/iptv/countries/cy.m3u" },
  { name: "Czech Republic", url: "https://iptv-org.github.io/iptv/countries/cz.m3u" },
  { name: "DR Congo", url: "https://iptv-org.github.io/iptv/countries/cd.m3u" },
  { name: "Denmark", url: "https://iptv-org.github.io/iptv/countries/dk.m3u" },
  { name: "Djibouti", url: "https://iptv-org.github.io/iptv/countries/dj.m3u" },
  { name: "Dominica", url: "https://iptv-org.github.io/iptv/countries/dm.m3u" },
  { name: "Dominican Republic", url: "https://iptv-org.github.io/iptv/countries/do.m3u" },
  { name: "Ecuador", url: "https://iptv-org.github.io/iptv/countries/ec.m3u" },
  { name: "Egypt", url: "https://iptv-org.github.io/iptv/countries/eg.m3u" },
  { name: "El Salvador", url: "https://iptv-org.github.io/iptv/countries/sv.m3u" },
  { name: "Equatorial Guinea", url: "https://iptv-org.github.io/iptv/countries/gq.m3u" },
  { name: "Eritrea", url: "https://iptv-org.github.io/iptv/countries/er.m3u" },
  { name: "Estonia", url: "https://iptv-org.github.io/iptv/countries/ee.m3u" },
  { name: "Eswatini", url: "https://iptv-org.github.io/iptv/countries/sz.m3u" },
  { name: "Ethiopia", url: "https://iptv-org.github.io/iptv/countries/et.m3u" },
  { name: "Fiji", url: "https://iptv-org.github.io/iptv/countries/fj.m3u" },
  { name: "Finland", url: "https://iptv-org.github.io/iptv/countries/fi.m3u" },
  { name: "France", url: "https://iptv-org.github.io/iptv/countries/fr.m3u" },
  { name: "Gabon", url: "https://iptv-org.github.io/iptv/countries/ga.m3u" },
  { name: "Gambia", url: "https://iptv-org.github.io/iptv/countries/gm.m3u" },
  { name: "Georgia", url: "https://iptv-org.github.io/iptv/countries/ge.m3u" },
  { name: "Germany", url: "https://iptv-org.github.io/iptv/countries/de.m3u" },
  { name: "Ghana", url: "https://iptv-org.github.io/iptv/countries/gh.m3u" },
  { name: "Greece", url: "https://iptv-org.github.io/iptv/countries/gr.m3u" },
  { name: "Grenada", url: "https://iptv-org.github.io/iptv/countries/gd.m3u" },
  { name: "Guatemala", url: "https://iptv-org.github.io/iptv/countries/gt.m3u" },
  { name: "Guinea", url: "https://iptv-org.github.io/iptv/countries/gn.m3u" },
  { name: "Guinea-Bissau", url: "https://iptv-org.github.io/iptv/countries/gw.m3u" },
  { name: "Guyana", url: "https://iptv-org.github.io/iptv/countries/gy.m3u" },
  { name: "Haiti", url: "https://iptv-org.github.io/iptv/countries/ht.m3u" },
  { name: "Honduras", url: "https://iptv-org.github.io/iptv/countries/hn.m3u" },
  { name: "Hungary", url: "https://iptv-org.github.io/iptv/countries/hu.m3u" },
  { name: "Iceland", url: "https://iptv-org.github.io/iptv/countries/is.m3u" },
  { name: "India", url: "https://iptv-org.github.io/iptv/countries/in.m3u" },
  { name: "Indonesia", url: "https://iptv-org.github.io/iptv/countries/id.m3u" },
  { name: "Iran", url: "https://iptv-org.github.io/iptv/countries/ir.m3u" },
  { name: "Iraq", url: "https://iptv-org.github.io/iptv/countries/iq.m3u" },
  { name: "Ireland", url: "https://iptv-org.github.io/iptv/countries/ie.m3u" },
  { name: "Israel", url: "https://iptv-org.github.io/iptv/countries/il.m3u" },
  { name: "Italy", url: "https://iptv-org.github.io/iptv/countries/it.m3u" },
  { name: "Jamaica", url: "https://iptv-org.github.io/iptv/countries/jm.m3u" },
  { name: "Japan", url: "https://iptv-org.github.io/iptv/countries/jp.m3u" },
  { name: "Jordan", url: "https://iptv-org.github.io/iptv/countries/jo.m3u" },
  { name: "Kazakhstan", url: "https://iptv-org.github.io/iptv/countries/kz.m3u" },
  { name: "Kenya", url: "https://iptv-org.github.io/iptv/countries/ke.m3u" },
  { name: "Kiribati", url: "https://iptv-org.github.io/iptv/countries/ki.m3u" },
  { name: "Kuwait", url: "https://iptv-org.github.io/iptv/countries/kw.m3u" },
  { name: "Kyrgyzstan", url: "https://iptv-org.github.io/iptv/countries/kg.m3u" },
  { name: "Laos", url: "https://iptv-org.github.io/iptv/countries/la.m3u" },
  { name: "Latvia", url: "https://iptv-org.github.io/iptv/countries/lv.m3u" },
  { name: "Lebanon", url: "https://iptv-org.github.io/iptv/countries/lb.m3u" },
  { name: "Lesotho", url: "https://iptv-org.github.io/iptv/countries/ls.m3u" },
  { name: "Liberia", url: "https://iptv-org.github.io/iptv/countries/lr.m3u" },
  { name: "Libya", url: "https://iptv-org.github.io/iptv/countries/ly.m3u" },
  { name: "Liechtenstein", url: "https://iptv-org.github.io/iptv/countries/li.m3u" },
  { name: "Lithuania", url: "https://iptv-org.github.io/iptv/countries/lt.m3u" },
  { name: "Luxembourg", url: "https://iptv-org.github.io/iptv/countries/lu.m3u" },
  { name: "Madagascar", url: "https://iptv-org.github.io/iptv/countries/mg.m3u" },
  { name: "Malawi", url: "https://iptv-org.github.io/iptv/countries/mw.m3u" },
  { name: "Malaysia", url: "https://iptv-org.github.io/iptv/countries/my.m3u" },
  { name: "Maldives", url: "https://iptv-org.github.io/iptv/countries/mv.m3u" },
  { name: "Mali", url: "https://iptv-org.github.io/iptv/countries/ml.m3u" },
  { name: "Malta", url: "https://iptv-org.github.io/iptv/countries/mt.m3u" },
  { name: "Mauritania", url: "https://iptv-org.github.io/iptv/countries/mr.m3u" },
  { name: "Mauritius", url: "https://iptv-org.github.io/iptv/countries/mu.m3u" },
  { name: "Mexico", url: "https://iptv-org.github.io/iptv/countries/mx.m3u" },
  { name: "Moldova", url: "https://iptv-org.github.io/iptv/countries/md.m3u" },
  { name: "Monaco", url: "https://iptv-org.github.io/iptv/countries/mc.m3u" },
  { name: "Mongolia", url: "https://iptv-org.github.io/iptv/countries/mn.m3u" },
  { name: "Montenegro", url: "https://iptv-org.github.io/iptv/countries/me.m3u" },
  { name: "Morocco", url: "https://iptv-org.github.io/iptv/countries/ma.m3u" },
  { name: "Mozambique", url: "https://iptv-org.github.io/iptv/countries/mz.m3u" },
  { name: "Myanmar", url: "https://iptv-org.github.io/iptv/countries/mm.m3u" },
  { name: "Namibia", url: "https://iptv-org.github.io/iptv/countries/na.m3u" },
  { name: "Nepal", url: "https://iptv-org.github.io/iptv/countries/np.m3u" },
  { name: "Netherlands", url: "https://iptv-org.github.io/iptv/countries/nl.m3u" },
  { name: "New Zealand", url: "https://iptv-org.github.io/iptv/countries/nz.m3u" },
  { name: "Nicaragua", url: "https://iptv-org.github.io/iptv/countries/ni.m3u" },
  { name: "Niger", url: "https://iptv-org.github.io/iptv/countries/ne.m3u" },
  { name: "Nigeria", url: "https://iptv-org.github.io/iptv/countries/ng.m3u" },
  { name: "North Korea", url: "https://iptv-org.github.io/iptv/countries/kp.m3u" },
  { name: "North Macedonia", url: "https://iptv-org.github.io/iptv/countries/mk.m3u" },
  { name: "Norway", url: "https://iptv-org.github.io/iptv/countries/no.m3u" },
  { name: "Oman", url: "https://iptv-org.github.io/iptv/countries/om.m3u" },
  { name: "Pakistan", url: "https://iptv-org.github.io/iptv/countries/pk.m3u" },
  { name: "Panama", url: "https://iptv-org.github.io/iptv/countries/pa.m3u" },
  { name: "Papua New Guinea", url: "https://iptv-org.github.io/iptv/countries/pg.m3u" },
  { name: "Paraguay", url: "https://iptv-org.github.io/iptv/countries/py.m3u" },
  { name: "Peru", url: "https://iptv-org.github.io/iptv/countries/pe.m3u" },
  { name: "Philippines", url: "https://iptv-org.github.io/iptv/countries/ph.m3u" },
  { name: "Poland", url: "https://iptv-org.github.io/iptv/countries/pl.m3u" },
  { name: "Portugal", url: "https://iptv-org.github.io/iptv/countries/pt.m3u" },
  { name: "Qatar", url: "https://iptv-org.github.io/iptv/countries/qa.m3u" },
  { name: "Romania", url: "https://iptv-org.github.io/iptv/countries/ro.m3u" },
  { name: "Russia", url: "https://iptv-org.github.io/iptv/countries/ru.m3u" },
  { name: "Rwanda", url: "https://iptv-org.github.io/iptv/countries/rw.m3u" },
  { name: "Saudi Arabia", url: "https://iptv-org.github.io/iptv/countries/sa.m3u" },
  { name: "Senegal", url: "https://iptv-org.github.io/iptv/countries/sn.m3u" },
  { name: "Serbia", url: "https://iptv-org.github.io/iptv/countries/rs.m3u" },
  { name: "Sierra Leone", url: "https://iptv-org.github.io/iptv/countries/sl.m3u" },
  { name: "Singapore", url: "https://iptv-org.github.io/iptv/countries/sg.m3u" },
  { name: "Slovakia", url: "https://iptv-org.github.io/iptv/countries/sk.m3u" },
  { name: "Slovenia", url: "https://iptv-org.github.io/iptv/countries/si.m3u" },
  { name: "Somalia", url: "https://iptv-org.github.io/iptv/countries/so.m3u" },
  { name: "South Africa", url: "https://iptv-org.github.io/iptv/countries/za.m3u" },
  { name: "South Korea", url: "https://iptv-org.github.io/iptv/countries/kr.m3u" },
  { name: "South Sudan", url: "https://iptv-org.github.io/iptv/countries/ss.m3u" },
  { name: "Spain", url: "https://iptv-org.github.io/iptv/countries/es.m3u" },
  { name: "Sri Lanka", url: "https://iptv-org.github.io/iptv/countries/lk.m3u" },
  { name: "Sudan", url: "https://iptv-org.github.io/iptv/countries/sd.m3u" },
  { name: "Suriname", url: "https://iptv-org.github.io/iptv/countries/sr.m3u" },
  { name: "Sweden", url: "https://iptv-org.github.io/iptv/countries/se.m3u" },
  { name: "Switzerland", url: "https://iptv-org.github.io/iptv/countries/ch.m3u" },
  { name: "Syria", url: "https://iptv-org.github.io/iptv/countries/sy.m3u" },
  { name: "Taiwan", url: "https://iptv-org.github.io/iptv/countries/tw.m3u" },
  { name: "Tajikistan", url: "https://iptv-org.github.io/iptv/countries/tj.m3u" },
  { name: "Tanzania", url: "https://iptv-org.github.io/iptv/countries/tz.m3u" },
  { name: "Thailand", url: "https://iptv-org.github.io/iptv/countries/th.m3u" },
  { name: "Togo", url: "https://iptv-org.github.io/iptv/countries/tg.m3u" },
  { name: "Trinidad and Tobago", url: "https://iptv-org.github.io/iptv/countries/tt.m3u" },
  { name: "Tunisia", url: "https://iptv-org.github.io/iptv/countries/tn.m3u" },
  { name: "Turkey", url: "https://iptv-org.github.io/iptv/countries/tr.m3u" },
  { name: "Turkmenistan", url: "https://iptv-org.github.io/iptv/countries/tm.m3u" },
  { name: "Uganda", url: "https://iptv-org.github.io/iptv/countries/ug.m3u" },
  { name: "Ukraine", url: "https://iptv-org.github.io/iptv/countries/ua.m3u" },
  { name: "United Arab Emirates", url: "https://iptv-org.github.io/iptv/countries/ae.m3u" },
  { name: "United Kingdom", url: "https://iptv-org.github.io/iptv/countries/uk.m3u" },
  { name: "United States", url: "https://iptv-org.github.io/iptv/countries/us.m3u" },
  { name: "Uruguay", url: "https://iptv-org.github.io/iptv/countries/uy.m3u" },
  { name: "Uzbekistan", url: "https://iptv-org.github.io/iptv/countries/uz.m3u" },
  { name: "Vatican City", url: "https://iptv-org.github.io/iptv/countries/va.m3u" },
  { name: "Venezuela", url: "https://iptv-org.github.io/iptv/countries/ve.m3u" },
  { name: "Vietnam", url: "https://iptv-org.github.io/iptv/countries/vn.m3u" },
  { name: "Yemen", url: "https://iptv-org.github.io/iptv/countries/ye.m3u" },
  { name: "Zambia", url: "https://iptv-org.github.io/iptv/countries/zm.m3u" },
  { name: "Zimbabwe", url: "https://iptv-org.github.io/iptv/countries/zw.m3u" },
];

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseM3UChannelNames(content: string): string[] {
  const lines = content.split('\n');
  const names: string[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#EXTINF:')) {
      const nameMatch = trimmed.match(/,(.+)$/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        const slug = toSlug(name);
        if (slug && !seen.has(slug)) {
          seen.add(slug);
          names.push(name);
        }
      }
    }
  }
  return names;
}

interface Manifest {
  generatedAt: string;
  totalChannels: number;
  countries: Record<string, string[]>;
}

async function main() {
  console.log('🔄 Fetching channel manifests from all countries...');
  
  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    totalChannels: 0,
    countries: {},
  };

  const BATCH_SIZE = 20;
  
  for (let i = 0; i < COUNTRIES.length; i += BATCH_SIZE) {
    const batch = COUNTRIES.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async (country) => {
        try {
          const res = await fetch(country.url, { signal: AbortSignal.timeout(15000) });
          if (!res.ok) return { country: country.name, channels: [] as string[] };
          const text = await res.text();
          const channels = parseM3UChannelNames(text);
          return { country: country.name, channels };
        } catch {
          return { country: country.name, channels: [] as string[] };
        }
      })
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const { country, channels } = result.value;
        if (channels.length > 0) {
          manifest.countries[country] = channels;
          manifest.totalChannels += channels.length;
        }
        console.log(`  ✓ ${country}: ${channels.length} channels`);
      }
    }
  }

  const outPath = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), 'channel-manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Manifest saved to ${outPath}`);
  console.log(`   Total: ${Object.keys(manifest.countries).length} countries, ${manifest.totalChannels} channels`);
}

main().catch(console.error);
