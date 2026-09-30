// src/data/portfolioDefaults.ts
// Conteúdo padrão de Setores e Obras (dados puros, sem ícones).
// Usado pela página pública /setores (enquanto o Firestore não tem dados)
// e pelo painel /admin como ponto de partida da edição.

export const SETORES_PADRAO = [
  {
    slug: 'industrial',
    id: 'industrial',
    title: 'Industrial & Logística',
    desc: 'Engenharia para galpões logísticos de alta tonelagem, parques fabris, centros de distribuição automatizados e estruturas de grande vão livre.',
    nbrs: ['NBR 15575', 'NBR 6118', 'NBR 8800'],
    diferenciais: [
      'Pisos de alta capacidade de carga com nivelamento a laser.',
      'Sistemas estruturais em concreto pré-moldado e aço.',
      'Cobertoras metálicas com isolamento termoacústico subcoberta.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200', alt: 'Fachada Principal' },
      { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200', alt: 'Interior do Galpão' }
    ]
  },
  {
    slug: 'hospitalar',
    id: 'hospitalar',
    title: 'Setor Hospitalar & Saúde',
    desc: 'Projetos e execuções de alta complexidade para centros cirúrgicos, UTIs, laboratórios de análise clínica e salas limpas com contaminação controlada.',
    nbrs: ['RDC 50 ANVISA', 'NBR 7256', 'NBR 12188'],
    diferenciais: [
      'Controle rigoroso de pressão positiva/negativa de ar.',
      'Gases medicinais, redes redundantes de energia e no-breaks.',
      'Revestimentos vinílicos monolíticos bactericidas.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200', alt: 'Centro Cirúrgico' }
    ]
  },
  {
    slug: 'manutencao',
    id: 'manutencao',
    title: 'Manutenção & Facilities',
    desc: 'Gestão preventiva, corretiva e retrofit de ativos prediais corporativos e industriais, garantindo a continuidade operacional e valorização patrimonial.',
    nbrs: ['NBR 5674', 'NBR 14037', 'NR 35'],
    diferenciais: [
      'Equipes dedicadas presenciais ou sob demanda de campo.',
      'Diagnósticos preditivos por termografia e análise de vibração.',
      'Atendimento emergencial 24/7 para plantas críticas.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200', alt: 'Subestação Elétrica' }
    ]
  },
  {
    slug: 'residencial',
    id: 'residencial',
    title: 'Residencial',
    desc: 'Construção e incorporação de residências de alto padrão, vilas corporativas e edifícios de arquitetura autoral com métodos construtivos inovadores.',
    nbrs: ['NBR 15575', 'NBR 9575', 'NBR 5410'],
    diferenciais: [
      'Uso otimizado de Light Steel Frame e estruturas mistas.',
      'Automação residencial integrada e eficiência energética.',
      'Acabamentos refinados e rigor no detalhamento executivo.'
    ],
    imagens: [
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200', alt: 'Piscina & Lazer' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200', alt: 'Fachada Autoral' }
    ]
  }
];

export const OBRAS_PADRAO = [
  {
    id: 1,
    title: 'Centro de Distribuição Logístico Amazon',
    categoriaSlug: 'industrial',
    categoriaLabel: 'Industrial',
    local: 'Cajamar – SP',
    area: '45.000 m²',
    status: 'Concluído',
    capaImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
    resumo: 'Execução de pavimento de alta resistência mecânica, 48 docas niveladoras e sistema de sprinklers K25.',
    descricaoCompleta: 'Execução completa em modelo Turnkey abrangendo terraplenagem, pavimentação rígida de alta capacidade, estrutura em pré-moldados e galeria logística.',
    destaque: true,
    galeriaImages: []
  },
  {
    id: 2,
    title: 'Complexo Hospitalar São Lucas - Ala OESTE',
    categoriaSlug: 'hospitalar',
    categoriaLabel: 'Hospitalar',
    local: 'São Paulo – SP',
    area: '12.800 m²',
    status: 'Concluído',
    capaImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    resumo: 'Construção de 8 novas salas cirúrgicas inteligentes, 30 leitos de UTI e central de esterilização CME.',
    descricaoCompleta: 'Reforma e ampliação hospitalar de alta complexidade mantendo a operação contínua do complexo de saúde existente.',
    destaque: true,
    galeriaImages: []
  },
  {
    id: 3,
    title: 'Lumini Clube Residencial II',
    categoriaSlug: 'residencial',
    categoriaLabel: 'Residencial',
    local: 'Alphaville – Barueri/SP',
    area: '8.500 m²',
    status: 'Em Execução',
    capaImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200',
    resumo: 'Condomínio de residências contemporâneas em Steel Frame com certificação de eficiência energética.',
    descricaoCompleta: 'Condomínio fechado autoral com foco em sustentabilidade, estrutura industrializada leve e acabamentos de altíssimo padrão.',
    destaque: true,
    galeriaImages: []
  }
];

