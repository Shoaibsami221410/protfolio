"use server";

export async function fetchGithubRepoData(repoUrl: string) {
  try {
    // Basic extraction of owner/repo from URL
    // e.g., https://github.com/ShoaibSami/portfolio
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/i;
    const match = repoUrl.match(urlPattern);

    if (!match) {
      return { error: "Invalid GitHub URL format." };
    }

    const owner = match[1];
    let repo = match[2];
    
    // Remove .git if present
    if (repo.endsWith('.git')) {
      repo = repo.slice(0, -4);
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-CMS"
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { error: "Repository not found. Make sure it is public." };
      }
      return { error: `GitHub API returned status: ${response.status}` };
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        title: data.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        short_description: data.description || "",
        github_url: data.html_url,
        live_url: data.homepage || "",
        technologies: data.topics || [],
      }
    };
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    return { error: "Failed to fetch data from GitHub." };
  }
}
