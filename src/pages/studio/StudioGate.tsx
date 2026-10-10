import * as React from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/Section";
import { Logo } from "@/components/common/Logo";
import {
  SignInError,
  currentSession,
  signIn,
  signOut,
  type StudioSession,
} from "@/features/blog/auth";

/**
 * Sign-in gate for the Blog Studio.
 *
 * Credentials are checked against the accounts in src/features/blog/accounts.ts
 * using PBKDF2 — see the security note at the top of that file for what this
 * does and does not protect. Sessions last 12 hours.
 */
export function StudioGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<StudioSession | null>(() => currentSession());

  if (!session) return <SignInScreen onSignedIn={setSession} />;

  return (
    <div>
      <div className="border-b border-border bg-secondary/50">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-xs text-muted-foreground">
            Signed in as <span className="text-primary">{session.name}</span> ·{" "}
            {session.role === "editor" ? "Editor" : "Author"}
          </p>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/blog">View public blog</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                signOut();
                setSession(null);
              }}
            >
              <LogOut aria-hidden />
              Sign out
            </Button>
          </div>
        </Container>
      </div>
      {children}
    </div>
  );
}

function SignInScreen({ onSignedIn }: { onSignedIn: (session: StudioSession) => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      onSignedIn(await signIn(email, password));
    } catch (problem) {
      setError(
        problem instanceof SignInError ? problem.message : "Could not sign in. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="flex min-h-[75vh] items-center justify-center py-20">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo showDescriptor={false} />
        </div>

        <div className="mt-10 border border-border bg-card p-8">
          <p className="eyebrow">Blog Studio</p>
          <h1 className="mt-3 font-display text-2xl text-primary">Sign in to write.</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This area is for the firm's authors and editors.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="studio-email">Email</Label>
              <Input
                id="studio-email"
                type="email"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@vidhisetu.in"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studio-password">Password</Label>
              <Input
                id="studio-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p role="alert" className="text-xs leading-relaxed text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Checking…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 flex items-start gap-2 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            <LockKeyhole aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Forgotten your password? It cannot be recovered — ask whoever maintains the site to set
            a new one.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/blog" className="text-accent underline underline-offset-4">
            Back to the blog
          </Link>
        </p>
      </div>
    </Container>
  );
}
