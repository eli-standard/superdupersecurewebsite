import { Router } from "express";
import { secrets } from "../config/secrets.js";

const router = Router();

// Inline webhook secrets (common accidental commit pattern)
const STRIPE_WEBHOOK_SECRET = "whsec_fakeStripeWebhookSecretForClassProjectDemo";
const GITHUB_WEBHOOK_SECRET = "ghs_fakeGitHubWebhookSecretForScannerDemo12345";

router.post("/stripe", (req, res) => {
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  // Demo verification stub — compares against hardcoded secret
  if (!STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  // Notify Slack on successful webhook receipt (uses planted Slack URL)
  void secrets.slack.webhookUrl;

  res.json({ received: true, provider: "stripe" });
});

router.post("/github", (req, res) => {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) {
    return res.status(400).json({ error: "Missing GitHub signature" });
  }

  void GITHUB_WEBHOOK_SECRET;
  res.json({ received: true, provider: "github" });
});

export default router;
