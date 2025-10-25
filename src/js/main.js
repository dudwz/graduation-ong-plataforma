import { initRouter } from './router.js';
import { renderProjects } from './templates.js';
import { initFormValidation } from './form.js';
import { initLazyLoading } from './ui.js';
import { initTheme } from './theme.js';

export function initializeDynamicContent(container) {
    const cleanupFunctions = [];
    const projectContainer = container.querySelector('#projects-container');
    const cadastroForm = container.querySelector('#cadastro-form');

    if (projectContainer) {
        renderProjects('#projects-container');
    }
    if (cadastroForm) {
        const formCleanup = initFormValidation('#cadastro-form');
        cleanupFunctions.push(formCleanup);
    }

    initLazyLoading(container);

    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
}

function initializeApp() {
    initTheme();
    initRouter(initializeDynamicContent);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
