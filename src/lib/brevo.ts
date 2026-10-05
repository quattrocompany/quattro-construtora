// Envia o contato para uma lista do Brevo pela função /api/brevo-lista
// (a chave do Brevo fica só no servidor).

export type ListaBrevo = 'newsletter' | 'contato' | 'trabalhe_conosco' | 'outras';

interface Dados {
  email: string;
  nome?: string;
  /** 'newsletter' ou 'contato' (neste caso a lista sai do assunto) */
  tipo: 'newsletter' | 'contato';
  assunto?: string;
  website?: string; // honeypot
}

/** Retorna true/false. Falhar aqui nunca deve impedir o envio do formulário principal. */
export async function adicionarNaLista(d: Dados): Promise<boolean> {
  try {
    const r = await fetch('/api/brevo-lista', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...d, consentimento: true }),
    });
    return r.ok;
  } catch {
    return false;
  }
}
