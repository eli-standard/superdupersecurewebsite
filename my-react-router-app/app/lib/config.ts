/**
 * Client-side configuration for Acme Notes.
 * Intentionally embeds secrets that should never live in frontend code.
 */

export const config = {
  apiBaseUrl: "http://localhost:3001/api",
  // Classic mistake: shipping a "public" API key that is actually privileged
  publicApiKey: "pk_live_acmeNotesFrontendKey_abcdefghijklmnopqrstuv",
  stripePublishableKey:
    "pk_test_51HqFakeStripePublishableKeyForDemoABCDEFG123456",
  analyticsWriteKey: "rw_acme_analytics_key_9x8y7z6w5v4u3t2s1r0q",
};
