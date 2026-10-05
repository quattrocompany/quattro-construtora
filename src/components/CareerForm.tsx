// src/components/CareerForm.tsx
import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, UploadCloud } from 'lucide-react';
import { saveCandidatura } from '../lib/firebase';
import { adicionarNaLista } from '../lib/brevo';

const AREAS_INTERESSE = [
  { value: '', label: 'Selecione a área de interesse...' },
  { value: 'Engenharia & Obra', label: 'Engenharia & Obra' },
  { value: 'Arquitetura & Projetos', label: 'Arquitetura & Projetos' },
  { value: 'Orçamento & Planejamento', label: 'Orçamento & Planejamento' },
  { value: 'Suprimentos & Compras', label: 'Suprimentos & Compras' },
  { value: 'Segurança do Trabalho', label: 'Segurança do Trabalho' },
  { value: 'Administrativo & Financeiro', label: 'Administrativo & Financeiro' },
  { value: 'Recursos Humanos', label: 'Recursos Humanos' },
  { value: 'Comercial & Marketing', label: 'Comercial & Marketing' },
  { value: 'Outra Área', label: 'Outra Área' },
];

const MAX_ARQUIVO_MB = 10;

export const CareerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    areaInteresse: '',
    mensagem: '',
    termoAceito: false,
  });
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > MAX_ARQUIVO_MB * 1024 * 1024) {
      setError(`O arquivo deve ter no máximo ${MAX_ARQUIVO_MB}MB.`);
      setArquivo(null);
      e.target.value = '';
      return;
    }
    setError(null);
    setArquivo(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (honeypot) {
      setSucesso(true);
      setLoading(false);
      return;
    }

    if (formData.nome.trim().length < 2) {
      setError('Informe seu nome completo.');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Informe um e-mail válido.');
      setLoading(false);
      return;
    }
    const digitos = formData.telefone.replace(/\D/g, '');
    if (digitos.length < 8 || digitos.length > 15) {
      setError('Informe um telefone válido com DDD.');
      setLoading(false);
      return;
    }
    if (!formData.areaInteresse) {
      setError('Selecione a área de interesse.');
      setLoading(false);
      return;
    }
    if (!arquivo) {
      setError('Anexe seu currículo em PDF, DOC ou DOCX.');
      setLoading(false);
      return;
    }
    if (!formData.termoAceito) {
      setError('É necessário aceitar os termos de privacidade.');
      setLoading(false);
      return;
    }

    try {
      const ultimo = Number(localStorage.getItem('quattro_candidatura_ts') || 0);
      if (Date.now() - ultimo < 60_000) {
        setError('Aguarde um minuto antes de enviar outra candidatura.');
        setLoading(false);
        return;
      }
    } catch { /* navegador sem localStorage: segue */ }

    try {
      const ok = await saveCandidatura({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        areaInteresse: formData.areaInteresse,
        mensagem: formData.mensagem,
        termoAceito: formData.termoAceito,
        curriculo: arquivo,
      });
      if (ok) {
        void adicionarNaLista({
          tipo: 'contato',
          assunto: 'trabalhe_conosco',
          email: formData.email.trim(),
          nome: formData.nome.trim(),
        });
        try { localStorage.setItem('quattro_candidatura_ts', String(Date.now())); } catch { /* ignora */ }
        setSucesso(true);
        setFormData({ nome: '', email: '', telefone: '', areaInteresse: '', mensagem: '', termoAceito: false });
        setArquivo(null);
      } else {
        setError('Não foi possível enviar sua candidatura. Tente novamente.');
      }
    } catch {
      setError('Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10 shadow-sm space-y-6 text-zinc-900">
      <div>
        <h3 className="text-lg font-bold text-zinc-950 font-['Montserrat'] mb-1">
          Envie sua Candidatura
        </h3>
        <p className="text-xs font-sans text-zinc-600">
          Preencha os dados abaixo e anexe seu currículo. Nossa equipe de RH avaliará seu perfil.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-500 text-xs">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {sucesso ? (
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-amber-600 font-['Montserrat']">Candidatura Recebida!</h3>
          <p className="text-xs font-sans text-zinc-700">
            Agradecemos o seu interesse em fazer parte da Quattro Construtora. Nossa equipe de RH avaliará seu perfil e entraremos em contato caso haja sinergia com nossas vagas.
          </p>
          <button
            type="button"
            onClick={() => setSucesso(false)}
            className="mt-2 text-xs text-amber-600 font-bold uppercase tracking-wider underline cursor-pointer"
          >
            Enviar outra candidatura
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <div>
            <label htmlFor="nome" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
              Nome Completo *
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              placeholder="Ex: Roberto Silva"
              value={formData.nome}
              onChange={handleChange}
              className="contact-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="email" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
                E-mail *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com.br"
                value={formData.email}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
                Telefone / WhatsApp *
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                required
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="areaInteresse" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
              Área de Interesse *
            </label>
            <select
              id="areaInteresse"
              name="areaInteresse"
              required
              value={formData.areaInteresse}
              onChange={handleChange}
              className="contact-input cursor-pointer"
            >
              {AREAS_INTERESSE.map((op) => (
                <option key={op.value} value={op.value} disabled={op.value === ''} className="bg-white text-zinc-900">
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
              Carta de Apresentação (Opcional)
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={3}
              placeholder="Conte um pouco sobre sua experiência e o que te motiva a trabalhar com a gente..."
              value={formData.mensagem}
              onChange={handleChange}
              className="contact-input resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-amber-600 mb-1 font-['Montserrat']">
              Anexe seu Currículo *
            </label>
            <label
              htmlFor="curriculo"
              className="flex items-center gap-3 w-full bg-[#f8f9f6] border border-dashed border-zinc-300 hover:border-amber-500 rounded-xl px-4 py-3.5 text-xs font-sans text-zinc-600 cursor-pointer transition-colors"
            >
              <UploadCloud className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="truncate">{arquivo ? arquivo.name : 'Escolher arquivo (PDF, DOC ou DOCX, até 10MB)'}</span>
            </label>
            <input
              id="curriculo"
              name="curriculo"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              onChange={handleArquivo}
              className="sr-only"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="termoAceito"
              name="termoAceito"
              checked={formData.termoAceito}
              onChange={handleChange}
              className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="termoAceito" className="text-[11px] font-sans leading-tight cursor-pointer text-zinc-600">
              Concordo com o tratamento dos meus dados e currículo de acordo com a LGPD.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="contact-btn-submit"
          >
            <span>{loading ? 'Enviando...' : 'Enviar Candidatura'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};
