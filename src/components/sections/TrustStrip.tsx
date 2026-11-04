import { Container } from "@/components/common/Section";
import { trustStrip } from "@/content/homepage";
import { gsap, useMotion } from "@/lib/motion";

/** Section 03 — the practice strip directly beneath the hero. */
export function TrustStrip() {
  // The practices arrive left to right, like a line of type being set.
  const ref = useMotion<HTMLDivElement>((scope) => {
    gsap.from("li", {
      opacity: 0,
      y: 10,
      duration: 0.6,
      stagger: 0.07,
      scrollTrigger: { trigger: scope, start: "top 96%", once: true },
    });
  });

  return (
    <div ref={ref} className="border-b border-border bg-secondary/40">
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
