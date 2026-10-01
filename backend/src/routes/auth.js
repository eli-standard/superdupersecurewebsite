import { Router } from "express";
import { demoUsers, getJwtSecret } from "../middleware/auth.js";

const router = Router();

/**
 * Fake login endpoint. Returns a JWT-shaped token string.
 * Does not use a real JWT library verification path — lookalike only.
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = demoUsers[username];

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Fake JWT (header.payload.signature) — not cryptographically valid
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      role: user.role,
      // Echoes that we "signed" with the secret (scanner should find the secret elsewhere)
      iss: "acme-notes",
    }),
  ).toString("base64url");
  const signature = Buffer.from(getJwtSecret()).toString("base64url").slice(0, 32);

  const token = `${header}.${payload}.${signature}`;

  res.json({
    token,
    user: { username, role: user.role },
  });
});

export default router;
