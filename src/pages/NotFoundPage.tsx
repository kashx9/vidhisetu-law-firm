import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Section";
import { usePageMeta } from "@/hooks/usePageMeta";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";

export default function NotFoundPage() {
  usePageMeta({ title: `Page not found — ${site.name}` });

  return (
    <Container className="flex min-h-[65vh] flex-col justify-center py-24">
      <div className="max-w-xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-4xl text-primary md:text-5xl">
          This page doesn't exist.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          The page may have moved, or the link may be out of date. These are the main sections of
          the site.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="flex items-center gap-2 border-b border-border py-2 text-sm text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <span aria-hidden className="h-px w-4 bg-accent" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="mt-10">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </Container>
  );
}
