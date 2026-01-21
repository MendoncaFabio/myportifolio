# 🚀 Guia Completo de Deploy - Portfólio

## 📋 Checklist Pré-Deploy

- [ ] Todas as imagens adicionadas em `assets/images/`
- [ ] Conteúdo do site atualizado (nome, descrição, projetos)
- [ ] Links de GitHub e LinkedIn corretos
- [ ] Testado em mobile (abra F12 → Responsivo)
- [ ] Testado em diferentes navegadores
- [ ] Formulário validando corretamente
- [ ] Sem erros no console (F12)
- [ ] Meta tags SEO completadas

---

## 🔧 Opção 1: Netlify (⭐ RECOMENDADO)

### Vantagens
✅ Deploy em 2 minutos
✅ HTTPS automático
✅ Domínio customizado gratuito
✅ Sem necessidade de configuração
✅ Atualizar é tão fácil quanto fazer push

### Passo a Passo

#### 1. Preparar Git (opcional, mas recomendado)
```bash
# Abra terminal na pasta do projeto
git init
git add .
git commit -m "Initial commit: Portfolio site"
```

#### 2. Publicar no Netlify

**Opção A: Drag & Drop (Mais fácil)**
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta do projeto inteira
3. Pronto! Seu site está online em ~15 segundos
4. URL será algo como: `https://random-name.netlify.app`

**Opção B: GitHub + Deploy Automático**
1. Suba seu código para GitHub
2. Acesse https://app.netlify.com
3. Clique em "Add new site" → "Import an existing project"
4. Conecte seu GitHub
5. Configure:
   - Build command: (deixar em branco)
   - Publish directory: `.` ou `/`
6. Deploy automático a cada push!

#### 3. Configurar Domínio (Opcional)
```
No painel Netlify:
1. Domain settings
2. Add custom domain
3. Coloque seu domínio (ex: portfolio-fabio.com)
4. Siga as instruções DNS
```

---

## 🐙 Opção 2: GitHub Pages

### Vantagens
✅ Integrado com GitHub
✅ Gratuito
✅ Histórico de versões
✅ Colaboração fácil

### Desvantagens
❌ Precisa de repositório público
❌ Sem formulário funcional (static)
❌ Setup um pouco mais complexo

### Passo a Passo

#### 1. Criar Repositório
```bash
# Opção 1: Repositório username.github.io (recomendado)
# https://github.com/new
# Nome: username.github.io
# Descrição: My Portfolio
# Public (obrigatório)

# Clonar
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

#### 2. Adicionar Arquivos
```bash
# Copiar todos seus arquivos para esta pasta
# Depois fazer commit

git add .
git commit -m "Initial portfolio upload"
git push origin main
```

#### 3. Acessar Site
```
https://username.github.io
```

#### 4. Usar Domínio Customizado (Opcional)
```
Settings → Pages → Custom Domain
Coloque seu domínio (ex: portfolio.com)
```

---

## ☁️ Opção 3: Vercel

### Vantagens
✅ Ultra-rápido (edge network)
✅ Deploy automático
✅ Serverless functions grátis
✅ Analytics integrada

### Passo a Passo

#### 1. Subir para GitHub
```bash
git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

#### 2. Deploy no Vercel
1. Acesse https://vercel.com
2. Clique "New Project"
3. Importe seu repositório GitHub
4. Configure:
   - Framework: Other
   - Build Command: (vazio)
   - Output Directory: (vazio)
5. Deploy!

#### 3. Domínio Customizado
```
Vercel Dashboard → Settings → Domains
Adicione seu domínio
Siga as instruções DNS
```

---

## 📦 Opção 4: AWS S3 + CloudFront

### Para produção em larga escala

```bash
# 1. Criar bucket S3
aws s3 mb s3://seu-portfolio-nome

# 2. Subir arquivos
aws s3 sync . s3://seu-portfolio-nome --exclude ".git/*"

# 3. Configurar como website
aws s3 website s3://seu-portfolio-nome \
  --index-document index.html \
  --error-document index.html

# URL do site:
http://seu-portfolio-nome.s3-website-us-east-1.amazonaws.com
```

---

## 🔐 Configurações de Segurança

### Headers HTTP
Se usando Netlify, criar arquivo `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### robots.txt
Criar arquivo `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://seusite.com/sitemap.xml
```

### sitemap.xml
Criar arquivo `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seusite.com/</loc>
    <lastmod>2024-01-09</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 🎯 Otimizações Pós-Deploy

### 1. Google Search Console
1. Acesse https://search.google.com/search-console
2. Adicione seu site
3. Verifique propriedade
4. Submeta sitemap

### 2. Google Analytics
```html
<!-- Adicionar no <head> do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. PageSpeed Insights
1. Acesse https://pagespeed.web.dev/
2. Coloque sua URL
3. Analise recomendações
4. Implemente melhorias

### 4. GTmetrix
1. Acesse https://gtmetrix.com/
2. Teste performance
3. Verifique recomendações

---

## 📊 Comparação de Plataformas

| Aspecto | Netlify | GitHub Pages | Vercel | AWS S3 |
|---------|---------|--------------|--------|--------|
| **Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Preço** | Gratuito | Gratuito | Gratuito | Pago |
| **Performance** | Excelente | Bom | Excelente | Excelente |
| **HTTPS** | ✅ Automático | ✅ Automático | ✅ Automático | ✅ (com CloudFront) |
| **Domínio** | ✅ Gratuito | ❌ Requer setup | ✅ Gratuito | ❌ Requer setup |
| **Deploy Automático** | ✅ | ✅ | ✅ | ❌ |

---

## 🐛 Troubleshooting

### "Imagens não aparecem no site publicado"
```
❌ Erro comum: Paths relativos incorretos
✅ Solução: Use /assets/images/profile.jpg (com slash inicial)
```

### "Formulário não envia emails"
```
❌ Problema: Netlify Forms precisa de setup
✅ Solução: Adicione atributo netlify à tag <form>

<form id="contactForm" netlify>
  ...
</form>
```

### "Site lento"
```
✅ Comprimir imagens: https://tinypng.com
✅ Usar WebP: https://convertio.co/jpg-webp/
✅ Minificar CSS/JS em produção
```

### "Erro 404 em rotas"
```
❌ GitHub Pages só funciona com raízes
✅ Para rotas, use Netlify ou Vercel
```

---

## 📝 Próximos Passos

Após publicar seu portfólio:

1. **Adicione à seu currículo**
   - Coloque o link no topo

2. **Compartilhe nas redes**
   - LinkedIn
   - Twitter/X
   - GitHub Bio

3. **Envie para recrutadores**
   - Inclua em candidaturas
   - Compartilhe em networking

4. **Monitore performance**
   - Google Analytics
   - User feedback
   - A/B test sections

5. **Continue atualizando**
   - Novos projetos
   - Novas tecnologias
   - Feedback de clientes

---

## 🎓 Conclusão

Seu portfólio está pronto para o mundo!

**Recomendação Final:** Use **Netlify** se for primeira vez.
É o mais simples, rápido e poderoso para esse caso.

Boa sorte no mercado de trabalho! 🚀
