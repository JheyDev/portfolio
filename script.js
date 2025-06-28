// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isExpanded); // Adicione esta linha
  });

  // Fecha o menu mobile ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false'); // Atualiza para false ao fechar
  }));
}


// Rolagem suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80; // Ajuste conforme a altura do seu header fixo
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Efeito de rolagem do cabeçalho
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    // Remover alteração de cor para manter sempre escuro (ou adicione sua lógica de estilo aqui)
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Lógica para o Carrossel de Certificações
document.addEventListener('DOMContentLoaded', () => {
  const certificationsCarousel = document.querySelector('.certifications-carousel');
  const prevBtn = document.querySelector('.cert-prev-btn');
  const nextBtn = document.querySelector('.cert-next-btn');

  if (certificationsCarousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      // Ajuste o valor de rolagem conforme a largura do seu card + gap
      certificationsCarousel.scrollBy({
        left: -324, // Largura do card (300px) + gap (24px)
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      // Ajuste o valor de rolagem conforme a largura do seu card + gap
      certificationsCarousel.scrollBy({
        left: 324, // Largura do card (300px) + gap (24px)
        behavior: 'smooth'
      });
    });
  }
});

// Lógica de "Ver Mais" em Overlays e Modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cert-modal');
  const modalImg = modal.querySelector('.cert-modal-img');
  const modalTitle = modal.querySelector('.cert-modal-title');
  const modalDesc = modal.querySelector('.cert-modal-desc');
  const modalClose = modal.querySelector('.cert-modal-close');
  const certLinkBtn = modal.querySelector('.cert-modal-link'); // Botão genérico para certificação
  const githubLinkBtn = modal.querySelector('.github-link'); // Botão GitHub
  const canvaLinkBtn = modal.querySelector('.canva-link'); // Botão Canva

  // Seleciona todos os botões "Ver mais" e adiciona o event listener
  document.querySelectorAll('.cert-read-more').forEach(button => {
    button.addEventListener('click', function(event) {
      // Previne que o clique propague para o elemento pai (o card inteiro), se houver um listener lá
      event.stopPropagation(); 

      const img = this.getAttribute('data-img');
      const title = this.getAttribute('data-title');
      const desc = this.getAttribute('data-desc');
      const link = this.getAttribute('data-link'); // Link para certificados
      const githubLink = this.getAttribute('data-github-link'); // Link para GitHub
      const canvaLink = this.getAttribute('data-canva-link'); // Link para Canva

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      // Reseta a visibilidade de todos os botões de link
      certLinkBtn.style.display = 'none';
      githubLinkBtn.style.display = 'none';
      canvaLinkBtn.style.display = 'none';

      // Lógica condicional para exibir os botões corretos
      if (link) { // Se for um certificado
        certLinkBtn.href = link;
        certLinkBtn.innerHTML = 'Ver Certificação <i class="fas fa-external-link-alt"></i>'; // Garante o texto e o ícone
        certLinkBtn.style.display = 'inline-flex'; // Exibe o botão de certificação
      } else if (githubLink || canvaLink) { // Se for um projeto (com link GitHub ou Canva)
        if (githubLink) {
          githubLinkBtn.href = githubLink;
          githubLinkBtn.style.display = 'inline-flex';
        }
        if (canvaLink) {
          canvaLinkBtn.href = canvaLink;
          canvaLinkBtn.style.display = 'inline-flex';
        }
      }

      modal.classList.add('active'); // Mostra o modal
    });
  });

  // Fecha o modal ao clicar no 'x'
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Fecha o modal ao clicar fora da área de conteúdo (aprimorado)
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Previne rolagem da página quando o modal estiver ativo
  window.addEventListener('keydown', (e) => { // Adicionado para fechar com 'Esc'
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  modal.addEventListener('wheel', (e) => {
    if (modal.classList.contains('active')) {
      e.preventDefault();
    }
  }, { passive: false });
});


// Lógica para alternar categorias e subcategorias do Portfólio
document.addEventListener('DOMContentLoaded', () => {
  const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
  const subcategoryFilterButtons = document.querySelectorAll('.subcategory-btn');
  const portfolioCategories = document.querySelectorAll('.portfolio-category');
  const subcategoryContents = document.querySelectorAll('.subcategory-content');

  // Função para esconder todos os elementos de portfólio (categorias e subconteúdos) globalmente
  const hideAllPortfolioSections = () => {
    portfolioCategories.forEach(category => {
      category.classList.remove('active'); // Esconde todas as categorias principais
    });
    subcategoryContents.forEach(content => {
      content.classList.remove('active'); // Esconde todo o conteúdo da subcategoria
    });
    // Não gerencia os estados ativos dos botões aqui, deixe as funções de ativação lidarem com isso
  };

  // Função para ativar uma categoria principal e sua primeira subcategoria
  const activateMainCategory = (categoryName) => {
    hideAllPortfolioSections(); // Sempre começa escondendo tudo

    // Desativa todos os botões de filtro principais
    mainFilterButtons.forEach(btn => btn.classList.remove('active'));
    // Ativa o botão de filtro principal clicado
    document.querySelector(`.main-filter-btn[data-main-category="${categoryName}"]`).classList.add('active');

    const targetCategory = document.getElementById(`${categoryName}-category`);
    if (targetCategory) {
      targetCategory.classList.add('active'); // Mostra a categoria principal selecionada

      // Reseta todos os botões de subcategoria dentro da categoria principal atual
      targetCategory.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));

      // Ativa o primeiro botão de subcategoria e seu conteúdo
      const firstSubcategoryBtn = targetCategory.querySelector('.subcategory-btn');
      if (firstSubcategoryBtn) {
        firstSubcategoryBtn.classList.add('active');
        const firstSubcategoryContent = targetCategory.querySelector(`.subcategory-content[data-subcategory="${firstSubcategoryBtn.getAttribute('data-subcategory')}"]`);
        if (firstSubcategoryContent) {
          firstSubcategoryContent.classList.add('active');
        }
      }
    }
  };

  // Função para ativar uma subcategoria
  const activateSubcategory = (subCategoryName, mainCategoryName) => {
    // Esconde todo o conteúdo da subcategoria dentro da categoria principal atual
    const currentMainCategoryElement = document.getElementById(`${mainCategoryName}-category`);
    if (currentMainCategoryElement) {
        currentMainCategoryElement.querySelectorAll('.subcategory-content').forEach(content => {
            content.classList.remove('active');
        });
    }

    // Ativa apenas o conteúdo da subcategoria selecionada
    const targetSubcategoryContent = document.querySelector(`#${mainCategoryName}-category .subcategory-content[data-subcategory="${subCategoryName}"]`);
    if (targetSubcategoryContent) {
        targetSubcategoryContent.classList.add('active');
    }
  };

  mainFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const mainCategory = this.getAttribute('data-main-category');
      activateMainCategory(mainCategory);
    });
  });

  subcategoryFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const parentCategory = this.closest('.portfolio-category');
      parentCategory.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const subcategory = this.getAttribute('data-subcategory');
      const mainCategory = parentCategory.id.replace('-category', '');
      activateSubcategory(subcategory, mainCategory);
    });
  });

  // Carregamento inicial: Esconde tudo, depois ativa 'frontend' e sua primeira subcategoria
  activateMainCategory('frontend'); // Isso cuidará de todo o ocultamento e ativação inicial

  // ** Mobile/Tablet: Comportamento para exibir descrição e botão "Ver Mais" sempre nos cards **
  // Identifica se é um dispositivo móvel ou tablet (baseado na largura da tela)
  const isMobileOrTablet = window.matchMedia('(max-width: 768px)').matches;

  document.querySelectorAll('.cert-image-hover, .portfolio-image').forEach(imageWrapper => {
    const overlay = imageWrapper.querySelector('.cert-overlay');
    const descSpan = overlay.querySelector('.cert-desc');
    const readMoreBtn = overlay.querySelector('.cert-read-more');

    if (isMobileOrTablet) {
      // Em mobile/tablet, o overlay deve estar sempre visível
      overlay.style.opacity = '1';
      overlay.style.position = 'static'; // Altera de absolute para static para fluir no documento
      overlay.style.display = 'flex'; // Garante que o conteúdo dentro do overlay seja flex

      // Garante que o botão "Ver Mais" esteja sempre visível e com display correto
      if (readMoreBtn) {
        readMoreBtn.style.display = 'inline-block';
      }
      
      // Ajusta a descrição para não truncar excessivamente no card, se o CSS permitir mais linhas
      const fullText = descSpan.getAttribute('data-full') || descSpan.textContent.trim();
      descSpan.textContent = fullText; // Mostra o texto completo no card para mobile, se couber

      // Adiciona um listener de clique no próprio wrapper do card para abrir o modal
      // Isso é para o caso de a imagem ou outra parte do card ser clicada para abrir o modal,
      // já que o overlay está sempre visível e não precisa de hover.
      imageWrapper.addEventListener('click', function() {
        const buttonToClick = this.querySelector('.cert-read-more');
        if (buttonToClick) {
          buttonToClick.click(); // Simula o clique no botão "Ver mais" para abrir o modal
        }
      });

    } else {
      // Lógica para Desktop (comportamento de hover)
      // Certifique-se de que a opacidade e posição inicial sejam zero para o efeito de hover
      overlay.style.opacity = '0';
      overlay.style.position = 'absolute'; // Volta para absolute para o hover
      overlay.style.display = 'flex'; // Mantém flex para centralização

      imageWrapper.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
      });
      imageWrapper.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
      });

      // Trunca o texto se for muito longo para o display inicial no hover
      const fullText = descSpan.getAttribute('data-full') || descSpan.textContent.trim();
      if (fullText.length > 50) {
        descSpan.textContent = fullText.slice(0, 50) + '...';
      } else {
        descSpan.textContent = fullText;
      }
       if (readMoreBtn) {
        readMoreBtn.style.display = 'inline-block'; // Sempre visível no hover desktop
      }
    }
  });

});
