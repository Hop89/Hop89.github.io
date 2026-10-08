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
        "A framework that lets AI agents control real hardware through typed capabilities, permission checks, and device adapters.",
      problem:
        "I wanted AI models to control hardware without giving them raw access to a device. Agent Bridge lets the model request an action while the host decides whether it is allowed and handles execution.",
      design:
        "I split the system into discovery, policy, execution, and device adapters so the model never talks directly to the hardware.",
      iteration:
        "Testing pushed more safeguards into the runtime, including device scoping, sequence limits, cancellation, endpoint protection, and stricter device identification.",
      current:
        "It currently supports OpenAI and Ollama agents, multiple device adapters, trust levels, live traces, a firmware SDK, and AI-generated firmware projects.",
      future:
        "Next I want to improve approvals and make multi-step runs easier to track and resume.",
      learned:
        "I learned that the model should be the planner, not the security boundary. The important restrictions need to be enforced by the host.",
      contribution:
        "I built Agent Bridge around typed capabilities instead of raw serial commands. It takes more adapter work, but it keeps permissions and results consistent across devices.",
      diagramType: "loop",
      loopCaption: "Results return to the agent, which can decide what permitted action to take next.",
      architecture: [
        "AI provider",
        "Tool request",
        "Policy gate",
        "Executor",
        "Adapter + device",
        "Result + trace",
      ],
      artifacts: [
        { label: "Captured hardware trace (redacted)", detail: "Real GUI trace showing device discovery, three read-only actions, and a rejected device ID.", url: "/agentbridge-hardware-trace-redacted.txt" },
        { label: "Firmware SDK and protocol", detail: "Public Arduino and MicroPython implementation of the Agent Bridge serial protocol.", url: "https://github.com/Hop89/agentbridge-firmware-sdk" },
        { label: "Firmware generation reference", detail: "Public example showing the API used by generated firmware.", url: "https://github.com/Hop89/agentbridge-firmware-sdk/tree/main/examples/arduino_minimal" },
        { label: "Example firmware implementations", detail: "Arduino and MicroPython examples built with the SDK.", url: "https://github.com/Hop89/agentbridge-firmware-sdk/tree/main/examples" },
        { label: "Main runtime", detail: "The main host runtime is private; the public artifacts show the protocol and captured behavior." },
      ],
      outputExample: {
        kicker: "Real GUI trace · October 2026",
        heading: "Discovery and safe execution",
        title: "Hardware execution trace",
        toolCalls: true,
        command: `list_devices {}
list_capabilities {"device_id":"flipper.zero.cli"}
run_sequence (device.info, system.uptime, cli.help)`,
        output: `list_devices → 1 USB-serial Flipper Zero
device_id: flipper.zero.cli
firmware: Momentum / mntm-dev
capabilities listed: 18

run_sequence → steps_completed: 3

[0] device.info
  success: true
  hardware_model: Flipper Zero
  firmware_version: mntm-dev

[1] system.uptime
  success: true
  uptime: 0h48m19s

[2] cli.help
  success: true
  output: Available commands: …
`,
      },
      evidenceStatus: "Captured on hardware · 3 successful actions",
      firmwareGenerator: {
        label: "Natural-language adapter generation",
        summary: "Agent Bridge can take a hardware description and generate a PlatformIO project plus an adapter manifest using the firmware SDK.",
        exampleCommand: 'agentbridge adapter create "ESP32 with DHT22 on GPIO4. Expose device.ping, sensor.temperature, and sensor.humidity as safe capabilities." --board esp32 --name "DHT22 Sensor Node" --output ./firmware-demo',
        sourceFiles: [
          { path: "src/main.cpp", detail: "Generated C++ handlers and device identity" },
          { path: "platformio.ini", detail: "Board configuration and SDK dependencies" },
          { path: "adapter manifest", detail: "Adapter identity, connection metadata, and saved firmware path" },
        ],
        exampleCode: `#include <AgentBridge.h>
AgentBridge ab;

void setup() {
  Serial.begin(115200);
  // Register device identity and capabilities
  ab.begin({ /* device details */ });

  ab.capability("device.ping",
    "Return a liveness response.", "safe",
    [](JsonObjectConst, JsonObject out) {
      out["pong"] = true;
      return true;
    });
}

void loop() { ab.loop(); }`,
        url: "https://github.com/Hop89/agentbridge-firmware-sdk/tree/main/examples/arduino_minimal",
      },
      caseStudy: {
        title: "Enforcing device scope twice",
        problem: "Showing the agent only one device did not guarantee it could only execute on that device.",
        change: "I added the same device-scope check inside runtime lookup, so out-of-scope requests are rejected even after a fresh scan.",
        proof: "The October trace shows the rejection, and the May commit history shows the runtime change.",
      },
      milestones: [
        { sha: "422f827f6a20ece3cb4fbc7c839741370ee7b0fd", title: "Initial operator interfaces", detail: "CLI and local GUI added on top of the adapter layer." },
        { sha: "104189448ae62521ee0210422b81335c26b8e59d", title: "Execution boundary hardened", detail: "Device scopes enforced during lookup, not just discovery." },
        { sha: "fb8f244c9e152ca97bc509cacf1b2d20221dc787", title: "Device ecosystem expanded", detail: "Adapter manifests and hardware identification added." },
      ],
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
        "A network analysis tool built on Nmap that turns scan results into prioritized findings, saved reports, and trends over time.",
      problem:
        "Nmap gives a lot of raw network data, but I wanted a faster way to see what mattered and what changed between scans. Perimeter adds scoring, reports, and comparisons.",
      design:
        "I separated scanning, XML parsing, scoring, report storage, and trend comparison so I could test each part independently.",
      iteration:
        "It started as an Nmap wrapper and grew into a reporting tool with risk scores, stored reports, and scan-to-scan comparisons.",
      current:
        "It scores findings, flags common misconfigurations, stores reports by IP, compares scans, and outputs text or JSON.",
      future:
        "Next I want to add an API so other tools or agents can run scans and use the results.",
      learned:
        "I learned that keeping scan results structured and comparable was more useful than just collecting more output.",
      contribution:
        "I kept Nmap as the scanner and built the analysis around it: parsing, scoring, storage, and comparison. Saving reports by target IP made it possible to track one system over time.",
      diagramType: "loop",
      loopCaption: "Each scan can be compared with saved reports to show what changed.",
      architecture: [
        "Target scan",
        "XML parser",
        "Risk analysis",
        "Stored report",
        "Trend / diff",
        "Next scan",
      ],
      artifacts: [
        { label: "Source code", detail: "Public CLI, analysis code, and development history.", url: "https://github.com/Hop89/Perimeter" },
        { label: "Full project writeup", detail: "Project writeup with scan output and architecture.", url: "/perimeter-writeup.html" },
        { label: "Trend comparison code", detail: "Code for detecting new, changed, and resolved findings.", url: "https://github.com/Hop89/Perimeter/blob/main/src/perimeter/trend.py" },
        { label: "Verification tests", detail: "Tests for report scoping, IPv6, and filename collisions.", url: "https://github.com/Hop89/Perimeter/blob/main/tests/verification.py" },
      ],
      outputExample: {
        kicker: "Captured Oct 5, 2026",
        heading: "Stored scan and prioritized findings",
        title: "Local analysis with persistent reports",
        command: `perimeter analyze reports/local_scan_1.xml --store-report`,
        output: `Report stored for 10.33.4.52:
reports\\10.33.4.52\\report_20261005_162057_859824.json

Perimeter Analysis
Hosts analyzed: 1
Open ports analyzed: 6
Findings by severity: critical=1, high=2, medium=0, low=3

Top Findings:
[CRITICAL 95] 10.33.4.52 445/tcp microsoft-ds
  SMB exposure is high-risk for lateral movement.
[HIGH 85] 10.33.4.52 139/tcp netbios-ssn
  NetBIOS exposure can leak host and share information.
[HIGH 85] 10.33.4.52 5900/tcp vnc
  Legacy remote access protocol may be insecure by default.
[LOW 35] 10.33.4.52 135/tcp msrpc
[LOW 35] 10.33.4.52 3580/tcp nati-svrloc
[LOW 35] 10.33.4.52 5800/tcp vnc-http

Reports stored for 1 IP(s)`,
      },
      secondExample: {
        kicker: "Captured Oct 5, 2026",
        heading: "Two scans, stable security posture",
        title: "Historical comparison of two saved reports",
        command: `perimeter analyze --latest --store-report
perimeter trend 10.33.4.52`,
        output: `Report stored for 10.33.4.52:
reports\\10.33.4.52\\report_20261005_162118_228047.json

Perimeter Trend Analysis for 10.33.4.52
Reports analyzed: 2
Period:
2026-10-05T16:20:57.859824
  → 2026-10-05T16:21:18.228047

Security Posture: STABLE
Open Ports Delta: +0

Severity Trend:
  Critical: 1 → 1 +0
  High:     2 → 2 +0
  Medium:   0 → 0 +0
  Low:      3 → 3 +0`,
      },
      evidenceStatus: "Two captured scans · Oct 2026",
      caseStudy: {
        title: "Avoiding mixed or overwritten reports",
        problem: "Combined multi-host reports were hard to compare, and same-second filenames could overwrite each other.",
        change: "I saved reports by target and added microseconds to filenames. Tests cover host scoping and filename collisions.",
        proof: "Covered by the public verification tests.",
        url: "https://github.com/Hop89/Perimeter/blob/main/tests/verification.py",
      },
      milestones: [
        { sha: "c3d2d4048dc1122fec370311da1c39c1b0f38b3d", title: "Readable scanning", detail: "Local-interface scan mode and formatted output." },
        { sha: "dce68a57971fdba0ed0254f97bea6059dfd5273d", title: "Reports made persistent", detail: "Scan results moved into stored reports." },
        { sha: "c9b29e698243677803acc4f1f79cf9153c199c4a", title: "Longitudinal comparison", detail: "Target-level trends and diffs added." },
      ],
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
          <a href="#about">About</a>
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

      <div className="milestone-panel">
        <span className="mini-label">Selected milestones</span>
        {project.milestones?.map((milestone) => {
          const matched = commits.find((item) => item.sha === milestone.sha);
          const content = (
            <>
              <span className="milestone-date">{matched ? formatDate(matched.date) : ""}</span>
              <strong>{milestone.title}</strong>
              <span>{milestone.detail}</span>
            </>
          );
          return matched?.url ? (
            <a href={matched.url} target="_blank" rel="noreferrer" key={milestone.sha}>{content}</a>
          ) : (
            <div key={milestone.sha}>{content}</div>
          );
        })}
      </div>

      <details className="full-history">
        <summary>Browse full commit history ({commits.length})</summary>
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
      </details>

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
    <article className="example-output-card">
      <div className="example-output-heading">
        <div>
          <span className="mini-label">{example.kicker}</span>
          <h3>{example.heading || (example.kicker === "Documented response schema" ? "Illustrative JSON response" : "Local CLI output")}</h3>
        </div>
        <span className="example-output-badge">{example.toolCalls ? "Agent trace" : "CLI / output"}</span>
      </div>

      <div className="terminal-window">
        <div className="terminal-bar">
          <span />
          <span />
          <span />
          <strong>{example.toolCalls ? "captured agent tools" : "example output"}</strong>
        </div>
        <div className="terminal-command">
          {example.command.split("\n").map((line) => (
            <div key={line}>
              <span className="terminal-prompt">{example.toolCalls || example.kicker === "Documented response schema" ? "›" : "$"}</span> {line}
            </div>
          ))}
        </div>
        <pre className="terminal-output">{example.output}</pre>
      </div>

    </article>
  );
}

function ProjectProof({ project }) {
  return (
    <section className="project-proof" aria-label="Project output and evidence">
      <div className="project-proof-head">
        <div>
          <p className="section-kicker">Output & evidence</p>
          <h2>{project.outputExample ? project.outputExample.title : "Generated station map"}</h2>
        </div>
        <span className="proof-status">{project.evidenceStatus}</span>
      </div>
      {project.outputExample ? (
        <div className={project.secondExample ? "proof-examples-grid" : ""}>
          <ExampleOutput example={project.outputExample} />
          {project.secondExample ? <ExampleOutput example={project.secondExample} /> : null}
        </div>
      ) : project.demoUrl ? (
        <div className="map-proof">
          <iframe
            src={project.demoUrl}
            title="Archived synthetic-data weather station map"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="map-proof-footer">
            <span>Early Leaflet prototype · synthetic observations</span>
            <a href={project.demoUrl} target="_blank" rel="noreferrer">Open full map ↗</a>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FirmwareGeneratorProof({ generator }) {
  return (
    <section className="firmware-proof" aria-label="Firmware generation workflow">
      <div className="firmware-proof-head">
        <div>
          <p className="section-kicker">Additional capability</p>
          <h2>Firmware generation from a hardware description</h2>
        </div>
        <span className="proof-status">Implemented · example request</span>
      </div>
      <p className="proof-intro">{generator.summary}</p>
      <div className="firmware-proof-flow" aria-label="Firmware generation steps">
        <div><span>01</span><strong>Describe hardware</strong><small>Device, peripherals, and intended capabilities</small></div>
        <span className="firmware-flow-arrow" aria-hidden="true">→</span>
        <div><span>02</span><strong>Generate files</strong><small>SDK-based C++ and PlatformIO configuration</small></div>
        <span className="firmware-flow-arrow" aria-hidden="true">→</span>
        <div><span>03</span><strong>Save and inspect</strong><small>Source files and manifest, then optional flash/probe</small></div>
      </div>
      <div className="firmware-proof-grid">
        <article className="firmware-proof-panel">
          <span className="mini-label">Example request — not a recorded run</span>
          <pre className="firmware-command">{generator.exampleCommand}</pre>
          <p className="firmware-panel-label">Generated project structure</p>
          <div className="firmware-files">
            {generator.sourceFiles.map((item) => (
              <div key={item.path}>
                <code>{item.path}</code><span>{item.detail}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="firmware-proof-panel">
          <span className="mini-label">Public SDK example</span>
          <pre className="firmware-code">{generator.exampleCode}</pre>
          <a className="firmware-source-link" href={generator.url} target="_blank" rel="noreferrer">
            View complete SDK example ↗
          </a>
        </article>
      </div>
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
          <p className="project-lead">{project.description}</p>
        </section>

        <ProjectProof project={project} />
        {project.firmwareGenerator ? (
          <FirmwareGeneratorProof generator={project.firmwareGenerator} />
        ) : null}

        <section className="project-overview-grid">
          <div className="overview-left">
            <article className="overview-card">
              <span className="mini-label">Problem solved</span>
              <p className="overview-description">{project.problem}</p>
            </article>

            <article className="overview-card diagram-card">
              <span className="mini-label">System diagram</span>
              <SystemDiagram project={project} />
            </article>

            <article className="overview-card case-study-card">
              <span className="mini-label">Testing & iteration</span>
              <h3>{project.caseStudy.title}</h3>
              <p><strong>The constraint:</strong> {project.caseStudy.problem}</p>
              <p><strong>What I changed:</strong> {project.caseStudy.change}</p>
              {project.caseStudy.url ? (
                <a className="case-source" href={project.caseStudy.url} target="_blank" rel="noreferrer">
                  {project.caseStudy.proof} ↗
                </a>
              ) : (
                <p className="case-source-text">{project.caseStudy.proof}</p>
              )}
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
            <h2>Development & Evolution</h2>
          </div>

          <div className="development-layout">
            <div className="development-grid">
              <article className="development-card">
                <span className="mini-label">Design</span>
                <h3>Architecture</h3>
                <p>{project.design}</p>
              </article>

              <article className="development-card">
                <span className="mini-label">Iteration</span>
                <h3>What changed</h3>
                <p>{project.iteration}</p>
              </article>

              <article className="development-card">
                <span className="mini-label">Current</span>
                <h3>What works now</h3>
                <p>{project.current}</p>
              </article>

              {project.future ? (
                <article className="development-card">
                  <span className="mini-label">Future</span>
                  <h3>Next steps</h3>
                  <p>{project.future}</p>
                </article>
              ) : null}
            </div>

          </div>
        </section>

        <section className="evidence-grid">
          <article className="evidence-card">
            <span className="mini-label">
              Engineering decisions
            </span>
            <h2>
              How I built it
            </h2>
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
        <section className="home-hero" id="about">
          <p className="eyebrow">Engineering portfolio</p>
          <h1>Building systems where software interacts with the real world</h1>
          <p className="home-hero-copy">
            I like building projects that connect software to hardware and networks.
            Most of my recent work has focused on AI-assisted hardware control and
            network security, especially where reliability and access control matter.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View projects</a>
            <a
              className="button button-secondary"
              href="https://github.com/Hop89"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        <section className="section projects-first" id="projects">
          <div className="section-heading">
            <p className="section-kicker">Selected independent work</p>
            <h1>Featured projects</h1>
            <p>
              These are the two independent projects I have spent the most time
              building and testing.
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

        <section className="home-closing">
          <div>
            <p className="section-kicker">What connects the work</p>
            <h2>Making powerful tools easier to control.</h2>
          </div>
          <p>
            Both projects started with tools that could already do a lot, but were
            missing a layer I wanted. Agent Bridge adds controlled hardware access for
            AI models, while Perimeter turns Nmap output into prioritized reports and
            comparisons over time.
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
