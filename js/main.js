/**
 * PORTFÓLIO - JavaScript Principal
 * Responsável por interações, animações e lógica do site
 * Usando ES6+ vanilla JavaScript
 */

// ======================== CONFIGURAÇÕES GERAIS ========================

const CONFIG = {
  animationDelay: 0.1,
  scrollThreshold: 0.1,
};

// ======================== NAVEGAÇÃO ========================

/**
 * Gerencia o menu responsivo (mobile)
 */
class MobileNavigation {
  constructor() {
    this.toggle = document.getElementById('navToggle');
    this.menu = document.getElementById('navMenu');
    this.links = document.querySelectorAll('.navbar__link');
    
    this.init();
  }

  init() {
    // Toggle do menu ao clicar no botão hamburger
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Fechar menu ao clicar em um link
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.menu.classList.toggle('active');
  }

  closeMenu() {
    this.toggle.classList.remove('active');
    this.menu.classList.remove('active');
  }
}

// ======================== SCROLL SUAVE ========================

/**
 * Implementa scroll suave para links de âncora
 */
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Pular se for apenas "#"
    if (href === '#') return;
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// ======================== ANIMAÇÕES AO SCROLL ========================

/**
 * Anima elementos quando eles entram no viewport
 */
class ScrollAnimation {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    const options = {
      threshold: CONFIG.scrollThreshold,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Adiciona delay para efeito em cascata
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, index * CONFIG.animationDelay * 100);

          // Para de observar após animação
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observa elementos com animação
    this.observeElements();
  }

  observeElements() {
    // Elementos com animação automática
    const animatedElements = document.querySelectorAll(
      '.about__text, .stat, .skills__category, .project-card, ' +
      '.service-card, .testimonial-card, .contact-form'
    );

    animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }
}

// ======================== FORMULÁRIO DE CONTATO ========================

/**
 * Gerencia o formulário de contato com integração EmailJS
 */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.feedback = document.getElementById('formFeedback');
    
    // Configurações do EmailJS
    this.serviceID = 'service_tzi3f4u'; // Será criado/configurado no EmailJS
    this.templateID = 'template_bny80ae'; // Será criado/configurado no EmailJS
    this.destinationEmail = 'televox.fabio@gmail.com';
    
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Valida os campos do formulário
   * @param {Object} data - Dados do formulário
   * @returns {boolean} - True se válido
   */
  validate(data) {
    const errors = [];

    // Validar nome
    if (!data.name || data.name.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    // Validar email
    if (!this.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }

    // Validar assunto
    if (!data.subject || data.subject.trim().length < 5) {
      errors.push('Assunto deve ter pelo menos 5 caracteres');
    }

    // Validar mensagem
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }

    if (errors.length > 0) {
      this.showError(errors.join(', '));
      return false;
    }

    return true;
  }

  /**
   * Valida formato de email
   * @param {string} email - Email a validar
   * @returns {boolean}
   */
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Manipula envio do formulário
   * @param {Event} e - Evento do formulário
   */
  handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: this.form.name.value,
      email: this.form.email.value,
      subject: this.form.subject.value,
      message: this.form.message.value,
      to_email: this.destinationEmail // Email de destino
    };

    // Validar
    if (!this.validate(formData)) {
      return;
    }

    // Mostrar carregamento
    this.showLoading();

    // Enviar via EmailJS
    this.sendEmail(formData);
  }

  /**
   * Envia email via EmailJS
   * @param {Object} formData - Dados do formulário
   */
  sendEmail(formData) {
    emailjs.send(
      this.serviceID,
      this.templateID,
      {
        // to_email: this.destinationEmail,
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        // reply_to: formData.email
      }
    ).then(
      (response) => {
        console.log('✅ Email enviado com sucesso!', response);
        this.showSuccess('Mensagem enviada com sucesso! Vou responder em breve.');
        this.form.reset();
      },
      (error) => {
        console.error('❌ Erro ao enviar email:', error);
        this.showError('Erro ao enviar mensagem. Por favor, tente novamente.');
      }
    );
  }

  /**
   * Mostra mensagem de sucesso
   * @param {string} message - Mensagem a exibir
   */
  showSuccess(message) {
    this.feedback.textContent = message;
    this.feedback.className = 'contact-form__feedback success';
  }

  /**
   * Mostra mensagem de erro
   * @param {string} message - Mensagem de erro
   */
  showError(message) {
    this.feedback.textContent = '❌ ' + message;
    this.feedback.className = 'contact-form__feedback error';
  }

  /**
   * Mostra estado de carregamento
   */
  showLoading() {
    this.feedback.textContent = 'Enviando mensagem...';
    this.feedback.className = 'contact-form__feedback';
  }
}

// ======================== NAVBAR ATIVA ========================

/**
 * Destaca o link do navbar correspondente à seção visível
 */
class ActiveNavigation {
  constructor() {
    this.links = document.querySelectorAll('.navbar__link');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.updateActiveLink());
    this.updateActiveLink(); // Chamar na inicialização
  }

  updateActiveLink() {
    let currentSection = '';

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    this.links.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// ======================== EFEITO PARALLAX ========================

/**
 * Cria efeito parallax simples em elementos
 */
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', () => this.applyParallax());
  }

  applyParallax() {
    this.elements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = window.pageYOffset * speed;

      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// ======================== PROGRESS BAR DAS SKILLS ========================

/**
 * Anima as barras de progresso das skills
 */
class SkillsProgress {
  constructor() {
    this.progressBars = document.querySelectorAll('.skill-item__progress');
    this.observer = null;
    this.init();
  }

  init() {
    const options = {
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateProgressBar(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.progressBars.forEach(bar => {
      this.observer.observe(bar);
    });
  }

  animateProgressBar(bar) {
    const width = bar.style.width;
    bar.style.width = '0';

    setTimeout(() => {
      bar.style.transition = 'width 1s ease-out';
      bar.style.width = width;
    }, 100);
  }
}

// ======================== INICIALIZAÇÃO ========================

/**
 * Inicializa todos os módulos quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfólio carregado com sucesso!');

  // Inicializar módulos
  new MobileNavigation();
  new SmoothScroll();
  new ScrollAnimation();
  new ContactForm();
  new ActiveNavigation();
  new ParallaxEffect();
  new SkillsProgress();

  // Log de sucesso
  console.log('✅ Todos os módulos inicializados');
});

// ======================== UTILITÁRIOS ========================

/**
 * Throttle para otimizar performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce para otimizar performance
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ======================== MODO ESCURO (FUTURO) ========================

/**
 * Detecta preferência de modo escuro do sistema
 */
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkMode.matches) {
  document.documentElement.style.colorScheme = 'dark';
}

prefersDarkMode.addEventListener('change', (e) => {
  document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
});

// ======================== SERVICE WORKER (OFFLINE) ========================

/**
 * Registra service worker para funcionalidade offline
 */
if ('serviceWorker' in navigator) {
  // Descomente para ativar
  // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW error:', err));
}
