import { useState } from 'react';
import { createLead } from '../lib/firebase';

interface LeadFormProps {
  empreendimentoId?: string;
}

export function LeadForm({ empreendimentoId }: LeadFormProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLead({ nome, email, telefone, mensagem, empreendimentoId });
      setSucesso(true);
      setNome('');
      setEmail('');
      setTelefone('');
      setMensagem('');
    } catch (err) {
      console.error('Erro ao registrar lead:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-neutral-900 text-white rounded-xl shadow-lg max-w-md w-full">
      <h3 className="text-xl font-bold mb-4">Fale com a Construtora</h3>
      
      {sucesso && (
        <p className="p-3 mb-4 bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded">
          Contato enviado com sucesso! Retornaremos em breve.
        </p>
      )}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
        <input
          type="tel"
          placeholder="Seu Telefone / WhatsApp"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
        <textarea
          placeholder="Como podemos ajudar?"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          rows={3}
          className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Solicitar Atendimento'}
        </button>
      </div>
    </form>
  );
}