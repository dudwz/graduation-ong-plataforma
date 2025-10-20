import { initRouter } from './router.js';
import { renderProjects } from './templates.js';
import { initFormValidation } from './form.js';
import { initModal, initLazyLoading } from './ui.js';

export function initializeDynamicContent(container) {
    const cleanupFunctions = [];
    const projectContainer = container.querySelector('#projects-container');
    const cadastroForm = container.querySelector('#cadastro-form');
    const successModal = document.querySelector('#success-modal');
    const closeModalBtn = document.querySelector('#close-modal-btn');

    if (projectContainer) {
        renderProjects('#projects-container');
    }
    if (cadastroForm) {
        initFormValidation('#cadastro-form');
    }
    if (successModal && closeModalBtn) {
        const modalCleanup = initModal('#success-modal', '#close-modal-btn');
        cleanupFunctions.push(modalCleanup);
    }

    initLazyLoading(container);

    return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
    };
}

function initializeApp() {
    initRouter(initializeDynamicContent);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
