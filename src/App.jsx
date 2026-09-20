import { useEffect, useState } from "react";

const featuredProjects = [
  {
    slug: "weather-nowcasting-network",
    number: "01",
    title: "Weather Nowcasting Network",
    tags: "Distributed sensing · Networking · Full-stack development",
    description:
      "A low-cost network of portable weather stations designed to capture hyperlocal conditions and make local weather data more accessible.",
    prompts: {
      problem:
        "Explain the weather-data problem the project is trying to solve, who needs the system, and why a low-cost local network is useful.",
      design:
        "Show the station hardware, communications system, data flow, and web interface. Use architecture diagrams and prototype photos to make the full system easy to follow.",
      testing:
        "Document communications tests, sensor or data issues, integration problems, and the changes made after testing.",
      final:
        "Show the current working system, what data it can collect and display, and what has been demonstrated so far.",
      contribution:
        "Separate your work on data processing, interfaces, integration, and other technical decisions from your partner's work.",
    },
  },
  {
    slug: "perimeter",
    number: "02",
    title: "Perimeter",
    tags: "Cybersecurity · Network analysis · Automation",
    description:
      "A network security analysis tool that identifies exposed services, highlights potential risks, and organizes findings into a prioritized report.",
    prompts: {
      problem:
        "Explain the security problem Perimeter is meant to solve and why raw scan output alone is not enough for a useful security assessment.",
      design:
        "Show the scan-to-report pipeline, how findings are organized, and how the tool turns network data into prioritized security information.",
      testing:
        "Include examples of incorrect, incomplete, or noisy results and explain how testing changed the scanner, analysis, or reporting logic.",
      final:
        "Show a complete scan and resulting report, including the kind of risks the tool identifies and the remediation information it produces.",
      contribution:
        "Describe the architecture, implementation, testing, packaging, and security-analysis work you completed yourself.",
    },
  },
  {
    slug: "agent-bridge",
    number: "03",
    title: "Agent Bridge",
    tags: "Artificial intelligence · Systems control · Reliability",
    description:
      "An exploration of how AI systems can interact with software and hardware while preserving safeguards, permissions, and recovery paths.",
    prompts: {
      problem:
        "Explain the challenge of allowing an AI system to control software or hardware without giving it unrestricted or unreliable access.",
      design:
        "Show the path from model output to tools or devices, including permission checks, validation, safeguards, and recovery mechanisms.",
      testing:
        "Document unsafe or failed behaviors, including what earlier experiments exposed and how those failures changed the architecture.",
      final:
        "Demonstrate an allowed action working successfully and, if possible, an unsafe or invalid action being blocked.",
      contribution:
        "Describe the AI integration, control layer, safeguards, testing, and system-design decisions you implemented.",
    },
  },
];

const otherWork = [
  {
    title: "Warrior Robotics",
    description:
      "FRC programming, autonomous systems, controls, technical leadership, and cross-disciplinary troubleshooting.",
  },
  {
    title: "Homelab",
    description:
      "A personal infrastructure environment built around virtualization, containers, networking, storage, and self-hosted services.",
  },
  {
    title: "Hackathons",
    description:
      "Rapid prototyping, collaborative development, and presentation-focused software projects built under time constraints.",
  },
];

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return hash;
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="Grady May home">
          Grady May
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="https://github.com/Hop89" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function MediaPlaceholder({ label, hint }) {
  return (
    <div className="media-placeholder">
      <span>{label}</span>
      <p>{hint}</p>
    </div>
  );
}

function ProjectDetail({ project }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project.slug]);

  return (
    <div className="site-shell">
      <main className="project-detail compact-detail">
        <a className="back-link" href="#projects">
          ← Back to projects
        </a>

        <section className="project-detail-hero compact-hero">
          <p className="section-kicker">Featured project {project.number}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-tags">{project.tags}</p>
        </section>

        <section className="project-overview-grid">
          <div className="overview-left">
            <article className="overview-card">
              <span className="mini-label">Description</span>
              <p className="overview-description">{project.description}</p>
            </article>

            <article className="overview-card">
              <span className="mini-label">Problem solved</span>
              <p className="editor-prompt compact-prompt">{project.prompts.problem}</p>
              <p className="placeholder-copy">
                Replace this prompt with a short explanation of the user need,
                technical problem, or gap the project addresses.
              </p>
            </article>

            <article className="overview-card diagram-card">
              <span className="mini-label">System diagram</span>
              <MediaPlaceholder
                label="Architecture / workflow diagram"
                hint="Show the main components and how data, commands, or information move through the system."
              />
            </article>
          </div>

          <aside className="commit-panel">
            <div className="commit-panel-head">
              <div>
                <span className="mini-label">Development timeline</span>
                <h2>Commit history</h2>
              </div>
              <span className="commit-status">Repository not linked yet</span>
            </div>

            <div className="commit-graph" aria-label="Commit timeline placeholder">
              <div className="commit-line" />
              {[1, 2, 3, 4, 5].map((item) => (
                <div className="commit-row" key={item}>
                  <span className="commit-dot" />
                  <div>
                    <strong>Commit milestone</strong>
                    <p>Add a meaningful commit, test, redesign, or release point.</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="commit-note">
              Once the project repository is linked, this can show real commits
              and dates so reviewers can see how the project developed over time.
            </p>
          </aside>
        </section>

        <section className="compact-section">
          <div className="compact-section-head">
            <p className="section-kicker">Development</p>
            <h2>How the project changed as I built it</h2>
          </div>

          <div className="development-grid">
            <article className="development-card">
              <span className="mini-label">Design & prototyping</span>
              <h3>Key design decisions</h3>
              <p className="editor-prompt compact-prompt">{project.prompts.design}</p>
              <p className="placeholder-copy">
                Add the architecture choices, tools, prototypes, or technical
                tradeoffs that shaped the system.
              </p>
            </article>

            <article className="development-card">
              <span className="mini-label">Testing & iteration</span>
              <h3>Failures and revisions</h3>
              <p className="editor-prompt compact-prompt">{project.prompts.testing}</p>
              <p className="placeholder-copy">
                Add one or two concrete bugs, failed tests, or redesigns and what
                you changed because of them.
              </p>
            </article>

            <article className="development-card">
              <span className="mini-label">Current result</span>
              <h3>What works now</h3>
              <p className="editor-prompt compact-prompt">{project.prompts.final}</p>
              <p className="placeholder-copy">
                Add the current capabilities, measurable results, and one honest
                limitation or next step.
              </p>
            </article>
          </div>
        </section>

        <section className="evidence-grid">
          <article className="evidence-card">
            <span className="mini-label">Individual contribution</span>
            <h2>My role</h2>
            <p className="editor-prompt compact-prompt">
              {project.prompts.contribution}
            </p>
            <ul className="placeholder-list">
              <li>Add what you personally designed.</li>
              <li>Add what you implemented or tested.</li>
              <li>Separate collaborator or team responsibilities.</li>
            </ul>
          </article>

          <article className="evidence-card">
            <span className="mini-label">Technical evidence</span>
            <h2>Artifacts</h2>
            <div className="artifact-links">
              <div>
                <strong>GitHub / code</strong>
                <span>Add repository or selected code.</span>
              </div>
              <div>
                <strong>Build evidence</strong>
                <span>Add logs, screenshots, test output, or revisions.</span>
              </div>
              <div>
                <strong>Supporting document</strong>
                <span>Add report, abstract, poster, or technical notes.</span>
              </div>
            </div>
          </article>
        </section>
      </main>

      <footer className="site-footer">
        <span>Grady May</span>
        <a href="#projects">Back to projects ↑</a>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <div className="site-shell">
      <main id="top">
        <section className="section projects-first" id="projects">
          <div className="section-heading">
            <p className="section-kicker">Selected work</p>
            <h1>Featured projects</h1>
            <p>
              Three projects that represent how I approach engineering,
              experimentation, and technical problem-solving.
            </p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <a
                className="project-card"
                href={`#project/${project.slug}`}
                key={project.title}
              >
                <div className="project-number">{project.number}</div>
                <div className="project-content">
                  <p className="project-tags">{project.tags}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-link">View project →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section other-work-section">
          <div className="section-heading compact">
            <p className="section-kicker">Beyond the featured projects</p>
            <h2>Other engineering & leadership</h2>
          </div>

          <div className="other-work-grid">
            {otherWork.map((item) => (
              <article className="other-work-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div>
            <p className="section-kicker">About</p>
          </div>
          <div className="about-copy">
            <p>
              My strongest interests are computer engineering, cybersecurity,
              and intelligent systems. Across my projects, I tend to focus on
              the boundaries between disciplines: where software meets
              hardware, where networks connect devices, and where AI begins to
              interact with real systems.
            </p>
            <p>
              This portfolio documents not only finished work, but also the
              design decisions, failures, revisions, and technical lessons that
              shaped each project.
            </p>
          </div>
        </section>

        <section className="section resume-section" id="resume">
          <div>
            <p className="section-kicker">Resume</p>
            <h2>Experience, activities, and technical work.</h2>
          </div>
          <p className="resume-note">
            A downloadable resume will be added here once the final application
            version is ready.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <span>Grady May</span>
        <span>Built with React + Vite · Hosted on GitHub Pages</span>
      </footer>
    </div>
  );
}

function App() {
  const hash = useHash();
  const slug = hash.startsWith("#project/") ? hash.replace("#project/", "") : "";
  const selectedProject = featuredProjects.find(
    (project) => project.slug === slug,
  );

  return (
    <>
      <Header />
      {selectedProject ? <ProjectDetail project={selectedProject} /> : <Home />}
    </>
  );
}

export default App;
