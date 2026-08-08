const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "aadyasingh55";
const GITHUB_API = "https://api.github.com";

const curatedProjects: Record<
  string,
  {
    title: string;
    eyebrow: string;
    text: string;
    stack: string[];
    signal: string;
    priority: number;
  }
> = {
  "agentops-support-automator": {
    title: "AgentOps Support Automator",
    eyebrow: "portfolio stopper",
    text: "A multi-agent task automation service for technical support triage, patch drafting, state history, and human-in-the-loop approval.",
    stack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "Docker", "Next.js"],
    signal: "Stateful agent orchestration",
    priority: 1,
  },
  "mlops-drift-monitor": {
    title: "MLOps Drift Monitor",
    eyebrow: "production mlops",
    text: "A predictive-maintenance system with model training, FastAPI machine-failure serving, PostgreSQL prediction logs, and sensor drift alerts.",
    stack: ["Python", "FastAPI", "Scikit-Learn", "PostgreSQL", "Docker", "MLOps"],
    signal: "Machine failure risk + sensor drift",
    priority: 2,
  },
  "taxi-booking-ml": {
    title: "CabPilot ML",
    eyebrow: "featured build",
    text: "A full-stack taxi booking MVP with Google Maps link parsing, driver workflows, JWT auth, trip persistence, and a transparent fare estimator.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "ML"],
    signal: "Maps links to real coordinates",
    priority: 3,
  },
  "Medical-RAG-System": {
    title: "Medical RAG System",
    eyebrow: "retrieval ai",
    text: "A healthcare-focused retrieval workflow for grounding medical-style questions in source documents and returning structured answers.",
    stack: ["Python", "RAG", "LLMs", "Vector Search"],
    signal: "Grounded medical retrieval",
    priority: 4,
  },
  "Australian-Rental-Insight-Copilot": {
    title: "Australian Rental Insight Copilot",
    eyebrow: "data product",
    text: "A data-driven assistant for exploring Australian rental market signals through analysis, retrieval, and an applied AI interface.",
    stack: ["Python", "Data Analysis", "AI", "Australia"],
    signal: "Local data insight system",
    priority: 5,
  },
};

const fallbackProjects = [
  {
    title: "AgentOps Support Automator",
    eyebrow: "portfolio stopper",
    text: curatedProjects["agentops-support-automator"].text,
    stack: curatedProjects["agentops-support-automator"].stack,
    signal: curatedProjects["agentops-support-automator"].signal,
    link: `https://github.com/${GITHUB_USERNAME}/agentops-support-automator`,
    repo: "agentops-support-automator",
    updatedAt: "",
    stars: 0,
    language: "Python",
  },
  {
    title: "MLOps Drift Monitor",
    eyebrow: "production mlops",
    text: curatedProjects["mlops-drift-monitor"].text,
    stack: curatedProjects["mlops-drift-monitor"].stack,
    signal: curatedProjects["mlops-drift-monitor"].signal,
    link: `https://github.com/${GITHUB_USERNAME}/mlops-drift-monitor`,
    repo: "mlops-drift-monitor",
    updatedAt: "",
    stars: 0,
    language: "Python",
  },
  {
    title: "CabPilot ML",
    eyebrow: "featured build",
    text: curatedProjects["taxi-booking-ml"].text,
    stack: curatedProjects["taxi-booking-ml"].stack,
    signal: curatedProjects["taxi-booking-ml"].signal,
    link: `https://github.com/${GITHUB_USERNAME}/taxi-booking-ml`,
    repo: "taxi-booking-ml",
    updatedAt: "",
    stars: 0,
    language: "TypeScript",
  },
  {
    title: "Medical RAG System",
    eyebrow: "retrieval ai",
    text: curatedProjects["Medical-RAG-System"].text,
    stack: curatedProjects["Medical-RAG-System"].stack,
    signal: curatedProjects["Medical-RAG-System"].signal,
    link: `https://github.com/${GITHUB_USERNAME}/Medical-RAG-System`,
    repo: "Medical-RAG-System",
    updatedAt: "",
    stars: 0,
    language: "Python",
  },
  {
    title: "Australian Rental Insight Copilot",
    eyebrow: "data product",
    text: curatedProjects["Australian-Rental-Insight-Copilot"].text,
    stack: curatedProjects["Australian-Rental-Insight-Copilot"].stack,
    signal: curatedProjects["Australian-Rental-Insight-Copilot"].signal,
    link: `https://github.com/${GITHUB_USERNAME}/Australian-Rental-Insight-Copilot`,
    repo: "Australian-Rental-Insight-Copilot",
    updatedAt: "",
    stars: 0,
    language: "Python",
  },
];

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  updated_at: string;
};

type GitHubSearchIssue = {
  title: string;
  html_url: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  repository_url: string;
  pull_request?: {
    html_url: string;
    merged_at: string | null;
  };
};

export type PortfolioProject = {
  title: string;
  eyebrow: string;
  text: string;
  stack: string[];
  signal: string;
  link: string;
  repo: string;
  updatedAt: string;
  stars: number;
  language: string;
};

export type ContributionPullRequest = {
  title: string;
  url: string;
  repo: string;
  state: "open" | "closed" | "merged";
  createdAt: string;
  updatedAt: string;
};

function githubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function titleizeRepoName(name: string) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function compactDescription(repo: GitHubRepo) {
  return repo.description || "A public GitHub project from my software, data, and AI portfolio.";
}

function repoToProject(repo: GitHubRepo): PortfolioProject {
  const curated = curatedProjects[repo.name];
  const language = repo.language || "Code";
  const topics = repo.topics?.slice(0, 4) || [];

  if (curated) {
    return {
      ...curated,
      link: repo.html_url,
      repo: repo.name,
      updatedAt: repo.updated_at,
      stars: repo.stargazers_count,
      language,
    };
  }

  return {
    title: titleizeRepoName(repo.name),
    eyebrow: "github repo",
    text: compactDescription(repo),
    stack: [language, ...topics].slice(0, 6),
    signal: repo.stargazers_count > 0 ? `${repo.stargazers_count} GitHub stars` : "Public build",
    link: repo.html_url,
    repo: repo.name,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    language,
  };
}

function formatRepoName(repositoryUrl: string) {
  return repositoryUrl.replace(`${GITHUB_API}/repos/`, "");
}

export async function getGitHubProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: githubHeaders(),
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub repo request failed: ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];
    const projects = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .map(repoToProject)
      .sort((a, b) => {
        const aPriority = curatedProjects[a.repo]?.priority || 99;
        const bPriority = curatedProjects[b.repo]?.priority || 99;

        if (aPriority !== bPriority) return aPriority - bPriority;
        return +new Date(b.updatedAt) - +new Date(a.updatedAt);
      });

    return projects.length ? projects.slice(0, 9) : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getContributionPullRequests(): Promise<ContributionPullRequest[]> {
  try {
    const query = encodeURIComponent(
      `author:${GITHUB_USERNAME} type:pr -user:${GITHUB_USERNAME}`,
    );
    const response = await fetch(
      `${GITHUB_API}/search/issues?q=${query}&sort=updated&order=desc&per_page=24`,
      {
        headers: githubHeaders(),
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub PR search failed: ${response.status}`);
    }

    const data = (await response.json()) as { items: GitHubSearchIssue[] };

    return data.items.map((item) => ({
      title: item.title,
      url: item.pull_request?.html_url || item.html_url,
      repo: formatRepoName(item.repository_url),
      state: item.pull_request?.merged_at ? "merged" : item.state,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));
  } catch {
    return [
      {
        title: "docs: fix multiple interrupts error URL",
        url: "https://github.com/langchain-ai/langgraph/pull/8552",
        repo: "langchain-ai/langgraph",
        state: "closed",
        createdAt: "2026-08-06T00:00:00Z",
        updatedAt: "2026-08-06T00:00:00Z",
      },
      {
        title: "Clarify Docker support on macOS hosted agents",
        url: "https://github.com/buildkite/docs/pull/3148",
        repo: "buildkite/docs",
        state: "open",
        createdAt: "2026-08-06T00:00:00Z",
        updatedAt: "2026-08-06T00:00:00Z",
      },
    ];
  }
}

export { GITHUB_USERNAME };
