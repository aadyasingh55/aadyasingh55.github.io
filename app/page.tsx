import SiteNav from "@/components/SiteNav";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedInkDiagram from "@/components/AnimatedInkDiagram";
import { GITHUB_USERNAME, getGitHubProjects } from "@/lib/github";

const proof = [
  ["GATE DA", "92 percentile"],
  ["Kaggle", "rank 601"],
  ["Articles", "10+"],
];

const featuredWorkflow = [
  ["Maps Input", "Parses Google Maps links and turns messy pickup/dropoff text into usable trip coordinates."],
  ["API + Auth", "Separates rider and driver flows through FastAPI endpoints, JWT auth, and persisted trip state."],
  ["Fare Model", "Scores trips with a trained fare estimator and exposes the estimate transparently in the booking flow."],
  ["Dispatch View", "Keeps bookings, driver actions, and trip history inspectable instead of hiding the system in a notebook."],
];

const featuredMetrics = [
  ["11", "FastAPI endpoints"],
  ["R² .742", "fare model"],
  ["10", "parser tests"],
];

const capabilities = [
  ["Intelligent Applications", "ML and LLM features wired into real product flows."],
  ["Backend Systems", "Typed APIs, auth, persistence, schemas, and deployment structure."],
  ["Machine Learning", "Feature design, baselines, evaluation, and practical model behavior."],
  ["Data Engineering", "Cleaning, shaping, documenting, and making data reusable."],
  ["Frontend Interfaces", "Interfaces that make technical workflows understandable."],
  ["APIs & Databases", "REST endpoints, SQLAlchemy models, and PostgreSQL-ready design."],
];

const timeline = [
  ["2026", "University of Sydney", "Master's in Computer Science, specialising in Data Science & AI and Software Engineering."],
  ["2025", "IIT Roorkee", "Post Graduate Certificate in Data Science, Machine Learning, and AI."],
  ["2025", "GATE DA", "Qualified in Data Science and AI with 92 percentile, AIR 4521, score 417."],
  ["Ongoing", "Public technical work", "Kaggle notebooks, GitHub projects, and Analytics Vidhya articles."],
];

const achievements = [
  ["Kaggle Datasets Expert", "Rank 601/15,000+ with medals across datasets, notebooks, and discussions."],
  ["GATE-qualified", "92 percentile in Data Science and AI, AIR 4521, score 417."],
  ["Technical writing", "10+ Analytics Vidhya articles with multiple top-10 Blogathon rankings."],
  ["Open-source practice", "Shared intelligent tools including medical NLP and summarization applications."],
];

const publicProfiles = [
  {
    name: "GitHub",
    role: "code + open source",
    metric: "31",
    metricLabel: "yearly contributions",
    text: "Public repositories, portfolio builds, and external pull requests.",
    note: "Repos and PRs refresh from GitHub.",
    link: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    name: "Kaggle",
    role: "datasets + notebooks",
    metric: "Expert",
    metricLabel: "datasets tier",
    text: "Public data work, notebooks, discussions, medals, and dataset rankings.",
    note: "Global datasets rank ~520.",
    link: "https://www.kaggle.com/aadyasingh55",
  },
  {
    name: "Analytics Vidhya",
    role: "technical writing",
    metric: "11",
    metricLabel: "articles published",
    text: "Applied AI, NLP, retrieval, summarization, and generative AI writing.",
    note: "31 claps across published work.",
    link: "https://www.analyticsvidhya.com/blog/author/aadya55/",
  },
];

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-title">
      <p>{label}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return "GitHub";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function Home() {
  const projects = await getGitHubProjects();

  return (
    <main className="site-shell min-h-screen overflow-hidden text-ink">
      <SiteNav />
      <ScrollProgress />

      <section id="top" className="hero-stage">
        <div className="signal-grid" />
        <p className="journal-note note-hero-two">messy inputs to working tools</p>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="signature-mark hero-signature">Ruby</p>
            <p className="micro-label">Aadya Singh</p>
            <h1>Data science, software systems, and field notes with receipts.</h1>
            <p className="hero-text">
              I build practical data and ML tools, APIs, and interfaces that turn
              messy data problems into usable products.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="primary-action">
                View Projects
              </a>
              <a href="https://github.com/aadyasingh55" className="ghost-action">
                GitHub
              </a>
              <a href="/contributions" className="ghost-action">
                Open PRs
              </a>
              <a href="#profiles" className="ghost-action">
                Profiles
              </a>
              <a href="/AadyaSingh_resume_one_page.pdf" className="ghost-action">
                Resume
              </a>
            </div>
          </div>

          <aside className="hero-margin-notes" aria-label="public proof points">
            <p className="margin-note-title">current evidence</p>
            <div className="hero-proof-row">
              {proof.map(([label, value]) => (
                <div key={label} className="proof-card">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <AnimatedInkDiagram />
          </aside>
        </div>
      </section>

      <section id="featured" className="content-section featured-section">
        <div className="feature-layout">
          <SectionTitle
            label="featured project"
            title="CabPilot ML"
            text="A full-stack taxi booking system that connects product flows, backend persistence, location parsing, and ML inference."
          />
          <article className="feature-card agent-feature-card">
            <div className="agent-workflow-visual">
              <div className="workflow-rail" />
              <p className="journal-note note-workflow">state changes recorded here</p>
              {featuredWorkflow.map(([title, text], index) => (
                <div key={title} className={`agent-node node-${index + 1}`}>
                  <span>{`0${index + 1}`}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
              <div className="review-ticket">
                <span>model signal</span>
                <strong>Fare estimate with error metrics</strong>
                <p>R² 0.742, MAE $2.70, RMSE $7.79.</p>
              </div>
              <div className="failure-lane">
                <span>edge case</span>
                <strong>messy maps links</strong>
              </div>
            </div>
            <div className="feature-content">
              <p className="micro-label">problem solved</p>
              <h3>A taxi booking demo becomes a real software system, not just a fare-prediction notebook.</h3>
              <p>
                CabPilot connects rider booking, driver actions, authentication,
                trip persistence, Google Maps parsing, and a trained ML fare model
                through a typed FastAPI backend and Next.js interface.
              </p>
              <div className="metric-row">
                {featuredMetrics.map(([value, label]) => (
                  <span key={label}>
                    <strong>{value}</strong>
                    {label}
                  </span>
                ))}
              </div>
              <div className="tag-row feature-tags">
                {["Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "ML"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="hero-actions">
                <a href="#projects" className="primary-action">
                  View System
                </a>
                <a href="https://github.com/aadyasingh55/taxi-booking-ml" className="ghost-action">
                  GitHub
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" className="content-section">
        <SectionTitle
          label="selected projects"
          title="Live from GitHub."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.title} className="project-card">
              <div className={`project-visual mini-visual visual-${index + 1}`}>
                <span />
                <span />
                <span />
              </div>
              <p className="micro-label">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <strong className="signal-note">{project.signal}</strong>
              <div className="repo-meta">
                <span>{project.language}</span>
                <span>{project.stars} stars</span>
                <span>Updated {formatDate(project.updatedAt)}</span>
              </div>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a href={project.link}>Open</a>
            </article>
          ))}
        </div>
        <div className="archive-strip">
          <p>
            <strong>Project archive</strong>
            This section is connected to GitHub as the source of truth.
          </p>
          <div className="archive-actions">
            <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}>Open Archive</a>
            <a href="/contributions">View PRs</a>
          </div>
        </div>
      </section>

      <section id="build" className="content-section dark-section">
        <SectionTitle
          label="what i build"
          title="Capabilities, grouped by outcome."
          text="No wall of tools. Just the kinds of systems I can reason about and ship."
        />
        <div className="capability-grid">
          {capabilities.map(([title, text]) => (
            <article key={title}>
              <span />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="content-section split-section">
        <SectionTitle
          label="experience"
          title="Education, certification, and public work."
        />
        <div className="timeline">
          {timeline.map(([date, title, text]) => (
            <article key={`${date}-${title}`}>
              <time>{date}</time>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="achievements" className="content-section">
        <SectionTitle
          label="achievements"
          title="Signals that travel well."
        />
        <div className="achievement-grid">
          {achievements.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="profiles" className="content-section profiles-section">
        <SectionTitle
          label="public profiles"
          title="Signals outside this site."
          text="A few public trails across code, datasets, and writing."
        />
        <div className="profile-grid">
          {publicProfiles.map((profile, index) => (
            <article key={profile.name} className="profile-link-card">
              <div className={`profile-diagram diagram-${index + 1}`}>
                <span />
                <span />
                <span />
              </div>
              <div className="profile-card-top">
                <p className="micro-label">{profile.role}</p>
              </div>
              <h3>{profile.name}</h3>
              <div className="profile-metric">
                <strong>{profile.metric}</strong>
                <span>{profile.metricLabel}</span>
              </div>
              <p>{profile.text}</p>
              <small>{profile.note}</small>
              <a href={profile.link}>Open Profile</a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="content-section about-section">
        <SectionTitle
          label="about"
          title="I like the space where data becomes usable."
        />
        <div className="about-copy">
          <p>
            I am currently pursuing a Master&apos;s in Computer Science at the
            University of Sydney, specialising in Data Science &amp; AI and
            Software Engineering. My work sits between software engineering,
            applied analytics, and machine learning.
          </p>
          <p>
            I am drawn to problems where the hard part is not only the model,
            but the surrounding system: the API, the database, the interface,
            and the evidence that the thing actually works.
          </p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <p className="signature-mark">Ruby</p>
          <h2>Let&apos;s build something useful from something messy.</h2>
        </div>
        <div className="contact-actions">
          <a href="https://www.linkedin.com/in/aadyasingh55" className="primary-action">
            LinkedIn
          </a>
          <a href="https://github.com/aadyasingh55" className="ghost-action">
            GitHub
          </a>
          <a href="https://www.kaggle.com/aadyasingh55" className="ghost-action">
            Kaggle
          </a>
          <a href="https://www.analyticsvidhya.com/blog/author/aadya55/" className="ghost-action">
            Articles
          </a>
          <a href="/AadyaSingh_resume_one_page.pdf" className="ghost-action">
            Resume
          </a>
        </div>
      </section>
    </main>
  );
}
