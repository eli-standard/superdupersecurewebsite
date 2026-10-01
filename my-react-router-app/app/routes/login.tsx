import { useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { login } from "../lib/api";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login · Acme Notes" }];
}

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Login failed. Check credentials or API availability.");
    } finally {
      setPending(false);
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
        <h1>Sign in</h1>
        <p className="lede">Use your Acme Notes account to sync notes.</p>

        <Form method="post" onSubmit={handleSubmit} className="stack">
          <label>
            Username
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="banner">{error}</p>}
          <button type="submit" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </Form>
      </main>
    </div>
  );
}
