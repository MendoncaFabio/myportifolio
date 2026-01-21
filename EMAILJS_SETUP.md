# 📧 Integração EmailJS - Guia de Configuração

## ✅ O que foi feito

A integração do EmailJS foi implementada no seu portfólio para receber mensagens do formulário de contato no email: **televox.fabio@gmail.com**

### Arquivos modificados:
- ✅ `index.html` - Adicionado script de inicialização do EmailJS
- ✅ `js/main.js` - Classe `ContactForm` agora envia emails via EmailJS

---

## 🔧 Próximos Passos - Configurar EmailJS

### 1️⃣ Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Clique em **"Sign Up"** (se não tiver conta)
- Complete o registro com seu email e senha

### 2️⃣ Copiar seu User ID
- Após login, vá em: **Account** → **API** (ou Dashboard)
- Copie seu **User ID** (algo como: `w2PwHlOqfNpXR5oVo`)
- Substitua no arquivo `index.html` linha ~13:

```javascript
emailjs.init('SEU_USER_ID_AQUI'); // Substitua com seu User ID
```

### 3️⃣ Configurar Email Service
- No painel do EmailJS, vá em **Email Services** (ou "Integrations")
- Clique em **"Add Service"**
- Escolha **Gmail** (ou seu provedor de email)
- Siga as instruções para conectar sua conta Gmail
- **Copie o Service ID** (exemplo: `gmail_123` ou `default_service`)
- Atualize no arquivo `js/main.js` linha ~15:

```javascript
this.serviceID = 'SEU_SERVICE_ID_AQUI';
```

### 4️⃣ Criar Template de Email
- No painel do EmailJS, vá em **Email Templates**
- Clique em **"Create New Template"**
- **Nome do Template:** `template_contact`
- **Configurar o template:**

```html
Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}
---
{{message}}
```

**Variáveis disponíveis no formulário:**
- `{{from_name}}` - Nome da pessoa
- `{{from_email}}` - Email da pessoa
- `{{subject}}` - Assunto
- `{{message}}` - Mensagem
- `{{to_email}}` - Email de destino (televox.fabio@gmail.com)

- Defina o **To Email** como: `{{to_email}}`
- Defina o **Reply-To Email** como: `{{from_email}}`
- Clique em **Save**
- **Copie o Template ID**: `template_contact`

### 5️⃣ Atualizar arquivo main.js
No arquivo `js/main.js`, atualize as variáveis na classe `ContactForm`:

```javascript
this.serviceID = 'COPY_AQUI_O_SERVICE_ID';      // Ex: 'gmail_service'
this.templateID = 'template_contact';             // Mantenha assim
this.destinationEmail = 'televox.fabio@gmail.com'; // Email de destino
```

---

## ✨ Teste a Integração

1. Abra seu portfólio no navegador
2. Acesse a seção de **Contato**
3. Preencha o formulário com seus dados
4. Clique em **"Enviar Mensagem"**
5. Verifique seu email: `televox.fabio@gmail.com`

### Mensagens esperadas:
- ✅ **Sucesso:** "Mensagem enviada com sucesso! Vou responder em breve."
- ❌ **Erro:** Se houver problemas, verifique a documentação do EmailJS

---

## 🆘 Troubleshooting

### Erro: "Service ID not found"
- Verifique se o `serviceID` está correto em `js/main.js`
- Confirme que o serviço foi criado no painel do EmailJS

### Erro: "Template not found"
- Verifique se o template `template_contact` existe
- Confirme que o `templateID` está correto

### Erro: "Invalid User ID"
- Copie seu User ID correto do dashboard do EmailJS
- Atualize em `index.html`

### Emails não chegam
- Verifique a pasta de SPAM/Lixo
- Confirme as credenciais da conta Gmail conectada
- Teste o envio no painel do EmailJS antes

---

## 📋 Checklist Final

- [ ] Conta EmailJS criada e ativa
- [ ] User ID copiado para `index.html`
- [ ] Email Service configurado (Gmail)
- [ ] Service ID copiado para `js/main.js`
- [ ] Template `template_contact` criado
- [ ] Variáveis no template configuradas corretamente
- [ ] Teste de envio realizado com sucesso
- [ ] Email recebido em `televox.fabio@gmail.com`

---

## 🔐 Dicas de Segurança

⚠️ **Importante:**
- O User ID será visível no código fonte (é intencional - é público)
- Para maior segurança em produção, considere usar backend próprio
- Nunca compartilhe credenciais Gmail em repositórios públicos

---

## 📚 Referências

- 📖 Docs EmailJS: https://www.emailjs.com/docs/
- 🎥 Tutorial Oficial: https://www.emailjs.com/docs/tutorial/
- 💬 Suporte: https://www.emailjs.com/docs/faqs/

