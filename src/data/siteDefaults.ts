// src/data/siteDefaults.ts
// Conteúdo PADRÃO das páginas editáveis no /admin. Estes textos são exatamente
// os que já estavam no ar antes do Admin existir. O site os usa enquanto nada foi
// publicado (ou se o Firestore falhar), e o Admin os usa como ponto de partida.

export type Slide = {
  id: number;
  type: 'image' | 'video';
  desktopUrl: string;
  mobileUrl: string;
  line0: string;
  line1BeforeHighlight: string;
  highlightPart1: string;
  highlightPart2: string;
  line3AfterHighlight: string;
  slideDesc: string;
  ctaText: string;
  ctaLink: string;
};

const DESC_HERO =
  'Executamos projetos industriais, corporativos, farmacêuticos e residenciais com rigor técnico NBR, previsibilidade orçamentária e acabamento impecável.';

const slideBase = {
  line0: 'ENGENHARIA',
  line1BeforeHighlight: 'CIVIL DE',
  highlightPart1: 'ALTA',
  highlightPart2: 'PERFORMANCE',
  line3AfterHighlight: 'E PRECISÃO',
  slideDesc: DESC_HERO,
  ctaText: 'Entre em Contato',
  ctaLink: '/contato',
};

export const DEFAULT_HOME = {
  hero: {
    mode: 'carousel' as 'single' | 'carousel' | 'video',
    mediaList: [
      { id: 1, type: 'image', desktopUrl: '/img/bg_hero1.avif', mobileUrl: '', ...slideBase },
      { id: 2, type: 'image', desktopUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000', mobileUrl: '', ...slideBase },
      { id: 3, type: 'video', desktopUrl: 'https://assets.mixkit.co/videos/preview/mixkit-architectural-model-of-a-house-41561-large.mp4', mobileUrl: '', ...slideBase },
    ] as Slide[],
  },
  approach: {
    badge: 'NOSSA ABORDAGEM',
    title: 'Engenharia versátil e soluções completas para sua obra',
    description:
      'Atuamos em empreendimentos residenciais, habitação social (Minha Casa Minha Vida), obras corporativas, retrofits e adequações técnicas AVCB/CLCB.',
    card1: {
      title: 'Obras Corporativas & Habitação',
      text: 'Execução de edificações industriais, prédios comerciais e projetos habitacionais integrados, incluindo empreendimentos Minha Casa Minha Vida.',
      btnText: 'Saiba Mais',
      btnLink: '/setores',
    },
    card2: {
      title: 'Gestão Turnkey & Regularização',
      text: 'Gerenciamento completo do projeto à entrega final, assegurando conformidade com normas NBR e obtenção de AVCB/CLCB junto aos Bombeiros.',
      btnText: 'Ver Padrão',
      btnLink: '/quem-somos',
    },
    card3: {
      title: 'Retrofit, Reformas & Manutenção',
      text: 'Modernização de edificações, renovação de fachadas, reformas estruturais e adequações técnicas para imóveis comerciais e residenciais.',
      btnText: 'Ver Soluções',
      btnLink: '/servicos',
    },
  },
  aboutMosaic: {
    title: 'Solução completa para a excelência da sua construção',
    description:
      'A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.',
    img1: '/img/Amazon_Img1.jpg',
    img2: '/img/CisTambore_Img1.jpg',
    img3: '/img/Sequoia_Img1.jpg',
  },
};

export type HomeDoc = typeof DEFAULT_HOME;

export type Marco = { id: number; fase: string; desc: string };

export const DEFAULT_QUEM = {
  hero: {
    titleLine1: 'CONHEÇA A',
    titleHighlight: 'NOSSA EMPRESA',
    description:
      'Da infraestrutura logística e sedes corporativas à escala de grandes complexos residenciais. Transformamos desafios executivos complexos em soluções sólidas, previsíveis e sustentáveis em todo o Brasil.',
    bgImage: '/img/QuemSomos_3321.jpg',
  },
  manifesto: {
    title: 'Soluções End-to-End & Rigor Técnico',
    p1: 'A Quattro Construtora é especializada em soluções end-to-end de alta complexidade. Com mais de 1 milhão de metros quadrados executados, construímos nossa reputação onde o rigor técnico é inegociável: de galpões logísticos e plantas industriais a sedes corporativas, ambientes farmacêuticos controlados e complexos residenciais.',
    p2: 'Atuamos no modelo Turnkey (Design & Build), assumindo responsabilidade integral por todo o ciclo da obra — dos estudos de viabilidade e projetos executivos ao comissionamento e entrega final das chaves.',
  },
  qualidade: {
    quote:
      'A Quattro Construtora atua na construção civil e na incorporação de empreendimentos habitacionais, corporativos e industriais com foco na excelência dos produtos e serviços entregues. Assegura a satisfação dos clientes, garante o cumprimento dos requisitos legais e promove a melhoria contínua dos processos, mantendo o compromisso com práticas sustentáveis e inovadoras que respeitam o meio ambiente.',
    seloPbqph: '/selos/SELO_pbqph.png',
    seloIso: '/selos/Logo_ISO9001_2026.png',
  },
  governanca: {
    missao:
      'Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança e previsibilidade orçamentária, gerando valor sustentável para clientes e sociedade.',
    visao:
      'Ser a parceira estratégica referência no mercado nacional em obras complexas nos setores Industrial, Corporativo, Farmacêutico e Residencial.',
    valores:
      'Atuamos com **Rigor Técnico** inegociável, asseguramos **Previsibilidade** total, mantemos **Integridade** absoluta e valorizamos a **Segurança** e a sustentabilidade **(ESG)**.',
  },
  timeline: [
    { id: 1, fase: 'Fundação', desc: 'Início focado em engenharia consultiva e obras técnicas de alta complexidade.' },
    { id: 2, fase: 'Expansão & Incorporação', desc: 'Cobertura logística em todo o Brasil e consolidação do braço imobiliário (Quattro Inc).' },
    { id: 3, fase: 'Acreditação Máxima', desc: 'Conquista das certificações PBQP-H Nível A e NBR ISO 9001:2015.' },
    { id: 4, fase: 'Grandes Contas B2B', desc: 'Parcerias estratégicas com multinacionais dos setores de logística, telecomunicações e saúde.' },
    { id: 5, fase: 'Escala Residencial', desc: 'Expansão da marca com megacomplexos residenciais de milhares de unidades entregues.' },
  ] as Marco[],
};

export type QuemDoc = typeof DEFAULT_QUEM;

export type ServicoItem = { id: string; title: string; image: string; desc: string; entregaveis: string[] };
export type PassoFluxo = { passo: string; titulo: string; desc: string };

export const DEFAULT_SERVICOS = {
  hero: {
    titleLine1: 'SOLUÇÕES INTEGRADAS DE',
    titleHighlight: 'ENGENHARIA CIVIL',
    description:
      'Do planejamento inicial à entrega final das chaves, oferecemos gestão rigorosa, inovação tecnológica e conformidade normativa para garantir o sucesso do seu empreendimento.',
    bgImage: '/img/Servicos_596.jpg',
  },
  lista: [
    {
      id: 'turnkey', title: 'Engenharia Turnkey & EPC', image: '/img/turnkey_2150290086.jpg',
      desc: 'Solução completa do conceito à entrega das chaves. Assumimos a responsabilidade integral pelo projeto, compras, construção e comissionamento.',
      entregaveis: ['Gestão unificada de fornecedores e contratos', 'Preço fechado com previsibilidade orçamentária', 'Prazo de entrega garantido em contrato', 'Comissionamento e startup de instalações'],
    },
    {
      id: 'gerenciamento', title: 'Gerenciamento & Fiscalização', image: '/img/fiscalizacao_2151589549.jpg',
      desc: 'Supervisão técnica rigorosa do canteiro de obras, garantindo o cumprimento de especificações, controle físico-financeiro e auditoria de qualidade.',
      entregaveis: ['Relatórios gerenciais semanais com medições', 'Controle rigoroso de cronograma (Linha de Balanço)', 'Auditoria de segurança do trabalho (NR-35 / NR-18)', 'Inspeção de recebimento de materiais e insumos'],
    },
    {
      id: 'retrofit', title: 'Retrofit & Reformas Corporativas', image: '/img/retrofit_2150290083.jpg',
      desc: 'Modernização de edifícios, plantas fabris e escritórios sem interrupção das atividades operacionais do cliente.',
      entregaveis: ['Atualização de instalações elétricas e hidráulicas', 'Reforço estrutural e adequação de fachadas', 'Trabalho em turnos especiais (noturno/finais de semana)', 'Adequação às normas de acessibilidade e AVCB'],
    },
    {
      id: 'bim', title: 'Compatibilização & Projetos BIM', image: '/img/compatibilizacao_2151908069.jpg',
      desc: 'Modelagem tridimensional inteligente para antecipar interferências entre arquitetura, estrutura e instalações (MEP) antes da fase de obra.',
      entregaveis: ['Detecção automatizada de conflitos (Clash Detection)', 'Levantamento quantitativo preciso de insumos', 'Visualização fidedigna em modelo 3D/4D', 'Facilidade de manutenção posterior (As-Built)'],
    },
    {
      id: 'laudos', title: 'Laudos Técnicos & Vistorias', image: '/img/laudos_135766.jpg',
      desc: 'Avaliação pericial de estruturas, patologias da construção civil e conformidade normativa para auditorias e regularização predial.',
      entregaveis: ['Inspeção predial com laudo assinado por Engenheiro (ART)', 'Diagnóstico de patologias (infiltrações, trincas, recalque)', 'Plano de ação corretivo com estimativa de custos', 'Vistoria cautelar de vizinhança pré-obra'],
    },
    {
      id: 'manutencao', title: 'Manutenção Predial & Facilities', image: '/img/manutencao_53070.jpg',
      desc: 'Gestão preventiva e corretiva contínua para preservar o valor do ativo imobiliário e garantir a continuidade das operações.',
      entregaveis: ['Planos de Manutenção Operacional (PMOC)', 'Manutenção preventiva de utilidades e climatização', 'Atendimento emergencial com SLA estruturado', 'Gestão de ativos e inventário patrimonial'],
    },
  ] as ServicoItem[],
  fluxo: [
    { passo: '01', titulo: 'Diagnóstico & Viabilidade', desc: 'Análise detalhada do local, levantamento de requisitos técnicos, estudo de viabilidade e alinhamento de expectativas financeiras.' },
    { passo: '02', titulo: 'Planejamento & BIM', desc: 'Desenvolvimento e compatibilização de projetos, elaboração do cronograma físico-financeiro detalhado e cotação de insumos.' },
    { passo: '03', titulo: 'Execução & Controle', desc: 'Mobilização de canteiro, aplicação estrita de normas NBR, fiscalização contínua e envio de relatórios de evolução ao cliente.' },
    { passo: '04', titulo: 'Comissionamento & As-Built', desc: 'Testes finais de instalações, entrega dos manuais do usuário, documentação legal (Habite-se/AVCB) e entrega oficial das chaves.' },
  ] as PassoFluxo[],
};

export type ServicosDoc = typeof DEFAULT_SERVICOS;

// Dados de contato usados no cabeçalho, rodapé, home e página Contato.
// (As perguntas frequentes ficam em src/lib/faq.ts.)
export const DEFAULT_CONTATO_INFO = {
  comercialPhone: '(11) 3045-0826',
  comercialEmail: 'contato@quattroconstrutora.com.br',
  enderecoLinha1: 'Al. Rio Negro, 503 - Conj 907',
  enderecoLinha2: 'Alphaville Industrial – Barueri / SP - CEP 06454-000',
  horario: 'Seg a Qui: 08h às 18h | Sex: 08h às 17h',
};

export type ContatoInfo = typeof DEFAULT_CONTATO_INFO;

// ---------------------------------------------------------------------------
// Imagens avulsas do site (aba "Imagens" do /admin). Cada chave é um "espaço" de imagem.
// ---------------------------------------------------------------------------
export const DEFAULT_IMAGENS = {
  logoCabecalho: '/logo/Logo_Quattro Construtora_cut.svg',
  logoRodape: '/logo/logo_quattro-construtora.svg',
  fotoCirculoProposta: '/img/Amazon_imgRodape.avif',
  bannerContato: '/img/contato-14791.jpg',
  bannerDuvidas: '/img/faq_619.jpg',
  bannerSetores: '/img/Amazon_Entrada.jpg',
  bannerBlog: '/img/BG_CTA_QuattroInc_Site.jpeg',
  bannerPrivacidade: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  bannerTermos: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000',
  grafismoQuem: '/img/Grafismo.png',
  fundoManifestoQuem: '/img/BG-Quem-Somos-Home.jpg',
  fundoTrajetoriaQuem: '/img/trajetoriacrescimento_2148993907.jpg',
  faixaImagemQuem: '/img/Lumini1_Testeira1.avif',
  faixaImagemServicos: '/img/Sequoia_Img1.jpg',
  obrasIndustrial1: '/img/Amazon_Img1.jpg',
  obrasIndustrial2: '/img/CisTambore_Img1.jpg',
  obrasIndustrial3: '/img/Sequoia_Img1.jpg',
  obrasCorporativo1: '/img/Vivo_Img1.jpeg',
  obrasCorporativo2: '/img/Servidores_Img2.jpeg',
  obrasCorporativo3: '/img/vivo_img3.jpeg',
  obrasFarmaceutico1: '/img/CDR_Img1.jpg',
  obrasFarmaceutico2: '/img/Lavoisier_Img2.jpg',
  obrasFarmaceutico3: '/img/HelioBerzaghi_Img3.jpg',
  obrasResidencial1: '/img/Lumini1_Testeira1.avif',
  obrasResidencial2: '/img/Lumini2_Quarto.png',
  obrasResidencial3: '/img/piscina_Lumini3.jpg',
};

export type ImagensDoc = typeof DEFAULT_IMAGENS;
export type ImagemKey = keyof ImagensDoc;

export const GRUPOS_IMAGENS: { id: string; label: string; itens: { key: ImagemKey; label: string; dica?: string }[] }[] = [
  { id: 'geral', label: 'Logos e círculo', itens: [
    { key: 'logoCabecalho', label: 'Logo do cabeçalho', dica: 'Aparece no topo do site e no menu do celular.' },
    { key: 'logoRodape', label: 'Logo do rodapé' },
    { key: 'fotoCirculoProposta', label: 'Círculo "Proposta personalizada"', dica: 'Foto redonda no fim das páginas A Quattro, Serviços, Setores, Dúvidas, Privacidade e Termos.' },
  ] },
  { id: 'banners', label: 'Banners das páginas', itens: [
    { key: 'bannerContato', label: 'Contato' },
    { key: 'bannerDuvidas', label: 'Dúvidas frequentes' },
    { key: 'bannerSetores', label: 'Setores e Obras' },
    { key: 'bannerBlog', label: 'Blog' },
    { key: 'bannerPrivacidade', label: 'Política de Privacidade' },
    { key: 'bannerTermos', label: 'Termos de Uso' },
  ] },
  { id: 'quem', label: 'A Quattro e Serviços', itens: [
    { key: 'grafismoQuem', label: 'Grafismo do banner (A Quattro)' },
    { key: 'fundoManifestoQuem', label: 'Fundo do manifesto (A Quattro)' },
    { key: 'fundoTrajetoriaQuem', label: 'Fundo da trajetória (A Quattro)' },
    { key: 'faixaImagemQuem', label: 'Faixa de imagem (A Quattro)' },
    { key: 'faixaImagemServicos', label: 'Faixa de imagem (Serviços)' },
  ] },
  { id: 'obras', label: 'Grandes obras (A Quattro)', itens: [
    { key: 'obrasIndustrial1', label: 'Industrial & Logística · principal' },
    { key: 'obrasIndustrial2', label: 'Industrial & Logística · detalhe 1' },
    { key: 'obrasIndustrial3', label: 'Industrial & Logística · detalhe 2' },
    { key: 'obrasCorporativo1', label: 'Corporativo · principal' },
    { key: 'obrasCorporativo2', label: 'Corporativo · detalhe 1' },
    { key: 'obrasCorporativo3', label: 'Corporativo · detalhe 2' },
    { key: 'obrasFarmaceutico1', label: 'Farmacêutico · principal' },
    { key: 'obrasFarmaceutico2', label: 'Farmacêutico · detalhe 1' },
    { key: 'obrasFarmaceutico3', label: 'Farmacêutico · detalhe 2' },
    { key: 'obrasResidencial1', label: 'Residencial · principal' },
    { key: 'obrasResidencial2', label: 'Residencial · detalhe 1' },
    { key: 'obrasResidencial3', label: 'Residencial · detalhe 2' },
  ] },
];
