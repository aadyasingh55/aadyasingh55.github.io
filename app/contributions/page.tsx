import SiteNav from "@/components/SiteNav";
import ScrollProgress from "@/components/ScrollProgress";
import { GITHUB_USERNAME, getContributionPullRequests } from "@/lib/github";

export const metadata = {
  title: "Open Source Contributions | Ruby",
  description: "Pull requests raised by Aadya Singh across public repositories.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function stateLabel(state: string) {
  if (state === "merged") return "merged";
  if (state === "open") return "open";
  return "closed";
}

export default async function ContributionsPage() {
  const pullRequests = await getContributionPullRequests();
  const openCount = pullRequests.filter((pr) => pr.state === "open").length;
  const mergedCount = pullRequests.filter((pr) => pr.state === "merged").length;
  const repoCount = new Set(pullRequests.map((pr) => pr.repo)).size;

  return (
    <main className="site-shell min-h-screen overflow-hidden text-ink">
      <SiteNav />
      <ScrollProgress />

      <section className="subpage-hero">
        <div className="signal-grid" />
        <div className="subpage-inner">
          <p className="micro-label">open source</p>
          <h1>Pull requests with public receipts.</h1>
          <p>
            A live GitHub-backed view of external PRs I have raised, including
            documentation fixes, test coverage, and product-facing improvements.
          </p>
          <div className="metric-row contribution-stats">
            <span>
              <strong>{pullRequests.length}</strong>
              PRs raised
            </span>
            <span>
              <strong>{openCount}</strong>
              open
            </span>
            <span>
              <strong>{mergedCount || repoCount}</strong>
              {mergedCount ? "merged" : "repos touched"}
            </span>
          </div>
          <div className="hero-actions">
            <a href="/" className="ghost-action">
              Portfolio
            </a>
            <a
              href={`https://github.com/search?q=author%3A${GITHUB_USERNAME}+type%3Apr+-user%3A${GITHUB_USERNAME}&type=pullrequests`}
              className="primary-action"
            >
              GitHub Search
            </a>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-title">
          <p>contributions</p>
          <h2>External PRs raised.</h2>
          <span>
            This page refreshes from GitHub, so future public contributions can
            appear without manually editing the portfolio.
          </span>
        </div>

        <div className="contribution-grid">
          {pullRequests.map((pr) => (
            <article key={pr.url} className="contribution-card">
              <div>
                <p className="micro-label">{pr.repo}</p>
                <h3>{pr.title}</h3>
                <div className="repo-meta">
                  <span className={`pr-state pr-${pr.state}`}>{stateLabel(pr.state)}</span>
                  <span>Created {formatDate(pr.createdAt)}</span>
                  <span>Updated {formatDate(pr.updatedAt)}</span>
                </div>
              </div>
              <a href={pr.url}>Open PR</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
