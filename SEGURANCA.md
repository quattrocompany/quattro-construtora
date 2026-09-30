# Segurança — Quattro Construtora

## O que mudou
- **/admin agora usa Firebase Authentication** (e-mail + senha). Não existe mais senha no código (o login antigo era só visual).
- **A proteção de verdade está nas regras** `firestore.rules` e `storage.rules`: o site inteiro pode **ler** o conteúdo, mas só o(s) administrador(es) autorizado(s) podem **gravar**. Sem aplicar as regras, o painel não está protegido.
- Formulário de contato: só aceita os campos esperados, com tamanho máximo; só o admin consegue **ler** os leads.
- Uploads: só imagem (JPG, PNG, WebP, AVIF, GIF até 10 MB) e vídeo (MP4/WebM até 60 MB), apenas pelo admin.
- Blog: o HTML é limpo (sem scripts, iframes, `onclick` ou links `javascript:`) ao salvar e ao exibir.
- Cabeçalhos de segurança no `vercel.json`; links externos com `rel="noopener noreferrer"`.

## Passo a passo (uma vez)
1. **Firebase > Authentication > Método de login**: ative **E-mail/senha**.
2. **Authentication > Usuários > Adicionar usuário**: `marketing@quattroconstrutora.com.br` + uma senha forte (defina no console, nunca no código ou no chat). No painel basta digitar `marketing` no campo de usuário.
3. Copie o **UID** do usuário criado (coluna "UID do usuário").
4. **Desative o cadastro público**: Authentication > Configurações > Ações do usuário > desmarque "Permitir criação (cadastro) de usuários". Sem isso, qualquer pessoa com a chave do site poderia criar uma conta.
5. Em `firestore.rules` e `storage.rules`, troque `COLE_AQUI_O_UID_DO_ADMIN` pelo UID. Para mais de um admin: `['UID1', 'UID2']`.
6. Cole `firestore.rules` em **Firestore Database > Regras > Publicar** e `storage.rules` em **Storage > Regras > Publicar**.
7. Teste: entre em `/admin`, altere algo e publique; depois abra `/admin` em janela anônima — deve pedir login.

## Boas práticas
- Se uma senha foi enviada por chat/e-mail, troque-a no Firebase (Authentication > usuário > Redefinir senha).
- Arquivos `.env` não vão para o GitHub (já estão no `.gitignore`); as chaves `VITE_FIREBASE_*` ficam na Vercel.
- Em Google Cloud > Credenciais, restrinja a chave de API do navegador aos domínios do site (HTTP referrers).
- Ative o **App Check** (reCAPTCHA v3) no Firebase para reduzir abuso do formulário (opcional, recomendado).

## Migrar para o projeto "Site Quattro Construtora"
1. Crie (se ainda não existir) Firestore e Storage no projeto novo e registre um app Web; copie a configuração para as variáveis `VITE_FIREBASE_*` (veja `.env.example`).
2. Gere uma chave de conta de serviço de cada projeto e salve como `antigo.json` e `novo.json` na raiz (não sobem ao Git).
3. `npm install --no-save firebase-admin`, depois `node scripts/migrar-firebase.mjs --dry` (simulação) e `node scripts/migrar-firebase.mjs`.
4. Refaça os passos 1–6 acima no projeto novo (usuário, UID, regras, cadastro público desativado).
5. Atualize as variáveis na Vercel, faça um novo deploy e confira site e /admin.
6. **Só depois** de tudo conferido, apague os dados do projeto antigo.
