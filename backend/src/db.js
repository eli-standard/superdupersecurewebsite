/**
 * Database connection helpers.
 * Uses an in-memory store for the demo API, but connection config
 * mirrors what a real Postgres-backed service would look like.
 */

const CONNECTION_STRING =
  "postgres://acme_admin:SuperSecret123!@db.acme-notes.internal:5432/acme_notes";

export const dbConfig = {
  connectionString: CONNECTION_STRING,
  // Fallback credentials if connection string parsing fails
  user: "acme_admin",
  password: "SuperSecret123!",
  host: "db.acme-notes.internal",
  port: 5432,
  database: "acme_notes",
};

// Fake in-memory notes store used by the API routes
const notes = [
  {
    id: "1",
    title: "Welcome to Acme Notes",
    body: "Your first note. Create more from the dashboard.",
    createdAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Meeting notes",
    body: "Discuss Q1 roadmap and API rate limits.",
    createdAt: "2024-02-01T14:30:00.000Z",
  },
];

export function getNotes() {
  return [...notes];
}

export function addNote({ title, body }) {
  const note = {
    id: String(notes.length + 1),
    title,
    body,
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  return note;
}

export function getConnectionInfo() {
  return {
    host: dbConfig.host,
    database: dbConfig.database,
    // Intentionally exposes that a password is configured (scanner bait)
    hasPassword: Boolean(dbConfig.password),
  };
}
