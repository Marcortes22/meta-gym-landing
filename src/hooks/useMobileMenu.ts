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
    
    if (button && panel) {
      button.setAttribute('aria-expanded', isOpen.toString());
      panel.classList.toggle('show', isOpen);
    }
  };
  
  const updateBodyScroll = () => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  
  const handleOutsideClick = (event: Event) => {
    const button = document.querySelector('.mobile-menu-button');
    const panel = document.querySelector('.mobile-menu-panel');
    const target = event.target as Node;
    
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
    // Inicializar event listeners
    const button = document.querySelector('.mobile-menu-button');
    const links = document.querySelectorAll('.mobile-nav-link');
    
    if (button) {
      button.addEventListener('click', toggle);
    }
    
    // Cerrar menú al hacer clic en un link
    links.forEach(link => {
      link.addEventListener('click', close);
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', handleOutsideClick);
    
    // Limpiar event listeners al desmontar
    return () => {
      if (button) {
        button.removeEventListener('click', toggle);
      }
      links.forEach(link => {
        link.removeEventListener('click', close);
      });
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