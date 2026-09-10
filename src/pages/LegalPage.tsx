import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/common/Section";
import { Markdown } from "@/components/common/Markdown";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getLegalDocument, legalDocuments } from "@/content/legal";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export default function LegalPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getLegalDocument(slug) : undefined;

  usePageMeta({
    title: doc ? `${doc.title} — ${site.name}` : site.name,
    description: doc?.summary,
  });

  if (!doc) return <Navigate to="/legal/disclaimer" replace />;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        lead={doc.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]}
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <div className="min-w-0 max-w-[70ch]">
            <p className="mb-10 border-b border-border pb-6 text-xs uppercase tracking-eyebrow text-muted-foreground">
              Last updated {formatDate(doc.updated)}
            </p>
            <Markdown>{doc.body}</Markdown>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-accent">Related</p>
            <ul className="mt-6 space-y-3 border-t border-border pt-5">
              {legalDocuments.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/legal/${item.slug}`}
                    className={
                      item.slug === doc.slug
                        ? "text-sm text-accent"
                        : "text-sm text-muted-foreground transition-colors hover:text-accent"
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
