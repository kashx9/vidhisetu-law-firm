/**
 * Password hashing tool for Blog Studio accounts.
 *
 *   node scripts/hash-password.mjs "the new password"
 *
 * Prints a ready-to-paste `salt` / `hash` pair for src/features/blog/accounts.ts.
 * The plain password is never stored anywhere — only the derived hash is.
 *
 * Algorithm must stay in sync with PBKDF2_ITERATIONS in src/features/blog/auth.ts,
 * which derives the same value in the browser via Web Crypto.
 */

import { pbkdf2Sync, randomBytes } from "node:crypto";

const ITERATIONS = 210_000;
const KEY_BYTES = 32;
const SALT_BYTES = 16;

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "the new password"');
  process.exit(1);
}

if (password.length < 10) {
  console.error("Use at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(SALT_BYTES).toString("hex");
const hash = pbkdf2Sync(
  password,
  Buffer.from(salt, "hex"),
  ITERATIONS,
  KEY_BYTES,
  "sha256",
).toString("hex");

console.log("\nPaste these two lines into the account in src/features/blog/accounts.ts:\n");
console.log(`    salt: "${salt}",`);
console.log(`    hash: "${hash}",`);
console.log(
  "\nThen tell the account holder their password. It is not recoverable from the hash.\n",
);
