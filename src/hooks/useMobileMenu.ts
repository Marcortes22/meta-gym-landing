// Hook personalizado para manejar el estado del menú móvil
export function useMobileMenu() {
  let isOpen = false;
  
  const toggle = () => {
    isOpen = !isOpen;
    updateUI();
    updateBodyScroll();
  };
  
  const open = () => {
    isOpen = true;
    updateUI();
    updateBodyScroll();
  };
  
  const close = () => {
    isOpen = false;
    updateUI();
    updateBodyScroll();
  };
  
  const updateUI = () => {
    const button = document.querySelector('.mobile-menu-button') as HTMLButtonElement;
    const panel = document.querySelector('.mobile-menu-panel') as HTMLElement;
    const overlay = document.querySelector('.mobile-overlay') as HTMLElement;
    
    if (button && panel) {
      button.setAttribute('aria-expanded', isOpen.toString());
      panel.classList.toggle('show', isOpen);
      
      if (overlay) {
        overlay.classList.toggle('show', isOpen);
      }
    }
  };
  
  const updateBodyScroll = () => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };
  
  const handleOutsideClick = (event: Event) => {
    const button = document.querySelector('.mobile-menu-button');
    const panel = document.querySelector('.mobile-menu-panel');
    const overlay = document.querySelector('.mobile-overlay');
    const target = event.target as Node;
    
    // Cerrar si se hace clic en el overlay
    if (overlay && overlay.contains(target) && isOpen) {
      close();
      return;
    }
    
    // Cerrar si se hace clic fuera del panel y botón
    if (
      button && 
      panel && 
      !button.contains(target) && 
      !panel.contains(target) && 
      isOpen
    ) {
      close();
    }
  };
  
  const init = () => {
    // Asegurar estado inicial cerrado
    isOpen = false;
    document.body.classList.remove('menu-open');
    
    // Inicializar event listeners
    const button = document.querySelector('.mobile-menu-button');
    const closeButton = document.querySelector('.close-menu-button');
    const links = document.querySelectorAll('.mobile-nav-link');
    const ctaButton = document.querySelector('.mobile-cta-button');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (button) {
      button.addEventListener('click', toggle);
    }
    
    if (closeButton) {
      closeButton.addEventListener('click', close);
    }
    
    if (overlay) {
      overlay.addEventListener('click', close);
    }
    
    // Cerrar menú al hacer clic en un link
    links.forEach(link => {
      link.addEventListener('click', close);
    });
    
    // Cerrar menú al hacer clic en CTA
    if (ctaButton) {
      ctaButton.addEventListener('click', close);
    }
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', handleOutsideClick);
    
    // Limpiar event listeners al desmontar
    return () => {
      if (button) {
        button.removeEventListener('click', toggle);
      }
      if (closeButton) {
        closeButton.removeEventListener('click', close);
      }
      if (overlay) {
        overlay.removeEventListener('click', close);
      }
      links.forEach(link => {
        link.removeEventListener('click', close);
      });
      if (ctaButton) {
        ctaButton.removeEventListener('click', close);
      }
      document.removeEventListener('click', handleOutsideClick);
    };
  };
  
  return {
    isOpen,
    toggle,
    open,
    close,
    init
  };
}