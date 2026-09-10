import * as React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/common/Section";
import { authors } from "@/content/insights/authors";
import { currentSession, signIn, signOut, type AuthorRole } from "@/features/blog/auth";

/**
 * MOCK AUTHENTICATION GATE.
 *
 * Choosing an author and a role is the entire "login" — there is no password
 * check, because there is no backend yet. Replace this component's session
 * lookup with a real one (and the functions in src/features/blog/auth.ts) to
 * secure the Studio properly. Nothing else in the authoring flow changes.
 */
export function StudioGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState(() => currentSession());
  const [authorId, setAuthorId] = React.useState(authors[0].id);
  const [role, setRole] = React.useState<AuthorRole>("editor");

  if (!session) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-24">
        <div className="w-full max-w-md border border-border bg-card p-8">
          <p className="eyebrow">Insights Studio</p>
          <h1 className="mt-3 font-display text-2xl text-primary">Sign in to write.</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This is a mock sign-in. Pick who you are writing as; there is no password check yet.
          </p>

          <div className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Author</Label>
              <Select value={authorId} onValueChange={setAuthorId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as AuthorRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="author">Author — draft and submit for review</SelectItem>
                  <SelectItem value="editor">Editor — can also publish and delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                const author = authors.find((item) => item.id === authorId)!;
                setSession(signIn({ authorId: author.id, name: author.name, role }));
              }}
            >
              Enter Studio
            </Button>

            <p className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
              <Link to="/insights" className="text-accent underline underline-offset-4">
                Back to Insights
              </Link>
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div className="border-b border-border bg-secondary/50">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-xs text-muted-foreground">
            Studio session · {session.name} ({session.role})
          </p>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/insights">View public Insights</Link>
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
