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

    const closeFn = () => hideModal(modalSelector);

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

    return () => {
        controller.abort();
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
