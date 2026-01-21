# 🔧 Troubleshooting - Guia de Problemas e Soluções

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

---

### ❌ Problema 1: "Imagens não aparecem no site"

**Sintoma:**
```
- Vejo X no lugar das imagens
- Console mostra "Failed to load image"
- Imagens quebradas no navegador
```

**Causas Possíveis:**
1. ❌ Pasta `assets/images/` não existe
2. ❌ Nomes dos arquivos estão errados
3. ❌ Imagens estão em pasta diferente
4. ❌ Path (caminho) incorreto no HTML

**Solução Passo a Passo:**
```bash
1. Crie a pasta:
   PortifiA/
   └── assets/
       └── images/

2. Coloque os arquivos:
   assets/images/
   ├── profile.jpg         (OBRIGATÓRIO)
   ├── project-1.jpg
   ├── project-2.jpg
   ├── project-3.jpg
   ├── project-4.jpg
   ├── project-5.jpg
   └── project-6.jpg

3. Nomes devem ser EXATOS:
   ✓ profile.jpg  (minúsculas, sem espaço)
   ✓ project-1.jpg
   ✗ Profile.jpg (errado - maiúscula)
   ✗ project 1.jpg (errado - espaço)
```

**Para Testar:**
1. Abra DevTools (F12)
2. Vá em "Network"
3. Recarregue página (F5)
4. Procure por imagens com erro (status 404)
5. Veja o path errado listado

---

### ❌ Problema 2: "Menu mobile não funciona"

**Sintoma:**
```
- Botão hambúrguer não abre menu
- Menu não fecha ao clicar em link
- Menu não aparece em telas pequenas
```

**Causa:**
JavaScript não está funcionando corretamente

**Solução:**
1. **Verificar console (F12 → Console)**
   ```
   ✓ Sem erros vermelhos = OK
   ✗ Erros? Veja abaixo
   ```

2. **Verificar se JS está carregando**
   - F12 → Network
   - Procure por: `main.js`
   - Status deve ser: 200 (não 404)

3. **Se erro "Unexpected token"**
   - Abra `js/main.js`
   - Verifique se não há caracteres estranhos
   - Refaça o arquivo se necessário

4. **Recarregar com cache limpo**
   ```
   Ctrl+Shift+Del → Limpar Cache
   Depois: Ctrl+Shift+R
   ```

---

### ❌ Problema 3: "Formulário não envia"

**Sintoma:**
```
- Clico enviar, nada acontece
- Nenhuma mensagem de sucesso
- Console vazio
```

**Importante:**
O formulário **NÃO envia emails realmente**. 
Ele apenas valida e mostra mensagem de sucesso localmente.

**Para habilitar envios reais:**

**Opção A: Usar Netlify Forms (RECOMENDADO)**
```html
<!-- Adicione atributo netlify ao form -->
<form id="contactForm" netlify>
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="text" name="subject" required>
  <textarea name="message" required></textarea>
  <button type="submit">Enviar</button>
</form>
```
Depois, quando publicar no Netlify, ele cuida dos emails automaticamente!

**Opção B: Usar EmailJS (MANUAL)**
```javascript
// Adicione antes do main.js
<script type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js">
</script>

// No main.js, modifique ContactForm.handleSubmit():
emailjs.init('YOUR_PUBLIC_KEY'); // Pegar em emailjs.com
// Depois enviar com emailjs.send()
```

**Opção C: Backend Próprio**
- Se tiver servidor Node/Python/PHP
- Criar endpoint para receber dados
- Enviar emails via API

---

### ❌ Problema 4: "Estilos não carregam (página em branco)"

**Sintoma:**
```
- Página inteira em branco
- Sem cores, sem formatting
- Apenas texto puro
```

**Causa:**
CSS não está carregando

**Solução:**
1. **Verificar caminho CSS em index.html**
   ```html
   ✓ <link rel="stylesheet" href="css/style.css">
   ✗ <link rel="stylesheet" href="style.css">
   ✗ <link rel="stylesheet" href="/css/style.css">
   ```

2. **Verificar se pasta existe**
   - Pasta `css/` deve existir
   - Dentro dela: `style.css`

3. **DevTools → Network**
   - Procure por `style.css`
   - Se status 404 = arquivo não encontrado
   - Recrie o arquivo se necessário

4. **Verificar sintaxe CSS**
   - Abra `css/style.css`
   - Procure por erros de sintaxe
   - Caracteres especiais não escapeados?

---

### ❌ Problema 5: "Links não funcionam"

**Sintoma:**
```
- Clico em "Ver Projetos"
- Não navega para seção de projetos
- Fica na mesma página
```

**Causa:**
Links de âncora com IDs incorretos

**Solução:**
```html
<!-- No botão/link -->
<a href="#projects">Ver Projetos</a>

<!-- Na seção projects -->
<section id="projects">
  <!-- Conteúdo -->
</section>
```

**Verificar:**
1. Cada link tem `href="#algo"`?
2. Existe uma seção com `id="algo"`?
3. Os nomes combinam EXATAMENTE?

**Exemplo de links corretos:**
```html
<a href="#home">Início</a> → <section id="home">
<a href="#about">Sobre</a> → <section id="about">
<a href="#skills">Skills</a> → <section id="skills">
<a href="#projects">Projetos</a> → <section id="projects">
<a href="#contact">Contato</a> → <section id="contact">
```

---

### ❌ Problema 6: "Animações não funcionam"

**Sintoma:**
```
- Animações lentas ou travando
- Não vejo efeitos de scroll
- Barras de progress não animam
```

**Soluções:**
1. **Navegador compatível?**
   - Chrome 60+
   - Firefox 55+
   - Safari 12+
   - Edge 79+

2. **JavaScript desabilitado?**
   - F12 → DevTools
   - Console
   - Se vir erro = JS desabilitado

3. **Performance baixa?**
   - Feche abas desnecessárias
   - Restart navegador
   - Procure por: console.log() excess
   - Otimize imagens

4. **Testar isoladamente**
   ```javascript
   // No console, teste:
   document.querySelector('.hero').classList.add('fade-in');
   // Deve animar o hero
   ```

---

### ❌ Problema 7: "Site muito lento"

**Sintoma:**
```
- Página carrega lentamente
- Scroll é travado
- Cliques demoram responder
```

**Soluções de Performance:**

**1. Comprimir imagens**
```
Vá a: https://tinypng.com
Drag & drop suas imagens
Download das comprimidas
Substitua no assets/images/
```

**2. Verificar tamanho das imagens**
```
✓ profile.jpg: < 100 KB
✓ project-*.jpg: < 200 KB cada
✗ Maior que isso? Comprimir!
```

**3. Lazy loading (futuro)**
```html
<img src="..." loading="lazy">
<!-- Para imagens que scrollam muito -->
```

**4. DevTools → Performance**
```
F12 → Performance
Grava navegação
Analisa bottlenecks
```

---

### ❌ Problema 8: "Responsividade não funciona"

**Sintoma:**
```
- No mobile fica tudo aglomerado
- Menu não aparece
- Imagens fora do tamanho
```

**Solução:**

**1. Verificar meta viewport (CRÍTICO)**
```html
<!-- No <head> de index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- DEVE existir para mobile funcionar! -->
```

**2. Testar responsividade**
```
F12 → Responsivo (Ctrl+Shift+M)
Redimensione a janela
Veja se se adapta
```

**3. Breakpoints CSS**
Verifique em `style.css`:
```css
/* Mobile (< 480px) */
@media (max-width: 480px) { ... }

/* Tablet (480px - 767px) */
@media (max-width: 768px) { ... }

/* Desktop (> 1200px) */
/* Estilos padrão acima */
```

---

### ❌ Problema 9: "Customizações não funcionam"

**Sintoma:**
```
- Mudei a cor, não muda
- Alterei o nome, não aparece
- Deletei algo, ainda aparece
```

**Soluções:**

1. **Limpar cache**
   ```
   Ctrl+Shift+Del
   Limpar TUDO
   OK
   Recarregar (Ctrl+Shift+R)
   ```

2. **Salvar corretamente**
   - Abrir arquivo em editor (VS Code, Notepad++)
   - Editar
   - Salvar (Ctrl+S)
   - Recarregar navegador (F5)

3. **Editar o arquivo certo**
   - ❌ Errado: editar em GitHub
   - ✅ Certo: editar arquivo local
   - Depois subir pro GitHub

4. **Verificar se salvo**
   - Editor deve mostrar titulo SEM asterisco
   - Exemplo: "index.html" (OK)
   - Exemplo: "*index.html" (não salvo)

---

### ❌ Problema 10: "Erros ao publicar (Netlify/GitHub)"

**Erro: "Deploy failed"**

**Solução:**
1. Verificar se todos os arquivos foram incluídos
2. Não há pasta `node_modules` errada?
3. HTML/CSS/JS valid?
4. Testar localmente primeiro

**Erro: "404 not found"**

**Solução:**
1. Arquivo `index.html` na raiz?
2. Não está em pasta aninhada?
3. Nomes de arquivo corretos (case-sensitive)?

---

## 🧪 TESTE DE DIAGNÓSTICO

Execute este teste para verificar se tudo está OK:

```javascript
// Cole no console do navegador (F12):

// 1. Verificar HTML carregado
console.log('✓ HTML carregado:', document.documentElement.outerHTML ? 'SIM' : 'NÃO');

// 2. Verificar CSS carregado
const stylesheets = document.styleSheets.length;
console.log('✓ Stylesheets carregadas:', stylesheets);

// 3. Verificar JS carregado
console.log('✓ MobileNavigation:', typeof MobileNavigation);
console.log('✓ ContactForm:', typeof ContactForm);

// 4. Verificar elementos principais
console.log('✓ Hero encontrado:', !!document.querySelector('.hero'));
console.log('✓ Form encontrado:', !!document.querySelector('#contactForm'));
console.log('✓ Nav encontrado:', !!document.querySelector('.navbar'));

// 5. Verificar localStorage
console.log('✓ LocalStorage disponível:', !!window.localStorage);

// Se vir todos "SIM", site está OK!
```

---

## 📞 RECURSOS DE AJUDA

**Se ainda tiver problemas:**

1. **Documentação:**
   - Leia: `BEST_PRACTICES.md`
   - Leia: `README.md`

2. **Validadores:**
   - HTML: https://validator.w3.org/
   - CSS: https://jigsaw.w3.org/css-validator/

3. **Ferramentas:**
   - DevTools: F12
   - Lighthouse: F12 → Lighthouse
   - Network: F12 → Network

4. **Comunidades:**
   - Stack Overflow
   - MDN Web Docs
   - CSS-Tricks

---

## ✅ CHECKLIST FINAL

Se seguiu tudo acima:
- [ ] Imagens aparecem
- [ ] Menu funciona
- [ ] Formulário valida
- [ ] Estilos carregam
- [ ] Links funcionam
- [ ] Animações funcionam
- [ ] Performance OK
- [ ] Responsivo
- [ ] Sem erros console
- [ ] Pronto para publicar!

---

**Não achou sua solução?** Volte aos documentos:
- `README.md` - Visão geral
- `SETUP.html` - Passo a passo
- `BEST_PRACTICES.md` - Entender código
