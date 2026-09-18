const featuredProjects = [
  {
    number: "01",
    title: "Weather Nowcasting Network",
    tags: "Distributed sensing · Networking · Full-stack development",
    description:
      "A low-cost network of portable weather stations designed to capture hyperlocal conditions and make local weather data more accessible.",
  },
  {
    number: "02",
    title: "Perimeter",
    tags: "Cybersecurity · Network analysis · Automation",
    description:
      "A network security analysis tool that identifies exposed services, highlights potential risks, and organizes findings into a prioritized report.",
  },
  {
    number: "03",
    title: "Agent Bridge",
    tags: "Artificial intelligence · Systems control · Reliability",
    description:
      "An exploration of how AI systems can interact with software and hardware while preserving safeguards, permissions, and recovery paths.",
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

function App() {
  return (
    <>
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
              <article className="project-card" key={project.title}>
                <div className="project-number">{project.number}</div>
                <div className="project-content">
                  <p className="project-tags">{project.tags}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-link">Case study coming soon →</span>
                </div>
              </article>
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
    </>
  );
}

export default App;
