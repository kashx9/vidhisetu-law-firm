import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Section";
import { usePageMeta } from "@/hooks/usePageMeta";
import { thankYou, consultationProcess } from "@/content/consultation";
import { site } from "@/content/site";

/** Post-enquiry confirmation page — also the conversion tracking landing point. */
export default function ThankYouPage() {
  usePageMeta({ title: `Thank You — ${site.name}` });

  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex min-h-[70vh] flex-col justify-center py-24">
        <div className="max-w-2xl">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center border border-accent text-accent"
          >
            <Check className="h-5 w-5" />
          </span>

          <p className="eyebrow mt-8 text-accent">{thankYou.eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.25rem] leading-[1.15] text-primary-foreground md:text-[3rem]">
            {thankYou.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">{thankYou.body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link to="/">
                Return to Homepage
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={`tel:${site.contact.phoneHref}`}>Call {site.contact.phone}</a>
            </Button>
          </div>

          <div className="mt-16 border-t border-primary-foreground/15 pt-10">
            <p className="eyebrow text-accent">While You Wait</p>
            <ul className="mt-6 space-y-3">
              {thankYou.meanwhile.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    <span aria-hidden className="h-px w-5 bg-accent" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 text-xs leading-relaxed text-primary-foreground/40">
            Next step: {consultationProcess[1].body}
          </p>
        </div>
      </Container>
    </div>
  );
}
