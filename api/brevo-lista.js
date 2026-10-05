// Vercel Function: adiciona o contato a uma lista do Brevo (conta Quattro Company).
// A chave BREVO_API_KEY fica só no servidor (Vercel > Settings > Environment Variables).
// Nunca expor a chave no front-end.

import { htmlConfirmacao } from './_lib/email-confirmacao.js';

// Remetente já verificado no Brevo (o mesmo da Quattro Inc)
const REMETENTE = { name: 'Quattro Construtora', email: 'mailing@quattroinc.com.br' };

const LISTAS = {
  newsletter: 19, // Newsletter Quattro Construtora
  contato: 20, // Contato Quattro Construtora
  trabalhe_conosco: 21, // Trabalhe Conosco Quattro Construtora
  outras: 22, // Outras Interações Quattro Construtora
};

// Assunto do formulário de contato -> lista
const ASSUNTO_PARA_LISTA = {
  orcamento: 'contato',
  geral: 'contato',
  trabalhe_conosco: 'trabalhe_conosco',
  vizinho_obra: 'outras',
  fornecedor: 'outras',
  imprensa: 'outras',
};

const ORIGENS_PERMITIDAS = [
  'https://quattroconstrutora.com.br',
  'https://www.quattroconstrutora.com.br',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cut(v, n) {
  return String(v ?? '').trim().slice(0, n);
}

function origemOk(req) {
  const origin = req.headers.origin || '';
  if (!origin) return true; // chamadas sem Origin (ex.: teste local via curl)
  if (ORIGENS_PERMITIDAS.includes(origin)) return true;
  // previews da Vercel e desenvolvimento local
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, erro: 'metodo' });
  }
  if (!origemOk(req)) return res.status(403).json({ ok: false, erro: 'origem' });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, erro: 'nao_configurado' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Robôs preenchem o campo escondido: finge sucesso e não grava nada
  if (body.website) return res.status(200).json({ ok: true });

  const lista = body.tipo === 'contato'
    ? ASSUNTO_PARA_LISTA[body.assunto] || 'contato'
    : body.tipo;
  const listId = LISTAS[lista];
  if (!listId) return res.status(400).json({ ok: false, erro: 'lista' });

  const email = cut(body.email, 160).toLowerCase();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, erro: 'email' });
  if (body.consentimento !== true) return res.status(400).json({ ok: false, erro: 'consentimento' });

  const nome = cut(body.nome, 120);
  const [primeiro, ...resto] = nome.split(/\s+/).filter(Boolean);
  const attributes = {};
  if (primeiro) attributes.FIRSTNAME = primeiro;
  if (resto.length) attributes.LASTNAME = resto.join(' ');

  const headers = { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' };

  // Já estava nesta lista? Então não reenviamos a confirmação (evita usar o formulário para
  // disparar e-mails repetidos para outra pessoa).
  let jaNaLista = false;
  try {
    const g = await fetch('https://api.brevo.com/v3/contacts/' + encodeURIComponent(email), { headers });
    if (g.ok) jaNaLista = ((await g.json()).listIds || []).includes(listId);
  } catch { /* segue: no pior caso reenviamos uma vez */ }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, attributes, listIds: [listId], updateEnabled: true }),
    });
    // 201 = criado, 204 = atualizado (já existia)
    if (r.status === 201 || r.status === 204) {
      if (lista === 'newsletter' && !jaNaLista) {
        try {
          const m = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              sender: REMETENTE,
              to: [{ email }],
              subject: 'Inscrição confirmada | Quattro Construtora',
              htmlContent: await htmlConfirmacao(),
            }),
          });
          if (!m.ok) console.error('Brevo recusou o e-mail de confirmação', m.status, (await m.text()).slice(0, 300));
        } catch (e) {
          console.error('Falha ao enviar o e-mail de confirmação', e);
        }
      }
      return res.status(200).json({ ok: true });
    }
    const txt = await r.text();
    console.error('Brevo recusou o contato', r.status, txt.slice(0, 300));
    return res.status(502).json({ ok: false, erro: 'brevo' });
  } catch (e) {
    console.error('Falha ao chamar o Brevo', e);
    return res.status(502).json({ ok: false, erro: 'rede' });
  }
}
