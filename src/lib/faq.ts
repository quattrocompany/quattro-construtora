// src/lib/faq.ts
// Perguntas frequentes. A fonte oficial é site_data/contato > faqs (editado em
// /admin > Contato). Se o documento ainda não existir — ou o Firestore não
// responder — vale a lista padrão abaixo (a mesma que já estava no ar).
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export type FaqPublico = {
  categoria: string;
  pergunta: string;
  resposta: string;
  /** true = aparece também na página Contato (a página Dúvidas mostra todas). */
  destaque: boolean;
};

export const CATEGORIAS_FAQ = [
  { id: 'geral', label: 'Atendimento Geral' },
  { id: 'obra', label: 'Dúvidas sobre a Obra' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'fornecedores', label: 'Fornecedores & Parcerias' },
];

export const FAQS_PADRAO: FaqPublico[] = [
  {
    categoria: 'geral',
    pergunta: 'Como entro em contato com a equipe técnica?',
    resposta: 'Preencha o formulário na página de Contato ou fale diretamente pelo telefone (11) 3045-0826. Nossa equipe direciona sua mensagem ao setor responsável.',
    destaque: false,
  },
  {
    categoria: 'obra',
    pergunta: 'Sou vizinho de uma obra em andamento. Como relatar um imprevisto?',
    resposta: 'Selecione a opção "Sou Vizinho de Obra" no formulário de contato. Essa mensagem é direcionada com prioridade ao engenheiro residente responsável pela obra.',
    destaque: true,
  },
  {
    categoria: 'obra',
    pergunta: 'Posso acompanhar o andamento da minha obra?',
    resposta: 'Sim. Clientes com contrato ativo acompanham o cronograma físico-financeiro e os relatórios de evolução diretamente pelo Portal do Cliente.',
    destaque: false,
  },
  {
    categoria: 'fornecedores',
    pergunta: 'Como cadastrar minha empresa para ser fornecedor de insumos?',
    resposta: 'Utilize a opção "Sou Fornecedor / Parceria Comercial" no formulário de contato. Nosso departamento de suprimentos analisará suas homologações técnicas.',
    destaque: true,
  },
  {
    categoria: 'financeiro',
    pergunta: 'Qual o prazo médio de retorno para solicitações de cotação?',
    resposta: 'Propostas preliminares são enviadas em até 48 horas úteis após o recebimento dos memoriais descritivos ou projetos.',
    destaque: true,
  },
  {
    categoria: 'financeiro',
    pergunta: 'Como funcionam as medições e a emissão de notas fiscais?',
    resposta: 'As medições seguem o cronograma físico-financeiro definido em contrato e são processadas após validação da fiscalização de obra, com a documentação fiscal correspondente.',
    destaque: false,
  },
];

const doCms = (f: any): FaqPublico => ({
  categoria: String(f?.categoria || 'geral'),
  pergunta: String(f?.pergunta ?? '').trim(),
  resposta: String(f?.resposta ?? '').trim(),
  destaque: !!f?.destaque,
});

/** Perguntas frequentes na ordem definida no /admin. */
export const getFaqs = async (): Promise<FaqPublico[]> => {
  try {
    const snap = await getDoc(doc(db, 'site_data', 'contato'));
    const faqs = snap.exists() ? snap.data().faqs : undefined;
    if (Array.isArray(faqs)) {
      // O documento existe: ele manda (mesmo que a lista esteja vazia).
      return faqs.map(doCms).filter((f) => f.pergunta && f.resposta);
    }
  } catch (error) {
    console.error('Erro ao ler as perguntas frequentes no Firestore (usando a lista padrão):', error);
  }
  return FAQS_PADRAO;
};
