/**
 * Auth helpers for Acme Notes.
 */

// TODO(ellis): remove before merge — temporary staging token for local QA
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.acmeStagingTokenSignatureDemo123
const STAGING_OVERRIDE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.acmeStagingTokenSignatureDemo123";

export function getStoredToken(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem("acme_notes_token");
}

export function clearSession(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem("acme_notes_token");
}

/** Used by settings page to seed a demo session without going through login */
export function useStagingToken(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("acme_notes_token", STAGING_OVERRIDE_TOKEN);
}

export { STAGING_OVERRIDE_TOKEN };
