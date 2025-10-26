const IS_FILE_PROTOCOL = typeof window !== 'undefined' && window.location && window.location.protocol === 'file:';
let pageInitializer = () => {};
let currentPageCleanup = () => {};

async function loadPage(url) {
    if (IS_FILE_PROTOCOL) {
        return;
    }
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newMain = doc.querySelector('main');
        const currentMain = document.querySelector('main');
        
        if (newMain && currentMain) {
            if (typeof currentPageCleanup === 'function') {
                currentPageCleanup();
            }
            const exitAnim = currentMain.animate([
                { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
                { opacity: 0, transform: 'translateY(-30px) scale(0.95)', filter: 'blur(5px)' }
            ], {
                duration: 350,
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                fill: 'forwards'
            });

            try { await exitAnim.finished; } catch (_) {}

            currentMain.innerHTML = newMain.innerHTML;
            
            if (!currentMain.hasAttribute('aria-live')) {
                currentMain.setAttribute('aria-live', 'polite');
            }

            const enterAnim = currentMain.animate([
                { opacity: 0, transform: 'translateY(30px) scale(0.95)', filter: 'blur(5px)' },
                { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'both'
            });

            const children = Array.from(currentMain.children);
            children.forEach((el, idx) => {
                el.animate([
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 600,
                    delay: 75 * idx,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    fill: 'backwards'
                });
            });

            currentPageCleanup = pageInitializer(currentMain);

            const mainHeading = currentMain.querySelector('h2');
            if (mainHeading) {
                mainHeading.setAttribute('tabindex', '-1');
                mainHeading.focus();
                mainHeading.addEventListener('blur', () => {
                    mainHeading.removeAttribute('tabindex');
                }, { once: true });
            }

            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
}

function handleNavClick(event) {
    const link = event.target.closest('header nav a');
    
    if (!link) {
        return;
    }

    if (IS_FILE_PROTOCOL) {
        return;
    }
    event.preventDefault();

    const url = link.getAttribute('href');
    loadPage(url);

    if (!IS_FILE_PROTOCOL) {
        history.pushState(null, '', url);
    }
}

function handlePopState() {
    if (IS_FILE_PROTOCOL) {
        return;
    }
    loadPage(window.location.pathname.split('/').pop() || 'index.html');
}

export function initRouter(initializer) {
    pageInitializer = initializer;
    document.addEventListener('click', handleNavClick);
    window.addEventListener('popstate', handlePopState);
    currentPageCleanup = pageInitializer(document.body);
}
