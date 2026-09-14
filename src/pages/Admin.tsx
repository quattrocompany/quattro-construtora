// src/pages/Admin.tsx
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { 
  Home as HomeIcon, Users, Phone, Save, Plus, Trash2, Lock, LogOut, Layers, Video, 
  Image as ImageIcon, Wrench, Award, Building2, HelpCircle, FileText, LayoutGrid, 
  Upload, Loader2, ShieldCheck, Target, BookOpen, Bold, Italic, Underline, List, 
  Link2, AlignLeft, ImagePlus, Clock, Settings
} from 'lucide-react';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'quemSomos' | 'setores' | 'servicos' | 'contato' | 'blog'>('home');
  const [uploading, setUploading] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<string | null>(null);

  // UPLOAD REAL PARA O FIREBASE STORAGE (ARQUIVO ÚNICO)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void, fieldId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(fieldId);
    try {
      const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      onSuccess(url);
      alert(`Arquivo carregado com sucesso!`);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar arquivo para a nuvem.");
    } finally {
      setUploading(null);
    }
  };

  // UPLOAD REAL PARA O FIREBASE STORAGE (MÚLTIPLOS ARQUIVOS)
  const handleMultipleFilesUpload = async (files: FileList | null, onSuccess: (urls: string[]) => void, fieldId: string) => {
    if (!files || files.length === 0) return;

    setUploading(fieldId);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileRef = ref(storage, `uploads/galerias/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      });

      const urls = await Promise.all(uploadPromises);
      onSuccess(urls);
    } catch (error) {
      console.error("Erro no upload múltiplo:", error);
      alert("Erro ao enviar as fotos para a nuvem.");
    } finally {
      setUploading(null);
    }
  };

  // SALVAR REAL NO BANCO DE DADOS FIRESTORE
  const handleSave = async (sectionName: string) => {
    try {
      if (sectionName === 'Setores e Obras' || activeTab === 'setores') {
        await setDoc(doc(db, 'site_data', 'portfolio'), { setores: setoresData, obras: obrasData });
      } else if (activeTab === 'home' || sectionName.includes('Home')) {
        await setDoc(doc(db, 'site_data', 'home'), homeData);
      } else if (activeTab === 'quemSomos' || sectionName.includes('QuemSomos') || sectionName === 'Selos') {
        await setDoc(doc(db, 'site_data', 'quemsomos'), quemSomosData);
      } else if (activeTab === 'servicos' || sectionName.includes('Serviços')) {
        await setDoc(doc(db, 'site_data', 'servicos'), servicosData);
      } else if (activeTab === 'contato' || sectionName === 'Contato') {
        await setDoc(doc(db, 'site_data', 'contato'), contatoData);
      } else if (activeTab === 'blog' || sectionName === 'Blog') {
        await setDoc(doc(db, 'site_data', 'blog'), { posts: blogData });
      }
      alert(`Sucesso! Os dados de "${sectionName}" foram salvos no Firestore e publicados no site.`);
    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
      alert("Erro ao salvar dados no Firestore. Verifique as permissões.");
    }
  };

  // BUSCA OS DADOS DE TODAS AS ABAS NO BANCO QUANDO O ADMIN ABRIR
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const portfolioSnap = await getDoc(doc(db, 'site_data', 'portfolio'));
        if (portfolioSnap.exists()) {
          const data = portfolioSnap.data();
          if (data.setores) setSetoresData(data.setores);
          if (data.obras) setObrasData(data.obras);
        }

        const homeSnap = await getDoc(doc(db, 'site_data', 'home'));
        if (homeSnap.exists()) setHomeData(homeSnap.data() as any);

        const qsSnap = await getDoc(doc(db, 'site_data', 'quemsomos'));
        if (qsSnap.exists()) setQuemSomosData(qsSnap.data() as any);

        const servSnap = await getDoc(doc(db, 'site_data', 'servicos'));
        if (servSnap.exists()) setServicosData(servSnap.data() as any);

        const contatoSnap = await getDoc(doc(db, 'site_data', 'contato'));
        if (contatoSnap.exists()) setContatoData(contatoSnap.data() as any);

        const blogSnap = await getDoc(doc(db, 'site_data', 'blog'));
        if (blogSnap.exists()) setBlogData(blogSnap.data().posts || []);
      } catch (err) {
        console.error("Erro ao carregar dados do Firestore:", err);
      }
    };
    fetchAdminData();
  }, []);

  // ESTADOS: HOME
  const [homeData, setHomeData] = useState({
    hero: {
      mode: 'carousel' as 'single' | 'carousel' | 'video',
      mediaList: [
        { 
          id: 1, type: 'image' as 'image' | 'video', desktopUrl: '/img/bg_hero1.avif', mobileUrl: '/img/bg_hero1_mobile.avif',
          line1BeforeHighlight: 'CIVIL DE', highlightPart1: 'ALTA', highlightPart2: 'PERFORMANCE', line3AfterHighlight: 'E PRECISÃO',
          slideDesc: 'Executamos projetos industriais, corporativos e residenciais com rigor técnico.',
          ctaText: 'Saiba Mais', ctaLink: '/servicos'
        }
      ]
    },
    approach: {
      badge: 'NOSSA ABORDAGEM',
      title: 'Engenharia versátil e soluções completas',
      description: 'Atuamos em empreendimentos de alta complexidade em todo território nacional.',
      card1: { title: 'Obras Corporativas', text: 'Execução de edificações industriais e centros logísticos.' },
      card2: { title: 'Gestão Turnkey', text: 'Gerenciamento completo do projeto à entrega final.' },
      card3: { title: 'Retrofit & Manutenção', text: 'Modernização de edificações operacionais e reforços estruturais.' }
    },
    aboutMosaic: {
      title: 'Solução completa para a excelência da sua construção',
      description: 'Conduzimos todas as etapas da obra com máxima transparência e segurança técnica.',
      statNumber: '100%',
      statLabel: 'Conformidade Técnica',
      img1: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000',
      img2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800',
      img3: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800'
    }
  });

  // ESTADOS: QUEM SOMOS
  const [quemSomosData, setQuemSomosData] = useState({
    hero: {
      titleLine1: 'CONHEÇA A',
      titleHighlight: 'NOSSA EMPRESA',
      description: 'Da infraestrutura logística e sedes corporativas à escala de grandes complexos.',
      bgImage: '/img/BG_CTA_QuattroInc_Site.jpeg'
    },
    manifesto: {
      title: 'Soluções End-to-End & Rigor Técnico',
      p1: 'A Quattro Construtora é especializada em soluções end-to-end de alta complexidade.',
      p2: 'Atuamos no modelo Turnkey, assumindo a responsabilidade integral pelo ciclo da obra.'
    },
    qualidade: {
      quote: '"A Quattro Construtora atua com excelência construtiva focada na conformidade normativa."',
      seloPbqph: '/selos/SELO_pbqph.png',
      seloIso: '/selos/SELO_ISO9001.png'
    },
    governanca: {
      missao: 'Entregar engenharia de alta performance com compromisso intransigente.',
      visao: 'Ser a parceira estratégica referência no mercado nacional.',
      valores: 'Rigor Técnico inegociável, Previsibilidade total e Transparência executiva.'
    },
    timeline: [
      { id: 1, fase: 'Fundação', desc: 'Início focado em engenharia consultiva e pequenas reformas.' },
      { id: 2, fase: 'Expansão & Incorporação', desc: 'Cobertura logística em todo o Brasil e consolidação imobiliária.' }
    ]
  });

  // ESTADOS: SETORES & OBRAS
  const [setoresData, setSetoresData] = useState([
    { 
      id: 'industrial', slug: 'industrial-e-logistica', title: 'Industrial & Logística', category: 'Logística', desc: 'Galpões logísticos e instalações complexas.', 
      imagens: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200', alt: 'Fachada Principal' }] 
    }
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
        { url: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200', alt: 'Área Externa' }
      ],
      especificacoes: [{ label: 'Área Construída', value: '152.500 m²' }],
      resumo: 'Execução de pavimento de alta resistência mecânica.',
      descricaoCompleta: 'Execução completa em modelo Turnkey detalhada no modal do projeto.'
    }
  ]);

  // ESTADOS: SERVIÇOS
  const [servicosData, setServicosData] = useState({
    hero: {
      badge: 'SOLUÇÕES INTEGRADAS',
      title: 'Engenharia Civil de Alta Performance',
      description: 'Do planejamento inicial à entrega final das chaves, oferecemos gestão rigorosa.'
    },
    lista: [
      {
        id: 'turnkey',
        title: 'Engenharia Turnkey & EPC',
        desc: 'Solução completa do conceito à entrega das chaves.',
        entregaveis: ['Gestão unificada de contratos', 'Preço fechado']
      }
    ],
    fluxo: [
      { passo: '01', titulo: 'Diagnóstico & Viabilidade', desc: 'Análise detalhada do local.' },
      { passo: '02', titulo: 'Planejamento & BIM', desc: 'Compatibilização de projetos e cronograma.' },
      { passo: '03', titulo: 'Execução & Controle', desc: 'Mobilização de canteiro e fiscalização.' },
      { passo: '04', titulo: 'Comissionamento', desc: 'Testes finais e entrega das chaves.' }
    ]
  });

  // ESTADOS: CONTATO & BLOG
  const [contatoData, setContatoData] = useState({
    comercialPhone: '+55 (11) 4003-0000',
    comercialEmail: 'contato@quattroconstrutora.com.br',
    endereco: 'Al. Rio Negro, 503 - Barueri/SP',
    faqs: [
      { id: 1, pergunta: 'Qual o prazo médio de retorno?', resposta: 'Propostas enviadas em até 48 horas.' }
    ]
  });

  const [blogData, setBlogData] = useState([
    {
      id: 1,
      title: 'Novas normas técnicas em 2026',
      author: 'Eng. Carlos',
      date: '2026-05-12',
      capaImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?q=80&w=1200',
      content: '<p>O cenário exige inovações...</p>'
    }
  ]);

  // TELA DE LOGIN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 font-['Montserrat'] z-[200] relative">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl">
          <div className="space-y-3 text-center">
            <span className="inline-block bg-amber-500 text-zinc-950 text-xs font-bold uppercase px-3 py-1 rounded-md">Painel CMS</span>
            <h1 className="text-2xl font-black text-white tracking-tight">QUATTRO CONSTRUTORA</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-5 font-sans">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase font-['Montserrat']">E-mail</label>
              <input type="email" defaultValue="diretoria@quattroconstrutora.com.br" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase font-['Montserrat']">Senha</label>
              <input type="password" defaultValue="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white" />
            </div>
            <button type="submit" className="w-full py-4 bg-amber-500 text-zinc-950 font-bold uppercase rounded-xl flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> <span>Acessar Painel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

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
            <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><HomeIcon className="w-4 h-4" /><span>Home</span></button>
            <button onClick={() => setActiveTab('quemSomos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'quemSomos' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><Users className="w-4 h-4" /><span>A Quattro</span></button>
            <button onClick={() => setActiveTab('setores')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'setores' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><Layers className="w-4 h-4" /><span>Setores & Obras</span></button>
            <button onClick={() => setActiveTab('servicos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'servicos' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><Wrench className="w-4 h-4" /><span>Serviços</span></button>
            <button onClick={() => setActiveTab('contato')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'contato' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><Phone className="w-4 h-4" /><span>Contato & Sede</span></button>
            <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blog' ? 'bg-amber-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}><BookOpen className="w-4 h-4" /><span>Blog & Notícias</span></button>
          </nav>
        </div>
        <div className="pt-6 border-t border-zinc-800">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-rose-400 uppercase"><LogOut className="w-4 h-4" /><span>Sair</span></button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL (DASHBOARD) */}
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

            {/* HERO HOME */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-500" />
                  <span>1. Mídias e Textos do Hero</span>
                </h2>
                <button onClick={() => handleSave('Hero_Home')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs rounded-xl flex items-center">
                  <Save className="w-4 h-4 mr-1" /> Salvar Hero
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-700 font-['Montserrat']">Modo da Mídia</label>
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

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-500 font-['Montserrat']">Slides Cadastrados</span>
                  <button 
                    onClick={() => {
                      const newMedia = { id: Date.now(), type: 'image' as 'image' | 'video', desktopUrl: '/img/placeholder.jpg', mobileUrl: '', line1BeforeHighlight: 'CIVIL DE', highlightPart1: 'ALTA', highlightPart2: 'PERFORMANCE', line3AfterHighlight: 'E PRECISÃO', slideDesc: 'Descrição...', ctaText: 'Saiba Mais', ctaLink: '/servicos' };
                      setHomeData({...homeData, hero: {...homeData.hero, mediaList: [...homeData.hero.mediaList, newMedia]}});
                    }}
                    className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold font-['Montserrat'] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Slide
                  </button>
                </div>

                <div className="space-y-6">
                  {homeData.hero.mediaList.map((media, idx) => (
                    <div key={media.id} className="p-5 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                        <span className="text-xs font-bold text-amber-600 font-['Montserrat'] uppercase">Slide #{idx + 1}</span>
                        <button onClick={() => { const upd = homeData.hero.mediaList.filter(m => m.id !== media.id); setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="p-1 text-rose-500 hover:bg-rose-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-zinc-500 font-['Montserrat']">Tipo Mídia</label>
                          <select value={media.type} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].type = e.target.value as any; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-900">
                            <option value="image">Imagem</option>
                            <option value="video">Vídeo (.mp4)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase text-zinc-500 font-['Montserrat']">Desktop URL</label>
                            <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                              {uploading === `desktop-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                              <span>Upload</span>
                              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => { const upd = [...homeData.hero.mediaList]; upd[idx].desktopUrl = url; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}}); }, `desktop-${idx}`)} />
                            </label>
                          </div>
                          <input type="text" value={media.desktopUrl} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].desktopUrl = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase text-zinc-500 font-['Montserrat']">Mobile URL</label>
                            <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                              {uploading === `mobile-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                              <span>Upload</span>
                              <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => { const upd = [...homeData.hero.mediaList]; upd[idx].mobileUrl = url; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}}); }, `mobile-${idx}`)} />
                            </label>
                          </div>
                          <input type="text" value={media.mobileUrl} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].mobileUrl = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-200/80 space-y-3">
                        <span className="text-[10px] font-bold uppercase text-amber-600 block font-['Montserrat']">Textos e Botões (CTAs)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-zinc-500">Linha 1 Normal</label><input type="text" value={media.line1BeforeHighlight} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].line1BeforeHighlight = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-amber-600">Amarelo 1</label><input type="text" value={media.highlightPart1} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].highlightPart1 = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-black" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-amber-600">Amarelo 2</label><input type="text" value={media.highlightPart2} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].highlightPart2 = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-black" /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-zinc-500">Linha 3 Final</label><input type="text" value={media.line3AfterHighlight} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].line3AfterHighlight = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-zinc-500">Texto Botão</label><input type="text" value={media.ctaText} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].ctaText = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                          <div className="space-y-1 sm:col-span-2"><label className="text-[10px] font-bold text-zinc-500">Link Destino</label><input type="text" value={media.ctaLink} onChange={(e) => { const upd = [...homeData.hero.mediaList]; upd[idx].ctaLink = e.target.value; setHomeData({...homeData, hero: {...homeData.hero, mediaList: upd}})}} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono" /></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NOSSA ABORDAGEM */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-amber-500" /><span>2. Nossa Abordagem (3 Cards)</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1"><label className="text-xs font-bold text-zinc-700">Título Geral</label><input type="text" value={homeData.approach.title} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, title: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold" /></div>
                <div className="space-y-1"><label className="text-xs font-bold text-zinc-700">Descrição Geral</label><textarea rows={2} value={homeData.approach.description} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, description: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-3 text-xs" /></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-zinc-100">
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3"><span className="text-xs font-bold text-amber-600 block">Card 1</span><input type="text" value={homeData.approach.card1.title} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card1: {...homeData.approach.card1, title: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold" /><textarea rows={3} value={homeData.approach.card1.text} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card1: {...homeData.approach.card1, text: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs" /></div>
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3"><span className="text-xs font-bold text-amber-600 block">Card 2</span><input type="text" value={homeData.approach.card2.title} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card2: {...homeData.approach.card2, title: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold" /><textarea rows={3} value={homeData.approach.card2.text} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card2: {...homeData.approach.card2, text: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs" /></div>
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-3"><span className="text-xs font-bold text-amber-600 block">Card 3</span><input type="text" value={homeData.approach.card3.title} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card3: {...homeData.approach.card3, title: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold" /><textarea rows={3} value={homeData.approach.card3.text} onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, card3: {...homeData.approach.card3, text: e.target.value}}})} className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs" /></div>
              </div>
            </div>

            {/* MOSAICO HOME */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-amber-500" /><span>3. Mosaico "Quem Somos"</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-zinc-500">Img 1</label>
                    <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                      {uploading === 'mosaic-img1' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}<span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img1: url}}), 'mosaic-img1')} />
                    </label>
                  </div>
                  <input type="text" value={homeData.aboutMosaic.img1} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img1: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-zinc-500">Img 2</label>
                    <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                      {uploading === 'mosaic-img2' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}<span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img2: url}}), 'mosaic-img2')} />
                    </label>
                  </div>
                  <input type="text" value={homeData.aboutMosaic.img2} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img2: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-zinc-500">Img 3</label>
                    <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5">
                      {uploading === 'mosaic-img3' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}<span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img3: url}}), 'mosaic-img3')} />
                    </label>
                  </div>
                  <input type="text" value={homeData.aboutMosaic.img3} onChange={(e) => setHomeData({...homeData, aboutMosaic: {...homeData.aboutMosaic, img3: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: QUEM SOMOS */}
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
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-500" /><span>1. Banner Hero Institucional</span></h2>
                <button onClick={() => handleSave('Hero_QuemSomos')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"><Save className="w-4 h-4 inline-block mr-1" /><span>Salvar Banner</span></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase text-zinc-700">Imagem Fundo do Banner</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1">
                      {uploading === 'hero-quemsomos-bg' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}<span>Fazer Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, bgImage: url}}), 'hero-quemsomos-bg')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.hero.bgImage} onChange={(e) => setQuemSomosData({...quemSomosData, hero: {...quemSomosData.hero, bgImage: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700" />
                </div>
              </div>
            </div>

            {/* 2. MANIFESTO INSTITUCIONAL */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-500" /><span>2. Manifesto Institucional</span></h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1"><label className="text-xs font-bold uppercase text-zinc-700">Título</label><input type="text" value={quemSomosData.manifesto.title} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, title: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold" /></div>
                <div className="space-y-1"><label className="text-xs font-bold uppercase text-zinc-700">Parágrafo 1</label><textarea rows={3} value={quemSomosData.manifesto.p1} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, p1: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm" /></div>
                <div className="space-y-1"><label className="text-xs font-bold uppercase text-zinc-700">Parágrafo 2</label><textarea rows={3} value={quemSomosData.manifesto.p2} onChange={(e) => setQuemSomosData({...quemSomosData, manifesto: {...quemSomosData.manifesto, p2: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm" /></div>
              </div>
            </div>

            {/* 3. GOVERNANÇA (MISSÃO, VISÃO, VALORES) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Target className="w-5 h-5 text-amber-500" /><span>3. Governança (Missão, Visão e Valores)</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2"><span className="text-xs font-bold text-amber-600 block">Missão</span><textarea rows={4} value={quemSomosData.governanca.missao} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, missao: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs" /></div>
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2"><span className="text-xs font-bold text-amber-600 block">Visão</span><textarea rows={4} value={quemSomosData.governanca.visao} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, visao: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs" /></div>
                <div className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-2"><span className="text-xs font-bold text-amber-600 block">Valores</span><textarea rows={4} value={quemSomosData.governanca.valores} onChange={(e) => setQuemSomosData({...quemSomosData, governanca: {...quemSomosData.governanca, valores: e.target.value}})} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs" /></div>
              </div>
            </div>

            {/* RESTAURAÇÃO: 4. LINHA DO TEMPO (TIMELINE) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500" /><span>4. Linha do Tempo (História)</span></h2>
                <button onClick={() => setQuemSomosData({...quemSomosData, timeline: [...quemSomosData.timeline, { id: Date.now(), fase: 'Nova Fase', desc: 'Descrição da fase' }]})} className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /><span>Adicionar Marco</span>
                </button>
              </div>
              <div className="space-y-4">
                {quemSomosData.timeline.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">Marco #{idx + 1}</span>
                      <button onClick={() => setQuemSomosData({...quemSomosData, timeline: quemSomosData.timeline.filter((_, i) => i !== idx)})} className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Ano / Fase</label><input type="text" value={item.fase} onChange={(e) => { const upd = [...quemSomosData.timeline]; upd[idx].fase = e.target.value; setQuemSomosData({...quemSomosData, timeline: upd}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Descrição</label><input type="text" value={item.desc} onChange={(e) => { const upd = [...quemSomosData.timeline]; upd[idx].desc = e.target.value; setQuemSomosData({...quemSomosData, timeline: upd}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SELOS */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /><span>5. Certificações e Selos Oficiais</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Selo PBQP-H</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1">
                      {uploading === 'selo-pbqph' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}<span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloPbqph: url}}), 'selo-pbqph')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.qualidade.seloPbqph} onChange={(e) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloPbqph: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">Selo ISO 9001</label>
                    <label className="text-xs font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-1">
                      {uploading === 'selo-iso' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}<span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloIso: url}}), 'selo-iso')} />
                    </label>
                  </div>
                  <input type="text" value={quemSomosData.qualidade.seloIso} onChange={(e) => setQuemSomosData({...quemSomosData, qualidade: {...quemSomosData.qualidade, seloIso: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ==================================================================== */}
        {/* ABA: SETORES & OBRAS (DRAG&DROP COM TODOS OS CAMPOS) */}
        {/* ==================================================================== */}
        {activeTab === 'setores' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Gerenciamento de Portfólio</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Setores de Atuação & Obras</h1>
              </div>
              <button onClick={() => handleSave('Setores e Obras')} className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20">
                <Save className="w-4 h-4" />
                <span>Salvar Tudo</span>
              </button>
            </div>

            {/* 1. GERENCIAMENTO DE SETORES */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <span>1. Cadastrar / Editar Setores (com Carrossel)</span>
                </h2>
                <button 
                  onClick={() => {
                    const newSetor = { id: `setor-${Date.now()}`, slug: 'novo-setor', title: 'Novo Setor', category: 'Categoria', desc: 'Descrição.', imagens: [] };
                    setSetoresData([...setoresData, newSetor]);
                  }}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Setor</span>
                </button>
              </div>

              <div className="space-y-8">
                {setoresData.map((setor, idx) => (
                  <div key={setor.id} className="p-6 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Setor #{idx + 1} ({setor.title})</span>
                      <button onClick={() => setSetoresData(setoresData.filter((_, i) => i !== idx))} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Título do Setor</label>
                        <input type="text" value={setor.title} onChange={(e) => { const upd = [...setoresData]; upd[idx].title = e.target.value; setSetoresData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Descrição Curta</label>
                        <input type="text" value={setor.desc} onChange={(e) => { const upd = [...setoresData]; upd[idx].desc = e.target.value; setSetoresData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-600" />
                      </div>
                    </div>

                    {/* GALERIA DO SETOR */}
                    <div className="space-y-3 pt-2 border-t border-zinc-200/80">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat'] block">
                        Imagens do Carrossel (Arraste e Solte Várias Imagens)
                      </label>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setDragActive(`setor-${idx}`); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActive(null); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragActive(null);
                          if (e.dataTransfer.files) {
                            handleMultipleFilesUpload(e.dataTransfer.files, (newUrls) => {
                              const upd = [...setoresData];
                              const newImagesObjects = newUrls.map(url => ({ url, alt: '' }));
                              upd[idx].imagens = [...(upd[idx].imagens || []), ...newImagesObjects];
                              setSetoresData(upd);
                            }, `setor-upload-${idx}`);
                          }
                        }}
                        className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors ${dragActive === `setor-${idx}` ? 'border-amber-500 bg-amber-50' : 'border-zinc-300 bg-white hover:bg-zinc-50'}`}
                      >
                        {uploading === `setor-upload-${idx}` ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-3" />
                            <span className="text-xs font-bold text-zinc-500">Processando imagens...</span>
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="w-10 h-10 text-zinc-300 mb-3" />
                            <p className="text-sm font-bold text-zinc-700 mb-1 text-center">Arraste e solte as imagens aqui</p>
                            <label className="mt-4 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm font-['Montserrat'] uppercase tracking-wider">
                              Procurar Arquivos
                              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                                  if (e.target.files) {
                                    handleMultipleFilesUpload(e.target.files, (newUrls) => {
                                      const upd = [...setoresData];
                                      const newImagesObjects = newUrls.map(url => ({ url, alt: '' }));
                                      upd[idx].imagens = [...(upd[idx].imagens || []), ...newImagesObjects];
                                      setSetoresData(upd);
                                    }, `setor-upload-${idx}`);
                                  }
                                }} 
                              />
                            </label>
                          </>
                        )}
                      </div>

                      {setor.imagens && setor.imagens.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                          {setor.imagens.map((imgObj: any, imgIdx: number) => (
                            <div key={imgIdx} className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col shadow-sm group">
                              <div className="aspect-video bg-zinc-100 relative">
                                <img src={imgObj.url} alt={`Preview ${imgIdx}`} className="w-full h-full object-cover" />
                                <button onClick={() => { const upd = [...setoresData]; upd[idx].imagens = upd[idx].imagens.filter((_:any, i:number) => i !== imgIdx); setSetoresData(upd); }} className="absolute top-2 right-2 bg-white/95 hover:bg-rose-50 text-rose-500 p-1.5 rounded-lg shadow transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer" title="Remover Imagem">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="p-2 border-t border-zinc-100 bg-[#f8f9f6] space-y-2">
                                <div>
                                  <label className="text-[9px] font-bold uppercase text-amber-600 block mb-0.5 font-['Montserrat']">Nome da Badge (Alt)</label>
                                  <input type="text" value={imgObj.alt} onChange={(e) => { const upd = [...setoresData]; upd[idx].imagens[imgIdx].alt = e.target.value; setSetoresData(upd); }} className="w-full text-xs font-bold text-zinc-900 bg-white border border-zinc-200 rounded px-2 py-1 outline-none focus:border-amber-500" placeholder="Ex: Fachada Sul" />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-0.5 font-['Montserrat']">Link da Imagem</label>
                                  <input type="text" value={imgObj.url} onChange={(e) => { const upd = [...setoresData]; upd[idx].imagens[imgIdx].url = e.target.value; setSetoresData(upd); }} className="w-full text-[10px] font-mono text-zinc-500 bg-transparent border-none outline-none" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
                      id: Date.now(), slug: 'nova-obra', title: 'Nova Obra Executada', categoriaSlug: 'industrial', local: 'Cidade – UF', area: '', status: 'Em Execução', client: '', year: '',
                      capaImage: '/img/placeholder.jpg', galeriaImages: [], especificacoes: [], resumo: '', descricaoCompleta: ''
                    };
                    setObrasData([...obrasData, newObra]);
                  }}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold font-['Montserrat'] cursor-pointer inline-flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Obra</span>
                </button>
              </div>

              <div className="space-y-8">
                {obrasData.map((obra, idx) => (
                  <div key={obra.id} className="p-6 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-5">
                    <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-['Montserrat']">Obra #{idx + 1} ({obra.title})</span>
                      <button onClick={() => setObrasData(obrasData.filter((_, i) => i !== idx))} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Nome da Obra</label>
                        <input type="text" value={obra.title} onChange={(e) => { const upd = [...obrasData]; upd[idx].title = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Status</label>
                        <input type="text" value={obra.status} onChange={(e) => { const upd = [...obrasData]; upd[idx].status = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Local (UF)</label>
                        <input type="text" value={obra.local} onChange={(e) => { const upd = [...obrasData]; upd[idx].local = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Área (m²)</label>
                        <input type="text" value={obra.area} onChange={(e) => { const upd = [...obrasData]; upd[idx].area = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold text-zinc-950" />
                      </div>
                      
                      <div className="space-y-1 lg:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Resumo Curto (Aparece no Card)</label>
                        <textarea rows={3} value={obra.resumo} onChange={(e) => { const upd = [...obrasData]; upd[idx].resumo = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-600 resize-none" />
                      </div>
                      <div className="space-y-1 lg:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Detalhes do Projeto (Aparece no Modal)</label>
                        <textarea rows={3} value={obra.descricaoCompleta} onChange={(e) => { const upd = [...obrasData]; upd[idx].descricaoCompleta = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs text-zinc-600 resize-none" />
                      </div>

                      {/* RESTAURAÇÃO: ESPECIFICAÇÕES DA OBRA (TABELA) */}
                      <div className="space-y-1 lg:col-span-4 border-t border-zinc-200 pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Especificações Técnicas (Tabela Opcional)</label>
                          <button onClick={() => { const upd = [...obrasData]; upd[idx].especificacoes = [...(upd[idx].especificacoes || []), { label: 'Título', value: 'Valor' }]; setObrasData(upd); }} className="px-2 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded text-[10px] font-bold transition-colors">
                            Adicionar Linha
                          </button>
                        </div>
                        {obra.especificacoes && obra.especificacoes.length > 0 && (
                          <div className="space-y-2">
                            {obra.especificacoes.map((spec: any, sIdx: number) => (
                              <div key={sIdx} className="flex items-center gap-2">
                                <input type="text" value={spec.label} onChange={(e) => { const upd = [...obrasData]; upd[idx].especificacoes[sIdx].label = e.target.value; setObrasData(upd); }} className="w-1/3 bg-white border border-zinc-200 rounded-lg p-2 text-xs font-bold" placeholder="Ex: Cliente" />
                                <input type="text" value={spec.value} onChange={(e) => { const upd = [...obrasData]; upd[idx].especificacoes[sIdx].value = e.target.value; setObrasData(upd); }} className="flex-1 bg-white border border-zinc-200 rounded-lg p-2 text-xs" placeholder="Ex: Amazon" />
                                <button onClick={() => { const upd = [...obrasData]; upd[idx].especificacoes = upd[idx].especificacoes.filter((_:any, i:number) => i !== sIdx); setObrasData(upd); }} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* CAPA DA OBRA UPLOAD ÚNICO */}
                      <div className="space-y-1 lg:col-span-4 border-t border-zinc-200 pt-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem de Capa da Obra</label>
                          <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5 font-['Montserrat']">
                            {uploading === `obra-capa-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}<span>Fazer Upload</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                              const upd = [...obrasData]; upd[idx].capaImage = url; setObrasData(upd);
                            }, `obra-capa-${idx}`)} />
                          </label>
                        </div>
                        <input type="text" value={obra.capaImage} onChange={(e) => { const upd = [...obrasData]; upd[idx].capaImage = e.target.value; setObrasData(upd); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono text-zinc-700" />
                      </div>
                    </div>

                    {/* GALERIA INTERNA DA OBRA */}
                    <div className="space-y-3 pt-2 border-t border-zinc-200/80">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat'] block">
                        Galeria Interna da Obra (Arraste e Solte Várias Imagens)
                      </label>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setDragActive(`obra-${idx}`); }}
                        onDragLeave={(e) => { e.preventDefault(); setDragActive(null); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragActive(null);
                          if (e.dataTransfer.files) {
                            handleMultipleFilesUpload(e.dataTransfer.files, (newUrls) => {
                              const upd = [...obrasData];
                              const newImagesObjects = newUrls.map(url => ({ url, alt: '' }));
                              upd[idx].galeriaImages = [...(upd[idx].galeriaImages || []), ...newImagesObjects];
                              setObrasData(upd);
                            }, `obra-upload-${idx}`);
                          }
                        }}
                        className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors ${dragActive === `obra-${idx}` ? 'border-amber-500 bg-amber-50' : 'border-zinc-300 bg-white hover:bg-zinc-50'}`}
                      >
                        {uploading === `obra-upload-${idx}` ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-3" />
                            <span className="text-xs font-bold text-zinc-500">Processando imagens...</span>
                          </div>
                        ) : (
                          <>
                            <ImagePlus className="w-10 h-10 text-zinc-300 mb-3" />
                            <p className="text-sm font-bold text-zinc-700 mb-1 text-center">Arraste e solte fotos da obra aqui</p>
                            <label className="mt-4 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm font-['Montserrat'] uppercase tracking-wider">
                              Procurar Arquivos
                              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                                  if (e.target.files) {
                                    handleMultipleFilesUpload(e.target.files, (newUrls) => {
                                      const upd = [...obrasData];
                                      const newImagesObjects = newUrls.map(url => ({ url, alt: '' }));
                                      upd[idx].galeriaImages = [...(upd[idx].galeriaImages || []), ...newImagesObjects];
                                      setObrasData(upd);
                                    }, `obra-upload-${idx}`);
                                  }
                                }} 
                              />
                            </label>
                          </>
                        )}
                      </div>

                      {obra.galeriaImages && obra.galeriaImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                          {obra.galeriaImages.map((imgObj: any, imgIdx: number) => (
                            <div key={imgIdx} className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col shadow-sm group">
                              <div className="aspect-video bg-zinc-100 relative">
                                <img src={imgObj.url} alt={`Preview ${imgIdx}`} className="w-full h-full object-cover" />
                                <button onClick={() => { const upd = [...obrasData]; upd[idx].galeriaImages = upd[idx].galeriaImages.filter((_:any, i:number) => i !== imgIdx); setObrasData(upd); }} className="absolute top-2 right-2 bg-white/95 hover:bg-rose-50 text-rose-500 p-1.5 rounded-lg shadow transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer" title="Remover Imagem">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="p-2 border-t border-zinc-100 bg-[#f8f9f6] space-y-2">
                                <div>
                                  <label className="text-[9px] font-bold uppercase text-amber-600 block mb-0.5 font-['Montserrat']">Nome da Badge (Alt)</label>
                                  <input type="text" value={imgObj.alt} onChange={(e) => { const upd = [...obrasData]; upd[idx].galeriaImages[imgIdx].alt = e.target.value; setObrasData(upd); }} className="w-full text-xs font-bold text-zinc-900 bg-white border border-zinc-200 rounded px-2 py-1 outline-none focus:border-amber-500" placeholder="Ex: Refeitório" />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-0.5 font-['Montserrat']">Link da Imagem</label>
                                  <input type="text" value={imgObj.url} onChange={(e) => { const upd = [...obrasData]; upd[idx].galeriaImages[imgIdx].url = e.target.value; setObrasData(upd); }} className="w-full text-[10px] font-mono text-zinc-500 bg-transparent border-none outline-none" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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

            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Wrench className="w-5 h-5 text-amber-500" /><span>1. Banner Hero da Página de Serviços</span></h2>
                <button onClick={() => handleSave('Hero_Serviços')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all font-['Montserrat'] cursor-pointer"><Save className="w-4 h-4 inline-block mr-1" /><span>Salvar Hero</span></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-zinc-700">Badge Superior</label><input type="text" value={servicosData.hero.badge} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, badge: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-zinc-700">Título Principal</label><input type="text" value={servicosData.hero.title} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, title: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950" /></div>
                <div className="md:col-span-2 space-y-2"><label className="text-xs font-bold text-zinc-700">Descrição</label><textarea rows={3} value={servicosData.hero.description} onChange={(e) => setServicosData({...servicosData, hero: {...servicosData.hero, description: e.target.value}})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl p-4 text-sm text-zinc-700 resize-none font-sans" /></div>
              </div>
            </div>

            {/* RESTAURAÇÃO: FLUXO DE TRABALHO (SERVIÇOS) */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Settings className="w-5 h-5 text-amber-500" /><span>2. Fluxo de Trabalho (Passo a Passo)</span></h2>
                <button onClick={() => setServicosData({...servicosData, fluxo: [...servicosData.fluxo, { passo: `0${servicosData.fluxo.length + 1}`, titulo: 'Novo Passo', desc: 'Descrição' }]})} className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1"><Plus className="w-3.5 h-3.5" /><span>Adicionar Passo</span></button>
              </div>
              <div className="space-y-4">
                {servicosData.fluxo.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">Passo {item.passo}</span>
                      <button onClick={() => setServicosData({...servicosData, fluxo: servicosData.fluxo.filter((_, i) => i !== idx)})} className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Número</label><input type="text" value={item.passo} onChange={(e) => { const upd = [...servicosData.fluxo]; upd[idx].passo = e.target.value; setServicosData({...servicosData, fluxo: upd}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-zinc-500">Título</label><input type="text" value={item.titulo} onChange={(e) => { const upd = [...servicosData.fluxo]; upd[idx].titulo = e.target.value; setServicosData({...servicosData, fluxo: upd}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-bold" /></div>
                      <div className="space-y-1 sm:col-span-2"><label className="text-[10px] font-bold uppercase text-zinc-500">Descrição</label><textarea rows={2} value={item.desc} onChange={(e) => { const upd = [...servicosData.fluxo]; upd[idx].desc = e.target.value; setServicosData({...servicosData, fluxo: upd}); }} className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs resize-none" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Layers className="w-5 h-5 text-amber-500" /><span>3. Serviços Prestados</span></h2>
                <button onClick={() => handleSave('Serviços')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"><Save className="w-4 h-4 inline-block mr-1" /><span>Salvar Tudo</span></button>
              </div>
              <div className="space-y-6">
                {servicosData.lista.map((servico, idx) => (
                  <div key={servico.id} className="p-5 bg-[#f8f9f6] border border-zinc-200 rounded-2xl space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Título do Serviço</label>
                      <input type="text" value={servico.title} onChange={(e) => { const updated = [...servicosData.lista]; updated[idx].title = e.target.value; setServicosData({...servicosData, lista: updated}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm font-bold text-zinc-950" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Descrição do Serviço</label>
                      <textarea rows={2} value={servico.desc} onChange={(e) => { const updated = [...servicosData.lista]; updated[idx].desc = e.target.value; setServicosData({...servicosData, lista: updated}); }} className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-600 resize-none" />
                    </div>
                    {/* RESTAURAÇÃO: ENTREGÁVEIS DOS SERVIÇOS */}
                    <div className="space-y-2 pt-3 border-t border-zinc-200">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase text-amber-600 block">Itens Inclusos (Entregáveis)</label>
                        <button onClick={() => { const upd = [...servicosData.lista]; upd[idx].entregaveis = [...(upd[idx].entregaveis || []), 'Novo Item']; setServicosData({...servicosData, lista: upd}); }} className="px-2 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded text-[10px] font-bold transition-colors">Adicionar Item</button>
                      </div>
                      {servico.entregaveis && servico.entregaveis.map((item: string, iItem: number) => (
                        <div key={iItem} className="flex items-center gap-2">
                          <input type="text" value={item} onChange={(e) => { const upd = [...servicosData.lista]; upd[idx].entregaveis[iItem] = e.target.value; setServicosData({...servicosData, lista: upd}); }} className="flex-1 bg-white border border-zinc-200 rounded p-1.5 text-xs" />
                          <button onClick={() => { const upd = [...servicosData.lista]; upd[idx].entregaveis = upd[idx].entregaveis.filter((_:any, i:number) => i !== iItem); setServicosData({...servicosData, lista: upd}); }} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
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
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><Phone className="w-5 h-5 text-amber-500" /><span>1. Informações de Contato</span></h2>
                <button onClick={() => handleSave('Contato')} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"><Save className="w-4 h-4 inline-block mr-1" /><span>Salvar Contato</span></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-zinc-700">Telefone Comercial</label><input type="text" value={contatoData.comercialPhone} onChange={(e) => setContatoData({...contatoData, comercialPhone: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-zinc-700">E-mail Direto</label><input type="email" value={contatoData.comercialEmail} onChange={(e) => setContatoData({...contatoData, comercialEmail: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900" /></div>
                <div className="md:col-span-2 space-y-2"><label className="text-xs font-bold text-zinc-700">Endereço da Sede</label><input type="text" value={contatoData.endereco} onChange={(e) => setContatoData({...contatoData, endereco: e.target.value})} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900" /></div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 font-['Montserrat']">
                <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-500" /><span>2. Perguntas Frequentes (FAQs)</span></h2>
                <button onClick={() => setContatoData({...contatoData, faqs: [...contatoData.faqs, { id: Date.now(), pergunta: 'Nova Pergunta?', resposta: 'Resposta' }]})} className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1"><Plus className="w-3.5 h-3.5" /><span>Adicionar</span></button>
              </div>
              <div className="space-y-4">
                {contatoData.faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-4 bg-[#f8f9f6] border border-zinc-200 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between"><span className="text-xs font-bold text-amber-600">Pergunta #{idx + 1}</span><button onClick={() => setContatoData({...contatoData, faqs: contatoData.faqs.filter((_, i) => i !== idx)})} className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button></div>
                    <input type="text" value={faq.pergunta} onChange={(e) => { const updated = [...contatoData.faqs]; updated[idx].pergunta = e.target.value; setContatoData({...contatoData, faqs: updated}); }} className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950" />
                    <textarea rows={2} value={faq.resposta} onChange={(e) => { const updated = [...contatoData.faqs]; updated[idx].resposta = e.target.value; setContatoData({...contatoData, faqs: updated}); }} className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs text-zinc-600 resize-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* ABA: BLOG */}
        {/* ==================================================================== */}
        {activeTab === 'blog' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-6 font-['Montserrat']">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Publicações e Notícias</span>
                <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">Gerenciador do Blog</h1>
              </div>
              <button 
                  onClick={() => {
                    const newPost = { id: Date.now(), title: 'Novo Artigo', author: 'Autor', date: new Date().toISOString().split('T')[0], capaImage: '/img/placeholder.jpg', content: '<p>Comece a escrever seu artigo aqui...</p>' };
                    setBlogData([newPost, ...blogData]);
                  }}
                  className="px-5 py-3 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider font-['Montserrat'] cursor-pointer inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Artigo</span>
              </button>
            </div>

            <div className="space-y-8">
              {blogData.map((post, idx) => (
                <div key={post.id} className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2 font-['Montserrat']">
                      <BookOpen className="w-5 h-5 text-amber-500" />
                      <span>Artigo: {post.title}</span>
                    </h2>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleSave('Blog')} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-[10px] tracking-wider rounded-lg transition-all font-['Montserrat'] cursor-pointer">
                        Salvar
                      </button>
                      <button onClick={() => setBlogData(blogData.filter((_, i) => i !== idx))} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Título da Publicação</label>
                      <input type="text" value={post.title} onChange={(e) => { const upd = [...blogData]; upd[idx].title = e.target.value; setBlogData(upd); }} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Data</label>
                      <input type="date" value={post.date} onChange={(e) => { const upd = [...blogData]; upd[idx].date = e.target.value; setBlogData(upd); }} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Imagem de Capa (Banner)</label>
                        <label className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer flex items-center gap-0.5 font-['Montserrat']">
                          {uploading === `blog-capa-${idx}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                          <span>Upload da Capa</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                            const upd = [...blogData]; upd[idx].capaImage = url; setBlogData(upd);
                          }, `blog-capa-${idx}`)} />
                        </label>
                      </div>
                      <input type="text" value={post.capaImage} onChange={(e) => { const upd = [...blogData]; upd[idx].capaImage = e.target.value; setBlogData(upd); }} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-xs font-mono text-zinc-700 outline-none" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat']">Autor</label>
                      <input type="text" value={post.author} onChange={(e) => { const upd = [...blogData]; upd[idx].author = e.target.value; setBlogData(upd); }} className="w-full bg-[#f8f9f6] border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-950 outline-none" />
                    </div>
                  </div>

                  {/* EDITOR DE TEXTO RICH */}
                  <div className="space-y-2 pt-4">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-['Montserrat'] block">Corpo do Artigo (Editor de Texto)</label>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden flex flex-col">
                      <div className="bg-zinc-100 border-b border-zinc-200 p-2 flex items-center gap-1 overflow-x-auto">
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Negrito"><Bold className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Itálico"><Italic className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Sublinhado"><Underline className="w-4 h-4" /></button>
                        <div className="w-px h-5 bg-zinc-300 mx-1"></div>
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Lista com Marcadores"><List className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Alinhar"><AlignLeft className="w-4 h-4" /></button>
                        <div className="w-px h-5 bg-zinc-300 mx-1"></div>
                        <button className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors" title="Inserir Link"><Link2 className="w-4 h-4" /></button>
                        <label className="p-2 hover:bg-zinc-200 text-zinc-700 rounded transition-colors cursor-pointer flex items-center gap-1" title="Inserir Imagem no Texto">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-[10px] font-bold">Mídia</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => {
                            const upd = [...blogData];
                            upd[idx].content += `<br/><img src="${url}" alt="midia-blog" style="max-width:100%; border-radius:8px;"/><br/>`;
                            setBlogData(upd);
                          }, `blog-media-${idx}`)} />
                        </label>
                      </div>
                      <textarea 
                        rows={10} 
                        value={post.content} 
                        onChange={(e) => { const upd = [...blogData]; upd[idx].content = e.target.value; setBlogData(upd); }}
                        className="w-full bg-white p-4 text-sm text-zinc-800 outline-none resize-y font-sans leading-relaxed"
                        placeholder="Escreva ou cole seu conteúdo aqui..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;