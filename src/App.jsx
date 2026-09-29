import { useEffect, useMemo, useState } from "react";

const featuredProjects = [
  {
      slug: "agent-bridge",
      number: "01",
      title: "Agent Bridge",
      tags: "AI agents · Hardware control · Policy enforcement · Python · Firmware",
      repo: "Hop89/AgentBridge",
      repoVisibility: "private",
      description:
        "A capability-based framework that lets AI agents interact with real hardware through a controlled execution layer instead of raw device access.",
      problem:
        "The core problem is not simply getting an AI model to control hardware; it is deciding what the model is allowed to do when its output can affect a real device. I built AgentBridge around the idea that the model should request narrowly defined capabilities while deterministic host code handles discovery, policy, execution, and logging.",
      design:
        "AgentBridge uses typed models for devices, capabilities, requests, results, and policy decisions. A registry discovers devices, adapters expose capabilities, and an async executor checks policy before any action reaches hardware. The agent only sees a small tool surface rather than raw serial handles, and the GUI applies the same trust levels to both manual and agent-driven actions.",
      iteration:
        "The system became more defensive as it grew. Device scoping was enforced at the execution boundary, sequence length was capped, cancellation was threaded into in-progress hardware calls, SSRF protections kept provider credentials away from user-controlled URLs, and capability injection was guarded by explicit firmware identity. Later work added adapter manifests, VID:PID identification, firmware generation, flashing, and probe workflows.",
      current:
        "The framework supports OpenAI and Ollama agents, Flipper Zero and AgentBridge serial adapter paths, a GUI and CLI, device-scoped agent runs, safe/restricted/dangerous trust levels, live execution traces, adapter manifests, firmware generation, and a separate public firmware SDK for Arduino-compatible and MicroPython devices.",
      learned:
        "I learned that safety cannot live only in the prompt. The most important controls need to sit at the execution boundary where the model cannot bypass them. Building AgentBridge made me think of an AI model as an untrusted planner: useful for deciding what to try, but never the component that gets final authority over the hardware.",
      contribution:
        "I designed AgentBridge as the main project for my AI-focused independent study, built the host-side framework and interfaces, and iterated on the policy and adapter layers as the system expanded to more devices and agent providers.",
      architecture: [
        "AI provider",
        "Agent tool surface",
        "Device scope + trust policy",
        "Async executor",
        "Adapter / plugin",
        "Physical hardware",
      ],
      artifacts: [
        { label: "Host runtime", detail: "Private main repository containing the agent runtime, GUI, CLI, policy layer, adapters, and tests." },
        { label: "Firmware SDK", detail: "Public Arduino and MicroPython SDK implementing the three-message AgentBridge serial protocol.", url: "https://github.com/Hop89/agentbridge-firmware-sdk" },
        { label: "Security model", detail: "Device scoping, trust levels, cancellation, sequence caps, and provider endpoint protections." },
      ],
      staticCommits: [
        { sha: "1b23464b982fc8ed92cf32d5fe64ed6798dd303f", message: "Extract shared probe_serial_port helper and deduplicate CLI/GUI probe paths", date: "2026-05-16" },
        { sha: "868d923d16cb0f19cd6642b1f4c307ee158dfb39", message: "Add --name flag to adapter create for clean firmware directory names", date: "2026-05-13" },
        { sha: "42a99d430e826c96e11a284f96158373ef8b7b1c", message: "Keep generated firmware out of repo, --output now takes a directory", date: "2026-05-12" },
        { sha: "eddf3c1a93e594ab9abd1b6bd472398eaa528f7a", message: "Add firmware persistence and adapter flash command", date: "2026-05-12" },
        { sha: "5be85d70de4cbc7547e5dac92639c668d4ba2edf", message: "Fix duplicate VID:PID keys flagged by Codex review", date: "2026-05-11" },
        { sha: "fb8f244c9e152ca97bc509cacf1b2d20221dc787", message: "Add adapter manifest system, VID:PID identification, and research-capable firmware generation", date: "2026-05-10" },
        { sha: "7f6255da627693d279aafe8247fa6cd9e44ba3be", message: "Add agentbridge adapter create firmware generation agent", date: "2026-05-07" },
        { sha: "34298d582ee655672f39ee201746569ff015abc8", message: "Add agentbridge adapter probe CLI command", date: "2026-05-07" },
      ],
    },
    {
      slug: "perimeter",
      number: "02",
      title: "Perimeter",
      tags: "Cybersecurity · Nmap · Python · Risk analysis · CLI",
      repo: "Hop89/Perimeter",
      repoVisibility: "public",
      description:
        "An Nmap-powered network analysis tool that turns raw scan results into prioritized risk information, readable reports, and historical security trends.",
      problem:
        "Nmap is very good at collecting network information, but raw ports and service data still leave the user with the harder question: what matters, what changed, and what should I fix first? I built Perimeter to add that interpretation layer rather than trying to replace the scanner itself.",
      design:
        "Perimeter separates scanning, XML parsing, risk analysis, report storage, and trend comparison into distinct modules. The CLI can run scans, analyze saved XML, store reports by target IP, compare historical scans, and optionally enrich triage with an AI model.",
      iteration:
        "The project started as a simple scan CLI. I then made the output more readable, added connected-interface scanning, began vulnerability analysis, moved scan results into structured reports, and finally added historical comparisons by IP. That progression changed the project from a one-time scanner into something that can measure security posture over time.",
      current:
        "Perimeter currently supports risk-based host/service scoring, misconfiguration checks, IP-organized report history, scan diffs, trend analysis, readable text or JSON output, an optional AI triage layer, and a cross-platform CLI.",
      learned:
        "I learned that collecting more security data is not automatically useful. The harder engineering problem is preserving enough structure to compare scans, prioritize findings, and explain what changed. Adding historical reports pushed me to think about security as a changing system instead of a one-time snapshot.",
      contribution:
        "Perimeter is an independent-study project, so I designed the architecture, implemented the CLI and analysis pipeline, added report persistence and trend comparison, and iterated on how the results are presented.",
      architecture: [
        "Nmap scan",
        "XML parser",
        "Risk + misconfig analysis",
        "IP-based report store",
        "Trend / diff engine",
        "Readable CLI report",
      ],
      artifacts: [
        { label: "GitHub repository", detail: "Public source code, README, and commit history.", url: "https://github.com/Hop89/Perimeter" },
        { label: "Historical reports", detail: "Timestamped reports organized by target IP for comparison." },
        { label: "Trend engine", detail: "Tracks open-port deltas, severity changes, new findings, and resolved findings." },
      ],
      staticCommits: [
        { sha: "c9b29e698243677803acc4f1f79cf9153c199c4a", message: "Allowed comparison of trends for target IPs", date: "2026-03-23" },
        { sha: "6bfd0eea64ad1f45c428481dd0fd351146e004d6", message: "Update README: correct CLI command, add installation, change planned features to features", date: "2026-03-19" },
        { sha: "dce68a57971fdba0ed0254f97bea6059dfd5273d", message: "Moved Scan Outputs to Reports", date: "2026-03-11" },
        { sha: "c56d0736bf00d0ebfeb1dd3310955125bde736ee", message: "began implmenting basline for AI vulnerability analysis", date: "2026-03-04" },
        { sha: "c3d2d4048dc1122fec370311da1c39c1b0f38b3d", message: "Add connected-IP scan mode and readable output", date: "2026-02-25" },
        { sha: "75057f30214280c874130fb09200218af0d47ba9", message: "Began Implementing Scan Formating", date: "2026-02-18" },
        { sha: "d14611d17bc9b3a58924b56ad4d8639c9b773dc9", message: "Fix perimeter scan command", date: "2026-02-17" },
        { sha: "591b1e950e395b6515b7b77d7bcf2d80308f9f6d", message: "Initial project structure", date: "2026-02-02" },
      ],
    },
    {
      slug: "weather-nowcasting-network",
      number: "03",
      title: "Weather Nowcasting Network",
      tags: "Distributed sensing · Meshtastic · Machine learning · React/Leaflet",
      repo: "Hop89/Think---Nowcasting",
      repoVisibility: "private",
      description:
        "A low-cost hyperlocal weather system that combines portable stations, mesh communications, a nowcasting model, and a map interface.",
      problem:
        "The project is built around a simple limitation: weather can change over distances much smaller than the spacing between conventional observations. We wanted a system that could collect local station data, move it without depending on normal infrastructure, and turn it into a useful view of nearby conditions.",
      design:
        "The software pipeline started with minute-level station data and a logistic-regression baseline that predicts rain in the next 30 minutes from the previous hour of signals. I later added neighborhood features using haversine nearest-neighbor calculations, while the visualization grew from a generated Leaflet map into a React + Leaflet interface that supports multiple stations.",
      iteration:
        "One of the useful early decisions was to build against synthetic data first. That let me debug feature generation, model inputs, and visualization before real station data was ready. The commit history also shows the project moving from a model baseline, to spatial neighbor features, to Meshtastic work, and then to an increasingly interactive multi-station map.",
      current:
        "The current codebase can generate multi-station synthetic readings, train the baseline model, produce rain probabilities, and visualize the latest station state on a Leaflet map. The README also lays out the next step: replace the sample data with real station feeds and evaluate the model with metrics such as AUC, Brier score, and reliability plots.",
      learned:
        "I learned that it is much easier to build a complicated system when I separate the interfaces between pieces. Using synthetic data first meant I could work on processing and visualization without waiting for every hardware component, and adding neighbor features made the value of a network of stations much clearer than treating each station independently.",
      contribution:
        "My main work has been on data processing and the software interfaces: the model baseline, feature pipeline, and mapping/visualization side of the project. My partner has focused more heavily on communications and weather monitoring, so the project also forced us to define clean handoffs between the station network and the software consuming its data.",
      architecture: [
        "Weather stations",
        "Meshtastic mesh",
        "Station data pipeline",
        "Feature generation",
        "30-minute nowcast",
        "React + Leaflet map",
      ],
      artifacts: [
        { label: "Development repository", detail: "Private project repository used for the MIT THINK work." },
        { label: "Model baseline", detail: "Logistic-regression pipeline using the previous 60 minutes of station signals." },
        { label: "Visualization", detail: "Leaflet/React map with multi-station support and nowcast display." },
      ],
      staticCommits: [
        { sha: "b42ce97490bf5c106da2db254f7d924992323c94", message: "Add React Leaflet frontend with station add flow", date: "2025-12-24" },
        { sha: "33233715b6bd974a74e99865e04ce1e302ba8a16", message: "leaflet map updated functionality: now supports multiple stations", date: "2025-12-08" },
        { sha: "f3302047dafbf266b737150f24ec0ec83cea4fbe", message: "Began Leaflet Map Visualiztation", date: "2025-11-14" },
        { sha: "1be5082b51a6c29156842592d6f63a1904e20d67", message: "Initial commit for Meshtastic", date: "2025-09-16" },
        { sha: "a0ad4414d7d15fbd73e3b240ac68694603733d09", message: "Feat: add neighbor mean features to make_features.py and include .gitignore", date: "2025-09-08" },
        { sha: "6144f25687a92aa071afd16c2fdac5dcdcef18c3", message: "Chore: add .gitignore; Feat: neighbor mean features via haversine k-NN", date: "2025-09-08" },
        { sha: "8e8ed0573f7ebc0e1488ad29821574c363ca4311", message: "Fix: filter non-numeric features in train_baseline to prevent string errors", date: "2025-08-30" },
        { sha: "4ff7b6962e344eee5b8115df524e7eb37228fc9d", message: "Initial commit: THINK Nowcasting baseline", date: "2025-08-30" },
      ],
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

function commitKind(message) {
  const value = message.toLowerCase();
  if (value.includes("fix") || value.includes("bug")) return "fix";
  if (value.includes("readme") || value.includes("doc")) return "docs";
  if (
    value.includes("extract") ||
    value.includes("refactor") ||
    value.includes("move") ||
    value.includes("migrate") ||
    value.includes("deduplicate")
  ) return "refactor";
  if (
    value.includes("add") ||
    value.includes("feat") ||
    value.includes("implement") ||
    value.includes("began") ||
    value.includes("create")
  ) return "feature";
  return "other";
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value.length === 10 ? value + "T12:00:00" : value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CommitTimeline({ project }) {
  const [commits, setCommits] = useState(project.staticCommits);
  const [source, setSource] = useState("snapshot");
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    async function refresh() {
      if (project.repoVisibility !== "public") return;

      try {
        const response = await fetch(
          "https://api.github.com/repos/" + project.repo + "/commits?per_page=12",
          { headers: { Accept: "application/vnd.github+json" } },
        );

        if (!response.ok) throw new Error("GitHub request failed");

        const data = await response.json();
        if (cancelled) return;

        const next = data.map((commit) => ({
          sha: commit.sha,
          message: commit.commit.message.split("\n")[0],
          date:
            commit.commit.author?.date ||
            commit.commit.committer?.date ||
            "",
          url: commit.html_url,
        }));

        setCommits(next);
        setSource("live");
        setLastChecked(new Date());
      } catch {
        if (!cancelled) setSource("snapshot");
      }
    }

    refresh();
    if (project.repoVisibility === "public") {
      timer = window.setInterval(refresh, 5 * 60 * 1000);
    }

    return () => {
      cancelled = true;
      if (timer) window.clearInterval(timer);
    };
  }, [project]);

  const statusText =
    source === "live"
      ? "Live from GitHub" + (lastChecked ? " · checked " + lastChecked.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "")
      : project.repoVisibility === "private"
        ? "Repository snapshot"
        : "Cached commit snapshot";

  return (
    <aside className="commit-panel">
      <div className="commit-panel-head">
        <div>
          <span className="mini-label">Development timeline</span>
          <h2>Commit history</h2>
        </div>
        <span className={"commit-status " + (source === "live" ? "is-live" : "")}>
          {statusText}
        </span>
      </div>

      <div className="commit-legend">
        <span className="legend-feature">Feature</span>
        <span className="legend-fix">Fix</span>
        <span className="legend-refactor">Refactor</span>
        <span className="legend-docs">Docs</span>
      </div>

      <div className="commit-graph">
        <div className="commit-line" />
        {commits.map((commit) => {
          const kind = commitKind(commit.message);
          const body = (
            <>
              <span className={"commit-dot commit-" + kind} />
              <div className="commit-copy">
                <div className="commit-meta">
                  <code>{commit.sha.slice(0, 7)}</code>
                  <time>{formatDate(commit.date)}</time>
                </div>
                <strong>{commit.message}</strong>
              </div>
            </>
          );

          return commit.url ? (
            <a
              className="commit-row"
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              key={commit.sha}
            >
              {body}
            </a>
          ) : (
            <div className="commit-row" key={commit.sha}>
              {body}
            </div>
          );
        })}
      </div>

      <p className="commit-note">
        {project.repoVisibility === "public"
          ? "This timeline refreshes from GitHub every five minutes while the page is open, so new public commits appear automatically."
          : "This project repository is private, so the public portfolio uses a real commit snapshot. A public repository or token-backed endpoint would be required for live updates without exposing credentials."}
      </p>
    </aside>
  );
}

function SystemDiagram({ steps }) {
  return (
    <div className="system-diagram" aria-label="Project architecture diagram">
      {steps.map((step, index) => (
        <div className="diagram-step-wrap" key={step}>
          <div className="diagram-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
          {index < steps.length - 1 ? <div className="diagram-arrow">→</div> : null}
        </div>
      ))}
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
              <p className="overview-description">{project.problem}</p>
            </article>

            <article className="overview-card diagram-card">
              <span className="mini-label">System diagram</span>
              <SystemDiagram steps={project.architecture} />
            </article>

            <article className="overview-card learning-card">
              <span className="mini-label">What I learned</span>
              <p className="overview-description">{project.learned}</p>
            </article>
          </div>

          <CommitTimeline project={project} />
        </section>

        <section className="compact-section">
          <div className="compact-section-head">
            <p className="section-kicker">Development</p>
            <h2>How the project changed as I built it</h2>
          </div>

          <div className="development-grid">
            <article className="development-card">
              <span className="mini-label">Design & prototyping</span>
              <h3>Architecture</h3>
              <p>{project.design}</p>
            </article>

            <article className="development-card">
              <span className="mini-label">Testing & iteration</span>
              <h3>Changes over time</h3>
              <p>{project.iteration}</p>
            </article>

            <article className="development-card">
              <span className="mini-label">Current result</span>
              <h3>What works now</h3>
              <p>{project.current}</p>
            </article>
          </div>
        </section>

        <section className="evidence-grid">
          <article className="evidence-card">
            <span className="mini-label">Individual contribution</span>
            <h2>My role</h2>
            <p className="role-copy">{project.contribution}</p>
          </article>

          <article className="evidence-card">
            <span className="mini-label">Technical evidence</span>
            <h2>Artifacts</h2>
            <div className="artifact-links">
              {project.artifacts.map((artifact) =>
                artifact.url ? (
                  <a
                    href={artifact.url}
                    target="_blank"
                    rel="noreferrer"
                    key={artifact.label}
                  >
                    <strong>{artifact.label} ↗</strong>
                    <span>{artifact.detail}</span>
                  </a>
                ) : (
                  <div key={artifact.label}>
                    <strong>{artifact.label}</strong>
                    <span>{artifact.detail}</span>
                  </div>
                ),
              )}
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
                href={"#project/" + project.slug}
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
