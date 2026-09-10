import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/common/Section";
import { Logo } from "@/components/common/Logo";
import { usePageMeta } from "@/hooks/usePageMeta";
import { site } from "@/content/site";

/**
 * Client Login — placeholder.
 * The brief keeps this link visually secondary, and the real portal is a
 * separate system. This page exists so the link resolves rather than 404s.
 */
export default function ClientLoginPage() {
  usePageMeta({ title: `Client Login — ${site.name}` });

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Logo showDescriptor={false} />
        </div>

        <div className="mt-10 border border-border bg-card p-8">
          <h1 className="font-display text-2xl text-primary">Client Login</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Access matter updates, shared documents and invoices. The client portal is a separate
            system — this screen is a placeholder until it is connected.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="you@company.com" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" placeholder="••••••••" disabled />
            </div>
            <Button type="submit" className="w-full" disabled>
              Sign in
            </Button>
          </form>

          <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            Not a client yet?{" "}
            <Link to="/contact" className="text-accent underline underline-offset-4">
              {site.cta.primary.label}
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Trouble signing in? Call{" "}
          <a href={`tel:${site.contact.phoneHref}`} className="text-accent">
            {site.contact.phone}
          </a>
        </p>
      </div>
    </Container>
  );
}
