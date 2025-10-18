async function getGithubRepos() {
    
    const username = 'dragonbeardzephyr'; // Whaaaattttt?
    
    
    const apiUrl = `https://api.github.com/users/${username}/starred`;
    
    
    const portfolioContainer = document.getElementById('projects-list');

    try {
        
        const response = await fetch(apiUrl);
        
        const repos = await response.json();

        
        portfolioContainer.innerHTML = ''; 

        
        repos.forEach(async repo => {
            
            const card = document.createElement('div');
            card.classList.add('project'); // Add a class for styling

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
        });

    } catch (error) {

        portfolioContainer.innerHTML = '<p>Sorry, could not fetch portfolio projects at this time.</p>';
        console.error('Error fetching GitHub repos:', error);
    }
}


getGithubRepos();