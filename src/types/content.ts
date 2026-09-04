// src/types/content.ts
//
// Modelo de dados do CMS. Cada interface abaixo corresponde a um documento
// (ou item de coleção) no Firestore. Este arquivo é a fonte da verdade:
// tanto o Admin (escrita) quanto as páginas públicas (leitura) importam
// daqui, para nunca ficarem dessincronizados.
//
// Coleção "pages": um documento por página, id = nome da página.
//   pages/home, pages/quemSomos, pages/servicos, pages/contato,
//   pages/privacidade, pages/termos
//
// Coleções à parte (várias entradas, cada uma com seu próprio doc):
//   setores, obras, posts, leads

// ---------------------------------------------------------------------------
// HOME — pages/home
// ---------------------------------------------------------------------------

export interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  desktopUrl: string;
  mobileUrl?: string;
  // Título do slide, com *asterisco* marcando trechos a destacar
  // (ex: "CIVIL DE *ALTA**PERFORMANCE*"), interpretado por formatHeroTitle.
  line1BeforeHighlight: string;
  highlightPart1: string;
  highlightPart2: string;
  line3AfterHighlight: string;
  slideDesc: string;
  ctaText: string;
  ctaLink: string;
}

export interface HomeContent {
  hero: {
    mode: 'single' | 'carousel' | 'video';
    mediaList: HeroSlide[];
  };
  approach: {
    badge: string;
    title: string;
    description: string;
    card1: { title: string; text: string };
    card2: { title: string; text: string };
    card3: { title: string; text: string };
  };
  aboutMosaic: {
    title: string;
    description: string;
    statNumber: string;
    statLabel: string;
    img1: string;
    img2: string;
    img3: string;
  };
}

// ---------------------------------------------------------------------------
// QUEM SOMOS — pages/quemSomos
// ---------------------------------------------------------------------------

export interface TimelineItem {
  id: string;
  fase: string;
  desc: string;
}

export interface QuemSomosContent {
  hero: {
    titleLine1: string;
    titleHighlight: string;
    description: string;
    bgImage: string;
  };
  manifesto: {
    title: string;
    p1: string;
    p2: string;
  };
  qualidade: {
    quote: string;
    seloPbqph: string;
    seloIso: string;
  };
  governanca: {
    missao: string;
    visao: string;
    valores: string;
  };
  timeline: TimelineItem[];
}

// ---------------------------------------------------------------------------
// SERVIÇOS — pages/servicos
// ---------------------------------------------------------------------------

export interface ServicoItem {
  id: string;
  title: string;
  desc: string;
  entregaveis: string[];
}

export interface FluxoStep {
  passo: string;
  titulo: string;
  desc: string;
}

export interface ServicosContent {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  lista: ServicoItem[];
  fluxo: FluxoStep[];
}

// ---------------------------------------------------------------------------
// CONTATO — pages/contato
// ---------------------------------------------------------------------------

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface ContatoContent {
  comercialPhone: string;
  comercialEmail: string;
  endereco: string;
  faqs: FaqItem[];
}

// ---------------------------------------------------------------------------
// PRIVACIDADE / TERMOS — pages/privacidade, pages/termos
// ---------------------------------------------------------------------------

export interface LegalSection {
  id: string;
  titulo: string;
  corpo: string; // texto do bloco (pode conter HTML simples: <p>, <strong>, <ul>)
}

export interface LegalPageContent {
  heroTitle: string;
  heroDescription: string;
  ultimaAtualizacao: string; // ex: "Atualizado em 04/09/2026"
  secoes: LegalSection[];
}

// ---------------------------------------------------------------------------
// SETORES — coleção "setores"
// ---------------------------------------------------------------------------

export interface Setor {
  id?: string; // id do doc no Firestore
  slug: string;
  title: string;
  category: string;
  desc: string;
}

// ---------------------------------------------------------------------------
// OBRAS — coleção "obras"
// (substitui os antigos conceitos separados de "empreendimentos" e "obras")
// ---------------------------------------------------------------------------

export interface ObraEspecificacao {
  label: string;
  value: string;
}

export interface Obra {
  id?: string; // id do doc no Firestore
  slug: string;
  title: string;
  categoriaSlug: string; // referencia Setor.slug
  local: string;
  area: string;
  status: 'Lançamento' | 'Em Obras' | 'Concluído (Turnkey)' | 'Entregue';
  client: string;
  year: string;
  capaImage: string;
  galeriaImages: string[];
  especificacoes: ObraEspecificacao[];
  resumo: string;
  descricaoCompleta: string;
}

// ---------------------------------------------------------------------------
// BLOG — coleção "posts"
// ---------------------------------------------------------------------------

export interface BlogPost {
  id?: string; // id do doc no Firestore
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  coverImage: string;
  author: string;
  date: string; // ISO date string
  published: boolean; // rascunho (false) vs publicado (true)
}

// ---------------------------------------------------------------------------
// LEADS — coleção "leads" (já existente, mantido aqui só como referência)
// A interface real fica em src/lib/firebase.ts junto da função saveLead().
// ---------------------------------------------------------------------------
