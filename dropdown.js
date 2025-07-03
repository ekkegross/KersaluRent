document.addEventListener('DOMContentLoaded', () => {
    const nav     = document.querySelector('nav');
    const toggle  = document.getElementById('menu-toggle');
    const menu    = document.getElementById('dropdown-menu');
    const links   = menu.querySelectorAll('a');
    let isOpen    = false;
    let lastSticky;

    // Static mode
    function applyStatic() {
        const rect = nav.getBoundingClientRect();
        const available = window.innerHeight - (rect.top + rect.height);
        Object.assign(menu.style, {
            position: 'absolute',
            top:      '100%',     
            left:     '0',
            right:    '0',
            width:    '',         
            maxHeight:`${available}px`,
            overflowY:'auto',
            WebkitOverflowScrolling:'touch'
        });
    }

    // Sticky mode
    function applyFixed() {
        const rect = nav.getBoundingClientRect();
        Object.assign(menu.style, {
            position: 'fixed',
            top:      `${rect.height}px`,                    
            left:     `${rect.left}px`,
            width:    `${rect.width}px`,
            maxHeight:`${window.innerHeight - rect.height}px`,
            overflowY:'auto',
            WebkitOverflowScrolling:'touch'
        });
    }

    function handleStick() {
        const nowSticky = nav.getBoundingClientRect().top <= 0;
        if (nowSticky !== lastSticky) {
            lastSticky = nowSticky;
            if (nowSticky) applyFixed();
            else applyStatic();
        }
    }

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        menu.classList.toggle('show', isOpen);
        toggle.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);

        if (isOpen && window.matchMedia('(max-width: 768px)').matches) {
            lastSticky = nav.getBoundingClientRect().top <= 0;
            lastSticky ? applyFixed() : applyStatic();
            window.addEventListener('scroll',  handleStick);
            window.addEventListener('resize',  handleStick);
        } else {
            window.removeEventListener('scroll', handleStick);
            window.removeEventListener('resize', handleStick);
            menu.style.cssText = '';  
        }
    });

    links.forEach(a => a.addEventListener('click', () => {
        if (isOpen) toggle.click();
    }));
});