import { Link } from "react-router";
import type { Route } from "./+types/home";
import { fetchNotes, type Note } from "../lib/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acme Notes" },
    { name: "description", content: "Simple notes for busy teams." },
  ];
}

export async function clientLoader() {
  try {
    const notes = await fetchNotes();
    return { notes, error: null as string | null };
  } catch {
    // App may not be running — show empty state with sample copy
    return {
      notes: [] as Note[],
      error: "Could not reach the API. Start the backend to load notes.",
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { notes, error } = loaderData;

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand">
          Acme Notes
        </Link>
        <nav>
          <Link to="/">Notes</Link>
          <Link to="/login">Login</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>

      <main className="content">
        <h1>Your notes</h1>
        <p className="lede">
          Capture ideas and sync them through the Acme Notes API.
        </p>

        {error && <p className="banner">{error}</p>}

        {notes.length === 0 && !error ? (
          <p className="empty">No notes yet.</p>
        ) : (
          <ul className="note-list">
            {notes.map((note) => (
              <li key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.body}</p>
                <time dateTime={note.createdAt}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
