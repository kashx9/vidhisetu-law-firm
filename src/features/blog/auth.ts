/**
 * AUTHORING ACCESS — mock gate for the Insights Studio.
 *
 * Everything that decides "can this person write or publish an insight?" runs
 * through this file. Replace the three functions below with a real session
 * check (JWT, cookie session, SSO) and the entire authoring surface is secured
 * without touching any component.
 *
 * Roles
 *   author    — can create and edit their own drafts, and send them for review
 *   editor    — can additionally publish, archive and delete
 */

export type AuthorRole = "author" | "editor";

export type StudioSession = {
  authorId: string;
  name: string;
  role: AuthorRole;
};

const SESSION_KEY = "vidhisetu.studio.session";

/**
 * MOCK: signing in only records who you are so drafts get a sensible byline.
 * There is no password check — do not ship this as-is.
 */
export function signIn(session: StudioSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function currentSession(): StudioSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StudioSession) : null;
  } catch {
    return null;
  }
}

export const canAuthor = () => currentSession() !== null;

export const canPublish = () => currentSession()?.role === "editor";
