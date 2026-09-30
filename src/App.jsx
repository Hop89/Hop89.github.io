import { useEffect, useState } from "react";

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
      diagramType: "loop",
      loopCaption: "Results and live traces return to the agent, which can decide on the next permitted action.",
      architecture: [
        "AI provider",
        "Tool request",
        "Policy gate",
        "Executor",
        "Adapter + device",
        "Result + trace",
      ],
      artifacts: [
        { label: "Host runtime", detail: "Private main repository containing the agent runtime, GUI, CLI, policy layer, adapters, and tests." },
        { label: "Firmware SDK", detail: "Public Arduino and MicroPython SDK implementing the three-message AgentBridge serial protocol.", url: "https://github.com/Hop89/agentbridge-firmware-sdk" },
        { label: "Security model", detail: "Device scoping, trust levels, cancellation, sequence caps, and provider endpoint protections." },
      ],
      outputExample: {
        kicker: "Example response format",
        title: "A policy-gated hardware action",
        command: 'python -m agentbridge.cli ask --port COM4 "what is the flipper uptime?"',
        output: `{
  "request_id": "req_123",
  "status": "completed",
  "result": {
    "device_id": "flipper.zero.cli",
    "capability": "system.uptime",
    "success": true,
    "output": {
      "uptime_seconds": 12345
    }
  }
}`,
        note: "The command comes from the current Flipper quick start. The JSON is the documented structured ActionResult format rather than a captured hardware run.",
      },
      staticCommits: [
        { sha: "1b23464b982fc8ed92cf32d5fe64ed6798dd303f", message: "Extract shared probe_serial_port helper and deduplicate CLI/GUI probe paths", date: "2026-05-16T01:22:32Z" },
        { sha: "868d923d16cb0f19cd6642b1f4c307ee158dfb39", message: "Add --name flag to adapter create for clean firmware directory names", date: "2026-05-13T14:03:00Z" },
        { sha: "42a99d430e826c96e11a284f96158373ef8b7b1c", message: "Keep generated firmware out of repo, --output now takes a directory", date: "2026-05-12T13:19:59Z" },
        { sha: "eddf3c1a93e594ab9abd1b6bd472398eaa528f7a", message: "Add firmware persistence and adapter flash command", date: "2026-05-12T13:07:33Z" },
        { sha: "5be85d70de4cbc7547e5dac92639c668d4ba2edf", message: "Fix duplicate VID:PID keys flagged by Codex review", date: "2026-05-11T01:24:19Z" },
        { sha: "fb8f244c9e152ca97bc509cacf1b2d20221dc787", message: "Add adapter manifest system, VID:PID identification, and research-capable firmware generation", date: "2026-05-10T23:05:01Z" },
        { sha: "a61b9a05714492600afb076453033132fde37df7", message: "Update roadmap and architecture with adapter manifest and ecosystem bridge strategy", date: "2026-05-07T16:18:39Z" },
        { sha: "7f6255da627693d279aafe8247fa6cd9e44ba3be", message: "Add agentbridge adapter create firmware generation agent", date: "2026-05-07T16:06:25Z" },
        { sha: "1da9968285e338ca4219a66c8af7449fecd708c4", message: "Fix addon_required semantics, handler error codes, and pin SDK to v1.0.0", date: "2026-05-07T15:49:18Z" },
        { sha: "34298d582ee655672f39ee201746569ff015abc8", message: "Add agentbridge adapter probe CLI command", date: "2026-05-07T14:41:22Z" },
        { sha: "fe8baf4b8d7a95662dd885ed04d671830e403d78", message: "Migrate cardputer firmware to AgentBridge SDK", date: "2026-05-07T13:24:17Z" },
        { sha: "4be06d1e117f76e03915aa8bb2b690aab567c7d6", message: "Link agentbridge-firmware-sdk from firmware protocol docs", date: "2026-05-06T15:30:56Z" },
        { sha: "a3acf93e921b65c4e767a51fa2fdda9a6d9bd6e3", message: "Update docs to reflect agent runtime, security model, and plugin system", date: "2026-05-05T15:32:17Z" },
        { sha: "fad9893cc539e1eac7bc8641f51ccdb8dba092d0", message: "Merge Ollama-Agents: full agent runtime with device scoping and security hardening", date: "2026-05-05T15:19:15Z" },
        { sha: "18ed261bd1abc4a2888f0af6bbda82f6f83beed1", message: "Remove Claude tooling files from tracking and update gitignore", date: "2026-05-05T15:16:04Z" },
        { sha: "71477942172f1f6f3c4a070b6d56d82ab65fd018", message: "Guard Bruce capability injection and add composite device key", date: "2026-05-05T13:54:56Z" },
        { sha: "62a4d78b6a0b7f59a7a66ee14401a4fb14d503a0", message: "Fix qwen3 argument envelope wrapping and extend serial settle time", date: "2026-05-05T01:03:30Z" },
        { sha: "28dc80cfff13564df8ae8a0b4dd03462b0e48b21", message: "Require device scope and thread cancel into runtime", date: "2026-05-04T23:30:50Z" },
        { sha: "104189448ae62521ee0210422b81335c26b8e59d", message: "Enforce allowed_device_ids at execution boundary in _require_device", date: "2026-05-04T22:40:56Z" },
        { sha: "616daafcf33d4d0391611f2c97c0dc273a5a2f14", message: "Scope agent runtime to selected device and cap sequence length", date: "2026-05-04T22:31:32Z" },
        { sha: "2696f476ab78b0f2b18a77adfba94e94f85d8bd0", message: "Fix cancellation registry, run_sequence on failed ActionResult, generic firmware discovery", date: "2026-05-04T19:03:31Z" },
        { sha: "56e66dc32c96113b679691502754e7444fdd5139", message: "Fix hardware runs after UI stop and silent OpenAI --api-key", date: "2026-05-04T14:49:24Z" },
        { sha: "8b5b66665abce3489792a15fe825c62705f908a2", message: "Fix SSRF credential fowarding and silent input drop in plugin execution", date: "2026-05-04T13:22:11Z" },
        { sha: "46f093da4e41e4f08cd012577890b8d3e3f0e57c", message: "expanded ollama capabiltiy to allow for cloud models, fixed unicode issue", date: "2026-05-04T12:54:59Z" },
        { sha: "ed0fbf2d87ab5bc7ef4022b84b8dd01554341d0f", message: "Add multi-step agent execution with Ollama streaming and cloud support", date: "2026-05-03T21:40:31Z" },
        { sha: "026eb6a8772860c9877c917d0cab6fb7b1897c11", message: "Add live agent activity GUI", date: "2026-05-03T17:35:12Z" },
        { sha: "3b0bc23722c31ecf67211d6096150ba711559366", message: "continued testing AI agents", date: "2026-05-02T13:22:12Z" },
        { sha: "f6cffc4444d1ea9f61075b86e4e259dbd0f44610", message: "Remove .claude and .agents from version control", date: "2026-05-02T12:27:13Z" },
        { sha: "62d6ccd47e4d970627237cfda32ff2f12a4f1076", message: "Began expaning agentic capabilities", date: "2026-05-01T18:45:24Z" },
        { sha: "7bbe0e328084b5aaa3a20604c218f5259149de04", message: "Fix plugin discovery fallback", date: "2026-04-30T16:49:42Z" },
        { sha: "007d926e47e406924e122f5e04013f596784cf09", message: "Merge branch 'improve-cardputer-capabilities'", date: "2026-04-30T09:42:21Z" },
        { sha: "2bb7fc8f9f7774c76c5b61262ad8ab8a441fb616", message: "Fixed Dependency Issue", date: "2026-04-30T09:36:27Z" },
        { sha: "050a5eca8ede0df7cee3c6642ec3de2193bfbd05", message: "Expand Capabilties and Fix Firmware Bugs", date: "2026-04-29T14:56:56Z" },
        { sha: "24e4448ec8fdc8f77b8a02382c53ae1822a86d30", message: "Expand Cardputer firmware capabilities", date: "2026-04-28T13:26:19Z" },
        { sha: "9e093050ae8d54e12d7f4eab215b8eef210ed1ba", message: "Move Flipper planning into adapter", date: "2026-04-27T23:02:42Z" },
        { sha: "2c6724d17a83c5f7c02d008e4285e4acd7d6146a", message: "Add Bruce-compatible Cardputer capabilities", date: "2026-04-26T20:37:47Z" },
        { sha: "fa93a1d13c73bb3c1cbbbf1afb14c10e0ab24ef1", message: "Add GUI trust level selector", date: "2026-04-26T18:57:12Z" },
        { sha: "9ea90d05300e8eaa18faffe80cd5ef3a196c9b0e", message: "Add configurable trust levels", date: "2026-04-26T18:30:05Z" },
        { sha: "304eceeeaf5e35cba06aaa948866f54a7082aeb3", message: "Expand Flipper capability catalog", date: "2026-04-26T18:22:41Z" },
        { sha: "6ac8c929af35e020e45e081668b64058e9af1a66", message: "Add Ollama hardware agent provider", date: "2026-04-26T18:05:53Z" },
        { sha: "9709dce5a4ca6a3e187e02257e6fe67207edcd76", message: "Document agent service progress", date: "2026-04-24T20:11:35Z" },
        { sha: "db08c1b3ca6591e27f52885fc048723ef15748e6", message: "Add shared API service boundary", date: "2026-04-24T20:07:34Z" },
        { sha: "ab4f44985a6073e9d9ab6cea316b38c24395ab9d", message: "Add device discovery planning and scan flow", date: "2026-04-23T19:21:39Z" },
        { sha: "83a6bcb61619095c47c7238c559bd93a978a441f", message: "Working on Cardputer firmware and fixing COM4 bug", date: "2026-04-23T18:25:23Z" },
        { sha: "422f827f6a20ece3cb4fbc7c839741370ee7b0fd", message: "add AgentBridge CLI and local web GUI", date: "2026-04-22T18:42:53Z" },
        { sha: "4ed93d8c3bfadaafda49173749fd081490a60c8a", message: "add Flipper Zero CLI adapter", date: "2026-04-22T18:27:35Z" },
        { sha: "14d50f1fc65798343f3cf55079738923446c3f70", message: "add AgentBridge firmware protocol and adapter", date: "2026-04-21T00:22:06Z" },
        { sha: "50f59eca5f11eb9e5dc0d24f6d9ffb3643dfd786", message: "add gitignore and remove tracked python cache files", date: "2026-04-12T12:28:45Z" },
        { sha: "c1c3905692e736bf9506462ebaa63e39b4f880e7", message: "defined intitail achirtecture, wrote starting methods", date: "2026-04-12T12:27:02Z" },
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
      diagramType: "loop",
      loopCaption: "Each later scan is compared with stored history, so the output informs what to investigate and scan again.",
      architecture: [
        "Target scan",
        "XML parser",
        "Risk analysis",
        "Stored report",
        "Trend / diff",
        "Next scan",
      ],
      artifacts: [
        { label: "GitHub repository", detail: "Public source code, README, and commit history.", url: "https://github.com/Hop89/Perimeter" },
        { label: "Historical reports", detail: "Timestamped reports organized by target IP for comparison." },
        { label: "Trend engine", detail: "Tracks open-port deltas, severity changes, new findings, and resolved findings." },
      ],
      outputExample: {
        kicker: "Captured example",
        title: "Prioritized analysis from a local scan",
        command: `perimeter scan --connected --output local_scan_1.xml
perimeter analyze --latest`,
        output: `Perimeter Analysis
Hosts analyzed: 1
Open ports analyzed: 6
Findings by severity: critical=1, high=2, medium=0, low=3

Top Findings:
[CRITICAL 95] 10.33.4.52 445/tcp microsoft-ds
Rationale: SMB exposure is high-risk for lateral movement.
Remediation: Restrict network exposure, patch to latest stable release,
and require strong authentication.

[HIGH 85] 10.33.4.52 139/tcp netbios-ssn
[HIGH 85] 10.33.4.52 5900/tcp vnc`,
        note: "Excerpt from an actual Perimeter analysis included in my project writeup.",
      },
      staticCommits: [
        { sha: "c9b29e698243677803acc4f1f79cf9153c199c4a", message: "Allowed comparison of trends for target IPs", date: "2026-03-23T09:43:53Z", url: "https://github.com/Hop89/Perimeter/commit/c9b29e698243677803acc4f1f79cf9153c199c4a" },
        { sha: "6bfd0eea64ad1f45c428481dd0fd351146e004d6", message: "Update README: correct CLI command, add installation, change planned features to features", date: "2026-03-19T16:18:51Z", url: "https://github.com/Hop89/Perimeter/commit/6bfd0eea64ad1f45c428481dd0fd351146e004d6" },
        { sha: "dce68a57971fdba0ed0254f97bea6059dfd5273d", message: "Moved Scan Outputs to Reports", date: "2026-03-11T23:35:09Z", url: "https://github.com/Hop89/Perimeter/commit/dce68a57971fdba0ed0254f97bea6059dfd5273d" },
        { sha: "c56d0736bf00d0ebfeb1dd3310955125bde736ee", message: "began implmenting basline for AI vulnerability analysis", date: "2026-03-04T02:34:02Z", url: "https://github.com/Hop89/Perimeter/commit/c56d0736bf00d0ebfeb1dd3310955125bde736ee" },
        { sha: "e72737080593d2f25da8fe16e5682d1a6fd08a48", message: "Add help subcommand for CLI", date: "2026-02-25T21:10:25Z", url: "https://github.com/Hop89/Perimeter/commit/e72737080593d2f25da8fe16e5682d1a6fd08a48" },
        { sha: "c3d2d4048dc1122fec370311da1c39c1b0f38b3d", message: "Add connected-IP scan mode and readable output", date: "2026-02-25T20:13:03Z", url: "https://github.com/Hop89/Perimeter/commit/c3d2d4048dc1122fec370311da1c39c1b0f38b3d" },
        { sha: "75057f30214280c874130fb09200218af0d47ba9", message: "Began Implementing Scan Formating", date: "2026-02-18T14:25:09Z", url: "https://github.com/Hop89/Perimeter/commit/75057f30214280c874130fb09200218af0d47ba9" },
        { sha: "d14611d17bc9b3a58924b56ad4d8639c9b773dc9", message: "Fix perimeter scan command", date: "2026-02-17T13:40:10Z", url: "https://github.com/Hop89/Perimeter/commit/d14611d17bc9b3a58924b56ad4d8639c9b773dc9" },
        { sha: "177db60eaf852171997cc0fbf3cadf95ab424f0c", message: "Merge branch 'main' of https://github.com/Hop89/Perimeter", date: "2026-02-09T15:13:39Z", url: "https://github.com/Hop89/Perimeter/commit/177db60eaf852171997cc0fbf3cadf95ab424f0c" },
        { sha: "bf5ef180172a8d848a801022c3854219b73cdf9a", message: "Add gitignore and pyproject", date: "2026-02-09T15:05:02Z", url: "https://github.com/Hop89/Perimeter/commit/bf5ef180172a8d848a801022c3854219b73cdf9a" },
        { sha: "6c725950ae9cc080a12d5338f653e9bd2bbf9a43", message: "Create README.md for Perimeter project", date: "2026-02-09T13:52:36Z", url: "https://github.com/Hop89/Perimeter/commit/6c725950ae9cc080a12d5338f653e9bd2bbf9a43" },
        { sha: "8a67ec5ef26b84f220a72ea36325690e0cae3ab3", message: "Began Implementing CLI Interface for Scan", date: "2026-02-09T13:40:25Z", url: "https://github.com/Hop89/Perimeter/commit/8a67ec5ef26b84f220a72ea36325690e0cae3ab3" },
        { sha: "591b1e950e395b6515b7b77d7bcf2d80308f9f6d", message: "Initial project structure", date: "2026-02-02T17:37:07Z", url: "https://github.com/Hop89/Perimeter/commit/591b1e950e395b6515b7b77d7bcf2d80308f9f6d" },
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
      diagramType: "network",
      networkCaption: "Multiple local stations contribute readings through the mesh, then the shared software pipeline turns those observations into spatial features, a short-term nowcast, and a map view.",
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
        { sha: "b42ce97490bf5c106da2db254f7d924992323c94", message: "Add React Leaflet frontend with station add flow", date: "2025-12-24T15:34:17Z" },
        { sha: "33233715b6bd974a74e99865e04ce1e302ba8a16", message: "leaflet map updated functionality: now supports multiple stations", date: "2025-12-08T16:35:31Z" },
        { sha: "d386b1220ca40a7def72407d88e338441bc290c3", message: "Merge branch 'main' of https://github.com/Hop89/Think---Nowcasting", date: "2025-11-14T19:04:28Z" },
        { sha: "f3302047dafbf266b737150f24ec0ec83cea4fbe", message: "Began Leaflet Map Visualiztation", date: "2025-11-14T19:04:19Z" },
        { sha: "1be5082b51a6c29156842592d6f63a1904e20d67", message: "Initial commit for Meshtastic", date: "2025-09-16T23:25:37Z" },
        { sha: "a0ad4414d7d15fbd73e3b240ac68694603733d09", message: "Feat: add neighbor mean features to make_features.py and include .gitignore", date: "2025-09-08T23:11:09Z" },
        { sha: "6144f25687a92aa071afd16c2fdac5dcdcef18c3", message: "Chore: add .gitignore; Feat: neighbor mean features via haversine k-NN", date: "2025-09-08T23:04:29Z" },
        { sha: "8e8ed0573f7ebc0e1488ad29821574c363ca4311", message: "Fix: filter non-numeric features in train_baseline to prevent string errors", date: "2025-08-30T14:44:39Z" },
        { sha: "4ff7b6962e344eee5b8115df524e7eb37228fc9d", message: "Initial commit: THINK Nowcasting baseline", date: "2025-08-30T14:22:32Z" },
      ],
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
          "https://api.github.com/repos/" + project.repo + "/commits?per_page=100",
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

function SystemDiagram({ project }) {
  if (project.diagramType === "network") {
    return (
      <div className="weather-network-diagram">
        <svg
          className="weather-network-svg"
          viewBox="0 0 680 360"
          role="img"
          aria-label="Weather station network and nowcasting architecture"
        >
          <defs>
            <marker
              id={"weather-arrow-" + project.slug}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" className="weather-arrow-head" />
            </marker>
          </defs>

          <path className="mesh-link" d="M 92 74 L 222 148" />
          <path className="mesh-link" d="M 92 180 L 222 148" />
          <path className="mesh-link" d="M 92 286 L 222 148" />
          <path className="mesh-link mesh-cross" d="M 92 74 L 92 180 L 92 286" />

          <path
            className="weather-flow"
            markerEnd={"url(#weather-arrow-" + project.slug + ")"}
            d="M 292 148 L 340 148"
          />
          <path
            className="weather-flow"
            markerEnd={"url(#weather-arrow-" + project.slug + ")"}
            d="M 430 148 L 474 148"
          />
          <path
            className="weather-flow"
            markerEnd={"url(#weather-arrow-" + project.slug + ")"}
            d="M 554 148 C 610 148, 612 212, 566 232"
          />
          <path
            className="weather-flow"
            markerEnd={"url(#weather-arrow-" + project.slug + ")"}
            d="M 474 262 L 430 262"
          />

          <g transform="translate(30 44)">
            <rect className="weather-station-node" width="124" height="58" rx="11" />
            <text className="weather-node-index" x="14" y="21">S1</text>
            <text className="weather-node-label" x="14" y="42">Local station</text>
          </g>
          <g transform="translate(30 150)">
            <rect className="weather-station-node" width="124" height="58" rx="11" />
            <text className="weather-node-index" x="14" y="21">S2</text>
            <text className="weather-node-label" x="14" y="42">Local station</text>
          </g>
          <g transform="translate(30 256)">
            <rect className="weather-station-node" width="124" height="58" rx="11" />
            <text className="weather-node-index" x="14" y="21">S3</text>
            <text className="weather-node-label" x="14" y="42">Local station</text>
          </g>

          <g transform="translate(206 118)">
            <rect className="weather-mesh-node" width="102" height="60" rx="30" />
            <text className="weather-node-label weather-node-center" x="51" y="27">Meshtastic</text>
            <text className="weather-node-sub" x="51" y="44">mesh</text>
          </g>

          <g transform="translate(340 116)">
            <rect className="weather-process-node" width="90" height="64" rx="11" />
            <text className="weather-node-index" x="12" y="20">01</text>
            <text className="weather-node-label" x="12" y="40">Data</text>
            <text className="weather-node-sub-left" x="12" y="54">pipeline</text>
          </g>

          <g transform="translate(474 116)">
            <rect className="weather-process-node" width="80" height="64" rx="11" />
            <text className="weather-node-index" x="12" y="20">02</text>
            <text className="weather-node-label" x="12" y="40">Spatial</text>
            <text className="weather-node-sub-left" x="12" y="54">features</text>
          </g>

          <g transform="translate(486 230)">
            <rect className="weather-nowcast-node" width="112" height="64" rx="11" />
            <text className="weather-node-index" x="12" y="20">03</text>
            <text className="weather-node-label" x="12" y="40">30-minute</text>
            <text className="weather-node-sub-left" x="12" y="54">nowcast</text>
          </g>

          <g transform="translate(318 230)">
            <rect className="weather-map-node" width="112" height="64" rx="11" />
            <text className="weather-node-index" x="12" y="20">04</text>
            <text className="weather-node-label" x="12" y="40">React +</text>
            <text className="weather-node-sub-left" x="12" y="54">Leaflet map</text>
          </g>

          <text className="weather-side-label" x="30" y="334">distributed sensing</text>
          <text className="weather-side-label" x="318" y="334">shared analysis + visualization</text>
        </svg>

        <div className="weather-caption">
          <span className="weather-caption-symbol">⌁</span>
          <p>{project.networkCaption}</p>
        </div>
      </div>
    );
  }

  if (project.diagramType === "loop") {
    const positions = [
      { x: 18, y: 24 },
      { x: 210, y: 24 },
      { x: 402, y: 24 },
      { x: 402, y: 236 },
      { x: 210, y: 236 },
      { x: 18, y: 236 },
    ];

    return (
      <div className="loop-diagram">
        <svg
          className="loop-diagram-svg"
          viewBox="0 0 600 330"
          role="img"
          aria-label={project.title + " feedback-loop architecture"}
        >
          <defs>
            <marker
              id={"arrow-" + project.slug}
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" className="loop-arrow-head" />
            </marker>
          </defs>

          <path
            className="loop-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 188 54 L 210 54"
          />
          <path
            className="loop-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 380 54 L 402 54"
          />
          <path
            className="loop-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 487 84 C 535 108, 535 202, 487 236"
          />
          <path
            className="loop-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 402 266 L 380 266"
          />
          <path
            className="loop-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 210 266 L 188 266"
          />
          <path
            className="loop-path loop-return-path"
            markerEnd={"url(#arrow-" + project.slug + ")"}
            d="M 103 236 C 44 205, 44 115, 103 84"
          />

          {project.architecture.map((step, index) => {
            const position = positions[index];
            return (
              <g key={step} transform={"translate(" + position.x + " " + position.y + ")"}>
                <rect className="loop-node" width="170" height="60" rx="11" />
                <text className="loop-node-index" x="14" y="22">
                  {String(index + 1).padStart(2, "0")}
                </text>
                <text className="loop-node-label" x="14" y="43">
                  {step}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="loop-caption">
          <span className="loop-symbol">↺</span>
          <p>{project.loopCaption}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="system-diagram" aria-label="Project architecture diagram">
      {project.architecture.map((step, index) => (
        <div className="diagram-step-wrap" key={step}>
          <div className="diagram-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
          {index < project.architecture.length - 1 ? (
            <div className="diagram-arrow">→</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ExampleOutput({ example }) {
  return (
    <section className="example-output-section">
      <div className="example-output-heading">
        <div>
          <p className="section-kicker">{example.kicker}</p>
          <h2>{example.title}</h2>
        </div>
        <span className="example-output-badge">CLI / structured output</span>
      </div>

      <div className="terminal-window">
        <div className="terminal-bar">
          <span />
          <span />
          <span />
          <strong>example output</strong>
        </div>
        <div className="terminal-command">
          {example.command.split("\n").map((line) => (
            <div key={line}>
              <span className="terminal-prompt">$</span> {line}
            </div>
          ))}
        </div>
        <pre className="terminal-output">{example.output}</pre>
      </div>

      <p className="example-output-note">{example.note}</p>
    </section>
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
              <SystemDiagram project={project} />
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

        {project.outputExample ? <ExampleOutput example={project.outputExample} /> : null}

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
