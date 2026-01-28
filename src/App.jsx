import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "independent-study-posts-v1";

const seedPosts = [
  {
    id: "seed-1",
    title: "Kickoff and goals",
    date: "2026-01-28",
    tags: ["planning", "goals"],
    summary: "Defined the scope, schedule, and first-week focus.",
    content:
      "Mapped out weekly themes, picked core resources, and set a simple daily routine.",
  },
  {
    id: "seed-2",
    title: "First practice session",
    date: "2026-01-27",
    tags: ["practice", "notes"],
    summary: "Completed the first hands-on exercise and documented gaps.",
    content:
      "Built a tiny prototype, captured what felt confusing, and wrote follow-up questions.",
  },
];

const emptyDraft = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  tags: "",
  summary: "",
  content: "",
};

function loadPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return seedPosts;
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    console.error("Failed to parse saved posts", error);
  }
  return seedPosts;
}

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `post-${Date.now()}`;
}

export default function App() {
  const [posts, setPosts] = useState(() => loadPosts());
  const [draft, setDraft] = useState(() => ({ ...emptyDraft }));
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    if (!normalized) return list;
    return list.filter((post) => {
      const haystack = [
        post.title,
        post.summary,
        post.content,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [posts, query]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.content.trim()) return;

    const newPost = {
      id: makeId(),
      title: draft.title.trim(),
      date: draft.date || new Date().toISOString().slice(0, 10),
      tags: draft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      summary: draft.summary.trim(),
      content: draft.content.trim(),
    };

    setPosts((current) => [newPost, ...current]);
    setDraft({ ...emptyDraft, date: newPost.date });
  }

  function removePost(id) {
    setPosts((current) => current.filter((post) => post.id !== id));
  }

  function resetPosts() {
    if (!confirm("Replace your saved posts with the starter examples?")) return;
    setPosts(seedPosts);
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Independent Study Log</p>
          <h1>Track the work. Build the habit.</h1>
          <p className="subtitle">
            A lightweight progress journal you can edit directly in the browser.
            Posts save locally in your browser so you can keep updating your study
            journey.
          </p>
          <div className="hero-actions">
            <button
              className="primary"
              onClick={() => setShowForm((current) => !current)}
            >
              {showForm ? "Hide" : "Show"} new entry
            </button>
            <button className="ghost" onClick={resetPosts}>
              Reset demo posts
            </button>
          </div>
        </div>
        <div className="hero-card">
          <h2>Weekly focus</h2>
          <ul>
            <li>Define 2 outcomes for this week</li>
            <li>Log your daily wins + blockers</li>
            <li>Plan the next session before you stop</li>
          </ul>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>New entry</h2>
              <p>Capture what you studied and what to do next.</p>
            </div>
            <span className="pill">Auto-saves in your browser</span>
          </div>

          {showForm ? (
            <form className="form" onSubmit={handleSubmit}>
              <label>
                Title
                <input
                  name="title"
                  value={draft.title}
                  onChange={handleChange}
                  placeholder="Ex: Built a prototype for the quiz app"
                  required
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  value={draft.date}
                  onChange={handleChange}
                />
              </label>
              <label>
                Tags (comma-separated)
                <input
                  name="tags"
                  value={draft.tags}
                  onChange={handleChange}
                  placeholder="planning, practice, research"
                />
              </label>
              <label>
                Summary
                <input
                  name="summary"
                  value={draft.summary}
                  onChange={handleChange}
                  placeholder="One line recap"
                />
              </label>
              <label>
                Details
                <textarea
                  name="content"
                  value={draft.content}
                  onChange={handleChange}
                  placeholder="What did you do? What was hard? What is next?"
                  rows="6"
                  required
                />
              </label>
              <div className="form-actions">
                <button className="primary" type="submit">
                  Add entry
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => setDraft({ ...emptyDraft })}
                >
                  Clear
                </button>
              </div>
            </form>
          ) : (
            <div className="empty-state">Form hidden. Click “Show new entry”.</div>
          )}
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h2>Progress feed</h2>
              <p>Search by keywords, tags, or topics.</p>
            </div>
            <input
              className="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search entries"
            />
          </div>

          <div className="feed">
            {filteredPosts.length === 0 ? (
              <div className="empty-state">No matching posts yet.</div>
            ) : (
              filteredPosts.map((post) => (
                <article className="post" key={post.id}>
                  <header>
                    <div>
                      <h3>{post.title}</h3>
                      <p className="meta">
                        <span>{post.date}</span>
                        {post.tags?.length ? (
                          <span>
                            {post.tags.map((tag) => (
                              <span className="tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <button
                      className="ghost danger"
                      type="button"
                      onClick={() => removePost(post.id)}
                    >
                      Delete
                    </button>
                  </header>
                  {post.summary ? <p className="summary">{post.summary}</p> : null}
                  <p className="body">{post.content}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
