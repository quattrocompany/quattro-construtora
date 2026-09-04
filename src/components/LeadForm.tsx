// src/components/LeadForm.tsx
import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, HardHat, Building2 } from 'lucide-react';
import { saveLead } from '../lib/firebase';

export interface LeadFormProps {
  obraId?: string;
  showSubjectSelect?: boolean;
}

const OPCOES_ASSUNTO = [
  { value: '', label: 'Selecione o assunto do contato...' },
  { value: 'orcamento', label: 'Solicitação de Orçamento / Cotação de Obra' },
  { value: 'geral', label: 'Contato Geral & Dúvidas' },
  { value: 'vizinho_obra', label: 'Sou Vizinho de Obra (Atendimento à Comunidade)' },
  { value: 'fornecedor', label: 'Sou Fornecedor / Parceria Comercial' },
  { value: 'trabalhe_conosco', label: 'Trabalhe Conosco (RH / Envio de Currículo)' },
  { value: 'imprensa', label: 'Assessoria de Imprensa & Comunicação' }
];

export const LeadForm: React.FC<LeadFormProps> = ({
  obraId,
  showSubjectSelect = false
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: showSubjectSelect ? '' : 'geral',
    mensagem: '',
    termoAceito: false
  });

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (showSubjectSelect && !formData.assunto) {
      setError('Por favor, selecione o assunto do seu contato.');
      setLoading(false);
      return;
    }

    if (!formData.termoAceito) {
      setError('É necessário aceitar os termos de privacidade.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        ...(obraId ? { obraId } : {})
      };
      const ok = await saveLead(payload);
      if (ok) {
        setSucesso(true);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          empresa: '',
          assunto: showSubjectSelect ? '' : 'geral',
          mensagem: '',
          termoAceito: false
        });
      } else {
        setError('Não foi possível registrar seu contato. Tente novamente.');
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
          Solicite um Orçamento
        </h3>
        <p className="text-xs font-sans text-zinc-600">
          Preencha os dados abaixo para direcionarmos sua demanda aos nossos engenheiros.
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
          <h3 className="text-base font-bold text-amber-600 font-['Montserrat']">Solicitação Enviada com Sucesso!</h3>
          <p className="text-xs font-sans text-zinc-700">
            Nossa equipe técnica retornará em breve.
          </p>
          <button
            type="button"
            onClick={() => setSucesso(false)}
            className="mt-2 text-xs text-amber-600 font-bold uppercase tracking-wider underline cursor-pointer"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
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

          {showSubjectSelect && (
            <div>
              <label htmlFor="assunto" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
                Motivo do Contato *
              </label>
              <select
                id="assunto"
                name="assunto"
                required
                value={formData.assunto}
                onChange={handleChange}
                className="contact-input cursor-pointer"
              >
                {OPCOES_ASSUNTO.map((op) => (
                  <option key={op.value} value={op.value} disabled={op.value === ''} className="bg-white text-zinc-900">
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.assunto === 'vizinho_obra' && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-amber-700 text-xs font-sans">
              <HardHat className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Mensagem roteada prioritariamente para o engenheiro residente.</span>
            </div>
          )}

          {formData.assunto === 'fornecedor' && (
            <div className="p-3 bg-zinc-100 border border-zinc-200 rounded-xl flex items-start gap-2.5 text-zinc-700 text-xs font-sans">
              <Building2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Sua proposta será avaliada pelo setor de compras e suprimentos.</span>
            </div>
          )}

          <div>
            <label htmlFor="mensagem" className="block text-[10px] uppercase font-bold text-zinc-600 mb-1 font-['Montserrat']">
              Sua Mensagem *
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              required
              placeholder="Descreva resumidamente o seu projeto ou necessidade..."
              value={formData.mensagem}
              onChange={handleChange}
              className="contact-input resize-none"
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
              Concordo com o tratamento dos dados de acordo com a LGPD.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="contact-btn-submit"
          >
            <span>{loading ? 'Processando...' : 'Enviar Solicitação'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};