import { config } from "./config";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type LoginResponse = {
  token: string;
  user: { username: string; role: string };
};

function authHeaders(): HeadersInit {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("acme_notes_token")
      : null;

  return {
    "Content-Type": "application/json",
    "X-API-Key": config.publicApiKey,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${config.apiBaseUrl}/notes`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to load notes (${res.status})`);
  }
  const data = (await res.json()) as { notes: Note[] };
  return data.notes;
}

export async function createNote(title: string, body: string): Promise<Note> {
  const res = await fetch(`${config.apiBaseUrl}/notes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, body }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create note (${res.status})`);
  }
  const data = (await res.json()) as { note: Note };
  return data.note;
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${config.apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": config.publicApiKey,
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed (${res.status})`);
  }
  const data = (await res.json()) as LoginResponse;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("acme_notes_token", data.token);
  }
  return data;
}

export async function checkHealth(): Promise<{ status: string }> {
  const res = await fetch(`${config.apiBaseUrl}/health`);
  if (!res.ok) {
    throw new Error(`Health check failed (${res.status})`);
  }
  return res.json() as Promise<{ status: string }>;
}
