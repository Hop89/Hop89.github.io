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
      <main className="project-detail">
        <a className="back-link" href="#projects">
          ← Back to projects
        </a>

        <section className="project-detail-hero">
          <p className="section-kicker">Featured project {project.number}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-tags">{project.tags}</p>
          <p className="project-detail-intro">{project.description}</p>
        </section>

        <aside className="portfolio-checklist" aria-label="Portfolio checklist">
          <p className="checklist-title">What to show on this page</p>
          <div className="checklist-items">
            <span>Problem & need</span>
            <span>Design & prototyping</span>
            <span>Testing & iteration</span>
            <span>Final execution</span>
            <span>Individual contribution</span>
            <span>Technical evidence</span>
          </div>
        </aside>

        <section className="case-section">
          <div className="case-number">01</div>
          <div className="case-content">
            <p className="section-kicker">Problem & need</p>
            <h2>What problem were you trying to solve?</h2>
            <p className="editor-prompt">{project.prompts.problem}</p>
            <div className="writing-placeholder">
              <strong>Add 1–2 concise paragraphs here.</strong>
              <p>
                Define the problem, user need, or hypothesis before explaining
                the solution. Keep this focused enough that a reviewer can
                understand why the project exists before seeing the technical
                details.
              </p>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-number">02</div>
          <div className="case-content">
            <p className="section-kicker">Design & prototyping</p>
            <h2>How did the system take shape?</h2>
            <p className="editor-prompt">{project.prompts.design}</p>

            <div className="media-grid media-grid-three">
              <MediaPlaceholder
                label="Architecture / system diagram"
                hint="Show how the major components connect."
              />
              <MediaPlaceholder
                label="Prototype image"
                hint="Use an early build, CAD view, wiring diagram, or interface screenshot."
              />
              <MediaPlaceholder
                label="Second design artifact"
                hint="Add another image that explains a technical decision."
              />
            </div>

            <div className="writing-placeholder">
              <strong>Explain the important design decisions.</strong>
              <p>
                Describe why you chose the architecture, tools, hardware, or
                approach you did. This is where the reviewer should be able to
                follow your engineering process rather than only see the result.
              </p>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-number">03</div>
          <div className="case-content">
            <p className="section-kicker">Testing & iteration</p>
            <h2>What failed, changed, or had to be debugged?</h2>
            <p className="editor-prompt">{project.prompts.testing}</p>

            <div className="iteration-grid">
              <div className="iteration-card">
                <span className="iteration-label">Initial approach</span>
                <h3>What did you try first?</h3>
                <p>Add the original assumption, design, test, or implementation.</p>
              </div>
              <div className="iteration-arrow">→</div>
              <div className="iteration-card">
                <span className="iteration-label">Evidence</span>
                <h3>What went wrong?</h3>
                <p>Add the bug, failed test, data point, or unexpected behavior.</p>
              </div>
              <div className="iteration-arrow">→</div>
              <div className="iteration-card">
                <span className="iteration-label">Revision</span>
                <h3>What did you change?</h3>
                <p>Explain the diagnosis and the redesign that followed.</p>
              </div>
            </div>

            <div className="media-grid media-grid-two">
              <MediaPlaceholder
                label="Failure / test evidence"
                hint="Screenshot, photo, log, plot, or failed revision."
              />
              <MediaPlaceholder
                label="Revised version"
                hint="Show the change that resulted from the test."
              />
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-number">04</div>
          <div className="case-content">
            <p className="section-kicker">Final execution</p>
            <h2>Show the project working.</h2>
            <p className="editor-prompt">{project.prompts.final}</p>

            <div className="video-placeholder">
              <span>30–90 second demo video</span>
              <p>
                Add a short, direct demonstration of the working system here.
              </p>
            </div>

            <div className="results-grid">
              <div className="result-card">
                <span>Result</span>
                <p>Add the most important working capability or outcome.</p>
              </div>
              <div className="result-card">
                <span>Evidence</span>
                <p>Add a measurable result, test outcome, or demonstrated use.</p>
              </div>
              <div className="result-card">
                <span>Limitation</span>
                <p>Add what the current version still cannot do.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section contribution-section">
          <div className="case-number">05</div>
          <div className="case-content">
            <p className="section-kicker">Individual contribution</p>
            <h2>Make your role unmistakable.</h2>
            <p className="editor-prompt">{project.prompts.contribution}</p>

            <div className="contribution-grid">
              <div>
                <span className="mini-label">I personally</span>
                <ul className="placeholder-list">
                  <li>Add the components you designed.</li>
                  <li>Add the code or systems you implemented.</li>
                  <li>Add the testing or integration work you led.</li>
                </ul>
              </div>
              <div>
                <span className="mini-label">Team / collaborators</span>
                <ul className="placeholder-list">
                  <li>Describe the work owned by collaborators.</li>
                  <li>Explain where responsibilities overlapped.</li>
                  <li>Clarify how you worked together.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-number">06</div>
          <div className="case-content">
            <p className="section-kicker">Technical evidence</p>
            <h2>Give reviewers somewhere to look deeper.</h2>

            <div className="artifact-grid">
              <div className="artifact-slot">
                <span>GitHub / code</span>
                <p>Add the relevant repository or selected code evidence.</p>
              </div>
              <div className="artifact-slot">
                <span>Diagram / schematic</span>
                <p>Add architecture, CAD, wiring, or system documentation.</p>
              </div>
              <div className="artifact-slot">
                <span>Build / commit history</span>
                <p>Add commits, development logs, or other evidence of iteration.</p>
              </div>
              <div className="artifact-slot">
                <span>Supporting document</span>
                <p>Add a report, abstract, poster, test sheet, or other artifact.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="project-next">
          <p className="section-kicker">Reflection & next steps</p>
          <h2>What did this project change about how you build?</h2>
          <div className="writing-placeholder">
            <strong>Add a short closing reflection.</strong>
            <p>
              Focus on one or two technical lessons and what you would improve
              next. Keep it specific to the engineering work shown above.
            </p>
          </div>
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
