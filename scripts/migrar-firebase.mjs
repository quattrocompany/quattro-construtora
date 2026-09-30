// scripts/migrar-firebase.mjs
// Copia o conteúdo do projeto Firebase ANTIGO para o NOVO ("Site Quattro Construtora"):
//   - Firestore: coleções site_data e leads
//   - Storage: pasta uploads/ (e reescreve as URLs das imagens dentro dos documentos)
// NÃO apaga nada no projeto antigo.
//
// Preparação (uma vez):
//   1) npm install --no-save firebase-admin
//   2) Em cada projeto: Console > Configurações do projeto > Contas de serviço > "Gerar nova chave privada"
//      Salve como ./antigo.json e ./novo.json (já ignorados pelo git — NUNCA envie para o GitHub).
//   3) Crie no projeto novo: Firestore Database e Storage (mesma região de preferência).
// Uso:
//   node scripts/migrar-firebase.mjs --dry     (só mostra o que seria copiado)
//   node scripts/migrar-firebase.mjs           (copia de verdade)
import fs from 'node:fs';
import crypto from 'node:crypto';
import admin from 'firebase-admin';

const DRY = process.argv.includes('--dry');
const COLECOES = ['site_data', 'leads'];
const PASTA = 'uploads/';

const load = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const oldKey = load('./antigo.json');
const newKey = load('./novo.json');
const oldApp = admin.initializeApp({ credential: admin.credential.cert(oldKey), storageBucket: process.env.BUCKET_ANTIGO || `${oldKey.project_id}.firebasestorage.app` }, 'antigo');
const newApp = admin.initializeApp({ credential: admin.credential.cert(newKey), storageBucket: process.env.BUCKET_NOVO || `${newKey.project_id}.firebasestorage.app` }, 'novo');

const oldDb = oldApp.firestore(); const newDb = newApp.firestore();
const oldBucket = oldApp.storage().bucket(); const newBucket = newApp.storage().bucket();

console.log(`Antigo: ${oldKey.project_id} (${oldBucket.name})  ->  Novo: ${newKey.project_id} (${newBucket.name})  ${DRY ? '[SIMULAÇÃO]' : ''}`);

// 1) Storage
const urlMap = new Map(); // caminho codificado -> nova URL
const [files] = await oldBucket.getFiles({ prefix: PASTA });
console.log(`Storage: ${files.length} arquivo(s) em ${PASTA}`);
for (const f of files) {
  if (f.name.endsWith('/')) continue;
  const token = crypto.randomUUID();
  const enc = encodeURIComponent(f.name);
  urlMap.set(enc, `https://firebasestorage.googleapis.com/v0/b/${newBucket.name}/o/${enc}?alt=media&token=${token}`);
  if (DRY) { console.log('  [simulação]', f.name); continue; }
  const [buf] = await f.download();
  await newBucket.file(f.name).save(buf, { contentType: f.metadata.contentType, metadata: { metadata: { firebaseStorageDownloadTokens: token } } });
  console.log('  copiado', f.name);
}

// troca URLs do bucket antigo por URLs do novo dentro de qualquer valor do documento
const reURL = new RegExp(`https://firebasestorage\\.googleapis\\.com/v0/b/${oldBucket.name.replace(/\./g, '\\.')}/o/([^?"\\s]+)[^"\\s]*`, 'g');
const fix = (v) => {
  if (typeof v === 'string') return v.replace(reURL, (m, enc) => urlMap.get(enc) || m);
  if (Array.isArray(v)) return v.map(fix);
  if (v && typeof v === 'object' && v.constructor === Object) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fix(x)]));
  return v; // Timestamps etc. passam como estão
};

// 2) Firestore
for (const col of COLECOES) {
  const snap = await oldDb.collection(col).get();
  console.log(`Firestore ${col}: ${snap.size} documento(s)`);
  for (const d of snap.docs) {
    if (DRY) { console.log('  [simulação]', `${col}/${d.id}`); continue; }
    await newDb.collection(col).doc(d.id).set(fix(d.data()));
    console.log('  copiado', `${col}/${d.id}`);
  }
}
console.log(DRY ? 'Simulação concluída.' : 'Migração concluída. Confira o site no projeto novo ANTES de apagar qualquer coisa no antigo.');
