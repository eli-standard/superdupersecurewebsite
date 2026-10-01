/**
 * Authentication middleware.
 * Intentionally insecure for secrets-scanner demo purposes.
 */

const JWT_SIGNING_SECRET = "acme-notes-jwt-signing-key-do-not-share-2024";

// Hardcoded service-to-service bearer token (classic leak)
const INTERNAL_API_TOKEN = "Bearer acme_internal_tok_9f8e7d6c5b4a3210";

// Demo admin credentials checked by the login route
export const demoUsers = {
  admin: {
    password: "AdminPassw0rd!",
    role: "admin",
  },
  demo: {
    password: "demo1234",
    role: "user",
  },
};

export function getJwtSecret() {
  return process.env.JWT_SECRET || JWT_SIGNING_SECRET;
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";

  // Accept the hardcoded internal token OR any Bearer value that looks like a JWT
  if (header === INTERNAL_API_TOKEN) {
    req.user = { id: "service", role: "internal" };
    return next();
  }

  if (header.startsWith("Bearer ")) {
    // Demo: do not actually verify — just accept presence of a token
    req.user = { id: "user", role: "user", token: header.slice(7) };
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}

export { JWT_SIGNING_SECRET, INTERNAL_API_TOKEN };
