// HTML do e-mail de confirmação da newsletter (Quattro Construtora).
// Mesmo desenho do e-mail da Quattro Inc: testeira, corpo cinza claro, 3 colunas (empilham no celular),
// botão dourado, slogan e rodapé preto com redes sociais. Tabelas + estilos inline para funcionar em qualquer cliente.
import { obrasDestaque } from './obras.js';

const SITE = 'https://www.quattroconstrutora.com.br';
const OURO = '#fbb03b';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function cartao(o, i) {
  return `<td class="col" width="33%" valign="top" style="width:33.33%;padding:0 5px;">
<a href="${SITE}/setores-e-obras#portfolio" target="_blank" style="text-decoration:none;color:inherit;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border:1px solid #e2e2e2;border-radius:12px;overflow:hidden;">
<tr><td><img src="${SITE}/api/mailing-obra?pos=${i + 1}" alt="${esc(o.titulo)}" width="180" style="display:block;width:100%;height:auto;border-radius:12px 12px 0 0;"></td></tr>
<tr><td class="cardtxt" style="padding:14px 14px 16px 14px;height:118px;vertical-align:top;font-family:Inter,Helvetica,Arial,sans-serif;">
${o.categoria ? `<div style="font-size:10px;line-height:14px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;color:#b97a10;padding-bottom:6px;">${esc(o.categoria)}</div>` : ''}
<div style="font-size:15px;line-height:20px;font-weight:bold;color:#111111;">${esc(o.titulo)}</div>
${o.local ? `<div style="font-size:12px;line-height:18px;color:#555555;padding-top:6px;">${esc(o.local)}</div>` : ''}
</td></tr>
</table></a></td>`;
}

export async function htmlConfirmacao() {
  const obras = await obrasDestaque(3);
  const secaoObras = obras.length
    ? `<tr><td class="px" style="padding:0 40px 18px 40px;"><div style="width:48px;height:2px;background:${OURO};font-size:0;line-height:0;">&nbsp;</div><div style="padding-top:14px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#111111;font-weight:bold;">Obras em destaque</div></td></tr>
<tr><td class="px" style="padding:0 35px 10px 35px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>${obras.map(cartao).join('')}</tr></table></td></tr>`
    : '';

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>Quattro Construtora</title><style>body{margin:0;padding:0;background:#000000;-webkit-text-size-adjust:100%}table{border-collapse:collapse}a{text-decoration:none}img{border:0;display:block}@media only screen and (max-width:620px){.wrap{width:100%!important}.px{padding-left:20px!important;padding-right:20px!important}.h1{font-size:22px!important;line-height:30px!important}.col{display:block!important;width:100%!important;padding:0 0 16px 0!important}.col img{width:100%!important}.cardtxt{height:auto!important}}</style></head><body style="margin:0;padding:0;background:#000000;"><div style="display:none;max-height:0;overflow:hidden;color:#000000;">Você receberá as notícias da Quattro Construtora em primeira mão.</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#000000;"><tr><td align="center"><table role="presentation" class="wrap" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px;max-width:600px;background:#efefef;font-family:Inter,Helvetica,Arial,sans-serif;">
<tr><td><a href="${SITE}" target="_blank"><img src="${SITE}/img/background_Testeira_mailing_QuattroConstrutora.jpg" alt="Quattro Construtora - Te damos as boas-vindas!" width="600" style="display:block;width:100%;max-width:600px;height:auto;"></a></td></tr>
<tr><td align="center" class="px" style="padding:44px 40px 10px 40px;"><div class="h1" style="font-size:26px;line-height:34px;font-weight:bold;color:#111111;">Agradecemos sua inscrição em nosso site.</div></td></tr>
<tr><td align="center" class="px" style="padding:10px 40px 36px 40px;font-size:16px;line-height:25px;color:#222222;">Você receberá as notícias da Quattro Construtora em primeira mão.<br>Nos vemos em breve!</td></tr>
${secaoObras}
<tr><td align="center" class="px" style="padding:24px 40px 40px 40px;"><a href="${SITE}/setores-e-obras" target="_blank" style="display:inline-block;background:${OURO};color:#000000;font-size:13px;font-weight:900;letter-spacing:1px;text-transform:uppercase;padding:15px 36px;border-radius:2px;">Confira nosso portfólio de obras completo</a></td></tr>
<tr><td align="center" class="px" style="padding:0 40px 36px 40px;font-size:17px;line-height:26px;color:#111111;">Construindo seu futuro, <b>sem limites.</b></td></tr>
<tr><td align="center" class="px" style="background:#000000;border-top:1px solid ${OURO};padding:30px 40px 28px 40px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td style="padding:0 6px;"><a href="https://www.facebook.com/quattroconstrutora/" target="_blank"><img src="${SITE}/img/mail/mail-facebook.png" alt="Facebook" width="40" height="40" style="width:40px;height:40px;"></a></td><td style="padding:0 6px;"><a href="https://instagram.com/quattroconstrutoraoficial" target="_blank"><img src="${SITE}/img/mail/mail-instagram.png" alt="Instagram" width="40" height="40" style="width:40px;height:40px;"></a></td><td style="padding:0 6px;"><a href="https://youtube.com/quattroconstrutora" target="_blank"><img src="${SITE}/img/mail/mail-youtube.png" alt="YouTube" width="40" height="40" style="width:40px;height:40px;"></a></td></tr></table><div style="padding-top:24px;font-size:10px;line-height:16px;letter-spacing:1px;color:#ffffff;">2026 © Quattro Company Construtora e Incorporadora Ltda. Todos os direitos reservados.</div></td></tr>
</table></td></tr><tr><td align="center" style="padding:14px 20px 24px 20px;font-family:Inter,Helvetica,Arial,sans-serif;font-size:10px;line-height:14px;color:#ffffff;background:#000000;">Você recebeu este e-mail porque se inscreveu na newsletter em quattroconstrutora.com.br. Se não foi você, basta ignorar esta mensagem.</td></tr></table></body></html>`;
}
