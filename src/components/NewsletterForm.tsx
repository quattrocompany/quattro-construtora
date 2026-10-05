import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { adicionarNaLista } from '../lib/brevo';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [aceite, setAceite] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle');
  const [msg, setMsg] = useState('');

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) { setEstado('ok'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEstado('erro'); setMsg('Informe um e-mail válido.'); return;
    }
    if (!aceite) {
      setEstado('erro'); setMsg('Aceite receber nossos e-mails para continuar.'); return;
    }
    setEstado('enviando'); setMsg('');
    const ok = await adicionarNaLista({ tipo: 'newsletter', email: email.trim() });
    if (ok) { setEstado('ok'); setEmail(''); setAceite(false); }
    else { setEstado('erro'); setMsg('Não foi possível concluir agora. Tente novamente em instantes.'); }
  };

  if (estado === 'ok') {
    return (
      <p className="text-sm text-amber-500 font-bold" role="status">
        Inscrição realizada! Você receberá as novidades da Quattro Construtora.
      </p>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-3 max-w-md" noValidate>
      {/* campo escondido: só robôs preenchem */}
      <input
        type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail" aria-label="E-mail para a newsletter" maxLength={160}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
        />
        <button
          type="submit" disabled={estado === 'enviando'}
          className="px-5 py-3 rounded-xl bg-amber-500 text-black text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-colors disabled:opacity-60"
        >
          {estado === 'enviando' ? 'Enviando...' : 'Assinar'}
        </button>
      </div>
      <label className="flex items-start gap-2 text-[11px] text-zinc-400 leading-snug cursor-pointer">
        <input
          type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)}
          className="mt-0.5 accent-amber-500"
        />
        <span>
          Quero receber notícias e novidades da Quattro Construtora por e-mail e concordo com a{' '}
          <Link to="/privacidade" className="underline hover:text-amber-500">Política de Privacidade</Link>.
        </span>
      </label>
      {estado === 'erro' && <p className="text-xs text-red-400" role="alert">{msg}</p>}
    </form>
  );
};
