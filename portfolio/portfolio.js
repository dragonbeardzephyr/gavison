const USERNAME = 'dragonbeardzephyr';
const API_URL = `https://api.github.com/users/${USERNAME}/starred`;
const portfolioContainer = document.getElementById('projects-list');

async function fetchAndRenderRepos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('GitHub API request failed');
    
    const repos = await response.json();
    
    //repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    portfolioContainer.innerHTML = '';

    for (const repo of repos) {
      const card = document.createElement('div');
      card.classList.add('project');

      let languageList = 'Not specified';
      try {
        const langRes = await fetch(repo.languages_url);
        const languages = await langRes.json();
        const keys = Object.keys(languages);
        if (keys.length > 0) languageList = keys.join(', ');
      } catch (err) {
        console.warn(`Could not load languages for ${repo.name}`, err);
      }

      card.innerHTML = `
        <div class="project">
          <h2>${repo.name}</h2>
          <p>${repo.description ?? 'No description available.'}</p>
          <div>
            <span>Languages: ${languageList}</span>
          </div>
          <div>
            <a href="${repo.html_url}">View Repository</a>
          </div>
        </div>
      `;

      portfolioContainer.appendChild(card);
    }
  } catch (error) {
    console.error('Error fetching repos:', error);
    portfolioContainer.innerHTML = '<p>Sorry, could not fetch portfolio projects at this time.</p>';
  }
}

fetchAndRenderRepos();