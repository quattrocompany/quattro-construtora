// src/pages/Admin.tsx
// Painel de conteúdo da Quattro Construtora.
// Acesso por Firebase Authentication (e-mail + senha). A proteção real dos dados
// está em firestore.rules e storage.rules (veja SEGURANCA.md) — a tela de login
// sozinha não protege nada, por isso nenhuma senha existe neste arquivo.
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Home as HomeIcon, Users, Layers, Wrench, Phone, BookOpen, LogOut, Loader2, X, Plus,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Bold, Italic, Underline,
  List, ListOrdered, Link2, ImagePlus, Heading2, Heading3, AlignLeft, AlignCenter, Code2, Eraser,
} from 'lucide-react';
import { auth, db, storage } from '../firebase';
import { sanitizeHtml, isSafeUrl } from '../utils/sanitizeHtml';
import { SETORES_PADRAO, OBRAS_PADRAO } from '../data/portfolioDefaults';
import { blogPosts as BLOG_PADRAO } from '../data/blogPosts';
import { FAQS_PADRAO, CATEGORIAS_FAQ } from '../lib/faq';
import { DEFAULT_HOME, DEFAULT_QUEM, DEFAULT_SERVICOS, DEFAULT_CONTATO_INFO, type Slide } from '../data/siteDefaults';

// Se o usuário digitar só "marketing", completa com este domínio.
const LOGIN_DOMAIN = 'quattroconstrutora.com.br';
const LOGO_SRC = '/logo/logo_quattro-construtora.svg';

// ============================================================
//  ESTILOS
// ============================================================
const ADMIN_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.adm {
  --bg: #f4f4f1; --surface: #ffffff; --surface-2: #faf9f7;
  --line: #e6e5e0; --line-strong: #d3d2cb;
  --ink: #171717; --ink-2: #3f3f3b; --muted: #6f6e68; --faint: #9c9b94;
  --brand: #f59e0b; --brand-soft: #fff4dc;
  --danger: #b42318; --danger-soft: #fdecea;
  --side: #141414; --side-line: #262626; --side-ink: #e9e9e6; --side-muted: #8c8c86;
  display: grid; grid-template-columns: 240px minmax(0, 1fr); min-height: 100vh;
  background: var(--bg); color: var(--ink); font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; text-align: left;
  position: relative; z-index: 200;
}
.adm *, .adm *::before, .adm *::after { box-sizing: border-box; }
.adm h1, .adm h2, .adm h3, .adm h4, .adm p { margin: 0; }
.adm button, .adm input, .adm select, .adm textarea { font-family: inherit; }

/* ---------- Barra lateral ---------- */
.adm-side { background: var(--side); color: var(--side-ink); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; width: 240px; height: 100vh; padding: 22px 14px 16px; z-index: 5; }
.adm-brand { padding: 2px 10px 22px; text-align: center; }
.adm-brand img { display: block; width: 132px; height: auto; margin: 0 auto; }
.adm-brand span { display: block; margin-top: 11px; font-size: 12px; color: var(--side-muted); }
.adm-nav { display: flex; flex-direction: column; gap: 2px; overflow-y: auto; min-height: 0; }
.adm-sub { display: flex; flex-direction: column; margin: 2px 0 8px 18px; padding-left: 10px; border-left: 1px solid var(--side-line); }
.adm-nav .adm-sub button { padding: 5px 10px; font-size: 12.5px; color: #8f8f89; border-radius: 6px; }
.adm-nav .adm-sub button.on { background: transparent; color: #fff; font-weight: 600; }
.adm-nav .adm-sub button.on::before { left: -11px; top: 7px; bottom: 7px; width: 2px; border-radius: 2px; }
@media (min-width: 861px) { .adm-jump { display: none; } }
.adm-nav button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 10px; border: 0; border-radius: 7px; background: transparent; color: #b9b9b3; font-size: 13.5px; font-weight: 500; text-align: left; cursor: pointer; position: relative; }
.adm-nav button:hover { background: #1e1e1e; color: #fff; }
.adm-nav button.on { background: #202020; color: #fff; }
.adm-nav button.on::before { content: ''; position: absolute; left: -14px; top: 8px; bottom: 8px; width: 3px; border-radius: 0 3px 3px 0; background: var(--brand); }
.adm-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--brand); margin-left: auto; flex: none; }
.adm-side-foot { margin-top: auto; border-top: 1px solid var(--side-line); padding: 14px 10px 0; display: flex; flex-direction: column; gap: 10px; }
.adm-side-foot small { font-size: 12px; color: var(--side-muted); word-break: break-all; }
.adm-logout { display: inline-flex; align-items: center; gap: 8px; border: 0; background: none; color: #c9c9c3; font-size: 13px; cursor: pointer; padding: 0; }
.adm-logout:hover { color: #fff; }

/* ---------- Conteúdo ---------- */
.adm-main { padding: 34px 44px 40px; max-width: 1080px; width: 100%; grid-column: 2; }
.adm-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
.adm-head h1 { font-size: 22px; font-weight: 650; letter-spacing: -.01em; }
.adm-head p { color: var(--muted); margin-top: 3px; font-size: 13.5px; }
.adm-picker { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
.adm-picker > label { font-size: 12.5px; font-weight: 600; color: var(--ink-2); white-space: nowrap; }
.adm-picker .inp { flex: 1; min-width: 220px; max-width: 520px; }
.adm-jump { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
.adm-jump button { border: 1px solid var(--line-strong); background: var(--surface); color: var(--ink-2); border-radius: 999px; padding: 4px 12px; font-size: 12.5px; cursor: pointer; }
.adm-jump button:hover { border-color: var(--ink); color: var(--ink); }

/* ---------- Cartões ---------- */
.card { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; margin-bottom: 16px; scroll-margin-top: 16px; }
.card-h { padding: 16px 20px 0; }
.card-h h2 { font-size: 15px; font-weight: 650; }
.card-h p { color: var(--muted); font-size: 13px; margin-top: 2px; }
.card-b { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 16px; }
.g2, .g3, .g4 { display: grid; gap: 14px 16px; }
.g2 { grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); }
.g3 { grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); }
.g4 { grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr)); }
.row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.grow { flex: 1; min-width: 0; }

/* ---------- Campos ---------- */
.fld { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.fld-l { font-size: 12.5px; font-weight: 550; color: var(--ink-2); }
.fld-h { font-size: 12px; color: var(--faint); }
.inp { width: 100%; height: 36px; padding: 0 10px; background: #fff; border: 1px solid var(--line-strong); border-radius: 7px; color: var(--ink); font: inherit; font-size: 13.5px; outline: none; transition: border-color .12s, box-shadow .12s; }
textarea.inp { height: auto; min-height: 84px; padding: 8px 10px; resize: vertical; line-height: 1.5; }
select.inp { padding-right: 28px; }
.inp::placeholder { color: #b0afa8; }
.inp:hover { border-color: #b9b8b0; }
.inp:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(245,158,11,.28); }
.inp.mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
.inp.sm { height: 32px; font-size: 13px; }
.inp.err { border-color: var(--danger); }
.chk { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; font-size: 13.5px; font-weight: 500; }
.chk input { width: 16px; height: 16px; accent-color: var(--ink); cursor: pointer; }

/* ---------- Botões ---------- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 36px; padding: 0 14px; border-radius: 7px; border: 1px solid var(--line-strong); background: #fff; color: var(--ink); font-size: 13.5px; font-weight: 550; cursor: pointer; white-space: nowrap; transition: background .12s, border-color .12s; text-decoration: none; }
.btn:hover:not(:disabled) { background: #f3f2ee; border-color: #b9b8b0; }
.btn:disabled { opacity: .55; cursor: not-allowed; }
.btn.sm { height: 30px; padding: 0 10px; font-size: 12.5px; }
.btn.primary { background: var(--ink); border-color: var(--ink); color: #fff; }
.btn.primary:hover:not(:disabled) { background: #2b2b2b; border-color: #2b2b2b; }
.btn.danger { color: var(--danger); border-color: #e5b9b4; background: #fff; }
.btn.danger:hover:not(:disabled) { background: var(--danger-soft); border-color: var(--danger); }
.btn.danger.solid { background: var(--danger); border-color: var(--danger); color: #fff; }
.btn.danger.solid:hover:not(:disabled) { background: #8f1c12; }
.btn.add { width: 100%; border-style: dashed; color: var(--ink-2); background: transparent; }
.btn.add:hover:not(:disabled) { background: #fff; border-color: var(--ink); }
.icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 0; border-radius: 6px; background: transparent; color: var(--muted); cursor: pointer; flex: none; }
.icon-btn:hover:not(:disabled) { background: #efeee9; color: var(--ink); }
.icon-btn.del:hover:not(:disabled) { background: var(--danger-soft); color: var(--danger); }
.icon-btn:disabled { opacity: .35; cursor: default; }
.spin { animation: adm-spin .9s linear infinite; }
@keyframes adm-spin { to { transform: rotate(360deg); } }

/* ---------- Itens repetíveis ---------- */
.item { border: 1px solid var(--line); border-radius: 9px; background: var(--surface-2); }
.item-h { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 8px 8px 14px; border-bottom: 1px solid var(--line); }
.item-h b { font-size: 13px; font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.item-h .acts { display: flex; align-items: center; gap: 2px; flex: none; }
.item-b { padding: 14px; display: flex; flex-direction: column; gap: 14px; }
.sub { font-size: 12.5px; font-weight: 600; color: var(--ink-2); padding-top: 4px; }
.note { font-size: 12.5px; color: var(--muted); }
.note code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--ink-2); background: #efeee9; padding: 1px 6px; border-radius: 4px; }
.list-line { display: flex; gap: 8px; align-items: center; }

/* ---------- Campo de imagem ---------- */
.img-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(380px, 100%), 1fr)); gap: 12px; }
.img-field { display: flex; gap: 14px; padding: 12px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 9px; min-width: 0; }
.checker { background: repeating-conic-gradient(#dcdbd6 0% 25%, #cbcac4 0% 50%) 50% / 14px 14px; }
.img-thumb { flex: 0 0 84px; height: 84px; border-radius: 7px; border: 1px solid var(--line-strong); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.img-thumb img, .img-thumb video { max-width: 100%; max-height: 100%; object-fit: contain; }
.img-thumb span { font-size: 11px; color: #77766f; background: rgba(255,255,255,.75); padding: 1px 6px; border-radius: 4px; }
.img-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 7px; }
.img-label { font-size: 13px; font-weight: 600; }
.img-hint { font-size: 12px; color: var(--faint); margin-top: -4px; }
.img-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
.img-name { font-size: 12px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }

/* ---------- Galeria ---------- */
.gal { display: flex; flex-direction: column; gap: 10px; }
.gal-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.gal-head b { font-size: 13px; font-weight: 600; margin-right: auto; }
.gal-drop { border: 1.5px dashed var(--line-strong); border-radius: 9px; padding: 16px; text-align: center; color: var(--muted); font-size: 13px; background: var(--surface); transition: border-color .12s, background .12s; }
.gal-drop.over { border-color: var(--brand); background: var(--brand-soft); }
.gal-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 10px; }
.gal-it { border: 1px solid var(--line); border-radius: 9px; background: var(--surface); overflow: hidden; display: flex; flex-direction: column; }
.gal-it .ph { aspect-ratio: 4/3; }
.gal-it .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gal-it .ft { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
.gal-it .acts { display: flex; align-items: center; justify-content: space-between; }

/* ---------- Barra de salvar ---------- */
.savebar { position: sticky; bottom: 0; z-index: 20; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 8px -44px -40px; padding: 12px 44px; background: rgba(255,255,255,.94); backdrop-filter: blur(8px); border-top: 1px solid var(--line-strong); }
.savebar .where { margin-right: auto; font-size: 13px; color: var(--muted); min-width: 0; }
.savebar .where b { color: var(--ink); font-weight: 600; }
.savebar .where .dirty { color: #9a5b00; font-weight: 600; }

/* ---------- Toast e modal ---------- */
.toast { position: fixed; top: 18px; right: 18px; z-index: 3000; max-width: 380px; display: flex; gap: 10px; align-items: flex-start; padding: 12px 14px; border-radius: 9px; font-size: 13.5px; background: #171717; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,.25); animation: adm-in .18s ease-out; }
.toast.err { background: var(--danger); }
.toast.ok::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #4ade80; margin-top: 7px; flex: none; }
.toast button { background: none; border: 0; color: inherit; opacity: .7; cursor: pointer; padding: 0; margin-left: 4px; }
@keyframes adm-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.overlay { position: fixed; inset: 0; background: rgba(15,15,15,.55); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 16px; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 440px; padding: 22px; box-shadow: 0 20px 60px rgba(0,0,0,.3); display: flex; flex-direction: column; gap: 14px; max-height: 90vh; overflow: auto; }
.modal h3 { font-size: 16px; font-weight: 650; }
.modal p { color: var(--ink-2); font-size: 13.5px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

/* ---------- Login ---------- */
.login { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 20px; }
.login-card { width: 100%; max-width: 380px; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 30px; display: flex; flex-direction: column; gap: 16px; }
.login-card img { width: 190px; height: auto; display: block; }
.login-card p.sub2 { color: var(--muted); margin-top: -4px; font-size: 13px; }
.login-err { color: var(--danger); font-size: 13px; background: var(--danger-soft); padding: 8px 10px; border-radius: 7px; }
.adm-loading { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f4f4f1; color: #6f6e68; font-family: 'Inter', system-ui, sans-serif; gap: 10px; position: relative; z-index: 200; }
.adm-fail { max-width: 460px; margin: 18vh auto 0; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 26px; display: flex; flex-direction: column; gap: 12px; }

/* ---------- Editor do blog ---------- */
.rte { border: 1px solid var(--line-strong); border-radius: 8px; overflow: hidden; background: #fff; }
.rte-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; padding: 6px; background: #f4f4f1; border-bottom: 1px solid var(--line-strong); }
.rte-bar .sep { width: 1px; height: 20px; background: var(--line-strong); margin: 0 4px; }
.rte-bar button, .rte-bar label.tb { display: inline-flex; align-items: center; justify-content: center; min-width: 30px; height: 30px; padding: 0 6px; border: 0; border-radius: 6px; background: transparent; color: var(--ink-2); cursor: pointer; font-size: 12px; font-weight: 600; gap: 4px; }
.rte-bar button:hover, .rte-bar label.tb:hover { background: #e4e3de; }
.rte-bar button.on { background: var(--ink); color: #fff; }
.rte-link { display: flex; gap: 8px; padding: 8px; border-bottom: 1px solid var(--line); background: var(--surface-2); }
.rte-area { min-height: 380px; max-height: 620px; overflow: auto; padding: 18px 20px; outline: none; font-size: 15px; line-height: 1.7; color: #222; }
.rte-area h2 { font-size: 22px; font-weight: 700; margin: 18px 0 8px; }
.rte-area h3 { font-size: 18px; font-weight: 700; margin: 16px 0 6px; }
.rte-area p { margin: 0 0 12px; }
.rte-area ul, .rte-area ol { margin: 0 0 12px; padding-left: 24px; }
.rte-area ul { list-style: disc; } .rte-area ol { list-style: decimal; }
.rte-area blockquote { border-left: 3px solid var(--brand); margin: 0 0 12px; padding: 2px 0 2px 14px; color: #555; }
.rte-area a { color: #b45309; text-decoration: underline; }
.rte-area img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
.rte-src { width: 100%; min-height: 380px; border: 0; outline: none; padding: 14px 16px; font: 12.5px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; resize: vertical; display: block; }

/* ---------- Mobile ---------- */
@media (max-width: 860px) {
  .adm { grid-template-columns: minmax(0, 1fr); }
  .adm-main { min-width: 0; overflow-x: hidden; }
  .adm-main { grid-column: auto; }
  .adm-side { position: static; width: auto; height: auto; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 8px 14px; padding: 12px 14px; }
  .adm-brand { padding: 0; }
  .adm-brand span { display: none; }
  .adm-brand img { width: 84px; }
  .adm-sub { display: none; }
  .adm-nav { flex-direction: row; order: 3; width: 100%; overflow-x: auto; }
  .adm-nav button { width: auto; white-space: nowrap; }
  .adm-nav button.on::before { display: none; }
  .adm-side-foot { margin: 0 0 0 auto; border: 0; padding: 0; flex-direction: row; align-items: center; }
  .adm-side-foot small { display: none; }
  .adm-main { padding: 20px 14px 32px; }
  .savebar { margin: 8px -14px -32px; padding: 10px 14px; }
  .img-grid { grid-template-columns: 1fr; }
  .img-field { flex-direction: column; }
  .img-thumb { flex-basis: auto; width: 100%; height: 110px; }
}
`;

// ============================================================
//  TIPOS, PADRÕES E HELPERS
// ============================================================
type Img = { url: string; alt: string };
type Setor = { id: string; slug: string; title: string; desc: string; nbrs: string[]; diferenciais: string[]; imagens: Img[]; [k: string]: any };
type Obra = {
  id: number; slug: string; title: string; categoriaSlug: string; categoriaLabel: string; local: string; area: string; status: string;
  client: string; year: string; destaque: boolean; capaImage: string; galeriaImages: Img[]; especificacoes: { label: string; value: string }[];
  resumo: string; descricaoCompleta: string; [k: string]: any;
};
type Post = { id: number; title: string; author: string; date: string; capaImage: string; content: string; slug: string; excerpt: string; published: boolean; [k: string]: any };
type TabId = 'home' | 'quemSomos' | 'setores' | 'servicos' | 'contato' | 'blog';

// Os padrões (= o que já está no ar) ficam em src/data/siteDefaults.ts, compartilhados com o site.
const DEFAULT_CONTATO = {
  ...DEFAULT_CONTATO_INFO,
  // Mesmas perguntas que já estão no ar (src/lib/faq.ts), até alguém publicar a aba Contato.
  faqs: FAQS_PADRAO.map((f, i) => ({ id: i + 1, ...f })) as { id: number; pergunta: string; resposta: string; categoria: string; destaque: boolean }[],
};

const newId = () => Date.now() + Math.floor(Math.random() * 1000);
const errMsg = (err: any) => (err && (err.message || String(err))) || 'erro desconhecido';
const isObj = (v: any) => v !== null && typeof v === 'object' && !Array.isArray(v);

const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Mescla o que veio do Firestore sobre o padrão: campos que faltam ganham o valor padrão (nunca quebra a tela). */
function mergeDeep<T>(base: T, extra: any): T {
  if (!isObj(base) || !isObj(extra)) return (extra === undefined || extra === null ? base : extra) as T;
  const out: any = { ...extra };
  for (const k of Object.keys(base as any)) {
    const b = (base as any)[k]; const e = extra[k];
    if (isObj(b)) out[k] = mergeDeep(b, e);
    else if (Array.isArray(b)) out[k] = Array.isArray(e) ? e : b;
    else out[k] = e === undefined || e === null || typeof e !== typeof b ? b : e;
  }
  return out;
}

const normImgs = (list: any): Img[] =>
  (Array.isArray(list) ? list : []).map((x) => (typeof x === 'string' ? { url: x, alt: '' } : { url: String(x?.url || ''), alt: String(x?.alt || '') })).filter((x) => x.url);
const strList = (l: any): string[] => (Array.isArray(l) ? l.map((x) => String(x)) : []);

const normSetor = (s: any): Setor => ({ ...s, id: String(s?.id ?? ''), slug: String(s?.slug ?? ''), title: String(s?.title ?? ''), desc: String(s?.desc ?? ''), nbrs: strList(s?.nbrs), diferenciais: strList(s?.diferenciais), imagens: normImgs(s?.imagens) });
const normObra = (o: any): Obra => ({
  ...o, id: Number(o?.id) || newId(), slug: String(o?.slug ?? ''), title: String(o?.title ?? ''), categoriaSlug: String(o?.categoriaSlug ?? ''),
  categoriaLabel: String(o?.categoriaLabel ?? ''), local: String(o?.local ?? ''), area: String(o?.area ?? ''), status: String(o?.status ?? 'Concluído'),
  client: String(o?.client ?? ''), year: String(o?.year ?? ''), destaque: !!o?.destaque, capaImage: String(o?.capaImage ?? ''),
  galeriaImages: normImgs(o?.galeriaImages),
  especificacoes: (Array.isArray(o?.especificacoes) ? o.especificacoes : []).map((e: any) => ({ label: String(e?.label ?? ''), value: String(e?.value ?? '') })),
  resumo: String(o?.resumo ?? ''), descricaoCompleta: String(o?.descricaoCompleta ?? ''),
});
const normPost = (p: any): Post => ({ ...p, id: Number(p?.id) || newId(), title: String(p?.title ?? ''), author: String(p?.author ?? ''), date: String(p?.date ?? ''), capaImage: String(p?.capaImage ?? ''), content: String(p?.content ?? ''), slug: String(p?.slug ?? ''), excerpt: String(p?.excerpt ?? ''), published: p?.published !== false });
// Artigos que já estão no ar (src/data/blogPosts.ts): aparecem no painel enquanto site_data/blog ainda não existe.
const POSTS_PADRAO = (): Post[] => BLOG_PADRAO.map((b, i) => normPost({ id: Date.now() + i, title: b.title, author: b.author, date: b.date, capaImage: b.coverImage, content: b.content, slug: b.slug, excerpt: b.excerpt, published: b.published }));

const moveItem = <T,>(arr: T[], i: number, d: -1 | 1): T[] => {
  const j = i + d; if (j < 0 || j >= arr.length) return arr;
  const out = [...arr]; [out[i], out[j]] = [out[j], out[i]]; return out;
};
const setAt = <T,>(arr: T[], i: number, patch: Partial<T>): T[] => arr.map((x, k) => (k === i ? { ...x, ...patch } : x));
const removeAt = <T,>(arr: T[], i: number): T[] => arr.filter((_, k) => k !== i);
const strAt = (arr: string[], i: number, v: string): string[] => arr.map((x, k) => (k === i ? v : x));

// Mesmo saneamento que o site aplica às imagens (só para miniaturas)
const previewSrc = (url: string): string => {
  const u = (url || '').trim();
  if (!u) return '';
  if (u.startsWith('http://')) return u.replace('http://', 'https://');
  if (u.startsWith('http') || u.startsWith('/') || u.startsWith('blob:') || u.startsWith('data:image/')) return u;
  return '/' + u;
};
const isVideoUrl = (u: string) => /\.(mp4|webm)(\?|#|$)/i.test(u || '');

// Links do CMS só podem ser caminhos do site ou http(s) — nunca "javascript:" etc.
const linkOk = (v: string) => { const t = (v || '').trim(); return t === '' || /^\/(?!\/)/.test(t) || /^https?:\/\//i.test(t); };

// ---- Upload (validação no navegador; as regras do Storage repetem os mesmos limites) ----
const IMG_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };
const VID_TYPES: Record<string, string> = { 'video/mp4': 'mp4', 'video/webm': 'webm' };
const MAX_IMG = 10 * 1024 * 1024;
const MAX_VID = 60 * 1024 * 1024;

async function uploadFile(file: File, folder: string, allowVideo: boolean): Promise<string> {
  const isImg = file.type in IMG_TYPES;
  const isVid = allowVideo && file.type in VID_TYPES;
  if (!isImg && !isVid) throw new Error(`"${file.name}": formato não permitido. Use ${allowVideo ? 'JPG, PNG, WebP, AVIF, GIF, MP4 ou WebM' : 'JPG, PNG, WebP, AVIF ou GIF'}.`);
  if (file.size > (isVid ? MAX_VID : MAX_IMG)) throw new Error(`"${file.name}" é grande demais (máx. ${isVid ? 60 : 10} MB).`);
  const ext = isVid ? VID_TYPES[file.type] : IMG_TYPES[file.type];
  const base = slugify(file.name.replace(/\.[^.]+$/, '')).slice(0, 40) || 'arquivo';
  const rand = Math.random().toString(36).slice(2, 8);
  const r = ref(storage, `uploads/${folder}/${Date.now()}-${rand}-${base}.${ext}`);
  await uploadBytes(r, file, { contentType: file.type });
  return getDownloadURL(r);
}

// ============================================================
//  COMPONENTES (fora do Admin para não perder o foco ao digitar)
// ============================================================
function Card({ id, title, desc, actions, children }: { id?: string; title: string; desc?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card" id={id}>
      <div className="card-h row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
        <div><h2>{title}</h2>{desc && <p>{desc}</p>}</div>
        {actions}
      </div>
      <div className="card-b">{children}</div>
    </section>
  );
}

function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`fld ${className || ''}`}>
      <span className="fld-l">{label}</span>
      {children}
      {hint && <span className="fld-h">{hint}</span>}
    </label>
  );
}

function TextIn({ value, onChange, ...rest }: { value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return <input className="inp" type="text" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />;
}
function AreaIn({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea className="inp" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />;
}

function Item({ title, acts, onRemove, children }: { title: string; acts?: React.ReactNode; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <div className="item">
      <div className="item-h">
        <b>{title}</b>
        <div className="acts">
          {acts}
          {onRemove && <button type="button" className="btn sm danger" onClick={onRemove}>Remover</button>}
        </div>
      </div>
      <div className="item-b">{children}</div>
    </div>
  );
}

function MoveBtns({ i, n, onMove }: { i: number; n: number; onMove: (d: -1 | 1) => void }) {
  return (
    <>
      <button type="button" className="icon-btn" title="Mover para cima" disabled={i === 0} onClick={() => onMove(-1)}><ChevronUp size={16} /></button>
      <button type="button" className="icon-btn" title="Mover para baixo" disabled={i === n - 1} onClick={() => onMove(1)}><ChevronDown size={16} /></button>
    </>
  );
}

function ImageField({ label, hint, url, onUrl, onPick, busy, allowVideo, inputKey }: {
  label: string; hint?: string; url: string; onUrl: (v: string) => void; onPick: (f: File) => void; busy: boolean; allowVideo?: boolean; inputKey: string;
}) {
  const src = previewSrc(url);
  return (
    <div className="img-field">
      <div className="img-thumb checker">
        {busy ? <Loader2 size={20} className="spin" />
          : !src ? <span>sem arquivo</span>
          : isVideoUrl(url) ? <video src={src} muted preload="metadata" />
          : <img src={src} alt="" referrerPolicy="no-referrer" />}
      </div>
      <div className="img-body">
        <span className="img-label">{label}</span>
        {hint && <span className="img-hint">{hint}</span>}
        <div className="img-row">
          <label className="btn sm">
            {busy ? 'Enviando…' : url ? 'Trocar' : 'Escolher arquivo'}
            <input key={inputKey} type="file" hidden disabled={busy}
              accept={allowVideo ? 'image/jpeg,image/png,image/webp,image/avif,image/gif,video/mp4,video/webm' : 'image/jpeg,image/png,image/webp,image/avif,image/gif'}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); e.target.value = ''; }} />
          </label>
          <span className="img-name">{url ? 'Arquivo definido' : 'Nenhum arquivo'}</span>
          {url && <button type="button" className="icon-btn del" title="Remover" onClick={() => onUrl('')}><X size={15} /></button>}
        </div>
        <input type="text" className="inp sm mono" value={url} onChange={(e) => onUrl(e.target.value)} placeholder="ou cole o endereço (URL) ou caminho, ex.: /img/foto.jpg" />
      </div>
    </div>
  );
}

function GalleryEditor({ label, items, onChange, onFiles, busy, max, hint }: {
  label: string; items: Img[]; onChange: (l: Img[]) => void; onFiles: (files: File[]) => void; busy: boolean; max?: number; hint?: string;
}) {
  const [over, setOver] = useState(false);
  const full = max !== undefined && items.length >= max;
  const pick = (list: FileList | null) => { if (list && list.length) onFiles(Array.from(list)); };
  return (
    <div className="gal">
      <div className="gal-head">
        <b>{label} <span className="note">· {items.length}{max !== undefined ? ` / ${max}` : ''}</span></b>
        <label className={`btn sm ${full || busy ? '' : ''}`} style={full || busy ? { opacity: .55, pointerEvents: 'none' } : undefined}>
          {busy ? <Loader2 size={14} className="spin" /> : <Plus size={14} />} {busy ? 'Enviando…' : 'Adicionar imagens'}
          <input type="file" multiple hidden accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={full || busy}
            onChange={(e) => { pick(e.target.files); e.target.value = ''; }} />
        </label>
      </div>
      {hint && <span className="note">{hint}</span>}
      <div className={`gal-drop ${over ? 'over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (!full && !busy) pick(e.dataTransfer.files); }}>
        <ImagePlus size={18} style={{ verticalAlign: '-4px', marginRight: 6 }} />
        {full ? 'Limite de imagens atingido.' : 'Arraste as imagens aqui ou use o botão acima.'}
      </div>
      {items.length > 0 && (
        <div className="gal-items">
          {items.map((im, i) => (
            <div className="gal-it" key={im.url + i}>
              <div className="ph checker"><img src={previewSrc(im.url)} alt="" loading="lazy" referrerPolicy="no-referrer" /></div>
              <div className="ft">
                <input className="inp sm" type="text" value={im.alt} placeholder="Legenda (opcional)" onChange={(e) => onChange(setAt(items, i, { alt: e.target.value }))} />
                <div className="acts">
                  <span>
                    <button type="button" className="icon-btn" title="Mover para a esquerda" disabled={i === 0} onClick={() => onChange(moveItem(items, i, -1))}><ChevronLeft size={16} /></button>
                    <button type="button" className="icon-btn" title="Mover para a direita" disabled={i === items.length - 1} onClick={() => onChange(moveItem(items, i, 1))}><ChevronRight size={16} /></button>
                  </span>
                  <button type="button" className="icon-btn del" title="Remover" onClick={() => onChange(removeAt(items, i))}><X size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StringList({ label, items, onChange, placeholder, addLabel }: { label: string; items: string[]; onChange: (l: string[]) => void; placeholder?: string; addLabel: string }) {
  return (
    <div className="fld">
      <span className="fld-l">{label}</span>
      {items.map((t, i) => (
        <div className="list-line" key={i}>
          <input className="inp sm" type="text" value={t} placeholder={placeholder} onChange={(e) => onChange(strAt(items, i, e.target.value))} />
          <button type="button" className="icon-btn del" title="Remover" onClick={() => onChange(removeAt(items, i))}><X size={15} /></button>
        </div>
      ))}
      <div><button type="button" className="btn sm" onClick={() => onChange([...items, ''])}><Plus size={14} /> {addLabel}</button></div>
    </div>
  );
}

function SaveBar({ where, dirty, busy, disabled }: { where: React.ReactNode; dirty: boolean; busy: boolean; disabled: boolean }) {
  return (
    <div className="savebar">
      <div className="where">{where} {dirty ? <span className="dirty">· alterações não publicadas</span> : <span>· tudo publicado</span>}</div>
      <button type="submit" className="btn primary" disabled={busy || disabled}>
        {busy && <Loader2 size={15} className="spin" />}
        {busy ? 'Publicando…' : 'Publicar alterações'}
      </button>
    </div>
  );
}

// ---- Editor de texto do blog (sem dependências; o HTML é saneado ao salvar) ----
function RichEditor({ value, onChange, onPickImage, uploading }: { value: string; onChange: (html: string) => void; onPickImage: (f: File) => Promise<string | null>; uploading: boolean }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [source, setSource] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [srcText, setSrcText] = useState('');

  useLayoutEffect(() => { if (areaRef.current) areaRef.current.innerHTML = sanitizeHtml(value); /* só na montagem (o pai remonta por artigo) */ // eslint-disable-next-line
  }, []);

  const emit = () => { if (areaRef.current) onChange(areaRef.current.innerHTML); };
  const remember = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount && areaRef.current?.contains(sel.anchorNode)) savedRange.current = sel.getRangeAt(0).cloneRange();
  };
  const restore = () => {
    areaRef.current?.focus();
    const sel = window.getSelection();
    if (sel && savedRange.current) { sel.removeAllRanges(); sel.addRange(savedRange.current); }
  };
  const cmd = (name: string, arg?: string) => { restore(); document.execCommand(name, false, arg); emit(); remember(); };
  const tb = (title: string, name: string, icon: React.ReactNode, arg?: string) => (
    <button type="button" title={title} aria-label={title} onMouseDown={(e) => e.preventDefault()} onClick={() => cmd(name, arg)}>{icon}</button>
  );
  const applyLink = () => {
    if (!isSafeUrl(linkUrl) || /^#/.test(linkUrl.trim())) return;
    restore(); document.execCommand('createLink', false, linkUrl.trim()); emit();
    areaRef.current?.querySelectorAll('a').forEach((a) => { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); });
    emit(); setLinkOpen(false); setLinkUrl('https://');
  };
  const toggleSource = () => {
    if (!source) { setSrcText(areaRef.current ? areaRef.current.innerHTML : value); setSource(true); }
    else {
      const clean = sanitizeHtml(srcText); onChange(clean); setSource(false);
      requestAnimationFrame(() => { if (areaRef.current) areaRef.current.innerHTML = clean; });
    }
  };
  return (
    <div className="rte">
      <div className="rte-bar">
        {!source && <>
          {tb('Título', 'formatBlock', <Heading2 size={16} />, 'H2')}
          {tb('Subtítulo', 'formatBlock', <Heading3 size={16} />, 'H3')}
          {tb('Parágrafo', 'formatBlock', <span>¶</span>, 'P')}
          <span className="sep" />
          {tb('Negrito', 'bold', <Bold size={16} />)}
          {tb('Itálico', 'italic', <Italic size={16} />)}
          {tb('Sublinhado', 'underline', <Underline size={16} />)}
          <span className="sep" />
          {tb('Lista com marcadores', 'insertUnorderedList', <List size={16} />)}
          {tb('Lista numerada', 'insertOrderedList', <ListOrdered size={16} />)}
          {tb('Alinhar à esquerda', 'justifyLeft', <AlignLeft size={16} />)}
          {tb('Centralizar', 'justifyCenter', <AlignCenter size={16} />)}
          <span className="sep" />
          <button type="button" title="Inserir link" aria-label="Inserir link" className={linkOpen ? 'on' : ''} onMouseDown={(e) => { e.preventDefault(); remember(); }} onClick={() => setLinkOpen((o) => !o)}><Link2 size={16} /></button>
          <label className="tb" title="Inserir imagem" onMouseDown={() => remember()}>
            {uploading ? <Loader2 size={16} className="spin" /> : <ImagePlus size={16} />}
            <input type="file" hidden accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={uploading}
              onChange={async (e) => { const f = e.target.files?.[0]; e.target.value = ''; if (!f) return; const url = await onPickImage(f); if (url) cmd('insertImage', url); }} />
          </label>
          {tb('Limpar formatação', 'removeFormat', <Eraser size={16} />)}
          <span className="sep" />
        </>}
        <button type="button" className={source ? 'on' : ''} title="Ver/editar HTML" onClick={toggleSource}><Code2 size={16} /> HTML</button>
      </div>
      {linkOpen && !source && (
        <div className="rte-link">
          <input className="inp sm" type="text" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://…" autoFocus
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyLink(); } }} />
          <button type="button" className="btn sm primary" onClick={applyLink} disabled={!isSafeUrl(linkUrl) || /^#/.test(linkUrl.trim())}>Aplicar</button>
          <button type="button" className="btn sm" onClick={() => setLinkOpen(false)}>Cancelar</button>
        </div>
      )}
      {source
        ? <textarea className="rte-src" value={srcText} onChange={(e) => setSrcText(e.target.value)} spellCheck={false} />
        : <div ref={areaRef} className="rte-area" contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true"
            onInput={emit} onKeyUp={remember} onMouseUp={remember} onBlur={() => { remember(); emit(); }}
            onPaste={(e) => { e.preventDefault(); const t = e.clipboardData.getData('text/plain'); document.execCommand('insertText', false, t); }} />}
    </div>
  );
}

// ============================================================
//  PÁGINA
// ============================================================
function setIn<T>(obj: T, path: (string | number)[], value: any): T {
  if (!path.length) return value;
  const [k, ...rest] = path;
  const copy: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) };
  copy[k] = setIn((obj as any)?.[k], rest, value);
  return copy;
}
const renum = <T extends { passo: string }>(l: T[]): T[] => l.map((x, i) => ({ ...x, passo: String(i + 1).padStart(2, '0') }));

const TABS: { id: TabId; label: string; icon: React.ReactNode; title: string; desc: string; site: string; sections: { id: string; label: string }[] }[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon size={16} />, title: 'Página inicial', desc: 'Hero, abordagem e mosaico da Home.', site: '/',
    sections: [{ id: 'sec-hero', label: 'Hero' }, { id: 'sec-abordagem', label: 'Abordagem' }, { id: 'sec-mosaico', label: 'Mosaico' }] },
  { id: 'quemSomos', label: 'A Quattro', icon: <Users size={16} />, title: 'A Quattro (Quem somos)', desc: 'Banner, manifesto, governança, história e selos.', site: '/quem-somos',
    sections: [{ id: 'sec-hero', label: 'Banner' }, { id: 'sec-manifesto', label: 'Manifesto' }, { id: 'sec-governanca', label: 'Governança' }, { id: 'sec-timeline', label: 'Linha do tempo' }, { id: 'sec-selos', label: 'Selos' }] },
  { id: 'setores', label: 'Setores e Obras', icon: <Layers size={16} />, title: 'Setores e Obras', desc: 'Setores de atuação e o portfólio de obras.', site: '/setores',
    sections: [{ id: 'sec-setores', label: 'Setores' }, { id: 'sec-obras', label: 'Obras' }] },
  { id: 'servicos', label: 'Serviços', icon: <Wrench size={16} />, title: 'Engenharia e Serviços', desc: 'Banner, serviços prestados e fluxo de trabalho.', site: '/servicos',
    sections: [{ id: 'sec-hero', label: 'Banner' }, { id: 'sec-lista', label: 'Serviços' }, { id: 'sec-fluxo', label: 'Fluxo' }] },
  { id: 'contato', label: 'Contato', icon: <Phone size={16} />, title: 'Atendimento e sede', desc: 'Telefone, e-mail, endereço e perguntas frequentes.', site: '/contato',
    sections: [{ id: 'sec-info', label: 'Informações' }, { id: 'sec-faq', label: 'Perguntas frequentes' }] },
  { id: 'blog', label: 'Blog', icon: <BookOpen size={16} />, title: 'Blog e notícias', desc: 'Escreva e edite os artigos.', site: '/blog',
    sections: [{ id: 'sec-post-dados', label: 'Dados do artigo' }, { id: 'sec-post-texto', label: 'Texto' }] },
];
const DOC_ID: Record<TabId, string> = { home: 'home', quemSomos: 'quemsomos', setores: 'portfolio', servicos: 'servicos', contato: 'contato', blog: 'blog' };

export function Admin() {
  // ---------- autenticação ----------
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // ---------- dados ----------
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [loadErr, setLoadErr] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [home, setHome] = useState(DEFAULT_HOME);
  const [quem, setQuem] = useState(DEFAULT_QUEM);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [servicos, setServicos] = useState(DEFAULT_SERVICOS);
  const [contato, setContato] = useState(DEFAULT_CONTATO);
  const [blog, setBlog] = useState<Post[]>([]);
  const [selPost, setSelPost] = useState<number | null>(null);
  const snaps = useRef<Record<string, string>>({});
  const [, setTick] = useState(0);

  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [secao, setSecao] = useState('');

  // ---------- avisos e confirmações ----------
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const notify = (kind: 'ok' | 'err', msg: string) => {
    setToast({ kind, msg });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), kind === 'err' ? 9000 : 4000);
  };
  const [confirmState, setConfirmState] = useState<{ title: string; message: string; label: string; onConfirm: () => void } | null>(null);
  const askConfirm = (title: string, message: string, label: string, onConfirm: () => void) => setConfirmState({ title, message, label, onConfirm });

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setAuthReady(true); }), []);

  // ---------- carregar ----------
  const load = async () => {
    setLoadState('loading'); setLoadErr('');
    try {
      const snap = await Promise.all(['home', 'quemsomos', 'portfolio', 'servicos', 'contato', 'blog'].map((id) => getDoc(doc(db, 'site_data', id))));
      const d = (i: number): any => (snap[i].exists() ? snap[i].data() : {});
      const H = mergeDeep(DEFAULT_HOME, d(0));
      H.hero.mediaList = H.hero.mediaList.map((m: any) => ({ ...m, id: Number(m.id) || newId(), line0: typeof m.line0 === 'string' ? m.line0 : 'ENGENHARIA' }));
      const Q = mergeDeep(DEFAULT_QUEM, d(1));
      Q.timeline = Q.timeline.map((t: any) => ({ ...t, id: Number(t.id) || newId() }));
      const pd = d(2);
      const SET = (Array.isArray(pd.setores) && pd.setores.length ? pd.setores : SETORES_PADRAO).map(normSetor);
      const OBR = (Array.isArray(pd.obras) && pd.obras.length ? pd.obras : OBRAS_PADRAO).map(normObra);
      const S = mergeDeep(DEFAULT_SERVICOS, d(3));
      S.lista = S.lista.map((x: any) => ({ ...x, image: typeof x.image === 'string' ? x.image : (DEFAULT_SERVICOS.lista.find((z) => z.id === x.id)?.image || '') }));
      const C = mergeDeep(DEFAULT_CONTATO, d(4));
      C.faqs = C.faqs.map((f: any) => ({ ...f, id: Number(f.id) || newId(), categoria: String(f.categoria || 'geral'), destaque: !!f.destaque }));
      const B: Post[] = snap[5].exists() && Array.isArray(d(5).posts) ? d(5).posts.map(normPost) : POSTS_PADRAO();
      setHome(H); setQuem(Q); setSetores(SET); setObras(OBR); setServicos(S); setContato(C); setBlog(B);
      setSelPost(B.length ? B[0].id : null);
      snaps.current = {
        home: JSON.stringify(H), quemSomos: JSON.stringify(Q), setores: JSON.stringify({ setores: SET, obras: OBR }),
        servicos: JSON.stringify(S), contato: JSON.stringify(C), blog: JSON.stringify({ posts: B }),
      };
      setLoadState('ok');
    } catch (err: any) {
      setLoadErr(err?.code === 'permission-denied' ? 'As regras do Firestore bloquearam a leitura (veja SEGURANCA.md).' : errMsg(err));
      setLoadState('error');
    }
  };
  useEffect(() => { if (user && loadState === 'idle') load(); if (!user) setLoadState('idle'); /* eslint-disable-next-line */ }, [user]);

  const payloadFor = (tab: TabId): any =>
    tab === 'home' ? home : tab === 'quemSomos' ? quem : tab === 'setores' ? { setores, obras } : tab === 'servicos' ? servicos : tab === 'contato' ? contato : { posts: blog };
  const isDirty = (tab: TabId) => loadState === 'ok' && JSON.stringify(payloadFor(tab)) !== snaps.current[tab];
  const dirtyMap: Record<TabId, boolean> = { home: isDirty('home'), quemSomos: isDirty('quemSomos'), setores: isDirty('setores'), servicos: isDirty('servicos'), contato: isDirty('contato'), blog: isDirty('blog') };
  const anyDirty = Object.values(dirtyMap).some(Boolean);

  useEffect(() => {
    if (!anyDirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [anyDirty]);

  // ---------- login / logout ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginError(''); setLoggingIn(true);
    const id = loginUser.trim();
    const email = id.includes('@') ? id : `${id}@${LOGIN_DOMAIN}`;
    try { await signInWithEmailAndPassword(auth, email, password); setPassword(''); }
    catch (err: any) {
      const c = err?.code;
      setLoginError(c === 'auth/too-many-requests' ? 'Muitas tentativas. Aguarde alguns minutos e tente de novo.'
        : c === 'auth/network-request-failed' ? 'Sem conexão com a internet.'
        : 'Usuário ou senha incorretos.');
    } finally { setLoggingIn(false); }
  };
  const doLogout = async () => { await signOut(auth); setLoadState('idle'); };
  const handleLogout = () => {
    if (anyDirty) askConfirm('Sair sem publicar?', 'Há alterações que ainda não foram publicadas. Se sair agora, elas serão perdidas.', 'Sair mesmo assim', doLogout);
    else doLogout();
  };

  // ---------- uploads ----------
  const setUp = (key: string, v: boolean) => setUploading((u) => ({ ...u, [key]: v }));
  const upErr = (err: any) => notify('err', err?.code === 'storage/unauthorized' ? 'Sem permissão para enviar arquivos: esta conta não está autorizada (veja SEGURANCA.md).' : errMsg(err));
  const uploadOne = async (key: string, file: File, folder: string, allowVideo: boolean, apply: (url: string) => void) => {
    setUp(key, true);
    try { const url = await uploadFile(file, folder, allowVideo); apply(url); notify('ok', 'Arquivo enviado. Publique as alterações para ir ao ar.'); }
    catch (err) { upErr(err); } finally { setUp(key, false); }
  };
  const uploadMany = async (key: string, files: File[], folder: string, room: number | undefined, apply: (imgs: Img[]) => void) => {
    if (room !== undefined && room <= 0) return;
    const list = room !== undefined ? files.slice(0, room) : files;
    setUp(key, true);
    try {
      const res = await Promise.allSettled(list.map((f) => uploadFile(f, folder, false)));
      const ok = res.filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled').map((r) => ({ url: r.value, alt: '' }));
      const bad = res.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
      if (ok.length) apply(ok);
      if (bad.length) upErr(bad[0].reason);
      else notify('ok', `${ok.length} imagem(ns) enviada(s).${list.length < files.length ? ` O limite foi atingido: ${files.length - list.length} não foram enviadas.` : ''} Publique para ir ao ar.`);
    } finally { setUp(key, false); }
  };

  // ---------- validar e salvar ----------
  const validate = (tab: TabId): string | null => {
    if (tab === 'home') {
      if (!home.hero.mediaList.length) return 'Adicione ao menos um slide ao hero.';
      for (let i = 0; i < home.hero.mediaList.length; i++) {
        const m = home.hero.mediaList[i];
        if (!m.desktopUrl.trim()) return `Slide ${i + 1}: falta a imagem ou vídeo (desktop).`;
        if (!linkOk(m.ctaLink)) return `Slide ${i + 1}: o link do botão deve começar com "/" (página do site) ou "https://".`;
      }
    }
    if (tab === 'setores') {
      const slugs = new Set<string>(); const ids = new Set<string>();
      for (const s of setores) {
        if (!s.title.trim()) return 'Há um setor sem título.';
        const sl = slugify(s.slug || s.title);
        if (slugs.has(sl)) return `Dois setores com o mesmo endereço (slug): "${sl}".`;
        if (ids.has(s.id)) return `Dois setores com o mesmo identificador: "${s.id}".`;
        slugs.add(sl); ids.add(s.id);
      }
      const os = new Set<string>();
      for (const o of obras) {
        if (!o.title.trim()) return 'Há uma obra sem nome.';
        const sl = slugify(o.slug || o.title);
        if (os.has(sl)) return `Duas obras com o mesmo endereço (slug): "${sl}".`;
        os.add(sl);
        if (!o.capaImage.trim()) return `Obra "${o.title}": falta a imagem de capa.`;
        if (o.categoriaSlug && !ids.has(o.categoriaSlug)) return `Obra "${o.title}": a categoria escolhida não existe mais. Selecione outro setor.`;
      }
    }
    if (tab === 'contato' && contato.comercialEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.comercialEmail.trim())) return 'O e-mail de contato parece inválido.';
    if (tab === 'contato') {
      for (const f of contato.faqs) if (!f.pergunta.trim() || !f.resposta.trim()) return 'Há uma pergunta frequente sem pergunta ou sem resposta.';
    }
    if (tab === 'blog') {
      const slugsPosts = new Set<string>();
      for (const p of blog) {
        if (!p.title.trim()) return 'Há um artigo sem título.';
        if (p.date && Number.isNaN(Date.parse(p.date))) return `Artigo "${p.title}": data inválida.`;
        const sl = slugify(p.slug || p.title);
        if (!sl) return `Artigo "${p.title}": o endereço (slug) ficou vazio.`;
        if (slugsPosts.has(sl)) return `Dois artigos com o mesmo endereço (slug): "${sl}".`;
        slugsPosts.add(sl);
      }
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || loadState !== 'ok') return;
    const problem = validate(activeTab);
    if (problem) { notify('err', problem); return; }
    setBusy(true);
    try {
      let payload = payloadFor(activeTab);
      if (activeTab === 'setores') {
        const S = setores.map((s) => ({ ...s, slug: slugify(s.slug || s.title), nbrs: s.nbrs.map((x) => x.trim()).filter(Boolean), diferenciais: s.diferenciais.map((x) => x.trim()).filter(Boolean) }));
        const O = obras.map((o) => ({ ...o, slug: slugify(o.slug || o.title), especificacoes: o.especificacoes.filter((x) => x.label.trim() || x.value.trim()) }));
        payload = { setores: S, obras: O }; setSetores(S); setObras(O);
      } else if (activeTab === 'blog') {
        const P = blog.map((p) => ({ ...p, slug: slugify(p.slug || p.title), excerpt: p.excerpt.trim(), content: sanitizeHtml(p.content) }));
        payload = { posts: P }; setBlog(P);
      } else if (activeTab === 'servicos') {
        const S = { ...servicos, lista: servicos.lista.map((x) => ({ ...x, entregaveis: x.entregaveis.map((t) => t.trim()).filter(Boolean) })) };
        payload = S; setServicos(S);
      }
      await setDoc(doc(db, 'site_data', DOC_ID[activeTab]), payload);
      snaps.current[activeTab] = JSON.stringify(payload);
      setTick((t) => t + 1);
      notify('ok', 'Publicado com sucesso.');
    } catch (err: any) {
      notify('err', err?.code === 'permission-denied'
        ? 'Sem permissão para publicar: esta conta não está autorizada nas regras do Firestore (veja SEGURANCA.md).'
        : `Não foi possível publicar: ${errMsg(err)}`);
    } finally { setBusy(false); }
  };

  // ---------- rolagem / submenu ----------
  const tab = TABS.find((t) => t.id === activeTab)!;
  const irPara = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  useEffect(() => {
    if (!user || loadState !== 'ok') return;
    const secs = tab.sections;
    const els = secs.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    setSecao(secs[0]?.id || '');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((en) => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setSecao(vis.target.id);
    }, { rootMargin: '-10% 0px -75% 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [user, loadState, activeTab, selPost, tab]);

  // ---------- telas de estado ----------
  if (!authReady) return <div className="adm-loading"><style>{ADMIN_CSS}</style><Loader2 size={18} className="spin" /> Carregando…</div>;

  if (!user) {
    return (
      <div className="adm login">
        <style>{ADMIN_CSS}</style>
        <form className="login-card" onSubmit={handleLogin}>
          <img src={LOGO_SRC} alt="Quattro Construtora" />
          <p className="sub2">Acesso ao painel de conteúdo</p>
          <Field label="Usuário ou e-mail"><input className="inp" type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} required autoComplete="username" autoFocus /></Field>
          <Field label="Senha"><input className="inp" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></Field>
          {loginError && <div className="login-err" role="alert">{loginError}</div>}
          <button type="submit" className="btn primary" disabled={loggingIn}>{loggingIn && <Loader2 size={15} className="spin" />} Entrar</button>
        </form>
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className="adm" style={{ display: 'block' }}>
        <style>{ADMIN_CSS}</style>
        <div className="adm-fail">
          <h3>Não foi possível carregar o conteúdo</h3>
          <p className="note">{loadErr}</p>
          <p className="note">Por segurança, o painel não permite editar sem ter carregado os dados atuais — assim nada é sobrescrito por engano.</p>
          <div className="row"><button type="button" className="btn primary" onClick={load}>Tentar de novo</button><button type="button" className="btn" onClick={doLogout}>Sair</button></div>
        </div>
      </div>
    );
  }
  if (loadState !== 'ok') return <div className="adm-loading"><style>{ADMIN_CSS}</style><Loader2 size={18} className="spin" /> Carregando conteúdo…</div>;

  // ---------- atalhos de edição ----------
  const H = (path: (string | number)[], v: any) => setHome((h) => setIn(h, path, v));
  const Q = (path: (string | number)[], v: any) => setQuem((q) => setIn(q, path, v));
  const SV = (path: (string | number)[], v: any) => setServicos((s) => setIn(s, path, v));
  const CT = (path: (string | number)[], v: any) => setContato((c) => setIn(c, path, v));
  const patchSetor = (id: string, patch: Partial<Setor>) => setSetores((l) => l.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const patchObra = (id: number, patch: Partial<Obra>) => setObras((l) => l.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const patchPost = (id: number, patch: Partial<Post>) => setBlog((l) => l.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const post = blog.find((p) => p.id === selPost) || null;
  const up = (k: string) => !!uploading[k];

  const addBtn = (label: string, onClick: () => void) => <button type="button" className="btn add" onClick={onClick}><Plus size={15} /> {label}</button>;

  return (
    <div className="adm">
      <style>{ADMIN_CSS}</style>

      <aside className="adm-side">
        <div className="adm-brand"><img src={LOGO_SRC} alt="Quattro Construtora" /><span>CMS Exclusivo</span></div>
        <nav className="adm-nav">
          {TABS.map((t) => (
            <React.Fragment key={t.id}>
              <button type="button" className={activeTab === t.id ? 'on' : ''} onClick={() => { setActiveTab(t.id); window.scrollTo({ top: 0 }); }}>
                {t.icon} {t.label}{dirtyMap[t.id] && <span className="adm-dot" title="Alterações não publicadas" />}
              </button>
              {activeTab === t.id && (
                <div className="adm-sub">
                  {t.sections.map((sc) => <button key={sc.id} type="button" className={secao === sc.id ? 'on' : ''} onClick={() => irPara(sc.id)}>{sc.label}</button>)}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="adm-side-foot">
          <small>{user.email}</small>
          <button type="button" className="adm-logout" onClick={handleLogout}><LogOut size={15} /> Sair</button>
        </div>
      </aside>

      <main className="adm-main">
        <div className="adm-head">
          <div><h1>{tab.title}</h1><p>{tab.desc}</p></div>
          <a className="btn sm" href={tab.site} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> Ver no site</a>
        </div>

        <div className="adm-jump">{tab.sections.map((s) => <button key={s.id} type="button" onClick={() => irPara(s.id)}>{s.label}</button>)}</div>

        <form onSubmit={handleSave}>
          {/* ============================ HOME ============================ */}
          {activeTab === 'home' && (<>
            <Card id="sec-hero" title="Hero (topo da Home)" desc="Mídias e textos de cada slide.">
              <Field label="Modo da mídia">
                <select className="inp" value={home.hero.mode} onChange={(e) => H(['hero', 'mode'], e.target.value)}>
                  <option value="carousel">Carrossel de imagens/vídeos</option><option value="single">Imagem única</option><option value="video">Vídeo em destaque</option>
                </select>
              </Field>
              {home.hero.mediaList.map((m, i) => {
                const p = (k: string, v: any) => H(['hero', 'mediaList', i, k], v);
                return (
                  <Item key={m.id} title={`Slide ${i + 1}`}
                    acts={<><MoveBtns i={i} n={home.hero.mediaList.length} onMove={(d) => H(['hero', 'mediaList'], moveItem(home.hero.mediaList, i, d))} />
                      <button type="button" className="btn sm danger" onClick={() => askConfirm('Remover slide?', `O slide ${i + 1} será removido (só vai ao ar ao publicar).`, 'Remover', () => H(['hero', 'mediaList'], removeAt(home.hero.mediaList, i)))}>Remover</button></>}>
                    <div className="g2">
                      <Field label="Tipo de mídia"><select className="inp" value={m.type} onChange={(e) => p('type', e.target.value)}><option value="image">Imagem</option><option value="video">Vídeo (MP4/WebM)</option></select></Field>
                    </div>
                    <div className="img-grid">
                      <ImageField label="Mídia desktop" inputKey={`d${m.id}`} url={m.desktopUrl} onUrl={(v) => p('desktopUrl', v)} busy={up(`hd${m.id}`)} allowVideo
                        onPick={(f) => uploadOne(`hd${m.id}`, f, 'home', true, (url) => setHome((h) => setIn(h, ['hero', 'mediaList'], h.hero.mediaList.map((x) => (x.id === m.id ? { ...x, desktopUrl: url } : x)))))} />
                      <ImageField label="Mídia mobile (opcional)" inputKey={`m${m.id}`} url={m.mobileUrl} onUrl={(v) => p('mobileUrl', v)} busy={up(`hm${m.id}`)} allowVideo
                        onPick={(f) => uploadOne(`hm${m.id}`, f, 'home', true, (url) => setHome((h) => setIn(h, ['hero', 'mediaList'], h.hero.mediaList.map((x) => (x.id === m.id ? { ...x, mobileUrl: url } : x)))))} />
                    </div>
                    <span className="sub">Título do slide</span>
                    <Field label="Linha inicial" hint="Primeira palavra do título, acima do destaque. Ex.: ENGENHARIA"><TextIn value={m.line0} onChange={(v) => p('line0', v)} /></Field>
                    <div className="g4">
                      <Field label="Linha 1"><TextIn value={m.line1BeforeHighlight} onChange={(v) => p('line1BeforeHighlight', v)} /></Field>
                      <Field label="Destaque 1 (amarelo)"><TextIn value={m.highlightPart1} onChange={(v) => p('highlightPart1', v)} /></Field>
                      <Field label="Destaque 2 (amarelo)"><TextIn value={m.highlightPart2} onChange={(v) => p('highlightPart2', v)} /></Field>
                      <Field label="Linha final"><TextIn value={m.line3AfterHighlight} onChange={(v) => p('line3AfterHighlight', v)} /></Field>
                    </div>
                    <Field label="Descrição"><AreaIn rows={2} value={m.slideDesc} onChange={(v) => p('slideDesc', v)} /></Field>
                    <div className="g2">
                      <Field label="Texto do botão"><TextIn value={m.ctaText} onChange={(v) => p('ctaText', v)} /></Field>
                      <Field label="Link do botão" hint="Ex.: /servicos ou https://…"><input className={`inp ${linkOk(m.ctaLink) ? '' : 'err'}`} type="text" value={m.ctaLink} onChange={(e) => p('ctaLink', e.target.value)} /></Field>
                    </div>
                  </Item>
                );
              })}
              {addBtn('Adicionar slide', () => H(['hero', 'mediaList'], [...home.hero.mediaList, { id: newId(), type: 'image', desktopUrl: '', mobileUrl: '', line0: 'ENGENHARIA', line1BeforeHighlight: '', highlightPart1: '', highlightPart2: '', line3AfterHighlight: '', slideDesc: '', ctaText: 'Entre em Contato', ctaLink: '/contato' } as Slide]))}
            </Card>

            <Card id="sec-abordagem" title="Nossa abordagem" desc="Título geral e três cartões.">
              <div className="g2">
                <Field label="Selo superior"><TextIn value={home.approach.badge} onChange={(v) => H(['approach', 'badge'], v)} /></Field>
                <Field label="Título"><TextIn value={home.approach.title} onChange={(v) => H(['approach', 'title'], v)} /></Field>
              </div>
              <Field label="Descrição"><AreaIn rows={2} value={home.approach.description} onChange={(v) => H(['approach', 'description'], v)} /></Field>
              <div className="g3">
                {(['card1', 'card2', 'card3'] as const).map((k, i) => (
                  <Item key={k} title={`Cartão ${i + 1}`}>
                    <Field label="Título"><TextIn value={home.approach[k].title} onChange={(v) => H(['approach', k, 'title'], v)} /></Field>
                    <Field label="Texto"><AreaIn value={home.approach[k].text} onChange={(v) => H(['approach', k, 'text'], v)} /></Field>
                    <Field label="Texto do botão"><TextIn value={home.approach[k].btnText} onChange={(v) => H(['approach', k, 'btnText'], v)} /></Field>
                    <Field label="Link do botão" hint="Ex.: /servicos"><input className={`inp ${linkOk(home.approach[k].btnLink) ? '' : 'err'}`} type="text" value={home.approach[k].btnLink} onChange={(e) => H(['approach', k, 'btnLink'], e.target.value)} /></Field>
                  </Item>
                ))}
              </div>
            </Card>

            <Card id="sec-mosaico" title='Mosaico "Quem somos"' desc="Título, texto e três imagens.">
              <div className="g2">
                <Field label="Título"><TextIn value={home.aboutMosaic.title} onChange={(v) => H(['aboutMosaic', 'title'], v)} /></Field>
              </div>
              <Field label="Descrição"><AreaIn rows={2} value={home.aboutMosaic.description} onChange={(v) => H(['aboutMosaic', 'description'], v)} /></Field>
              <div className="img-grid">
                {(['img1', 'img2', 'img3'] as const).map((k, i) => (
                  <ImageField key={k} label={`Imagem ${i + 1}`} inputKey={k} url={home.aboutMosaic[k]} onUrl={(v) => H(['aboutMosaic', k], v)} busy={up(`mos${k}`)}
                    onPick={(f) => uploadOne(`mos${k}`, f, 'home', false, (url) => H(['aboutMosaic', k], url))} />
                ))}
              </div>
            </Card>
          </>)}

          {/* ========================= A QUATTRO ========================= */}
          {activeTab === 'quemSomos' && (<>
            <Card id="sec-hero" title="Banner institucional">
              <div className="g2">
                <Field label="Título (linha 1)"><TextIn value={quem.hero.titleLine1} onChange={(v) => Q(['hero', 'titleLine1'], v)} /></Field>
                <Field label="Título (destaque)"><TextIn value={quem.hero.titleHighlight} onChange={(v) => Q(['hero', 'titleHighlight'], v)} /></Field>
              </div>
              <Field label="Descrição"><AreaIn value={quem.hero.description} onChange={(v) => Q(['hero', 'description'], v)} /></Field>
              <ImageField label="Imagem de fundo" inputKey="qbg" url={quem.hero.bgImage} onUrl={(v) => Q(['hero', 'bgImage'], v)} busy={up('qbg')}
                onPick={(f) => uploadOne('qbg', f, 'quem-somos', false, (url) => Q(['hero', 'bgImage'], url))} />
            </Card>
            <Card id="sec-manifesto" title="Manifesto institucional">
              <Field label="Título"><TextIn value={quem.manifesto.title} onChange={(v) => Q(['manifesto', 'title'], v)} /></Field>
              <Field label="Parágrafo 1"><AreaIn value={quem.manifesto.p1} onChange={(v) => Q(['manifesto', 'p1'], v)} /></Field>
              <Field label="Parágrafo 2"><AreaIn value={quem.manifesto.p2} onChange={(v) => Q(['manifesto', 'p2'], v)} /></Field>
            </Card>
            <Card id="sec-governanca" title="Governança" desc="Missão, visão e valores.">
              <div className="g3">
                <Field label="Missão"><AreaIn rows={5} value={quem.governanca.missao} onChange={(v) => Q(['governanca', 'missao'], v)} /></Field>
                <Field label="Visão"><AreaIn rows={5} value={quem.governanca.visao} onChange={(v) => Q(['governanca', 'visao'], v)} /></Field>
                <Field label="Valores" hint="Use **assim** para deixar uma palavra em negrito."><AreaIn rows={5} value={quem.governanca.valores} onChange={(v) => Q(['governanca', 'valores'], v)} /></Field>
              </div>
            </Card>
            <Card id="sec-timeline" title="Linha do tempo" desc="Marcos da história da empresa.">
              {quem.timeline.map((t, i) => (
                <Item key={t.id} title={`Marco ${i + 1}`} onRemove={() => Q(['timeline'], removeAt(quem.timeline, i))}
                  acts={<MoveBtns i={i} n={quem.timeline.length} onMove={(d) => Q(['timeline'], moveItem(quem.timeline, i, d))} />}>
                  <div className="g2">
                    <Field label="Ano / fase"><TextIn value={t.fase} onChange={(v) => Q(['timeline', i, 'fase'], v)} /></Field>
                    <Field label="Descrição"><TextIn value={t.desc} onChange={(v) => Q(['timeline', i, 'desc'], v)} /></Field>
                  </div>
                </Item>
              ))}
              {addBtn('Adicionar marco', () => Q(['timeline'], [...quem.timeline, { id: newId(), fase: '', desc: '' }]))}
            </Card>
            <Card id="sec-selos" title="Qualidade e selos" desc="Citação e selos de certificação exibidos na página.">
              <Field label="Citação"><AreaIn rows={3} value={quem.qualidade.quote} onChange={(v) => Q(['qualidade', 'quote'], v)} /></Field>
              <div className="img-grid">
                <ImageField label="Selo PBQP-H" inputKey="spb" url={quem.qualidade.seloPbqph} onUrl={(v) => Q(['qualidade', 'seloPbqph'], v)} busy={up('spb')}
                  onPick={(f) => uploadOne('spb', f, 'selos', false, (url) => Q(['qualidade', 'seloPbqph'], url))} />
                <ImageField label="Selo ISO 9001 (CBG)" inputKey="siso" url={quem.qualidade.seloIso} onUrl={(v) => Q(['qualidade', 'seloIso'], v)} busy={up('siso')}
                  onPick={(f) => uploadOne('siso', f, 'selos', false, (url) => Q(['qualidade', 'seloIso'], url))} />
              </div>
            </Card>
          </>)}

          {/* ======================= SETORES E OBRAS ======================= */}
          {activeTab === 'setores' && (<>
            <Card id="sec-setores" title="Setores de atuação" desc="Cada setor tem um carrossel de imagens, normas e diferenciais.">
              {setores.map((s, i) => (
                <Item key={s.id} title={s.title || `Setor ${i + 1}`}
                  acts={<><MoveBtns i={i} n={setores.length} onMove={(d) => setSetores(moveItem(setores, i, d))} />
                    <button type="button" className="btn sm danger" onClick={() => {
                      const n = obras.filter((o) => o.categoriaSlug === s.id).length;
                      askConfirm('Remover setor?', n ? `O setor "${s.title}" tem ${n} obra(s) vinculada(s); elas ficarão sem categoria até você escolher outro setor.` : `O setor "${s.title}" será removido.`, 'Remover', () => setSetores((l) => l.filter((x) => x.id !== s.id)));
                    }}>Remover</button></>}>
                  <div className="g2">
                    <Field label="Título"><TextIn value={s.title} onChange={(v) => patchSetor(s.id, { title: v })} /></Field>
                    <Field label="Endereço (slug)" hint={`Usado na URL e na âncora: ${slugify(s.slug || s.title) || 'slug'}`}><TextIn value={s.slug} onChange={(v) => patchSetor(s.id, { slug: v })} /></Field>
                  </div>
                  <Field label="Descrição"><AreaIn value={s.desc} onChange={(v) => patchSetor(s.id, { desc: v })} /></Field>
                  <StringList label="Normas técnicas (etiquetas)" items={s.nbrs} onChange={(l) => patchSetor(s.id, { nbrs: l })} placeholder="Ex.: NBR 15575" addLabel="Adicionar norma" />
                  <StringList label="Diferenciais" items={s.diferenciais} onChange={(l) => patchSetor(s.id, { diferenciais: l })} placeholder="Descreva o diferencial" addLabel="Adicionar diferencial" />
                  <GalleryEditor label="Imagens do carrossel" items={s.imagens} onChange={(l) => patchSetor(s.id, { imagens: l })} busy={up(`set${s.id}`)}
                    onFiles={(files) => uploadMany(`set${s.id}`, files, 'setores', undefined, (imgs) => setSetores((l) => l.map((x) => (x.id === s.id ? { ...x, imagens: [...x.imagens, ...imgs] } : x))))} />
                </Item>
              ))}
              {addBtn('Adicionar setor', () => {
                const n = setores.length + 1; let id = `setor-${n}`; while (setores.some((x) => x.id === id)) id += '-x';
                setSetores([...setores, { id, slug: id, title: '', desc: '', nbrs: [], diferenciais: [], imagens: [] }]);
              })}
            </Card>

            <Card id="sec-obras" title="Obras executadas" desc="Aparecem no portfólio; a capa é a primeira imagem da galeria do modal (até 5 fotos adicionais).">
              {obras.map((o, i) => {
                const statusOpts = ['Concluído', 'Em Execução'];
                return (
                  <Item key={o.id} title={o.title || `Obra ${i + 1}`}
                    acts={<><MoveBtns i={i} n={obras.length} onMove={(d) => setObras(moveItem(obras, i, d))} />
                      <button type="button" className="btn sm danger" onClick={() => askConfirm('Remover obra?', `A obra "${o.title}" será removida (só vai ao ar ao publicar).`, 'Remover', () => setObras((l) => l.filter((x) => x.id !== o.id)))}>Remover</button></>}>
                    <div className="g3">
                      <Field label="Nome da obra"><TextIn value={o.title} onChange={(v) => patchObra(o.id, { title: v })} /></Field>
                      <Field label="Endereço (slug)"><TextIn value={o.slug} onChange={(v) => patchObra(o.id, { slug: v })} placeholder={slugify(o.title)} /></Field>
                      <Field label="Status">
                        <select className="inp" value={o.status} onChange={(e) => patchObra(o.id, { status: e.target.value })}>
                          {[...statusOpts, ...(statusOpts.includes(o.status) ? [] : [o.status])].map((x) => <option key={x}>{x}</option>)}
                        </select>
                      </Field>
                      <Field label="Setor (categoria)">
                        <select className="inp" value={o.categoriaSlug} onChange={(e) => patchObra(o.id, { categoriaSlug: e.target.value })}>
                          <option value="">— escolha —</option>
                          {setores.map((s) => <option key={s.id} value={s.id}>{s.title || s.id}</option>)}
                        </select>
                      </Field>
                      <Field label="Rótulo exibido" hint="Texto curto no card. Ex.: Industrial"><TextIn value={o.categoriaLabel} onChange={(v) => patchObra(o.id, { categoriaLabel: v })} /></Field>
                      <Field label="Local"><TextIn value={o.local} onChange={(v) => patchObra(o.id, { local: v })} placeholder="Cidade – UF" /></Field>
                      <Field label="Área"><TextIn value={o.area} onChange={(v) => patchObra(o.id, { area: v })} placeholder="Ex.: 12.800 m²" /></Field>
                      <Field label="Cliente"><TextIn value={o.client} onChange={(v) => patchObra(o.id, { client: v })} /></Field>
                      <Field label="Ano"><TextIn value={o.year} onChange={(v) => patchObra(o.id, { year: v })} /></Field>
                    </div>
                    <label className="chk"><input type="checkbox" checked={o.destaque} onChange={(e) => patchObra(o.id, { destaque: e.target.checked })} /> Obra em destaque</label>
                    <div className="g2">
                      <Field label="Resumo (aparece no card)"><AreaIn rows={3} value={o.resumo} onChange={(v) => patchObra(o.id, { resumo: v })} /></Field>
                      <Field label="Detalhes do projeto (aparece no modal)"><AreaIn rows={3} value={o.descricaoCompleta} onChange={(v) => patchObra(o.id, { descricaoCompleta: v })} /></Field>
                    </div>
                    <div className="fld">
                      <span className="fld-l">Especificações técnicas (tabela opcional)</span>
                      {o.especificacoes.map((sp, k) => (
                        <div className="list-line" key={k}>
                          <input className="inp sm" style={{ maxWidth: 220 }} type="text" value={sp.label} placeholder="Ex.: Cliente" onChange={(e) => patchObra(o.id, { especificacoes: setAt(o.especificacoes, k, { label: e.target.value }) })} />
                          <input className="inp sm" type="text" value={sp.value} placeholder="Ex.: Amazon" onChange={(e) => patchObra(o.id, { especificacoes: setAt(o.especificacoes, k, { value: e.target.value }) })} />
                          <button type="button" className="icon-btn del" title="Remover linha" onClick={() => patchObra(o.id, { especificacoes: removeAt(o.especificacoes, k) })}><X size={15} /></button>
                        </div>
                      ))}
                      <div><button type="button" className="btn sm" onClick={() => patchObra(o.id, { especificacoes: [...o.especificacoes, { label: '', value: '' }] })}><Plus size={14} /> Adicionar linha</button></div>
                    </div>
                    <ImageField label="Imagem de capa" inputKey={`cv${o.id}`} url={o.capaImage} onUrl={(v) => patchObra(o.id, { capaImage: v })} busy={up(`ocv${o.id}`)}
                      onPick={(f) => uploadOne(`ocv${o.id}`, f, 'obras', false, (url) => patchObra(o.id, { capaImage: url }))} />
                    <GalleryEditor label="Galeria interna" max={5} items={o.galeriaImages} onChange={(l) => patchObra(o.id, { galeriaImages: l })} busy={up(`og${o.id}`)}
                      onFiles={(files) => uploadMany(`og${o.id}`, files, 'obras', 5 - o.galeriaImages.length, (imgs) => setObras((l) => l.map((x) => (x.id === o.id ? { ...x, galeriaImages: [...x.galeriaImages, ...imgs].slice(0, 5) } : x))))} />
                  </Item>
                );
              })}
              {addBtn('Adicionar obra', () => setObras([...obras, normObra({ id: newId(), title: '', status: 'Em Execução', categoriaSlug: setores[0]?.id || '' })]))}
            </Card>
          </>)}

          {/* =========================== SERVIÇOS =========================== */}
          {activeTab === 'servicos' && (<>
            <Card id="sec-hero" title="Banner da página de serviços">
              <div className="g2">
                <Field label="Título (linha 1)"><TextIn value={servicos.hero.titleLine1} onChange={(v) => SV(['hero', 'titleLine1'], v)} /></Field>
                <Field label="Título (destaque amarelo)"><TextIn value={servicos.hero.titleHighlight} onChange={(v) => SV(['hero', 'titleHighlight'], v)} /></Field>
              </div>
              <Field label="Descrição"><AreaIn value={servicos.hero.description} onChange={(v) => SV(['hero', 'description'], v)} /></Field>
              <ImageField label="Imagem de fundo" inputKey="sbg" url={servicos.hero.bgImage} onUrl={(v) => SV(['hero', 'bgImage'], v)} busy={up('sbg')}
                onPick={(f) => uploadOne('sbg', f, 'servicos', false, (url) => SV(['hero', 'bgImage'], url))} />
            </Card>
            <Card id="sec-lista" title="Serviços prestados">
              {servicos.lista.map((s, i) => (
                <Item key={s.id} title={s.title || `Serviço ${i + 1}`} onRemove={() => SV(['lista'], removeAt(servicos.lista, i))}
                  acts={<MoveBtns i={i} n={servicos.lista.length} onMove={(d) => SV(['lista'], moveItem(servicos.lista, i, d))} />}>
                  <Field label="Título"><TextIn value={s.title} onChange={(v) => SV(['lista', i, 'title'], v)} /></Field>
                  <Field label="Descrição"><AreaIn rows={2} value={s.desc} onChange={(v) => SV(['lista', i, 'desc'], v)} /></Field>
                  <ImageField label="Imagem do cartão" inputKey={`sv${s.id}`} url={s.image || ''} onUrl={(v) => SV(['lista', i, 'image'], v)} busy={up(`sv${s.id}`)}
                    onPick={(f) => uploadOne(`sv${s.id}`, f, 'servicos', false, (url) => setServicos((x) => setIn(x, ['lista'], x.lista.map((y) => (y.id === s.id ? { ...y, image: url } : y)))))} />
                  <StringList label="Itens inclusos (entregáveis)" items={s.entregaveis} onChange={(l) => SV(['lista', i, 'entregaveis'], l)} addLabel="Adicionar item" />
                </Item>
              ))}
              {addBtn('Adicionar serviço', () => SV(['lista'], [...servicos.lista, { id: `servico-${newId()}`, title: '', image: '', desc: '', entregaveis: [] }]))}
            </Card>
            <Card id="sec-fluxo" title="Fluxo de trabalho" desc="Passo a passo numerado automaticamente.">
              {servicos.fluxo.map((f, i) => (
                <Item key={i} title={`Passo ${f.passo}`} onRemove={() => SV(['fluxo'], renum(removeAt(servicos.fluxo, i)))}
                  acts={<MoveBtns i={i} n={servicos.fluxo.length} onMove={(d) => SV(['fluxo'], renum(moveItem(servicos.fluxo, i, d)))} />}>
                  <div className="g2">
                    <Field label="Título"><TextIn value={f.titulo} onChange={(v) => SV(['fluxo', i, 'titulo'], v)} /></Field>
                    <Field label="Número"><TextIn value={f.passo} onChange={(v) => SV(['fluxo', i, 'passo'], v)} /></Field>
                  </div>
                  <Field label="Descrição"><AreaIn rows={2} value={f.desc} onChange={(v) => SV(['fluxo', i, 'desc'], v)} /></Field>
                </Item>
              ))}
              {addBtn('Adicionar passo', () => SV(['fluxo'], renum([...servicos.fluxo, { passo: '', titulo: '', desc: '' }])))}
            </Card>
          </>)}

          {/* ============================ CONTATO ============================ */}
          {activeTab === 'contato' && (<>
            <Card id="sec-info" title="Informações de contato">
              <div className="g2">
                <Field label="Telefone comercial"><TextIn value={contato.comercialPhone} onChange={(v) => CT(['comercialPhone'], v)} /></Field>
                <Field label="E-mail direto"><input className="inp" type="email" value={contato.comercialEmail} onChange={(e) => CT(['comercialEmail'], e.target.value)} /></Field>
              </div>
              <div className="g2">
                <Field label="Endereço (linha 1)" hint="Rua, número e conjunto."><TextIn value={contato.enderecoLinha1} onChange={(v) => CT(['enderecoLinha1'], v)} /></Field>
                <Field label="Endereço (linha 2)" hint="Bairro, cidade e CEP."><TextIn value={contato.enderecoLinha2} onChange={(v) => CT(['enderecoLinha2'], v)} /></Field>
              </div>
              <Field label="Horário de atendimento"><TextIn value={contato.horario} onChange={(v) => CT(['horario'], v)} /></Field>
            </Card>
            <Card id="sec-faq" title="Perguntas frequentes">
              {contato.faqs.map((f, i) => (
                <Item key={f.id} title={`Pergunta ${i + 1}`} onRemove={() => CT(['faqs'], removeAt(contato.faqs, i))}
                  acts={<MoveBtns i={i} n={contato.faqs.length} onMove={(d) => CT(['faqs'], moveItem(contato.faqs, i, d))} />}>
                  <Field label="Pergunta"><TextIn value={f.pergunta} onChange={(v) => CT(['faqs', i, 'pergunta'], v)} /></Field>
                  <Field label="Resposta"><AreaIn rows={3} value={f.resposta} onChange={(v) => CT(['faqs', i, 'resposta'], v)} /></Field>
                  <div className="g2">
                    <Field label="Categoria (página Dúvidas Frequentes)"><select className="inp" value={f.categoria} onChange={(e) => CT(['faqs', i, 'categoria'], e.target.value)}>{CATEGORIAS_FAQ.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></Field>
                    <label className="chk"><input type="checkbox" checked={f.destaque} onChange={(e) => CT(['faqs', i, 'destaque'], e.target.checked)} /> Mostrar também na página Contato</label>
                  </div>
                </Item>
              ))}
              {addBtn('Adicionar pergunta', () => CT(['faqs'], [...contato.faqs, { id: newId(), pergunta: '', resposta: '', categoria: 'geral', destaque: false }]))}
            </Card>
          </>)}

          {/* ============================== BLOG ============================== */}
          {activeTab === 'blog' && (<>
            <div className="adm-picker">
              <label htmlFor="selPost">Editando</label>
              <select id="selPost" className="inp" value={post ? String(post.id) : ''} onChange={(e) => setSelPost(Number(e.target.value))} disabled={!blog.length}>
                {!blog.length && <option value="">Nenhum artigo ainda</option>}
                {blog.map((p) => <option key={p.id} value={p.id}>{p.title || '(sem título)'}</option>)}
              </select>
              <button type="button" className="btn sm" onClick={() => { const id = newId(); setBlog([{ id, title: '', author: '', date: new Date().toISOString().slice(0, 10), capaImage: '', content: '<p></p>', slug: '', excerpt: '', published: true }, ...blog]); setSelPost(id); }}><Plus size={14} /> Novo artigo</button>
              {post && <button type="button" className="btn sm danger" onClick={() => askConfirm('Excluir artigo?', `"${post.title || 'Sem título'}" será removido (só vai ao ar ao publicar).`, 'Excluir', () => { const rest = blog.filter((p) => p.id !== post.id); setBlog(rest); setSelPost(rest[0]?.id ?? null); })}>Excluir</button>}
            </div>
            {post ? (<>
              <Card id="sec-post-dados" title="Dados do artigo">
                <div className="g3">
                  <Field label="Título" className="grow"><TextIn value={post.title} onChange={(v) => patchPost(post.id, { title: v })} /></Field>
                  <Field label="Autor"><TextIn value={post.author} onChange={(v) => patchPost(post.id, { author: v })} /></Field>
                  <Field label="Data"><input className="inp" type="date" value={post.date} onChange={(e) => patchPost(post.id, { date: e.target.value })} /></Field>
                </div>
                <Field label="Endereço (slug)" hint={`Usado na URL: /blog/${slugify(post.slug || post.title) || 'endereco-do-artigo'}`}><TextIn value={post.slug} onChange={(v) => patchPost(post.id, { slug: v })} placeholder={slugify(post.title)} /></Field>
                <Field label="Resumo" hint="Aparece no card da lista do blog. Se ficar vazio, usamos o início do texto."><AreaIn rows={2} value={post.excerpt} onChange={(v) => patchPost(post.id, { excerpt: v })} /></Field>
                <label className="chk"><input type="checkbox" checked={post.published} onChange={(e) => patchPost(post.id, { published: e.target.checked })} /> Publicado no site (desmarque para guardar como rascunho)</label>
                <ImageField label="Imagem de capa" inputKey={`bc${post.id}`} url={post.capaImage} onUrl={(v) => patchPost(post.id, { capaImage: v })} busy={up(`bc${post.id}`)}
                  onPick={(f) => uploadOne(`bc${post.id}`, f, 'blog', false, (url) => patchPost(post.id, { capaImage: url }))} />
              </Card>
              <Card id="sec-post-texto" title="Texto do artigo" desc="O conteúdo é limpo automaticamente ao publicar (scripts e códigos perigosos são removidos).">
                <RichEditor key={post.id} value={post.content} onChange={(h) => patchPost(post.id, { content: h })} uploading={up(`bm${post.id}`)}
                  onPickImage={(f) => new Promise((resolve) => { uploadOne(`bm${post.id}`, f, 'blog', false, (url) => resolve(url)).then(() => resolve(null)); })} />
              </Card>
            </>) : <Card title="Nenhum artigo"><p className="note">Clique em "Novo artigo" para começar.</p></Card>}
          </>)}

          <SaveBar where={<>Editando: <b>{tab.title}</b></>} dirty={dirtyMap[activeTab]} busy={busy} disabled={false} />
        </form>
      </main>

      {confirmState && (
        <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setConfirmState(null); }}>
          <div className="modal" role="dialog" aria-modal="true">
            <h3>{confirmState.title}</h3>
            <p>{confirmState.message}</p>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setConfirmState(null)}>Cancelar</button>
              <button type="button" className="btn danger solid" onClick={() => { const fn = confirmState.onConfirm; setConfirmState(null); fn(); }}>{confirmState.label}</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.kind}`} role="status">
          <span>{toast.msg}</span>
          <button type="button" aria-label="Fechar" onClick={() => setToast(null)}><X size={14} /></button>
        </div>
      )}
    </div>
  );
}

export default Admin;
