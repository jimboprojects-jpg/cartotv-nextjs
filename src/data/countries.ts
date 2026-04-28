export interface Country {
  name: string;
  url: string;
  lat: number;
  lng: number;
  color: string;
  flag: string;
}

export interface Channel {
  name: string;
  url: string;
  liveViews: number;
  category?: string;
  logo?: string;
}

export const countries: Country[] = [
  { name: "Afghanistan", url: "https://iptv-org.github.io/iptv/countries/af.m3u", lat: 33.93911, lng: 67.709953, color: '#1a5276', flag: 'https://flagcdn.com/w80/af.png' },
  { name: "Albania", url: "https://iptv-org.github.io/iptv/countries/al.m3u", lat: 41.153332, lng: 20.168331, color: '#27ae60', flag: 'https://flagcdn.com/w80/al.png' },
  { name: "Algeria", url: "https://iptv-org.github.io/iptv/countries/dz.m3u", lat: 28.033886, lng: 1.659626, color: '#2ecc71', flag: 'https://flagcdn.com/w80/dz.png' },
  { name: "Andorra", url: "https://iptv-org.github.io/iptv/countries/ad.m3u", lat: 42.506285, lng: 1.521801, color: '#e74c3c', flag: 'https://flagcdn.com/w80/ad.png' },
  { name: "Angola", url: "https://iptv-org.github.io/iptv/countries/ao.m3u", lat: -11.202692, lng: 17.873887, color: '#f39c12', flag: 'https://flagcdn.com/w80/ao.png' },
  { name: "Antigua and Barbuda", url: "https://iptv-org.github.io/iptv/countries/ag.m3u", lat: 17.060816, lng: -61.796428, color: '#8e44ad', flag: 'https://flagcdn.com/w80/ag.png' },
  { name: "Argentina", url: "https://iptv-org.github.io/iptv/countries/ar.m3u", lat: -38.416097, lng: -63.616672, color: '#3498db', flag: 'https://flagcdn.com/w80/ar.png' },
  { name: "Armenia", url: "https://iptv-org.github.io/iptv/countries/am.m3u", lat: 40.069099, lng: 45.038189, color: '#d35400', flag: 'https://flagcdn.com/w80/am.png' },
  { name: "Australia", url: "https://iptv-org.github.io/iptv/countries/au.m3u", lat: -25.274398, lng: 133.775136, color: '#e67e22', flag: 'https://flagcdn.com/w80/au.png' },
  { name: "Austria", url: "https://iptv-org.github.io/iptv/countries/at.m3u", lat: 47.516231, lng: 14.550072, color: '#16a085', flag: 'https://flagcdn.com/w80/at.png' },
  { name: "Azerbaijan", url: "https://iptv-org.github.io/iptv/countries/az.m3u", lat: 40.143105, lng: 47.576927, color: '#c0392b', flag: 'https://flagcdn.com/w80/az.png' },
  { name: "Bahamas", url: "https://iptv-org.github.io/iptv/countries/bs.m3u", lat: 25.03428, lng: -77.39628, color: '#2980b9', flag: 'https://flagcdn.com/w80/bs.png' },
  { name: "Bahrain", url: "https://iptv-org.github.io/iptv/countries/bh.m3u", lat: 25.930414, lng: 50.637772, color: '#7f8c8d', flag: 'https://flagcdn.com/w80/bh.png' },
  { name: "Bangladesh", url: "https://iptv-org.github.io/iptv/countries/bd.m3u", lat: 23.684994, lng: 90.356331, color: '#27ae60', flag: 'https://flagcdn.com/w80/bd.png' },
  { name: "Barbados", url: "https://iptv-org.github.io/iptv/countries/bb.m3u", lat: 13.193887, lng: -59.543198, color: '#d35400', flag: 'https://flagcdn.com/w80/bb.png' },
  { name: "Belarus", url: "https://iptv-org.github.io/iptv/countries/by.m3u", lat: 53.709807, lng: 27.953389, color: '#e74c3c', flag: 'https://flagcdn.com/w80/by.png' },
  { name: "Belgium", url: "https://iptv-org.github.io/iptv/countries/be.m3u", lat: 50.503887, lng: 4.469936, color: '#3498db', flag: 'https://flagcdn.com/w80/be.png' },
  { name: "Belize", url: "https://iptv-org.github.io/iptv/countries/bz.m3u", lat: 17.189877, lng: -88.49765, color: '#f39c12', flag: 'https://flagcdn.com/w80/bz.png' },
  { name: "Benin", url: "https://iptv-org.github.io/iptv/countries/bj.m3u", lat: 9.30769, lng: 2.315834, color: '#2ecc71', flag: 'https://flagcdn.com/w80/bj.png' },
  { name: "Bhutan", url: "https://iptv-org.github.io/iptv/countries/bt.m3u", lat: 27.514162, lng: 90.433601, color: '#1abc9c', flag: 'https://flagcdn.com/w80/bt.png' },
  { name: "Bolivia", url: "https://iptv-org.github.io/iptv/countries/bo.m3u", lat: -16.290154, lng: -63.588653, color: '#e67e22', flag: 'https://flagcdn.com/w80/bo.png' },
  { name: "Bosnia and Herzegovina", url: "https://iptv-org.github.io/iptv/countries/ba.m3u", lat: 43.915886, lng: 17.679076, color: '#3498db', flag: 'https://flagcdn.com/w80/ba.png' },
  { name: "Botswana", url: "https://iptv-org.github.io/iptv/countries/bw.m3u", lat: -22.328474, lng: 24.684866, color: '#9b59b6', flag: 'https://flagcdn.com/w80/bw.png' },
  { name: "Brazil", url: "https://iptv-org.github.io/iptv/countries/br.m3u", lat: -14.235004, lng: -51.92528, color: '#27ae60', flag: 'https://flagcdn.com/w80/br.png' },
  { name: "Brunei", url: "https://iptv-org.github.io/iptv/countries/bn.m3u", lat: 4.535277, lng: 114.727669, color: '#e74c3c', flag: 'https://flagcdn.com/w80/bn.png' },
  { name: "Bulgaria", url: "https://iptv-org.github.io/iptv/countries/bg.m3u", lat: 42.733883, lng: 25.48583, color: '#3498db', flag: 'https://flagcdn.com/w80/bg.png' },
  { name: "Burkina Faso", url: "https://iptv-org.github.io/iptv/countries/bf.m3u", lat: 12.238333, lng: -1.561593, color: '#f1c40f', flag: 'https://flagcdn.com/w80/bf.png' },
  { name: "Burundi", url: "https://iptv-org.github.io/iptv/countries/bi.m3u", lat: -3.373056, lng: 29.918886, color: '#e67e22', flag: 'https://flagcdn.com/w80/bi.png' },
  { name: "Côte d'Ivoire", url: "https://iptv-org.github.io/iptv/countries/ci.m3u", lat: 7.539989, lng: -5.54708, color: '#f39c12', flag: 'https://flagcdn.com/w80/ci.png' },
  { name: "Cabo Verde", url: "https://iptv-org.github.io/iptv/countries/cv.m3u", lat: 16.5388, lng: -23.0418, color: '#3498db', flag: 'https://flagcdn.com/w80/cv.png' },
  { name: "Cambodia", url: "https://iptv-org.github.io/iptv/countries/kh.m3u", lat: 12.565679, lng: 104.990963, color: '#2ecc71', flag: 'https://flagcdn.com/w80/kh.png' },
  { name: "Cameroon", url: "https://iptv-org.github.io/iptv/countries/cm.m3u", lat: 7.369722, lng: 12.354722, color: '#1a5276', flag: 'https://flagcdn.com/w80/cm.png' },
  { name: "Canada", url: "https://iptv-org.github.io/iptv/countries/ca.m3u", lat: 56.130366, lng: -106.346771, color: '#e74c3c', flag: 'https://flagcdn.com/w80/ca.png' },
  { name: "Central African Republic", url: "https://iptv-org.github.io/iptv/countries/cf.m3u", lat: 6.611111, lng: 20.939444, color: '#16a085', flag: 'https://flagcdn.com/w80/cf.png' },
  { name: "Chad", url: "https://iptv-org.github.io/iptv/countries/td.m3u", lat: 15.454166, lng: 18.732207, color: '#f39c12', flag: 'https://flagcdn.com/w80/td.png' },
  { name: "Chile", url: "https://iptv-org.github.io/iptv/countries/cl.m3u", lat: -35.675147, lng: -71.542969, color: '#3498db', flag: 'https://flagcdn.com/w80/cl.png' },
  { name: "China", url: "https://iptv-org.github.io/iptv/countries/cn.m3u", lat: 35.86166, lng: 104.195397, color: '#e74c3c', flag: 'https://flagcdn.com/w80/cn.png' },
  { name: "Colombia", url: "https://iptv-org.github.io/iptv/countries/co.m3u", lat: 4.570868, lng: -74.297333, color: '#f1c40f', flag: 'https://flagcdn.com/w80/co.png' },
  { name: "Comoros", url: "https://iptv-org.github.io/iptv/countries/km.m3u", lat: -11.875001, lng: 43.872219, color: '#2ecc71', flag: 'https://flagcdn.com/w80/km.png' },
  { name: "Congo", url: "https://iptv-org.github.io/iptv/countries/cg.m3u", lat: -0.228021, lng: 15.827659, color: '#1a5276', flag: 'https://flagcdn.com/w80/cg.png' },
  { name: "Costa Rica", url: "https://iptv-org.github.io/iptv/countries/cr.m3u", lat: 9.748917, lng: -83.753428, color: '#e67e22', flag: 'https://flagcdn.com/w80/cr.png' },
  { name: "Croatia", url: "https://iptv-org.github.io/iptv/countries/hr.m3u", lat: 45.1, lng: 15.2, color: '#3498db', flag: 'https://flagcdn.com/w80/hr.png' },
  { name: "Cuba", url: "https://iptv-org.github.io/iptv/countries/cu.m3u", lat: 21.521757, lng: -77.781167, color: '#e74c3c', flag: 'https://flagcdn.com/w80/cu.png' },
  { name: "Cyprus", url: "https://iptv-org.github.io/iptv/countries/cy.m3u", lat: 35.126413, lng: 33.429859, color: '#f39c12', flag: 'https://flagcdn.com/w80/cy.png' },
  { name: "Czech Republic", url: "https://iptv-org.github.io/iptv/countries/cz.m3u", lat: 49.817492, lng: 15.472962, color: '#16a085', flag: 'https://flagcdn.com/w80/cz.png' },
  { name: "DR Congo", url: "https://iptv-org.github.io/iptv/countries/cd.m3u", lat: -4.038333, lng: 21.758664, color: '#1a5276', flag: 'https://flagcdn.com/w80/cd.png' },
  { name: "Denmark", url: "https://iptv-org.github.io/iptv/countries/dk.m3u", lat: 56.26392, lng: 9.501785, color: '#c0392b', flag: 'https://flagcdn.com/w80/dk.png' },
  { name: "Djibouti", url: "https://iptv-org.github.io/iptv/countries/dj.m3u", lat: 11.825138, lng: 42.590275, color: '#27ae60', flag: 'https://flagcdn.com/w80/dj.png' },
  { name: "Dominica", url: "https://iptv-org.github.io/iptv/countries/dm.m3u", lat: 15.414999, lng: -61.370976, color: '#3498db', flag: 'https://flagcdn.com/w80/dm.png' },
  { name: "Dominican Republic", url: "https://iptv-org.github.io/iptv/countries/do.m3u", lat: 18.735693, lng: -70.162651, color: '#e74c3c', flag: 'https://flagcdn.com/w80/do.png' },
  { name: "Ecuador", url: "https://iptv-org.github.io/iptv/countries/ec.m3u", lat: -1.831239, lng: -78.183406, color: '#f1c40f', flag: 'https://flagcdn.com/w80/ec.png' },
  { name: "Egypt", url: "https://iptv-org.github.io/iptv/countries/eg.m3u", lat: 26.820553, lng: 30.802498, color: '#1a5276', flag: 'https://flagcdn.com/w80/eg.png' },
  { name: "El Salvador", url: "https://iptv-org.github.io/iptv/countries/sv.m3u", lat: 13.794185, lng: -88.89653, color: '#2ecc71', flag: 'https://flagcdn.com/w80/sv.png' },
  { name: "Equatorial Guinea", url: "https://iptv-org.github.io/iptv/countries/gq.m3u", lat: 1.650801, lng: 10.267895, color: '#3498db', flag: 'https://flagcdn.com/w80/gq.png' },
  { name: "Eritrea", url: "https://iptv-org.github.io/iptv/countries/er.m3u", lat: 15.179384, lng: 39.782334, color: '#e67e22', flag: 'https://flagcdn.com/w80/er.png' },
  { name: "Estonia", url: "https://iptv-org.github.io/iptv/countries/ee.m3u", lat: 58.595272, lng: 25.013607, color: '#9b59b6', flag: 'https://flagcdn.com/w80/ee.png' },
  { name: "Eswatini", url: "https://iptv-org.github.io/iptv/countries/sz.m3u", lat: -26.522503, lng: 31.465866, color: '#f39c12', flag: 'https://flagcdn.com/w80/sz.png' },
  { name: "Ethiopia", url: "https://iptv-org.github.io/iptv/countries/et.m3u", lat: 9.145, lng: 40.489673, color: '#1a5276', flag: 'https://flagcdn.com/w80/et.png' },
  { name: "Fiji", url: "https://iptv-org.github.io/iptv/countries/fj.m3u", lat: -16.578193, lng: 179.414413, color: '#e74c3c', flag: 'https://flagcdn.com/w80/fj.png' },
  { name: "Finland", url: "https://iptv-org.github.io/iptv/countries/fi.m3u", lat: 61.92411, lng: 25.748151, color: '#3498db', flag: 'https://flagcdn.com/w80/fi.png' },
  { name: "France", url: "https://iptv-org.github.io/iptv/countries/fr.m3u", lat: 46.227638, lng: 2.213749, color: '#c0392b', flag: 'https://flagcdn.com/w80/fr.png' },
  { name: "Gabon", url: "https://iptv-org.github.io/iptv/countries/ga.m3u", lat: -0.803689, lng: 11.609444, color: '#27ae60', flag: 'https://flagcdn.com/w80/ga.png' },
  { name: "Gambia", url: "https://iptv-org.github.io/iptv/countries/gm.m3u", lat: 13.443182, lng: -15.310139, color: '#f39c12', flag: 'https://flagcdn.com/w80/gm.png' },
  { name: "Georgia", url: "https://iptv-org.github.io/iptv/countries/ge.m3u", lat: 42.315407, lng: 43.356892, color: '#3498db', flag: 'https://flagcdn.com/w80/ge.png' },
  { name: "Germany", url: "https://iptv-org.github.io/iptv/countries/de.m3u", lat: 51.165691, lng: 10.451526, color: '#1a5276', flag: 'https://flagcdn.com/w80/de.png' },
  { name: "Ghana", url: "https://iptv-org.github.io/iptv/countries/gh.m3u", lat: 7.946527, lng: -1.023194, color: '#f1c40f', flag: 'https://flagcdn.com/w80/gh.png' },
  { name: "Greece", url: "https://iptv-org.github.io/iptv/countries/gr.m3u", lat: 39.074208, lng: 21.824312, color: '#2ecc71', flag: 'https://flagcdn.com/w80/gr.png' },
  { name: "Grenada", url: "https://iptv-org.github.io/iptv/countries/gd.m3u", lat: 12.262776, lng: -61.604171, color: '#e74c3c', flag: 'https://flagcdn.com/w80/gd.png' },
  { name: "Guatemala", url: "https://iptv-org.github.io/iptv/countries/gt.m3u", lat: 15.783471, lng: -90.230759, color: '#3498db', flag: 'https://flagcdn.com/w80/gt.png' },
  { name: "Guinea", url: "https://iptv-org.github.io/iptv/countries/gn.m3u", lat: 9.945587, lng: -9.696645, color: '#16a085', flag: 'https://flagcdn.com/w80/gn.png' },
  { name: "Guinea-Bissau", url: "https://iptv-org.github.io/iptv/countries/gw.m3u", lat: 11.803749, lng: -15.180413, color: '#f39c12', flag: 'https://flagcdn.com/w80/gw.png' },
  { name: "Guyana", url: "https://iptv-org.github.io/iptv/countries/gy.m3u", lat: 4.860416, lng: -58.93018, color: '#1a5276', flag: 'https://flagcdn.com/w80/gy.png' },
  { name: "Haiti", url: "https://iptv-org.github.io/iptv/countries/ht.m3u", lat: 18.971187, lng: -72.285215, color: '#e67e22', flag: 'https://flagcdn.com/w80/ht.png' },
  { name: "Honduras", url: "https://iptv-org.github.io/iptv/countries/hn.m3u", lat: 15.199999, lng: -86.241905, color: '#3498db', flag: 'https://flagcdn.com/w80/hn.png' },
  { name: "Hungary", url: "https://iptv-org.github.io/iptv/countries/hu.m3u", lat: 47.162494, lng: 19.503304, color: '#e74c3c', flag: 'https://flagcdn.com/w80/hu.png' },
  { name: "Iceland", url: "https://iptv-org.github.io/iptv/countries/is.m3u", lat: 64.963051, lng: -19.020835, color: '#2ecc71', flag: 'https://flagcdn.com/w80/is.png' },
  { name: "India", url: "https://iptv-org.github.io/iptv/countries/in.m3u", lat: 20.593684, lng: 78.96288, color: '#f39c12', flag: 'https://flagcdn.com/w80/in.png' },
  { name: "Indonesia", url: "https://iptv-org.github.io/iptv/countries/id.m3u", lat: -0.789275, lng: 113.921327, color: '#1a5276', flag: 'https://flagcdn.com/w80/id.png' },
  { name: "Iran", url: "https://iptv-org.github.io/iptv/countries/ir.m3u", lat: 32.427908, lng: 53.688046, color: '#e74c3c', flag: 'https://flagcdn.com/w80/ir.png' },
  { name: "Iraq", url: "https://iptv-org.github.io/iptv/countries/iq.m3u", lat: 33.223191, lng: 43.679291, color: '#3498db', flag: 'https://flagcdn.com/w80/iq.png' },
  { name: "Ireland", url: "https://iptv-org.github.io/iptv/countries/ie.m3u", lat: 53.41291, lng: -8.24389, color: '#27ae60', flag: 'https://flagcdn.com/w80/ie.png' },
  { name: "Israel", url: "https://iptv-org.github.io/iptv/countries/il.m3u", lat: 31.046051, lng: 34.851612, color: '#f1c40f', flag: 'https://flagcdn.com/w80/il.png' },
  { name: "Italy", url: "https://iptv-org.github.io/iptv/countries/it.m3u", lat: 41.87194, lng: 12.56738, color: '#2ecc71', flag: 'https://flagcdn.com/w80/it.png' },
  { name: "Jamaica", url: "https://iptv-org.github.io/iptv/countries/jm.m3u", lat: 18.109581, lng: -77.297508, color: '#e67e22', flag: 'https://flagcdn.com/w80/jm.png' },
  { name: "Japan", url: "https://iptv-org.github.io/iptv/countries/jp.m3u", lat: 36.204824, lng: 138.252924, color: '#e74c3c', flag: 'https://flagcdn.com/w80/jp.png' },
  { name: "Jordan", url: "https://iptv-org.github.io/iptv/countries/jo.m3u", lat: 30.585164, lng: 36.238414, color: '#3498db', flag: 'https://flagcdn.com/w80/jo.png' },
  { name: "Kazakhstan", url: "https://iptv-org.github.io/iptv/countries/kz.m3u", lat: 48.019573, lng: 66.923684, color: '#f39c12', flag: 'https://flagcdn.com/w80/kz.png' },
  { name: "Kenya", url: "https://iptv-org.github.io/iptv/countries/ke.m3u", lat: -0.023559, lng: 37.906193, color: '#1a5276', flag: 'https://flagcdn.com/w80/ke.png' },
  { name: "Kiribati", url: "https://iptv-org.github.io/iptv/countries/ki.m3u", lat: -3.370417, lng: -168.734039, color: '#16a085', flag: 'https://flagcdn.com/w80/ki.png' },
  { name: "Kuwait", url: "https://iptv-org.github.io/iptv/countries/kw.m3u", lat: 29.31166, lng: 47.481766, color: '#e74c3c', flag: 'https://flagcdn.com/w80/kw.png' },
  { name: "Kyrgyzstan", url: "https://iptv-org.github.io/iptv/countries/kg.m3u", lat: 41.20438, lng: 74.766098, color: '#3498db', flag: 'https://flagcdn.com/w80/kg.png' },
  { name: "Laos", url: "https://iptv-org.github.io/iptv/countries/la.m3u", lat: 19.85627, lng: 102.495496, color: '#2ecc71', flag: 'https://flagcdn.com/w80/la.png' },
  { name: "Latvia", url: "https://iptv-org.github.io/iptv/countries/lv.m3u", lat: 56.879635, lng: 24.603189, color: '#9b59b6', flag: 'https://flagcdn.com/w80/lv.png' },
  { name: "Lebanon", url: "https://iptv-org.github.io/iptv/countries/lb.m3u", lat: 33.854721, lng: 35.862285, color: '#f39c12', flag: 'https://flagcdn.com/w80/lb.png' },
  { name: "Lesotho", url: "https://iptv-org.github.io/iptv/countries/ls.m3u", lat: -29.609988, lng: 28.233608, color: '#1a5276', flag: 'https://flagcdn.com/w80/ls.png' },
  { name: "Liberia", url: "https://iptv-org.github.io/iptv/countries/lr.m3u", lat: 6.428055, lng: -9.429499, color: '#e74c3c', flag: 'https://flagcdn.com/w80/lr.png' },
  { name: "Libya", url: "https://iptv-org.github.io/iptv/countries/ly.m3u", lat: 26.3351, lng: 17.228331, color: '#3498db', flag: 'https://flagcdn.com/w80/ly.png' },
  { name: "Liechtenstein", url: "https://iptv-org.github.io/iptv/countries/li.m3u", lat: 47.166, lng: 9.555373, color: '#27ae60', flag: 'https://flagcdn.com/w80/li.png' },
  { name: "Lithuania", url: "https://iptv-org.github.io/iptv/countries/lt.m3u", lat: 55.169438, lng: 23.881275, color: '#f1c40f', flag: 'https://flagcdn.com/w80/lt.png' },
  { name: "Luxembourg", url: "https://iptv-org.github.io/iptv/countries/lu.m3u", lat: 49.815273, lng: 6.129583, color: '#2ecc71', flag: 'https://flagcdn.com/w80/lu.png' },
  { name: "Madagascar", url: "https://iptv-org.github.io/iptv/countries/mg.m3u", lat: -18.766947, lng: 46.869107, color: '#e67e22', flag: 'https://flagcdn.com/w80/mg.png' },
  { name: "Malawi", url: "https://iptv-org.github.io/iptv/countries/mw.m3u", lat: -13.254308, lng: 34.301525, color: '#3498db', flag: 'https://flagcdn.com/w80/mw.png' },
  { name: "Malaysia", url: "https://iptv-org.github.io/iptv/countries/my.m3u", lat: 4.210484, lng: 101.975766, color: '#e74c3c', flag: 'https://flagcdn.com/w80/my.png' },
  { name: "Maldives", url: "https://iptv-org.github.io/iptv/countries/mv.m3u", lat: 3.202778, lng: 73.22068, color: '#f39c12', flag: 'https://flagcdn.com/w80/mv.png' },
  { name: "Mali", url: "https://iptv-org.github.io/iptv/countries/ml.m3u", lat: 17.570692, lng: -3.996166, color: '#1a5276', flag: 'https://flagcdn.com/w80/ml.png' },
  { name: "Malta", url: "https://iptv-org.github.io/iptv/countries/mt.m3u", lat: 35.937496, lng: 14.375416, color: '#16a085', flag: 'https://flagcdn.com/w80/mt.png' },
  { name: "Mauritania", url: "https://iptv-org.github.io/iptv/countries/mr.m3u", lat: 21.00789, lng: -10.940835, color: '#3498db', flag: 'https://flagcdn.com/w80/mr.png' },
  { name: "Mauritius", url: "https://iptv-org.github.io/iptv/countries/mu.m3u", lat: -20.348404, lng: 57.552152, color: '#2ecc71', flag: 'https://flagcdn.com/w80/mu.png' },
  { name: "Mexico", url: "https://iptv-org.github.io/iptv/countries/mx.m3u", lat: 23.634501, lng: -102.552784, color: '#f39c12', flag: 'https://flagcdn.com/w80/mx.png' },
  { name: "Moldova", url: "https://iptv-org.github.io/iptv/countries/md.m3u", lat: 47.411631, lng: 28.369885, color: '#e74c3c', flag: 'https://flagcdn.com/w80/md.png' },
  { name: "Monaco", url: "https://iptv-org.github.io/iptv/countries/mc.m3u", lat: 43.750298, lng: 7.412841, color: '#3498db', flag: 'https://flagcdn.com/w80/mc.png' },
  { name: "Mongolia", url: "https://iptv-org.github.io/iptv/countries/mn.m3u", lat: 46.862496, lng: 103.846656, color: '#27ae60', flag: 'https://flagcdn.com/w80/mn.png' },
  { name: "Montenegro", url: "https://iptv-org.github.io/iptv/countries/me.m3u", lat: 42.708678, lng: 19.37439, color: '#f1c40f', flag: 'https://flagcdn.com/w80/me.png' },
  { name: "Morocco", url: "https://iptv-org.github.io/iptv/countries/ma.m3u", lat: 31.791702, lng: -7.09262, color: '#2ecc71', flag: 'https://flagcdn.com/w80/ma.png' },
  { name: "Mozambique", url: "https://iptv-org.github.io/iptv/countries/mz.m3u", lat: -18.665695, lng: 35.529562, color: '#e67e22', flag: 'https://flagcdn.com/w80/mz.png' },
  { name: "Myanmar", url: "https://iptv-org.github.io/iptv/countries/mm.m3u", lat: 21.916221, lng: 95.955974, color: '#3498db', flag: 'https://flagcdn.com/w80/mm.png' },
  { name: "Namibia", url: "https://iptv-org.github.io/iptv/countries/na.m3u", lat: -22.95764, lng: 18.49041, color: '#e74c3c', flag: 'https://flagcdn.com/w80/na.png' },
  { name: "Nepal", url: "https://iptv-org.github.io/iptv/countries/np.m3u", lat: 28.394857, lng: 84.124008, color: '#1a5276', flag: 'https://flagcdn.com/w80/np.png' },
  { name: "Netherlands", url: "https://iptv-org.github.io/iptv/countries/nl.m3u", lat: 52.132633, lng: 5.291266, color: '#16a085', flag: 'https://flagcdn.com/w80/nl.png' },
  { name: "New Zealand", url: "https://iptv-org.github.io/iptv/countries/nz.m3u", lat: -40.900557, lng: 174.885971, color: '#e74c3c', flag: 'https://flagcdn.com/w80/nz.png' },
  { name: "Nicaragua", url: "https://iptv-org.github.io/iptv/countries/ni.m3u", lat: 12.865416, lng: -85.207229, color: '#3498db', flag: 'https://flagcdn.com/w80/ni.png' },
  { name: "Niger", url: "https://iptv-org.github.io/iptv/countries/ne.m3u", lat: 17.607789, lng: 8.081666, color: '#2ecc71', flag: 'https://flagcdn.com/w80/ne.png' },
  { name: "Nigeria", url: "https://iptv-org.github.io/iptv/countries/ng.m3u", lat: 9.081999, lng: 8.675277, color: '#f39c12', flag: 'https://flagcdn.com/w80/ng.png' },
  { name: "North Korea", url: "https://iptv-org.github.io/iptv/countries/kp.m3u", lat: 40.339852, lng: 127.510093, color: '#1a5276', flag: 'https://flagcdn.com/w80/kp.png' },
  { name: "North Macedonia", url: "https://iptv-org.github.io/iptv/countries/mk.m3u", lat: 41.608635, lng: 21.745275, color: '#e74c3c', flag: 'https://flagcdn.com/w80/mk.png' },
  { name: "Norway", url: "https://iptv-org.github.io/iptv/countries/no.m3u", lat: 60.472024, lng: 8.468946, color: '#3498db', flag: 'https://flagcdn.com/w80/no.png' },
  { name: "Oman", url: "https://iptv-org.github.io/iptv/countries/om.m3u", lat: 21.512583, lng: 55.923255, color: '#27ae60', flag: 'https://flagcdn.com/w80/om.png' },
  { name: "Pakistan", url: "https://iptv-org.github.io/iptv/countries/pk.m3u", lat: 30.375321, lng: 69.345116, color: '#f1c40f', flag: 'https://flagcdn.com/w80/pk.png' },
  { name: "Panama", url: "https://iptv-org.github.io/iptv/countries/pa.m3u", lat: 8.537981, lng: -80.782127, color: '#e67e22', flag: 'https://flagcdn.com/w80/pa.png' },
  { name: "Papua New Guinea", url: "https://iptv-org.github.io/iptv/countries/pg.m3u", lat: -6.314993, lng: 143.95555, color: '#3498db', flag: 'https://flagcdn.com/w80/pg.png' },
  { name: "Paraguay", url: "https://iptv-org.github.io/iptv/countries/py.m3u", lat: -23.442503, lng: -58.443832, color: '#e74c3c', flag: 'https://flagcdn.com/w80/py.png' },
  { name: "Peru", url: "https://iptv-org.github.io/iptv/countries/pe.m3u", lat: -9.189967, lng: -75.015152, color: '#f39c12', flag: 'https://flagcdn.com/w80/pe.png' },
  { name: "Philippines", url: "https://iptv-org.github.io/iptv/countries/ph.m3u", lat: 12.879721, lng: 121.774017, color: '#1a5276', flag: 'https://flagcdn.com/w80/ph.png' },
  { name: "Poland", url: "https://iptv-org.github.io/iptv/countries/pl.m3u", lat: 51.919438, lng: 19.145136, color: '#16a085', flag: 'https://flagcdn.com/w80/pl.png' },
  { name: "Portugal", url: "https://iptv-org.github.io/iptv/countries/pt.m3u", lat: 39.399872, lng: -8.224454, color: '#e74c3c', flag: 'https://flagcdn.com/w80/pt.png' },
  { name: "Qatar", url: "https://iptv-org.github.io/iptv/countries/qa.m3u", lat: 25.354826, lng: 51.183884, color: '#3498db', flag: 'https://flagcdn.com/w80/qa.png' },
  { name: "Romania", url: "https://iptv-org.github.io/iptv/countries/ro.m3u", lat: 45.943161, lng: 24.96676, color: '#2ecc71', flag: 'https://flagcdn.com/w80/ro.png' },
  { name: "Russia", url: "https://iptv-org.github.io/iptv/countries/ru.m3u", lat: 61.52401, lng: 105.318756, color: '#f39c12', flag: 'https://flagcdn.com/w80/ru.png' },
  { name: "Rwanda", url: "https://iptv-org.github.io/iptv/countries/rw.m3u", lat: -1.940278, lng: 29.873888, color: '#1a5276', flag: 'https://flagcdn.com/w80/rw.png' },
  { name: "Saudi Arabia", url: "https://iptv-org.github.io/iptv/countries/sa.m3u", lat: 23.885942, lng: 45.079162, color: '#3498db', flag: 'https://flagcdn.com/w80/sa.png' },
  { name: "Senegal", url: "https://iptv-org.github.io/iptv/countries/sn.m3u", lat: 14.497401, lng: -14.452362, color: '#e74c3c', flag: 'https://flagcdn.com/w80/sn.png' },
  { name: "Serbia", url: "https://iptv-org.github.io/iptv/countries/rs.m3u", lat: 44.016521, lng: 21.005859, color: '#f39c12', flag: 'https://flagcdn.com/w80/rs.png' },
  { name: "Sierra Leone", url: "https://iptv-org.github.io/iptv/countries/sl.m3u", lat: 8.460555, lng: -11.779889, color: '#16a085', flag: 'https://flagcdn.com/w80/sl.png' },
  { name: "Singapore", url: "https://iptv-org.github.io/iptv/countries/sg.m3u", lat: 1.352083, lng: 103.819836, color: '#e74c3c', flag: 'https://flagcdn.com/w80/sg.png' },
  { name: "Slovakia", url: "https://iptv-org.github.io/iptv/countries/sk.m3u", lat: 48.669026, lng: 19.699024, color: '#3498db', flag: 'https://flagcdn.com/w80/sk.png' },
  { name: "Slovenia", url: "https://iptv-org.github.io/iptv/countries/si.m3u", lat: 46.151241, lng: 14.995463, color: '#2ecc71', flag: 'https://flagcdn.com/w80/si.png' },
  { name: "Somalia", url: "https://iptv-org.github.io/iptv/countries/so.m3u", lat: 5.152149, lng: 46.199616, color: '#e67e22', flag: 'https://flagcdn.com/w80/so.png' },
  { name: "South Africa", url: "https://iptv-org.github.io/iptv/countries/za.m3u", lat: -30.559482, lng: 22.937506, color: '#3498db', flag: 'https://flagcdn.com/w80/za.png' },
  { name: "South Korea", url: "https://iptv-org.github.io/iptv/countries/kr.m3u", lat: 35.907757, lng: 127.766922, color: '#e74c3c', flag: 'https://flagcdn.com/w80/kr.png' },
  { name: "South Sudan", url: "https://iptv-org.github.io/iptv/countries/ss.m3u", lat: 6.876991, lng: 31.306978, color: '#f39c12', flag: 'https://flagcdn.com/w80/ss.png' },
  { name: "Spain", url: "https://iptv-org.github.io/iptv/countries/es.m3u", lat: 40.463667, lng: -3.74922, color: '#1a5276', flag: 'https://flagcdn.com/w80/es.png' },
  { name: "Sri Lanka", url: "https://iptv-org.github.io/iptv/countries/lk.m3u", lat: 7.873054, lng: 80.771797, color: '#16a085', flag: 'https://flagcdn.com/w80/lk.png' },
  { name: "Sudan", url: "https://iptv-org.github.io/iptv/countries/sd.m3u", lat: 12.862807, lng: 30.217636, color: '#e74c3c', flag: 'https://flagcdn.com/w80/sd.png' },
  { name: "Suriname", url: "https://iptv-org.github.io/iptv/countries/sr.m3u", lat: 3.919305, lng: -56.027783, color: '#3498db', flag: 'https://flagcdn.com/w80/sr.png' },
  { name: "Sweden", url: "https://iptv-org.github.io/iptv/countries/se.m3u", lat: 60.128161, lng: 18.643501, color: '#f1c40f', flag: 'https://flagcdn.com/w80/se.png' },
  { name: "Switzerland", url: "https://iptv-org.github.io/iptv/countries/ch.m3u", lat: 46.818188, lng: 8.227512, color: '#e74c3c', flag: 'https://flagcdn.com/w80/ch.png' },
  { name: "Syria", url: "https://iptv-org.github.io/iptv/countries/sy.m3u", lat: 34.802075, lng: 38.996815, color: '#27ae60', flag: 'https://flagcdn.com/w80/sy.png' },
  { name: "Taiwan", url: "https://iptv-org.github.io/iptv/countries/tw.m3u", lat: 23.69781, lng: 120.960515, color: '#f39c12', flag: 'https://flagcdn.com/w80/tw.png' },
  { name: "Tajikistan", url: "https://iptv-org.github.io/iptv/countries/tj.m3u", lat: 38.861034, lng: 71.276093, color: '#1a5276', flag: 'https://flagcdn.com/w80/tj.png' },
  { name: "Tanzania", url: "https://iptv-org.github.io/iptv/countries/tz.m3u", lat: -6.369028, lng: 34.888822, color: '#e74c3c', flag: 'https://flagcdn.com/w80/tz.png' },
  { name: "Thailand", url: "https://iptv-org.github.io/iptv/countries/th.m3u", lat: 15.870032, lng: 100.992541, color: '#3498db', flag: 'https://flagcdn.com/w80/th.png' },
  { name: "Togo", url: "https://iptv-org.github.io/iptv/countries/tg.m3u", lat: 8.619543, lng: 0.824782, color: '#2ecc71', flag: 'https://flagcdn.com/w80/tg.png' },
  { name: "Trinidad and Tobago", url: "https://iptv-org.github.io/iptv/countries/tt.m3u", lat: 10.691803, lng: -61.222503, color: '#e67e22', flag: 'https://flagcdn.com/w80/tt.png' },
  { name: "Tunisia", url: "https://iptv-org.github.io/iptv/countries/tn.m3u", lat: 33.886917, lng: 9.537499, color: '#3498db', flag: 'https://flagcdn.com/w80/tn.png' },
  { name: "Turkey", url: "https://iptv-org.github.io/iptv/countries/tr.m3u", lat: 38.963745, lng: 35.243322, color: '#e74c3c', flag: 'https://flagcdn.com/w80/tr.png' },
  { name: "Turkmenistan", url: "https://iptv-org.github.io/iptv/countries/tm.m3u", lat: 38.969719, lng: 59.556278, color: '#f39c12', flag: 'https://flagcdn.com/w80/tm.png' },
  { name: "Uganda", url: "https://iptv-org.github.io/iptv/countries/ug.m3u", lat: 1.373333, lng: 32.290275, color: '#1a5276', flag: 'https://flagcdn.com/w80/ug.png' },
  { name: "Ukraine", url: "https://iptv-org.github.io/iptv/countries/ua.m3u", lat: 48.379433, lng: 31.16558, color: '#f1c40f', flag: 'https://flagcdn.com/w80/ua.png' },
  { name: "United Arab Emirates", url: "https://iptv-org.github.io/iptv/countries/ae.m3u", lat: 23.424076, lng: 53.847818, color: '#16a085', flag: 'https://flagcdn.com/w80/ae.png' },
  { name: "United Kingdom", url: "https://iptv-org.github.io/iptv/countries/uk.m3u", lat: 55.378051, lng: -3.435973, color: '#e74c3c', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: "United States", url: "https://iptv-org.github.io/iptv/countries/us.m3u", lat: 37.09024, lng: -95.712891, color: '#3498db', flag: 'https://flagcdn.com/w80/us.png' },
  { name: "Uruguay", url: "https://iptv-org.github.io/iptv/countries/uy.m3u", lat: -32.522779, lng: -55.765835, color: '#2ecc71', flag: 'https://flagcdn.com/w80/uy.png' },
  { name: "Uzbekistan", url: "https://iptv-org.github.io/iptv/countries/uz.m3u", lat: 41.377491, lng: 64.585262, color: '#e67e22', flag: 'https://flagcdn.com/w80/uz.png' },
  { name: "Vatican City", url: "https://iptv-org.github.io/iptv/countries/va.m3u", lat: 41.902916, lng: 12.453389, color: '#9b59b6', flag: 'https://flagcdn.com/w80/va.png' },
  { name: "Venezuela", url: "https://iptv-org.github.io/iptv/countries/ve.m3u", lat: 6.42375, lng: -66.58973, color: '#3498db', flag: 'https://flagcdn.com/w80/ve.png' },
  { name: "Vietnam", url: "https://iptv-org.github.io/iptv/countries/vn.m3u", lat: 14.058324, lng: 108.277199, color: '#e74c3c', flag: 'https://flagcdn.com/w80/vn.png' },
  { name: "Yemen", url: "https://iptv-org.github.io/iptv/countries/ye.m3u", lat: 15.552727, lng: 48.516388, color: '#f39c12', flag: 'https://flagcdn.com/w80/ye.png' },
  { name: "Zambia", url: "https://iptv-org.github.io/iptv/countries/zm.m3u", lat: -13.133897, lng: 27.849332, color: '#1a5276', flag: 'https://flagcdn.com/w80/zm.png' },
  { name: "Zimbabwe", url: "https://iptv-org.github.io/iptv/countries/zw.m3u", lat: -19.015438, lng: 29.154857, color: '#16a085', flag: 'https://flagcdn.com/w80/zw.png' },
];

export const getMarkerColor = (color: string): string => {
  return color || '#00ffcc';
};

export const getMarkerSize = (): number => {
  return 0.02;
};

// Categories list
export const CATEGORIES = [
  'All',
  'News',
  'Sports',
  'Entertainment',
  'Movies',
  'Music',
  'Kids',
  'Documentary',
  'Religious',
  'General',
] as const;

// Parse M3U playlist content with category extraction
// Validate URL to ensure it's a safe http/https URL
const isValidStreamUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Validate logo URL - must be http/https and from allowed image domains
const isValidLogoUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }
    // Basic check for image-like paths
    const path = parsed.pathname.toLowerCase();
    return path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || 
           path.endsWith('.gif') || path.endsWith('.webp') || path.endsWith('.svg') ||
           path.includes('logo') || path.includes('image');
  } catch {
    return false;
  }
};

// Sanitize text content - remove potential HTML/script injection
const sanitizeText = (text: string): string => {
  return text.replace(/<[^>]*>/g, '').substring(0, 200);
};

export const parseM3U = (content: string): Channel[] => {
  // Limit content size to prevent DoS
  const MAX_CONTENT_SIZE = 5 * 1024 * 1024; // 5MB
  if (content.length > MAX_CONTENT_SIZE) {
    console.warn('M3U content exceeds maximum size limit');
    content = content.substring(0, MAX_CONTENT_SIZE);
  }

  const lines = content.split('\n');
  const channels: Channel[] = [];
  let currentName = '';
  let currentCategory = 'General';
  let currentLogo = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('#EXTINF:')) {
      const nameMatch = line.match(/,(.+)$/);
      currentName = nameMatch ? sanitizeText(nameMatch[1].trim()) : 'Unknown Channel';
      
      // Extract category from group-title
      const categoryMatch = line.match(/group-title="([^"]+)"/);
      if (categoryMatch) {
        const cats = categoryMatch[1].split(';');
        currentCategory = sanitizeText(cats[0] || 'General');
      }
      
      // Extract and validate logo
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const logoUrl = logoMatch ? logoMatch[1] : '';
      currentLogo = isValidLogoUrl(logoUrl) ? logoUrl : '';
    } else if (line && !line.startsWith('#') && currentName) {
      // Only add channels with valid stream URLs
      if (isValidStreamUrl(line)) {
        channels.push({
          name: currentName,
          url: line,
          liveViews: Math.floor(Math.random() * 90 + 10) * 1000,
          category: currentCategory,
          logo: currentLogo,
        });
      }
      currentName = '';
      currentCategory = 'General';
      currentLogo = '';
    }
  }

  return channels;
};
