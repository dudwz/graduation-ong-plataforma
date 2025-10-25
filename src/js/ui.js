export function showModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    if (modal) {
        modal.classList.add('active');
    }
} 

export function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    if (modal) {
        modal.classList.remove('active');
    }
}

export function initModal(modalSelector, closeButtonSelector) {
    const modal = document.querySelector(modalSelector);
    const closeButton = document.querySelector(closeButtonSelector);
    
    if (!modal) {
        return () => {};
    }
    
    const controller = new AbortController();
    const { signal } = controller;
    let previouslyFocusedElement = null;

    const closeFn = () => {
        hideModal(modalSelector);
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    };

    const getFocusableElements = () => {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        return Array.from(modal.querySelectorAll(focusableSelectors.join(', ')));
    };

    const handleTabKey = (event) => {
        if (!modal.classList.contains('active')) {
            return;
        }

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    };

    const modalObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (modal.classList.contains('active')) {
                    previouslyFocusedElement = document.activeElement;
                    const focusableElements = getFocusableElements();
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            }
        });
    });

    modalObserver.observe(modal, { attributes: true });

    if (closeButton) {
        closeButton.addEventListener('click', closeFn, { signal });
    }
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeFn();
        }
    }, { signal });
    
    const escapeKeyFn = (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeFn();
        }
    };
    
    document.addEventListener('keydown', escapeKeyFn, { signal });
    document.addEventListener('keydown', handleTabKey, { signal });

    return () => {
        controller.abort();
        modalObserver.disconnect();
    };
}

export function initLazyLoading(parentElement = document) {
    const lazyImages = parentElement.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        if (img.parentElement && img.parentElement.classList.contains('img-wrapper')) {
            if (img.complete) {
                img.classList.add('loaded');
                img.parentElement.classList.add('loaded');
            }
            return;
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'img-wrapper';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            wrapper.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
            wrapper.classList.add('loaded');
        }
    });
}
