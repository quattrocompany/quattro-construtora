// Endereço público do site usado nos links/imagens do e-mail.
// Enquanto o domínio oficial ainda aponta para o site antigo, usa o endereço de produção da Vercel;
// quando o domínio for trocado, a Vercel passa a informá-lo aqui automaticamente.
export const SITE =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : 'https://www.quattroconstrutora.com.br');
