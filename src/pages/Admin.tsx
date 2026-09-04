// src/pages/Admin.tsx
import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Users, 
  Phone, 
  Save, 
  Plus, 
  Trash2, 
  Lock, 
  LogOut,
  Layers,
  Video,
  Image as ImageIcon,
  Wrench,
  Award,
  Building2,
  Calendar,
  HelpCircle,
  FileText,

  LayoutGrid,
  Upload,
  Loader2,
  ShieldCheck,
  Target
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'quemSomos' | 'setores' | 'servicos' | 'contato'>('home');
  const [uploading, setUploading] = useState<string | null>(null);

  // Helper para simulação/integração de upload via Firebase Storage
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    onSuccess: (url: string) => void,
    fieldId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(fieldId);
    try {
      const uploadedUrl = URL.createObjectURL(file);
      setTimeout(() => {
        onSuccess(uploadedUrl);
        setUploading(null);
        alert(`Arquivo "${file.name}" carregado com sucesso!`);
      }, 1000);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao realizar upload do arquivo.");
      setUploading(null);
    }
  };

  // ===========================================================================
  // ESTADOS: HOME
  // ===========================================================================
  const [homeData, setHomeData] = useState({
    hero: {
      mode: 'carousel' as 'single' | 'carousel' | 'video',
      mediaList: [
        { 
          id: 1,
          type: 'image' as 'image' | 'video', 
          desktopUrl: '/img/bg_hero1.avif', 
          mobileUrl: '/img/bg_hero1_mobile.avif',
          line1BeforeHighlight: 'CIVIL DE',
          highlightPart1: 'ALTA',
          highlightPart2: 'PERFORMANCE',
          line3AfterHighlight: 'E PRECISÃO',
          slideDesc: 'Executamos projetos industriais, corporativos, farmacêuticos e residenciais com rigor técnico NBR, previsibilidade orçamentária e acabamento impecável.',
          ctaText: 'Saiba Mais',
          ctaLink: '/servicos'
        },
        { 
          id: 2,
          type: 'image' as 'image' | 'video', 
          desktopUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=2000', 
          mobileUrl: '',
          line1BeforeHighlight: 'PREVISIBILIDADE E',
          highlightPart1: 'RIGOR',
          highlightPart2: 'ORÇAMENTÁRIO',
          line3AfterHighlight: 'EM TODAS AS ETAPAS',
          slideDesc: 'Gestão Turnkey de ponta a ponta sem surpresas no orçamento final.',
          ctaText: 'Solicitar Cotação',
          ctaLink: '/contato'
        }
      ]
    },
    approach: {
      badge: 'NOSSA ABORDAGEM',
      title: 'Engenharia versátil e soluções completas para sua obra',
      description: 'Atuamos em empreendimentos residenciais, habitação social (Minha Casa Minha Vida), obras corporativas, retrofits e adequações técnicas AVCB/CLCB.',
      card1: {
        title: 'Obras Corporativas & Habitação',
        text: 'Execução de edificações industriais, prédios comerciais e projetos habitacionais integrados, incluindo empreendimentos Minha Casa Minha Vida.'
      },
      card2: {
        title: 'Gestão Turnkey & Regularização',
        text: 'Gerenciamento completo do projeto à entrega final, assegurando conformidade com normas NBR e obtenção de AVCB/CLCB junto aos Bombeiros.'
      },
      card3: {
        title: 'Retrofit, Reformas & Manutenção',
        text: 'Modernização de edificações, renovação de fachadas, reformas estruturais e adequações técnicas para imóveis comerciais e residenciais.'
      }
    },
    aboutMosaic: {
      title: 'Solução completa para a excelência da sua construção',
      description: 'A Quattro Construtora conduz todas as etapas da sua obra com máxima transparência, segurança técnica e rigor orçamentário em todo o Brasil.',
      statNumber: '100%',
      statLabel: 'Conformidade Técnica',
      img1: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000',
      img2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
      img3: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800'
    }
  });

  // ===========================================================================
  // ESTADOS: A QUATTRO (QUEM SOMOS)
  // ===========================================================================
  const [quemSomosData, setQuemSomosData] = useState({
    hero: {
      titleLine1: 'CONHEÇA A',
      titleHighlight: 'NOSSA EMPRESA',
      description: 'Da infraestrutura logística e sedes corporativas à escala de grandes complexos residenciais. Transformamos desafios executivos complexos em soluções sólidas e previsíveis.',
      bgImage: '/img/BG_CTA_QuattroInc_Site.jpeg'
    },
    manifesto: {
      title: 'Soluções End-to-End & Rigor Técnico em Todo o Brasil',
      p1: 'A Quattro Construtora é especializada em soluções end-to-end de alta complexidade. Com um acervo consolidado e equipe técnica altamente capacitada, gerenciamos e executamos canteiros com transparência e precisão orçamentária.',
      p2: 'Atuamos no modelo Turnkey (Design & Build), assumindo a responsabilidade integral por todo o ciclo da obra — desde os estudos preliminares de viabilidade até a entrega final das chaves e obtenção do AVCB.'
    },
    qualidade: {
      quote: '"A Quattro Construtora atua na construção civil e na incorporação de empreendimentos habitacionais, corporativos e industriais com foco na excelência dos produtos e serviços entregues..."',
      seloPbqph: '/selos/SELO_pbqph.png',
      seloIso: '/selos/SELO_ISO9001.png'
    },
    governanca: {
      missao: 'Entregar engenharia de alta performance com compromisso intransigente em qualidade, segurança do trabalho e previsibilidade orçamentária.',
      visao: 'Ser a parceira estratégica referência no mercado nacional em obras complexas e edificações de grande porte.',
      valores: 'Rigor Técnico inegociável, Previsibilidade orçamentária total, Transparência executiva e Integridade absoluta.'
    },
    timeline: [
      { id: 1, fase: 'Fundação', desc: 'Início focado em engenharia consultiva e obras técnicas de alta complexidade.' },
      { id: 2, fase: 'Expansão & Incorporação', desc: 'Cobertura logística em todo o Brasil e consolidação do braço imobiliário (Quattro Inc).' },
      { id: 3, fase: 'Acreditação Máxima', desc: 'Conquista das certificações PBQP-H Nível A e NBR ISO 9001:2015.' }
    ]
  });

  // ===========================================================================
  // ESTADOS: SETORES & OBRAS
  // ===========================================================================
  const [setoresData, setSetoresData] = useState([
    { id: 'industrial', slug: 'industrial-e-logistica', title: 'Industrial & Logística', category: 'Logística & Infraestrutura', desc: 'Galpões logísticos, parques fabris e instalações industriais complexas executadas com alto rigor técnico.' },
    { id: 'hospitalar', slug: 'hospitalar-e-saude', title: 'Setor Hospitalar & Saúde', category: 'Salas Limpas & Anvisa', desc: 'Centros cirúrgicos, UTIs, laboratórios de análise clínica e salas limpas com contaminação controlada.' },
    { id: 'manutencao', slug: 'manutencao-e-facilities', title: 'Manutenção & Facilities', category: 'Retrofit & Manutenção', desc: 'Gestão preventiva, corretiva e retrofit de ativos prediais corporativos e industriais.' },
    { id: 'residencial', slug: 'residencial', title: 'Residencial', category: 'Habitação & MCMV', desc: 'Construção de residências de alto padrão, vilas corporativas e edifícios de arquitetura autoral.' }
  ]);

  const [obrasData, setObrasData] = useState([
    {
      id: 1,
      slug: 'centro-de-distribuicao-amazon',
      title: 'Centro de Distribuição Logístico Amazon',
      categoriaSlug: 'industrial',
      local: 'Cajamar – SP',
      area: '152.500 m²',
      status: 'Concluído (Turnkey)',
      client: 'Amazon Brasil',
      year: '2023',
      capaImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
      galeriaImages: [
        'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200'
      ],
      especificacoes: [
        { label: 'Área Construída', value: '152.500 m²' },
        { label: 'Capacidade do Piso', value: '8 ton/m² (Nivelamento Laser)' }
      ],
      resumo: 'Execução de pavimento de alta resistência mecânica, 48 docas niveladoras e sistema de sprinklers K25.',
      descricaoCompleta: 'Execução completa em modelo Turnkey de mega centro de distribuição logístico com tolerâncias de nivelamento extremamente rigorosas.'
    }
  ]);

  // ===========================================================================
  // ESTADOS: SERVIÇOS
  // ===========================================================================
  const [servicosData, setServicosData] = useState({
    hero: {
      badge: 'SOLUÇÕES INTEGRADAS',
      title: 'Engenharia Civil de Alta Performance',
      description: 'Do planejamento inicial à entrega final das chaves, oferecemos gestão rigorosa, inovação tecnológica e conformidade normativa.'
    },
    lista: [
      {
        id: 'turnkey',
        title: 'Engenharia Turnkey & EPC',
        desc: 'Solução completa do conceito à entrega das chaves. Assumimos a responsabilidade integral pelo projeto, compras, construção e comissionamento.',
        entregaveis: ['Gestão unificada de fornecedores e contratos', 'Preço fechado com previsibilidade orçamentária', 'Prazo de entrega garantido em contrato']
      },
      {
        id: 'gerenciamento',
        title: 'Gerenciamento & Fiscalização',
        desc: 'Supervisão técnica rigorosa do canteiro de obras, garantindo o cumprimento de especificações e controle físico-financeiro.',
        entregaveis: ['Relatórios gerenciais semanais com medições', 'Controle rigoroso de cronograma (Linha de Balanço)']
      },
      {
        id: 'retrofit',
        title: 'Retrofit & Reformas Corporativas',
        desc: 'Modernização de edifícios, plantas fabris e escritórios sem interrupção das atividades operacionais do cliente.',
        entregaveis: ['Atualização de instalações elétricas e hidráulicas', 'Reforço estrutural e adequação de fachadas']
      }
    ],
    fluxo: [
      { passo: '01', titulo: 'Diagnóstico & Viabilidade', desc: 'Análise detalhada do local e estudo de viabilidade.' },
      { passo: '02', titulo: 'Planejamento & BIM', desc: 'Compatibilização de projetos e cronograma físico-financeiro.' },
      { passo: '03', titulo: 'Execução & Controle', desc: 'Mobilização de canteiro e fiscalização contínua.' },
      { passo: '04', titulo: 'Comissionamento & As-Built', desc: 'Testes finais, documentação legal e entrega das chaves.' }
    ]
  });

  // ===========================================================================
  // ESTADOS: CONTATO
  // ===========================================================================
  const [contatoData, setContatoData] = useState({
    comercialPhone: '+55 (11) 4003-0000',
    comercialEmail: 'contato@quattroconstrutora.com.br',
    endereco: 'Al. Rio Negro, 503 - Conj 907 - Alphaville Industrial, Barueri/SP - CEP 06454-000',
    faqs: [
      { id: 1, pergunta: 'Sou vizinho de uma obra em andamento. Como relatar um imprevisto?', resposta: 'Selecione a opção "Sou Vizinho de Obra" no formulário de contato.' },
      { id: 2, pergunta: 'Qual o prazo médio de retorno para solicitações de cotação?', resposta: 'Propostas preliminares são enviadas em até 48 horas úteis.' }
    ]
  });

  const handleSave = (sectionName: string) => {
    alert(`As alterações de "${sectionName}" foram salvas com sucesso!`);
  };

  // ---------------------------------------------------------------------------
  // TELA DE LOGIN
  // ---------------------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 font-['Montserrat'] z-[200] relative">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center relative z-10">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
              Painel CMS
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">QUATTRO CONSTRUTORA</h1>
            <p className="text-zinc-400 text-xs font-sans">Gestão Completa do Site</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-5 relative z-10 font-sans">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-['Montserrat']">E-mail Corporativo</label>
              <input type="email" defaultValue="diretoria@quattroconstrutora.com.br" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none transition-colors" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-['Montserrat']">Senha de Acesso</label>
              <input type="password" defaultValue="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none transition-colors" />
            </div>

            <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] flex items-center justify-center gap-2 cursor-pointer">
              <Lock className="w-4 h-4" />
              <span>Acessar Painel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DASHBOARD PRINCIPAL
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f8f9f6] text-zinc-900 font-sans flex flex-col md:flex-row relative z-[200]">
      
      {/* SIDEBAR NAVEGAÇÃO */}
      <aside className="w-full md:w-64 bg-zinc-950 text-white p-6 flex flex-col justify-between border-r border-zinc-800 shrink-0 font-['Montserrat']">
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="bg-amber-500 text-zinc-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">CMS Admin</span>
            <h2 className="text-lg font-black text-white tracking-tight">QUATTRO</h2>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold uppercase tracking-wider">
            <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === 'home' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button onClick={() => setActiveTab('quemSomos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === 'quemSomos' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
              <Users className="w-4 h-4" />
              <span>A Quattro</span>
            </button>

            <button onClick={() => setActiveTab('setores')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === 'setores' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
              <Layers className="w-4 h-4" />
              <span>Setores & Obras</span>
            </button>

            <button onClick={() => setActiveTab('servicos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === 'servicos' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
              <Wrench className="w-4 h-4" />
              <span>Serviços</span>
            </button>

            <button onClick={() => setActiveTab('contato')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === 'contato' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}>
              <Phone className="w-4 h-4" />
              <span>Contato & Sede</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-rose-400 transition-colors uppercase tracking-wider cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-6xl">
        
        {/* ==================================================================== */}
        {/* ABA: HOME */}
        {/* ==================================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Personalização da Página</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Página Inicial (Home)</h1>
              </div>
            </div>

            {/* 1. HERO HOME */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-500" />
                  <span>1. Mídias e Textos do Hero</span>
                </h2>
                <button onClick={() => handleSave('Hero_Home')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Hero</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Modo da Mídia</label>
                  <select 
                    value={homeData.hero.mode} 
                    onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, mode: e.target.value as any}})}
                    className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none"
                  >
                    <option value="carousel">Carrossel de Imagens/Vídeos</option>
                    <option value="single">Imagem Única</option>
                    <option value="video">Vídeo em Destaque</option>
                  </select>
                </div>
              </div>

              {/* SLIDES DO HERO */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Slides Cadastrados</span>
                  <button 
                    onClick={() => {
                      const newMedia = {
                        id: Date.now(),
                        type: 'image' as 'image' | 'video',
                        desktopUrl: '/img/placeholder.jpg',
                        mobileUrl: '',
                        line1BeforeHighlight: 'CIVIL DE',
                        highlightPart1: 'ALTA',
                        highlightPart2: 'PERFORMANCE',
                        line3AfterHighlight: 'E PRECISÃO',
                        slideDesc: 'Descrição detalhada do slide.',
                        ctaText: 'Saiba Mais',
                        ctaLink: '/servicos'
                      };
                      setHomeData({...homeData, hero: {...homeData.hero, mediaList: [...homeData.hero.mediaList, newMedia]}});
                    }}
                    className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Slide</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {homeData.hero.mediaList.map((media, idx) => (
                    <div key={media.id} className="p-5 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                        <span className="text-xs font-bold text-amber-600 font-['Montserrat'] uppercase">Slide #{idx + 1}</span>
                        <button 
                          onClick={() => {
                            const updated = homeData.hero.mediaList.filter(m => m.id !== media.id);
                            setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                          }}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Tipo Mídia</label>
                          <select 
                            value={media.type} 
                            onChange={(e) => {
                              const updated = [...homeData.hero.mediaList];
                              updated[idx].type = e.target.value as any;
                              setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                            }}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-900"
                          >
                            <option value="image">Imagem</option>
                            <option value="video">Vídeo (.mp4)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Desktop URL</label>
                            <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                              {uploading === `desktop-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                              <span>Upload</span>
                              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].desktopUrl = url;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }, `desktop-${idx}`)} />
                            </label>
                          </div>
                          <input 
                            type="text" 
                            value={media.desktopUrl} 
                            onChange={(e) => {
                              const updated = [...homeData.hero.mediaList];
                              updated[idx].desktopUrl = e.target.value;
                              setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                            }}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Mobile URL</label>
                            <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                              {uploading === `mobile-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                              <span>Upload</span>
                              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].mobileUrl = url;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }, `mobile-${idx}`)} />
                            </label>
                          </div>
                          <input 
                            type="text" 
                            value={media.mobileUrl} 
                            onChange={(e) => {
                              const updated = [...homeData.hero.mediaList];
                              updated[idx].mobileUrl = e.target.value;
                              setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                            }}
                            placeholder="Opcional"
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700"
                          />
                        </div>
                      </div>

                      {/* ESTRUTURA DOS CAMPOS SEPARADOS DO TITULO ORIGINAL */}
                      <div className="pt-3 border-t border-zinc-200/80 space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block font-['Montserrat']">Partes do Título Original</span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Linha 1 Normal</label>
                            <input 
                              type="text" 
                              value={media.line1BeforeHighlight} 
                              onChange={(e) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].line1BeforeHighlight = e.target.value;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }}
                              placeholder="Ex: CIVIL DE"
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950 font-['Montserrat']"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Amarelo 1 (Topo)</label>
                            <input 
                              type="text" 
                              value={media.highlightPart1} 
                              onChange={(e) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].highlightPart1 = e.target.value;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }}
                              placeholder="Ex: ALTA"
                              className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-black text-zinc-950 font-['Montserrat']"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Amarelo 2 (Linha 2)</label>
                            <input 
                              type="text" 
                              value={media.highlightPart2} 
                              onChange={(e) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].highlightPart2 = e.target.value;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }}
                              placeholder="Ex: PERFORMANCE"
                              className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-black text-zinc-950 font-['Montserrat']"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Linha 3 Final</label>
                            <input 
                              type="text" 
                              value={media.line3AfterHighlight} 
                              onChange={(e) => {
                                const updated = [...homeData.hero.mediaList];
                                updated[idx].line3AfterHighlight = e.target.value;
                                setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                              }}
                              placeholder="Ex: E PRECISÃO"
                              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950 font-['Montserrat']"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Descrição do Slide</label>
                          <input 
                            type="text" 
                            value={media.slideDesc} 
                            onChange={(e) => {
                              const updated = [...homeData.hero.mediaList];
                              updated[idx].slideDesc = e.target.value;
                              setHomeData({...homeData, hero: {...homeData.hero, mediaList: updated}});
                            }}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-700 font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. NOSSA ABORDAGEM (APPROACH) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-amber-500" />
                  <span>2. Nossa Abordagem (3 Cards)</span>
                </h2>
                <button onClick={() => handleSave('Approach_Home')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Abordagem</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Título Geral da Seção</label>
                  <input 
                    type="text" 
                    value={homeData.approach.title} 
                    onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, title: e.target.value}})} 
                    className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Descrição Geral</label>
                  <textarea 
                    rows={2}
                    value={homeData.approach.description} 
                    onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, description: e.target.value}})} 
                    className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 outline-none resize-none font-sans" 
                  />
                </div>
              </div>

              {/* OS 3 CARDS DA ABORDAGEM */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-zinc-100">
                {/* CARD 1 */}
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Card 1 (Branco)</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Título</label>
                    <input 
                      type="text" 
                      value={homeData.approach.card1.title} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card1: {...homeData.approach.card1, title: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Texto Descritivo</label>
                    <textarea 
                      rows={3}
                      value={homeData.approach.card1.text} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card1: {...homeData.approach.card1, text: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs text-zinc-700 resize-none" 
                    />
                  </div>
                </div>

                {/* CARD 2 */}
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Card 2 (Amarelo)</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Título</label>
                    <input 
                      type="text" 
                      value={homeData.approach.card2.title} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card2: {...homeData.approach.card2, title: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Texto Descritivo</label>
                    <textarea 
                      rows={3}
                      value={homeData.approach.card2.text} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card2: {...homeData.approach.card2, text: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs text-zinc-700 resize-none" 
                    />
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Card 3 (Escuro)</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Título</label>
                    <input 
                      type="text" 
                      value={homeData.approach.card3.title} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card3: {...homeData.approach.card3, title: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500">Texto Descritivo</label>
                    <textarea 
                      rows={3}
                      value={homeData.approach.card3.text} 
                      onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card3: {...homeData.approach.card3, text: e.target.value}}})} 
                      className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs text-zinc-700 resize-none" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. MOSAICO HOME (3 IMAGENS + 2 LINHAS DE TEXTO) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-500" />
                  <span>3. Mosaico "Quem Somos" (3 Imagens & 2 Linhas de Texto)</span>
                </h2>
                <button onClick={() => handleSave('AboutMosaic_Home')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Mosaico</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Linha 1: Título Principal do Mosaico</label>
                  <input 
                    type="text" 
                    value={homeData.aboutMosaic.title} 
                    onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, title: e.target.value}})} 
                    className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Linha 2: Descrição Institucional</label>
                  <textarea 
                    rows={3}
                    value={homeData.aboutMosaic.description} 
                    onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, description: e.target.value}})} 
                    className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 outline-none resize-none font-sans" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Número Destaque</label>
                  <input type="text" value={homeData.aboutMosaic.statNumber} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, statNumber: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-amber-600 font-bold outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Rótulo do Número</label>
                  <input type="text" value={homeData.aboutMosaic.statLabel} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, statLabel: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 font-bold outline-none" />
                </div>

                <div className="md:col-span-2 space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block font-['Montserrat']">URLs das 3 Imagens do Mosaico (Com Upload)</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem 1 (Topo)</label>
                        <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                          {uploading === 'mosaic-img1' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img1: url}}), 'mosaic-img1')} />
                        </label>
                      </div>
                      <input type="text" value={homeData.aboutMosaic.img1} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img1: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700 outline-none" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem 2 (Base)</label>
                        <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                          {uploading === 'mosaic-img2' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img2: url}}), 'mosaic-img2')} />
                        </label>
                      </div>
                      <input type="text" value={homeData.aboutMosaic.img2} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img2: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700 outline-none" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem 3 (Rodapé)</label>
                        <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                          {uploading === 'mosaic-img3' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                          <span>Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img3: url}}), 'mosaic-img3')} />
                        </label>
                      </div>
                      <input type="text" value={homeData.aboutMosaic.img3} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img3: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700 outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: A QUATTRO (QUEM SOMOS - COMPLETO) */}
        {/* ==================================================================== */}
        {activeTab === 'quemSomos' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Gerenciamento Institucional</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">A Construtora (Quem Somos)</h1>
              </div>
            </div>

            {/* 1. HERO INSTITUCIONAL */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <span>1. Banner Hero Institucional</span>
                </h2>
                <button onClick={() => handleSave('Hero_QuemSomos')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Banner</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Linha de Título 1</label>
                  <input type="text" value={quemSomosData.hero.titleLine1} onChange={(e) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, titleLine1: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Título Destaque (Fundo Amarelo)</label>
                  <input type="text" value={quemSomosData.hero.titleHighlight} onChange={(e) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, titleHighlight: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-black text-zinc-950 outline-none" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Descrição do Banner</label>
                  <textarea rows={3} value={quemSomosData.hero.description} onChange={(e) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, description: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 outline-none resize-none font-sans" />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Imagem de Fundo do Banner</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1 font-['Montserrat']">
                      {uploading === 'hero-quemsomos-bg' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Fazer Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, bgImage: url}}), 'hero-quemsomos-bg')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.hero.bgImage} onChange={(e) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, bgImage: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700 outline-none" />
                </div>
              </div>
            </div>

            {/* 2. MANIFESTO INSTITUCIONAL */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span>2. Manifesto Institucional & História</span>
                </h2>
                <button onClick={() => handleSave('Manifesto_QuemSomos')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Manifesto</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Título do Manifesto</label>
                  <input type="text" value={quemSomosData.manifesto.title} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, title: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Parágrafo 1</label>
                  <textarea rows={3} value={quemSomosData.manifesto.p1} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, p1: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 outline-none resize-none font-sans" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Parágrafo 2</label>
                  <textarea rows={3} value={quemSomosData.manifesto.p2} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, p2: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 outline-none resize-none font-sans" />
                </div>
              </div>
            </div>

            {/* 3. GOVERNANÇA (MISSÃO, VISÃO, VALORES) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-500" />
                  <span>3. Governança (Missão, Visão e Valores)</span>
                </h2>
                <button onClick={() => handleSave('Governanca_QuemSomos')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Governança</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Missão</span>
                  <textarea rows={4} value={quemSomosData.governanca.missao} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, missao: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-700 resize-none font-sans" />
                </div>

                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Visão</span>
                  <textarea rows={4} value={quemSomosData.governanca.visao} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, visao: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-700 resize-none font-sans" />
                </div>

                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase text-amber-600 block font-['Montserrat']">Valores</span>
                  <textarea rows={4} value={quemSomosData.governanca.valores} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, valores: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-700 resize-none font-sans" />
                </div>
              </div>
            </div>

            {/* 4. CERTIFICAÇÕES E SELOS */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>4. Certificações e Selos Oficiais</span>
                </h2>
                <button onClick={() => handleSave('Selos')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Selos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Selo PBQP-H</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1 font-['Montserrat']">
                      {uploading === 'selo-pbqph' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Fazer Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloPbqph: url}}), 'selo-pbqph')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.qualidade.seloPbqph} onChange={(e) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloPbqph: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700 outline-none" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Selo ISO 9001</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1 font-['Montserrat']">
                      {uploading === 'selo-iso' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Fazer Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloIso: url}}), 'selo-iso')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.qualidade.seloIso} onChange={(e) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloIso: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700 outline-none" />
                </div>
              </div>
            </div>

            {/* 5. TRAJETÓRIA E MARCOS HISTÓRICOS */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>5. Trajetória e Marcos Históricos</span>
                </h2>
                <button 
                  onClick={() => {
                    const newMarco = { id: Date.now(), fase: 'Nova Fase Histórica', desc: 'Descrição do marco alcançado.' };
                    setQuemSomosData({...quemSomosData, timeline: [...quemSomosData.timeline, newMarco]});
                  }}
                  className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Marco</span>
                </button>
              </div>

              <div className="space-y-4">
                {quemSomosData.timeline.map((marco, idx) => (
                  <div key={marco.id} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 space-y-2 w-full">
                      <input 
                        type="text" 
                        value={marco.fase} 
                        onChange={(e) => {
                          const updated = [...quemSomosData.timeline];
                          updated[idx].fase = e.target.value;
                          setQuemSomosData({...quemSomosData, timeline: updated});
                        }}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-600 font-['Montserrat']"
                      />
                      <input 
                        type="text" 
                        value={marco.desc} 
                        onChange={(e) => {
                          const updated = [...quemSomosData.timeline];
                          updated[idx].desc = e.target.value;
                          setQuemSomosData({...quemSomosData, timeline: updated});
                        }}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-700 font-sans"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const updated = quemSomosData.timeline.filter((_, i) => i !== idx);
                        setQuemSomosData({...quemSomosData, timeline: updated});
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: SETORES & OBRAS */}
        {/* ==================================================================== */}
        {activeTab === 'setores' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Gerenciamento de Portfólio</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Setores de Atuação & Obras</h1>
              </div>
            </div>

            {/* 1. GERENCIAMENTO DE SETORES */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <span>1. Cadastrar / Editar Setores de Atuação</span>
                </h2>
                <button 
                  onClick={() => {
                    const newSetor = {
                      id: `setor-${Date.now()}`,
                      slug: 'novo-setor',
                      title: 'Novo Setor de Atuação',
                      category: 'Categoria Exemplo',
                      desc: 'Descrição técnica do novo setor.'
                    };
                    setSetoresData([...setoresData, newSetor]);
                  }}
                  className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Setor</span>
                </button>
              </div>

              <div className="space-y-6">
                {setoresData.map((setor, idx) => (
                  <div key={setor.id} className="p-6 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Setor #{idx + 1} ({setor.id})</span>
                      <button 
                        onClick={() => {
                          const updated = setoresData.filter((_, i) => i !== idx);
                          setSetoresData(updated);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Título do Setor</label>
                        <input 
                          type="text" 
                          value={setor.title} 
                          onChange={(e) => {
                            const updated = [...setoresData];
                            updated[idx].title = e.target.value;
                            setSetoresData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950 font-['Montserrat']"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Slug da URL</label>
                        <input 
                          type="text" 
                          value={setor.slug} 
                          onChange={(e) => {
                            const updated = [...setoresData];
                            updated[idx].slug = e.target.value;
                            setSetoresData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Categoria</label>
                        <input 
                          type="text" 
                          value={setor.category} 
                          onChange={(e) => {
                            const updated = [...setoresData];
                            updated[idx].category = e.target.value;
                            setSetoresData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-900 font-['Montserrat']"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Descrição Curta</label>
                      <textarea 
                        rows={2}
                        value={setor.desc} 
                        onChange={(e) => {
                          const updated = [...setoresData];
                          updated[idx].desc = e.target.value;
                          setSetoresData(updated);
                        }}
                        className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-600 resize-none font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. GERENCIAMENTO DE OBRAS DO PORTFÓLIO */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-500" />
                  <span>2. Cadastrar / Editar Obras Executadas</span>
                </h2>
                <button 
                  onClick={() => {
                    const newObra = {
                      id: Date.now(),
                      slug: 'nova-obra-executada',
                      title: 'Nova Obra Executada',
                      categoriaSlug: 'industrial',
                      local: 'Cidade – UF',
                      area: '10.000 m²',
                      status: 'Em Execução',
                      client: 'Cliente Exemplo',
                      year: '2024',
                      capaImage: '/img/placeholder.jpg',
                      galeriaImages: ['/img/placeholder.jpg'],
                      especificacoes: [{ label: 'Área Construída', value: '10.000 m²' }],
                      resumo: 'Resumo executivo da obra.',
                      descricaoCompleta: 'Descrição detalhada do projeto.'
                    };
                    setObrasData([...obrasData, newObra]);
                  }}
                  className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Obra</span>
                </button>
              </div>

              <div className="space-y-8">
                {obrasData.map((obra, idx) => (
                  <div key={obra.id} className="p-6 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Obra #{idx + 1} ({obra.slug})</span>
                      <button 
                        onClick={() => {
                          const updated = obrasData.filter((_, i) => i !== idx);
                          setObrasData(updated);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Nome da Obra</label>
                        <input 
                          type="text" 
                          value={obra.title} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].title = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950 font-['Montserrat']"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Slug na URL</label>
                        <input 
                          type="text" 
                          value={obra.slug} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].slug = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Setor Vinculado</label>
                        <select 
                          value={obra.categoriaSlug} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].categoriaSlug = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-900"
                        >
                          {setoresData.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Status</label>
                        <input 
                          type="text" 
                          value={obra.status} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].status = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Localização</label>
                        <input 
                          type="text" 
                          value={obra.local} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].local = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-900"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Área Construída</label>
                        <input 
                          type="text" 
                          value={obra.area} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].area = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-900"
                        />
                      </div>

                      {/* CAPA + UPLOAD */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem Capa</label>
                          <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5 font-['Montserrat']">
                            {uploading === `obra-capa-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                            <span>Upload</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                              const updated = [...obrasData];
                              updated[idx].capaImage = url;
                              setObrasData(updated);
                            }, `obra-capa-${idx}`)} />
                          </label>
                        </div>
                        <input 
                          type="text" 
                          value={obra.capaImage} 
                          onChange={(e) => {
                            const updated = [...obrasData];
                            updated[idx].capaImage = e.target.value;
                            setObrasData(updated);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700"
                        />
                      </div>
                    </div>

                    {/* GALERIA INTERNA */}
                    <div className="space-y-2 pt-2 border-t border-zinc-200/80">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Galeria Interna da Obra</label>
                        <button 
                          onClick={() => {
                            const updated = [...obrasData];
                            updated[idx].galeriaImages.push('/img/placeholder.jpg');
                            setObrasData(updated);
                          }}
                          className="text-[10px] font-bold text-amber-600 hover:underline font-['Montserrat'] cursor-pointer"
                        >
                          + Adicionar Imagem na Galeria
                        </button>
                      </div>

                      <div className="space-y-2">
                        {obra.galeriaImages.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={imgUrl} 
                              onChange={(e) => {
                                const updated = [...obrasData];
                                updated[idx].galeriaImages[imgIdx] = e.target.value;
                                setObrasData(updated);
                              }}
                              className="flex-1 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-700"
                            />
                            <label className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                                const updated = [...obrasData];
                                updated[idx].galeriaImages[imgIdx] = url;
                                setObrasData(updated);
                              }, `obra-galeria-${idx}-${imgIdx}`)} />
                            </label>
                            <button 
                              onClick={() => {
                                const updated = [...obrasData];
                                updated[idx].galeriaImages = updated[idx].galeriaImages.filter((_, i) => i !== imgIdx);
                                setObrasData(updated);
                              }}
                              className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: SERVIÇOS */}
        {/* ==================================================================== */}
        {activeTab === 'servicos' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Gerenciamento da Página</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Engenharia & Serviços</h1>
              </div>
            </div>

            {/* HERO SERVIÇOS */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-500" />
                  <span>1. Banner Hero da Página de Serviços</span>
                </h2>
                <button onClick={() => handleSave('Hero_Serviços')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Hero</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Badge Superior</label>
                  <input type="text" value={servicosData.hero.badge} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, badge: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Título Principal</label>
                  <input type="text" value={servicosData.hero.title} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, title: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Descrição</label>
                  <textarea rows={3} value={servicosData.hero.description} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, description: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 outline-none resize-none font-sans" />
                </div>
              </div>
            </div>

            {/* LISTA DE SERVIÇOS */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <span>2. Serviços Prestados & Entregáveis</span>
                </h2>
                <button onClick={() => handleSave('Serviços')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Serviços</span>
                </button>
              </div>

              <div className="space-y-6">
                {servicosData.lista.map((servico, idx) => (
                  <div key={servico.id} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3">
                    <input 
                      type="text" 
                      value={servico.title} 
                      onChange={(e) => {
                        const updated = [...servicosData.lista];
                        updated[idx].title = e.target.value;
                        setServicosData({...servicosData, lista: updated});
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm font-bold text-zinc-950 font-['Montserrat']"
                    />
                    <textarea 
                      rows={2}
                      value={servico.desc} 
                      onChange={(e) => {
                        const updated = [...servicosData.lista];
                        updated[idx].desc = e.target.value;
                        setServicosData({...servicosData, lista: updated});
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-600 resize-none font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: CONTATO */}
        {/* ==================================================================== */}
        {activeTab === 'contato' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Canais Institucionais</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Atendimento & Sede</h1>
              </div>
            </div>

            {/* INFORMAÇÕES DE CONTATO */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span>1. Informações de Contato</span>
                </h2>
                <button onClick={() => handleSave('Contato')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer">
                  <Save className="w-4 h-4 inline-block mr-1" />
                  <span>Salvar Contato</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Telefone Comercial</label>
                  <input type="text" value={contatoData.comercialPhone} onChange={(e) => setContatoData({...contatoData, comercialPhone: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">E-mail Direto</label>
                  <input type="email" value={contatoData.comercialEmail} onChange={(e) => setContatoData({...contatoData, comercialEmail: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-['Montserrat']">Endereço da Sede Administrativa</label>
                  <input type="text" value={contatoData.endereco} onChange={(e) => setContatoData({...contatoData, endereco: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 outline-none" />
                </div>
              </div>
            </div>

            {/* DÚVIDAS FREQUENTES (FAQS) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <span>2. Perguntas Frequentes (FAQs)</span>
                </h2>
                <button 
                  onClick={() => {
                    const newFaq = { id: Date.now(), pergunta: 'Nova Pergunta?', resposta: 'Resposta para a dúvida informada.' };
                    setContatoData({...contatoData, faqs: [...contatoData.faqs, newFaq]});
                  }}
                  className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Pergunta</span>
                </button>
              </div>

              <div className="space-y-4">
                {contatoData.faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 font-['Montserrat']">Pergunta #{idx + 1}</span>
                      <button 
                        onClick={() => {
                          const updated = contatoData.faqs.filter((_, i) => i !== idx);
                          setContatoData({...contatoData, faqs: updated});
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input 
                      type="text" 
                      value={faq.pergunta} 
                      onChange={(e) => {
                        const updated = [...contatoData.faqs];
                        updated[idx].pergunta = e.target.value;
                        setContatoData({...contatoData, faqs: updated});
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950 font-['Montserrat']"
                    />

                    <textarea 
                      rows={2}
                      value={faq.resposta} 
                      onChange={(e) => {
                        const updated = [...contatoData.faqs];
                        updated[idx].resposta = e.target.value;
                        setContatoData({...contatoData, faqs: updated});
                      }}
                      className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs text-zinc-600 resize-none font-sans"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;