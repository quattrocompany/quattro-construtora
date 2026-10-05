// Lê as "Obras em Destaque" do Firestore (documento site_data/portfolio, campo "obras"),
// o mesmo que a página Setores & Obras mostra. Se o Firestore não responder ou vier vazio,
// devolve [] e o e-mail mostra só o botão do portfólio.

import { SITE } from './site.js';

function valor(v) {
  if (!v || typeof v !== 'object') return undefined;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(valor);
  if ('mapValue' in v) {
    const o = {};
    for (const [k, x] of Object.entries(v.mapValue.fields || {})) o[k] = valor(x);
    return o;
  }
  return undefined;
}

export function urlAbsoluta(u) {
  const s = String(u || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  return SITE + (s.startsWith('/') ? s : '/' + s);
}

export async function obrasDestaque(max = 3) {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = process.env.VITE_FIREBASE_API_KEY;
  if (!projectId) return [];
  try {
    const url =
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/site_data/portfolio` +
      (apiKey ? `?key=${apiKey}` : '');
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!r.ok) return [];
    const doc = await r.json();
    const obras = valor({ mapValue: { fields: doc.fields || {} } })?.obras;
    if (!Array.isArray(obras)) return [];
    return obras
      .filter((o) => o && o.title && o.capaImage && o.destaque !== false)
      .slice(0, max)
      .map((o) => ({
        titulo: String(o.title),
        categoria: String(o.categoriaLabel || o.categoriaSlug || ''),
        local: String(o.local || ''),
        capa: urlAbsoluta(o.capaImage),
      }));
  } catch (e) {
    console.error('Falha ao ler obras do Firestore', e);
    return [];
  }
}
