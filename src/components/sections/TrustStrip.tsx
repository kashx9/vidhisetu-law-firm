import { Container } from "@/components/common/Section";
import { trustStrip } from "@/content/homepage";

/** Section 03 — the practice strip directly beneath the hero. */
export function TrustStrip() {
  return (
    <div className="border-b border-border bg-secondary/40">
      <Container className="py-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
          {trustStrip.map((item) => (
            <li
              key={item}
              className="text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
