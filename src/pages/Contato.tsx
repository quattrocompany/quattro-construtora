// src/pages/Contato.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  HardHat, 
  Building2, 
  Briefcase, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

// ============================================================================
// DADOS ESTÁTICOS E CANAIS
// ============================================================================

const OPCOES_ASSUNTO = [
  { value: '', label: 'Selecione o assunto do contato...' },
  { value: 'orcamento', label: 'Solicitação de Orçamento / Cotação de Obra' },
  { value: 'geral', label: 'Contato Geral & Dúvidas' },
  { value: 'vizinho_obra', label: 'Sou Vizinho de Obra (Atendimento à Comunidade)' },
  { value: 'fornecedor', label: 'Sou Fornecedor / Parceria Comercial' },
  { value: 'trabalhe_conosco', label: 'Trabalhe Conosco (RH / Envio de Currículo)' },
  { value: 'imprensa', label: 'Assessoria de Imprensa & Comunicação' }
];

const CANAIS_DIRETOS = [
  {
    icon: Phone,
    titulo: 'Telefone & WhatsApp Comercial',
    info: '+55 (11) 4003-0000',
    sub: 'Segunda a Sexta, das 08h às 18h',
    href: 'https://wa.me/551140030000'
  },
  {
    icon: Mail,
    titulo: 'E-mail Institucional',
    info: 'contato@quattroconstrutora.com.br',
    sub: 'Resposta média em até 24h úteis',
    href: 'mailto:contato@quattroconstrutora.com.br'
  },
  {
    icon: MapPin,
    titulo: 'Sede Administrativa',
    info: 'Av. das Nações Unidas, 12901 - 18º Andar',
    sub: 'Brooklin Paulista – São Paulo / SP',
    href: 'https://maps.google.com'
  },
  {
    icon: Clock,
    titulo: 'Horário de Atendimento',
    info: 'Seg a Qui: 08h às 18h | Sex: 08h às 17h',
    sub: 'Plantão de emergências para obras ativas 24/7',
    href: null
  }
];

const FAQS_CONTATO = [
  {
    pergunta: 'Sou vizinho de uma obra em andamento. Como relatar um imprevisto?',
    resposta: 'Selecione a opção "Sou Vizinho de Obra" no formulário ao lado. Essa mensagem é direcionada com prioridade ALTA para o nosso engenheiro residente da unidade responsável.'
  },
  {
    pergunta: 'Como cadastrar minha empresa para ser fornecedor de insumos?',
    resposta: 'Utilize a opção "Sou Fornecedor / Parceria Comercial". Nosso departamento de suprimentos analisará suas homologações e certificações técnicas.'
  },
  {
    pergunta: 'Qual o prazo médio de retorno para solicitações de cotação?',
    resposta: 'Propostas preliminares são enviadas em até 48 horas úteis após o recebimento dos memoriais descritivos ou projetos em BIM.'
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export const Contato: React.FC = () => {
  // Estado do Formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    mensagem: '',
    termoAceito: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Manipulador de Mudança
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Envio do Formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.assunto) {
      setErrorMessage('Por favor, selecione o assunto do seu contato.');
      return;
    }

    if (!formData.termoAceito) {
      setErrorMessage('É necessário aceitar os termos de privacidade para continuar.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulação de requisição à API/Firestore
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        assunto: '',
        mensagem: '',
        termoAceito: false
      });
    } catch {
      setErrorMessage('Ocorreu um erro ao enviar sua mensagem. Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950 overflow-x-hidden pt-24 md:pt-28">
      
      {/* ========================================================================= */}
      {/* 1. HERO INSTITUCIONAL / BREADCRUMB BANNER                                 */}
      {/* ========================================================================= */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] mx-auto space-y-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-amber-600 font-bold">Contato</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Canais de Atendimento
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-950 tracking-tight leading-none">
              Fale com a equipe técnica da Quattro.
            </h1>
            <p className="text-zinc-600 text-base md:text-lg font-normal leading-relaxed pt-2">
              Estamos prontos para atender suas demandas de novos projetos, dúvidas operacionais, parcerias comerciais ou atendimento comunitário.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO PRINCIPAL (FORMULÁRIO + CANAIS DE CONTATO)                       */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* COLUNA DO FORMULÁRIO (LG: 7 COLS) */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
                Envie uma Mensagem
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950">
                Formulário de Atendimento
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 font-normal">
                Preencha os campos abaixo para direcionarmos sua mensagem ao departamento responsável.
              </p>
            </div>

            {/* ALERTA DE SUCESSO */}
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs md:text-sm text-emerald-800 leading-relaxed font-normal max-w-md mx-auto">
                  Agradecemos seu contato. Nossa equipe técnica analisará sua mensagem e retornará em breve.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ERRO GLOBAL DO FORM */}
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 text-xs font-medium">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* GRID DE NOME E E-MAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: Roberto Silva"
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="roberto@empresa.com.br"
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* GRID DE TELEFONE E EMPRESA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                      Empresa / Razão Social
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa (opcional)"
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* DROPDOWN DE SELEÇÃO DE ASSUNTO */}
                <div className="space-y-2">
                  <label htmlFor="assunto" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                    Qual o motivo do seu contato? *
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    required
                    value={formData.assunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all cursor-pointer"
                  >
                    {OPCOES_ASSUNTO.map((opcao) => (
                      <option key={opcao.value} value={opcao.value} disabled={opcao.value === ''}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BADGE DINÂMICO PARA VIZINHO DE OBRA */}
                {formData.assunto === 'vizinho_obra' && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-900 text-xs font-medium animate-in fade-in">
                    <HardHat className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-amber-950 mb-0.5">Atendimento Comunitário Prioritário</span>
                      Mensagens de vizinhos de obras ativas são roteadas diretamente para a equipe de engenharia residente do canteiro.
                    </div>
                  </div>
                )}

                {/* BADGE DINÂMICO PARA FORNECEDORES */}
                {formData.assunto === 'fornecedor' && (
                  <div className="p-4 bg-zinc-200/60 border border-zinc-300 rounded-xl flex items-start gap-3 text-zinc-800 text-xs font-medium animate-in fade-in">
                    <Building2 className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-zinc-950 mb-0.5">Homologação de Fornecedores</span>
                      Informe no campo de mensagem seus principais produtos/serviços e regiões de atendimento para cadastro no nosso setor de compras.
                    </div>
                  </div>
                )}

                {/* CAMPO DE MENSAGEM */}
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                    Sua Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Descreva detalhes sobre sua solicitação, projeto, obra ou dúvida..."
                    className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
                  />
                </div>

                {/* CHECKBOX LGPD / ACEITE DE TERMOS */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="termoAceito"
                    name="termoAceito"
                    checked={formData.termoAceito}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="termoAceito" className="text-xs text-zinc-600 font-normal leading-relaxed cursor-pointer">
                    Concordo com o tratamento dos meus dados pessoais para a finalidade de atendimento do contato, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  </label>
                </div>

                {/* BOTÃO DE SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>Enviando mensagem...</span>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

          {/* COLUNA DE CANAIS E INFO (LG: 5 COLS) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
                Atendimento Direto
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950">
                Outras Formas de Contato
              </h2>
            </div>

            <div className="space-y-4">
              {CANAIS_DIRETOS.map((canal, idx) => {
                const CanalIcon = canal.icon;
                return (
                  <div 
                    key={idx}
                    className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-start gap-4 hover:border-amber-500/40 transition-colors shadow-xs"
                  >
                    <div className="p-3 bg-white border border-zinc-200 rounded-xl text-amber-600 shrink-0">
                      <CanalIcon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                        {canal.titulo}
                      </span>
                      
                      {canal.href ? (
                        <a 
                          href={canal.href} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm md:text-base font-bold text-zinc-950 hover:text-amber-600 transition-colors block"
                        >
                          {canal.info}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base font-bold text-zinc-950">
                          {canal.info}
                        </p>
                      )}

                      <p className="text-xs text-zinc-500 font-normal">
                        {canal.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CARD DE VAGA / RH */}
            <div className="p-6 bg-zinc-950 text-white rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Carreiras & Trabalhe Conosco</h3>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Quer fazer parte do nosso time de engenheiros, mestres de obra e projetistas? Selecione a opção "Trabalhe Conosco" no formulário ou envie seu currículo diretamente para nosso banco de talentos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PERGUNTAS FREQUENTES / FAQ DE CONTATO (CINZA 20% - bg-zinc-50)         */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Esclarecimentos Rápidos
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950">
              Dúvidas Frequentes sobre Atendimento
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FAQS_CONTATO.map((faq, idx) => (
              <div key={idx} className="bg-white border border-zinc-200 p-8 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-600">
                  <HelpCircle className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Dúvida Frequente</span>
                </div>
                <h3 className="text-base font-bold text-zinc-950 leading-snug">{faq.pergunta}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">{faq.resposta}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SEÇÃO DE LOCALIZAÇÃO / MAPA                                           */}
      {/* ========================================================================= */}
      <section className="py-16 px-6 md:px-12 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-zinc-50 border border-zinc-200">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 block">
              Visitas Agendadas
            </span>
            <h3 className="text-2xl font-extrabold text-zinc-950">
              Venha conhecer nosso escritório central em São Paulo
            </h3>
            <p className="text-xs text-zinc-600 font-normal leading-relaxed">
              Atendemos clientes e parceiros para reuniões de alinhamento de projetos mediante agendamento prévio.
            </p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Abrir no Google Maps</span>
          </a>
        </div>
      </section>

    </div>
  );
};