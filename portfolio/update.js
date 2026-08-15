export async function getGithubRepos() {
    
    const username = 'dragonbeardzephyr'; // Whaaaattttt?
    const apiUrl = `https://api.github.com/users/${username}/starred`;

    var repos = JSON.parse(projects);

    try {
        
        const response = await fetch(apiUrl);
        
        const newRepos = await response.json();

        portfolioContainer.innerHTML = ''; 
        
        newRepos.forEach(async repo => {
            if (repos.some(existingRepo => existingRepo.id === repo.id)) {
                return; 
            } else {
                repos.push(repo); 
            }
        });


        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));


        await fs.writeFile(
            path.join(__dirname, 'projects.json'),
            JSON.stringify(repos, null, 2) + '\n',
            'utf8'
        );

        

    } catch (error) {

        portfolioContainer.innerHTML = '<p>Sorry, could not fetch portfolio projects at this time.</p>';
        console.error('Error fetching GitHub repos:', error);
    }
}