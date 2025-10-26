const THEME_STORAGE_KEY = 'ong-theme-preference';
const THEME_DARK = 'dark-mode';
const THEME_LIGHT = 'light-mode';

function getThemePreference() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (stored === 'dark' || stored === 'light') {
        return stored;
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

function applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
        body.classList.remove(THEME_LIGHT);
        body.classList.add(THEME_DARK);
    } else {
        body.classList.remove(THEME_DARK);
        body.classList.add(THEME_LIGHT);
    }
    
    updateThemeButtonLabel(theme);
}

function saveThemePreference(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function toggleTheme() {
    const currentTheme = getThemePreference();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    saveThemePreference(newTheme);
}

function updateThemeButtonLabel(theme) {
    const button = document.querySelector('#theme-toggle');
    if (button) {
        const label = theme === 'dark' 
            ? 'Alternar para modo claro' 
            : 'Alternar para modo escuro';
        button.setAttribute('aria-label', label);
        button.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    }
}

export function initTheme() {
    const initialTheme = getThemePreference();
    applyTheme(initialTheme);
    
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = (e) => {
            const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);
            if (!storedPreference) {
                const systemTheme = e.matches ? 'dark' : 'light';
                applyTheme(systemTheme);
            }
        };
        
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', handleSystemThemeChange);
        }
    }
}
