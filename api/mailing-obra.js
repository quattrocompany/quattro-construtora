// Imagem de capa de uma obra em destaque, reduzida para e-mail (500x320, JPEG leve).
// /api/mailing-obra?pos=1 .. 3  -> usa a obra na posição indicada.
import sharp from 'sharp';
import { obrasDestaque } from './_lib/obras.js';

const W = 500;
const H = 320;

async function placeholder() {
  return sharp({ create: { width: W, height: H, channels: 3, background: '#18181b' } })
    .jpeg({ quality: 80 })
    .toBuffer();
}

export default async function handler(req, res) {
  const pos = Math.min(Math.max(parseInt(req.query.pos, 10) || 1, 1), 3);
  let buf;
  try {
    const obra = (await obrasDestaque(3))[pos - 1];
    if (!obra) throw new Error('sem obra');
    const r = await fetch(obra.capa, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error('imagem ' + r.status);
    const origem = Buffer.from(await r.arrayBuffer());
    buf = await sharp(origem)
      .rotate()
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .flatten({ background: '#18181b' })
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch (e) {
    console.error('mailing-obra', e?.message || e);
    buf = await placeholder();
  }
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  res.status(200).send(buf);
}
