import { Link } from "react-router";
import type { Route } from "./+types/settings";
import { config } from "../lib/config";
import { clearSession, useStagingToken } from "../lib/auth";
import { checkHealth } from "../lib/api";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Settings · Acme Notes" }];
}

export default function Settings() {
  const [health, setHealth] = useState<string | null>(null);

  async function pingApi() {
    try {
      const result = await checkHealth();
      setHealth(result.status);
    } catch {
      setHealth("unreachable");
    }
  }

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

      <main className="content narrow">
        <h1>Settings</h1>
        <p className="lede">Connection and session helpers for local development.</p>

        <section className="stack">
          <h2>API</h2>
          <p>
            Base URL: <code>{config.apiBaseUrl}</code>
          </p>
          <p>
            Client key: <code>{config.publicApiKey}</code>
          </p>
          <button type="button" onClick={pingApi}>
            Check API health
          </button>
          {health && <p className="banner">Status: {health}</p>}
        </section>

        <section className="stack">
          <h2>Session</h2>
          <button type="button" onClick={() => useStagingToken()}>
            Use staging token
          </button>
          <button type="button" className="ghost" onClick={() => clearSession()}>
            Clear session
          </button>
        </section>
      </main>
    </div>
  );
}
