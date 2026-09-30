// src/utils/sanitizeHtml.ts
// Saneamento de HTML sem dependências (lista de permissão).
// Usado antes de injetar conteúdo do blog com dangerouslySetInnerHTML e
// antes de salvar o texto do editor do CMS. Remove <script>, <iframe>, atributos
// on*, estilos soltos e qualquer URL que não seja http(s), mailto, tel ou caminho relativo.

const ALLOWED_TAGS = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI',
  'BLOCKQUOTE', 'A', 'IMG', 'HR', 'SPAN', 'DIV', 'FIGURE', 'FIGCAPTION',
]);

const ALLOWED_ATTRS: Record<string, string[]> = {
  A: ['href', 'title', 'target', 'rel'],
  IMG: ['src', 'alt', 'title', 'width', 'height'],
};

const SAFE_URL = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;
const SAFE_ALIGN = /^text-align:\s*(left|right|center|justify);?$/i;

export function isSafeUrl(url: string): boolean {
  const v = (url || '').trim();
  return v === '' ? false : SAFE_URL.test(v);
}

function cleanNode(node: Element) {
  Array.from(node.children).forEach((child) => {
    const tag = child.tagName;
    if (!ALLOWED_TAGS.has(tag)) {
      // Descarta por completo elementos perigosos; para os demais mantém só o texto interno.
      if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'FORM', 'SVG', 'MATH', 'TEMPLATE', 'NOSCRIPT'].includes(tag.toUpperCase())) {
        child.remove();
      } else {
        cleanNode(child);
        child.replaceWith(...Array.from(child.childNodes));
      }
      return;
    }
    const allowed = ALLOWED_ATTRS[tag] || [];
    Array.from(child.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (name === 'style') {
        // único estilo aceito: alinhamento de texto (vem do editor)
        if (!SAFE_ALIGN.test(attr.value.trim())) child.removeAttribute(attr.name);
        return;
      }
      if (name === 'class') { child.removeAttribute(attr.name); return; }
      if (!allowed.includes(name)) { child.removeAttribute(attr.name); return; }
      if ((name === 'href' || name === 'src') && !isSafeUrl(attr.value)) child.removeAttribute(attr.name);
    });
    if (tag === 'IMG' && !child.getAttribute('src')) { child.remove(); return; }
    if (tag === 'A') {
      if (child.getAttribute('target') === '_blank') child.setAttribute('rel', 'noopener noreferrer');
      else child.removeAttribute('target');
    }
    cleanNode(child);
  });
}

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  if (typeof DOMParser === 'undefined') {
    // Sem DOM (SSR/testes): devolve texto puro escapado, nunca HTML cru.
    return html.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
  }
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  cleanNode(doc.body);
  return doc.body.innerHTML;
}
