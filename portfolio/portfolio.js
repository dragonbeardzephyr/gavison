import { getGithubRepos } from "./update.js";


function renderProjects(projects) {

    const portfolioContainer = document.getElementById('projects-list');

    for (const repo of projects) {

            const card = document.createElement('div');
            card.classList.add('project');

            const languagesResponse = await fetch(repo.languages_url);
            const languages = await languagesResponse.json();
            const languageList = Object.keys(languages).join(', ') || 'Not specified';

            card.innerHTML = `
                <h2 class="project-title">${repo.name}</h2>
                <p class="project-description">${repo.description ?? 'No description available.'}</p>
                <div class="project-stats">
                    <span>Languages: ${languageList}</span>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                </div>
            `;

            portfolioContainer.appendChild(card);
    }
}




getGithubRepos();


const projects = await fetch('projects.json').then(response => response.json());


renderProjects(projects);

