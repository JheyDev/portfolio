// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  // Remover alteração de cor para manter sempre escuro
  header.style.backgroundColor = '';
  header.style.boxShadow = '';
});

// Portfolio Main Category Navigation
const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
const portfolioCategories = document.querySelectorAll('.portfolio-category');

mainFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    mainFilterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const mainCategory = button.getAttribute('data-main-category');
    portfolioCategories.forEach(category => {
      category.classList.remove('active');
    });
    const targetCategory = document.getElementById(`${mainCategory}-category`);
    if (targetCategory) {
      targetCategory.classList.add('active');
      const firstSubBtn = targetCategory.querySelector('.subcategory-btn');
      if (firstSubBtn) firstSubBtn.click();
    }
  });
});

// Portfolio Subcategory Navigation
function initializeSubcategoryNavigation(categoryId) {
  const category = document.getElementById(categoryId);
  if (!category) return;
  const subcategoryButtons = Array.from(category.querySelectorAll('.subcategory-btn'));
  // Corrigido: busca todos os .subcategory-content filhos diretos de .portfolio-carousel
  const portfolioCarousel = category.querySelector('.portfolio-carousel');
  if (!portfolioCarousel) return;
  // Use only ELEMENT_NODE children and filter by class
  const subcategoryContents = Array.from(portfolioCarousel.children)
    .filter(el => el.nodeType === 1 && el.classList.contains('subcategory-content'));

  // Hide all subcategory contents initially
  subcategoryContents.forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
  });

  subcategoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      subcategoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const subcategory = button.getAttribute('data-subcategory');
      subcategoryContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      const targetContent = subcategoryContents.find(content => content.getAttribute('data-subcategory') === subcategory);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = '';
      }
    });
  });

  // Show first subcategory by default
  if (subcategoryButtons.length) {
    subcategoryButtons[0].classList.add('active');
    const firstContent = subcategoryContents.find(content => content.getAttribute('data-subcategory') === subcategoryButtons[0].getAttribute('data-subcategory'));
    if (firstContent) {
      firstContent.classList.add('active');
      firstContent.style.display = '';
    }
  }
}

initializeSubcategoryNavigation('frontend-category');
initializeSubcategoryNavigation('design-category');

// Remover navegação por setas do portfólio
// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simple validation
  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um email válido.');
    return;
  }
  
  // Simulate form submission
  alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
  contactForm.reset();
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-avatar');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Skills animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${Array.from(skillItems).indexOf(entry.target) * 0.1}s`;
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(skill => {
  skillObserver.observe(skill);
});

// Lazy loading for portfolio images
const portfolioImages = document.querySelectorAll('.portfolio-image img');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.src; // This will trigger the actual loading
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

portfolioImages.forEach(img => {
  imageObserver.observe(img);
});

// Add smooth transitions when switching between subcategories
document.addEventListener('DOMContentLoaded', () => {
  // Add initial animation delay to portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Certificado: overlay e modal
document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  const modalImg = modal.querySelector('.cert-modal-img');
  const modalTitle = modal.querySelector('.cert-modal-title');
  const modalDesc = modal.querySelector('.cert-modal-desc');
  const modalClose = modal.querySelector('.cert-modal-close');
  const modalLink = modal.querySelector('.cert-modal-link');

  // Open modal on "Ver mais"
  document.querySelectorAll('.cert-read-more').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      // fallback: pega o overlay pai se não encontrar os atributos
      let img = btn.getAttribute('data-img');
      let title = btn.getAttribute('data-title');
      let desc = btn.getAttribute('data-desc');
      let link = btn.getAttribute('data-link');
      // fallback para pegar do DOM se não vier nos atributos
      if (!img || !title || !desc) {
        const overlay = btn.closest('.cert-overlay');
        if (overlay) {
          const card = overlay.closest('.certification-card');
          if (card) {
            const imgEl = card.querySelector('img');
            const titleEl = card.querySelector('.cert-title');
            const descEl = overlay.querySelector('.cert-desc');
            img = img || (imgEl ? imgEl.src : '');
            title = title || (titleEl ? titleEl.textContent : '');
            desc = desc || (descEl ? descEl.textContent : '');
          }
        }
      }
      if (modalImg) {
        modalImg.src = img || '';
        modalImg.alt = title || '';
      }
      if (modalTitle) modalTitle.textContent = title || '';
      if (modalDesc) modalDesc.textContent = desc || '';
      if (modalLink) {
        if (link) {
          modalLink.href = link;
          modalLink.style.display = 'inline-flex';
        } else {
          modalLink.style.display = 'none';
        }
      }
      modal.classList.add('active');
    });
  });

  // Close modal on X or outside
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

// Certificações Carousel (robusto para DOM dinâmico)
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.certifications-grid');
  const prevBtn = document.querySelector('.cert-prev-btn');
  const nextBtn = document.querySelector('.cert-next-btn');
  if (!grid || !prevBtn || !nextBtn) return;

  let current = 0;

  function getCardWidth() {
    const card = grid.querySelector('.certification-card');
    if (!card) return 0;
    const style = window.getComputedStyle(grid);
    let gap = 0;
    if (style.gap) gap = parseInt(style.gap) || 0;
    else gap = 16;
    return card.offsetWidth + gap;
  }

  function visibleCount() {
    const gridWidth = grid.parentElement.offsetWidth;
    const cardWidth = getCardWidth();
    if (!cardWidth) return 1;
    return Math.max(1, Math.floor(gridWidth / cardWidth));
  }

  function maxIndex() {
    const total = grid.children.length;
    const visible = visibleCount();
    return Math.max(0, total - visible);
  }

  function updateCarousel() {
    const cardWidth = getCardWidth();
    const max = maxIndex();
    if (current < 0) current = max;
    if (current > max) current = 0;
    grid.style.transform = `translateX(-${cardWidth * current}px)`;
  }

  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    current--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    current++;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);

  // Inicialização segura
  setTimeout(updateCarousel, 300);
  window.addEventListener('load', updateCarousel);
});

// Modal para portfólio (igual ao certificado)
document.addEventListener('DOMContentLoaded', () => {
  // Portfolio modal: abre ao clicar na imagem do card
  document.querySelectorAll('.portfolio-cert-card .portfolio-image.cert-image-hover').forEach(imgDiv => {
    imgDiv.addEventListener('click', function (e) {
      // Evita conflito com links internos
      if (e.target.closest('a')) return;
      const img = imgDiv.querySelector('img');
      const desc = imgDiv.querySelector('.cert-desc') ? imgDiv.querySelector('.cert-desc').textContent : '';
      const card = imgDiv.closest('.portfolio-cert-card');
      const title = card ? (card.querySelector('.cert-title') ? card.querySelector('.cert-title').textContent : '') : '';
      // Pega o primeiro link externo do projeto (se houver)
      const linkEl = imgDiv.querySelector('.portfolio-link');
      const link = linkEl ? linkEl.href : '';
      // Usa o modal já existente
      const modal = document.getElementById('cert-modal');
      const modalImg = modal.querySelector('.cert-modal-img');
      const modalTitle = modal.querySelector('.cert-modal-title');
      const modalDesc = modal.querySelector('.cert-modal-desc');
      const modalLink = modal.querySelector('.cert-modal-link');
      modalImg.src = img ? img.src : '';
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      if (link) {
        modalLink.href = link;
        modalLink.style.display = 'inline-flex';
      } else {
        modalLink.style.display = 'none';
      }
      modal.classList.add('active');
    });
  });
});

// Truncar texto do hover dos projetos e mostrar "Ver mais" se > 20 caracteres
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.portfolio-image .cert-overlay, .portfolio-cert-card .portfolio-image .cert-overlay').forEach(overlay => {
    const descSpan = overlay.querySelector('.cert-desc');
    const readMoreBtn = overlay.querySelector('.cert-read-more');
    if (descSpan) {
      const fullText = descSpan.getAttribute('data-full') || descSpan.textContent.trim();
      if (fullText.length > 20) {
        descSpan.setAttribute('data-full', fullText);
        descSpan.textContent = fullText.slice(0, 20) + '...';
        if (readMoreBtn) readMoreBtn.style.display = 'inline-block';
      } else {
        descSpan.textContent = fullText;
        if (readMoreBtn) readMoreBtn.style.display = 'none';
      }
    }
  });
});

console.log('Portfólio com navegação por categorias carregado com sucesso!');