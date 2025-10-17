// A function to fetch and display your GitHub repos
async function getGithubRepos() {
    // Your GitHub username
    const username = 'dragonbeardzephyr';
    
    // The API endpoint URL
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    
    // The container where the cards will be placed
    const portfolioContainer = document.getElementById('projects-list');

    try {
        // Fetch the data from the API
        const response = await fetch(apiUrl);
        
        // Convert the response to JSON
        const repos = await response.json();

        // Clear any loading text or placeholders
        portfolioContainer.innerHTML = ''; 

        // Loop through each repository
        repos.forEach(repo => {
            // --- Create the Card Element ---
            const card = document.createElement('div');
            card.classList.add('project'); // Add a class for styling

            // --- Populate the Card with Repo Data ---
            // We use the nullish coalescing operator (??) to provide fallbacks for missing data.
            card.innerHTML = `
                <h2 class="project-title">${repo.name}</h2>
                <p class="project-description">${repo.description ?? 'No description available.'}</p>
                <div class="project-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span> Forks: ${repo.forks_count}</span>
                    <span>${repo.language ?? ''}</span>
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            `;

            // --- Append the new card to the container ---
            portfolioContainer.appendChild(card);
        });

    } catch (error) {
        // If there's an error, display it in the container
        portfolioContainer.innerHTML = '<p>Sorry, could not fetch portfolio projects at this time.</p>';
        console.error('Error fetching GitHub repos:', error);
    }
}

// Call the function when the page loads
getGithubRepos();