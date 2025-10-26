import { projectsData } from './data.js';

function createProjectArticle(project) {
    return `
        <article class="project-card">
            <h3>${project.title}</h3>
            <img src="${project.image}" alt="${project.alt}" loading="lazy" width="400" height="200">
            <div class="project-content">
                <p>${project.description}</p>
            </div>
        </article>
    `;
}

export function renderProjects(containerSelector) {
    const container = document.querySelector(containerSelector);
    
    if (!container) {
        return;
    }
    
    const projectsHTML = projectsData
        .map(project => createProjectArticle(project))
        .join('');
    
    container.innerHTML = projectsHTML;
}
