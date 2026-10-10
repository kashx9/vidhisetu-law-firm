/**
 * ════════════════════════════════════════════════════════════════════════════
 *  BLOG STUDIO AUTHENTICATION
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  Everything that decides "who is this, and may they publish?" runs through
 *  this file. The accounts themselves live in ./accounts.ts.
 *
 *  HOW SIGN-IN WORKS
 *  1. The person types an email and password.
 *  2. We look up the account and re-derive PBKDF2-SHA256(password, salt) in the
 *     browser using Web Crypto, at 210,000 iterations.
 *  3. If the derived hash matches the stored one, we write a session to
 *     localStorage with a 12-hour expiry. Otherwise we reject.
 *
 *  The password is never stored and never leaves the browser.
 *
 *  MOVING THIS TO A SERVER
 *  Replace the body of `signIn` with a POST to your login endpoint, and
 *  `currentSession` with a read of whatever that endpoint returns (a cookie
 *  session or a JWT). The three predicates below — `canAuthor`, `canPublish`
 *  and `currentSession` — are the only things components call, so no UI
 *  changes are needed. See the security note at the top of accounts.ts for
 *  why this matters before launch.
 */

import { findAccount, studioAccounts, type StudioRole } from "./accounts";

export type { StudioRole };

export type StudioSession = {
  email: string;
  name: string;
  role: StudioRole;
  authorId: string;
  /** Epoch ms. The session is ignored once this passes. */
  expiresAt: number;
};

const SESSION_KEY = "vidhisetu.studio.session.v2";
const SESSION_HOURS = 12;

/** Must match ITERATIONS in scripts/hash-password.mjs. */
const PBKDF2_ITERATIONS = 210_000;
const KEY_BITS = 256;

/* ─────────────────────────────── hashing ────────────────────────────────── */

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function derive(password: string, saltHex: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(saltHex),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_BITS,
  );
  return bytesToHex(new Uint8Array(bits));
}

/** Length-safe, non-short-circuiting comparison. */
function equals(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ──────────────────────────────── sign in ───────────────────────────────── */

export class SignInError extends Error {}

/**
 * Verifies the credentials and starts a session.
 * Throws SignInError with a message suitable for display.
 */
export async function signIn(email: string, password: string): Promise<StudioSession> {
  if (!email.trim() || !password) {
    throw new SignInError("Enter your email and password.");
  }
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new SignInError("This browser cannot verify the password. Try a different browser.");
  }

  const account = findAccount(email);

  // Derive even when the email is unknown, so a wrong email and a wrong
  // password take the same amount of time and look identical to the caller.
  const reference = account ?? studioAccounts[0];
  const derived = await derive(password, reference.salt);

  if (!account || !equals(derived, account.hash)) {
    throw new SignInError("That email and password do not match an account.");
  }

  const session: StudioSession = {
    email: account.email,
    name: account.name,
    role: account.role,
    authorId: account.authorId,
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  };

  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // A blocked storage API shouldn't stop this session; it just won't persist.
  }
  return session;
}

export function signOut() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function currentSession(): StudioSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as StudioSession;
    if (!session?.email || typeof session.expiresAt !== "number") return null;

    if (Date.now() > session.expiresAt) {
      signOut();
      return null;
    }

    // An account removed from accounts.ts loses access immediately, even if a
    // session for it is still sitting in a browser.
    if (!findAccount(session.email)) {
      signOut();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export const canAuthor = () => currentSession() !== null;

export const canPublish = () => currentSession()?.role === "editor";
