// src/services/wordpressService.ts
export async function fetchWordPressPosts(page = 1, perPage = 10) {
  const cleanPerPage = Math.floor(Number(perPage)) || 10;
  const cleanPage = Math.floor(Number(page)) || 1;
  const url = `https://www.quattroconstrutora.com.br/wp-json/wp/v2/posts?page=${cleanPage}&per_page=${cleanPerPage}&_embed=1`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw new Error(`Erro WP API: ${response.statusText}`);
  return response.json();
}

export async function fetchWordPressPostBySlug(slug: string) {
  const url = `https://www.quattroconstrutora.com.br/wp-json/wp/v2/posts?slug=${slug}&_embed=1`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw new Error(`Erro WP API: ${response.statusText}`);
  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}