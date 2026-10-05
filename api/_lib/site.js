// Endereço público do site usado nos links e imagens do e-mail.
// O domínio oficial (www.quattroconstrutora.com.br) ainda aponta para o site antigo em WordPress,
// por isso o padrão é o endereço da Vercel. Quando o DNS for trocado, defina SITE_URL
// (Vercel > Settings > Environment Variables) como https://www.quattroconstrutora.com.br
// ou altere o valor abaixo.
export const SITE = (process.env.SITE_URL || 'https://quattro-construtora.vercel.app').replace(/\/$/, '');
