import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/common/Section";
import { hero } from "@/content/homepage";
import { site } from "@/content/site";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  countUp,
  dur,
  ease,
  enterFrom,
  eyebrowIn,
  gsap,
  mq,
  revealHeading,
  stagger,
  useMotion,
  wordRise,
} from "@/lib/motion";

/**
 * Section 02 — Hero.
 * Editorial composition rather than stock imagery: a two-column split with an
 * asymmetric rule structure on the right. Restrained, no gradient, no gavel.
 */
export function Hero() {
  const ref = useMotion<HTMLElement>((scope) => {
    const mm = gsap.matchMedia();

    // The load sequence. The figure rises into frame first — revealed from the
    // ground up, settling out of a soft focus — and the words follow her in.
    const cleanup = revealHeading(scope.querySelector("h1"), (words) =>
      gsap
        .timeline()
        .fromTo(
          "[data-hero='image']",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08, filter: "blur(14px)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: dur.slow * 1.4,
            ease: ease.out,
            clearProps: "filter,clipPath",
          },
          0,
        )
        .add(eyebrowIn(scope), 0.15)
        .from(words, wordRise, 0.35)
        .from("[data-motion='lead']", { ...enterFrom }, "-=0.3")
        .from("[data-motion='actions'] > *", { ...enterFrom, stagger: stagger.items }, "-=0.45")
        .from("[data-motion='markers'] > *", { ...enterFrom, stagger: stagger.items }, "-=0.4")
        .from("[data-motion='caption']", { ...enterFrom }, "-=0.5"),
    );

    // The markers count up to whatever figure the content file states.
    gsap.utils
      .toArray<HTMLElement>("[data-motion='marker-value']")
      .forEach((el) => countUp(el, scope));

    // She drifts up a little slower than the page, which is what keeps her
    // feeling set into the background rather than pasted onto it.
    gsap.to("[data-hero='image']", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
    });

    // A gentle tilt toward the cursor — precise pointers only.
    mm.add(mq.finePointer, () => {
      const card = scope.querySelector<HTMLElement>("[data-motion='tilt']");
      if (!card) return;
      gsap.set(card, { transformPerspective: 1200, transformOrigin: "50% 50%" });
      const toX = gsap.quickTo(card, "rotationY", { duration: dur.slow, ease: ease.out });
      const toY = gsap.quickTo(card, "rotationX", { duration: dur.slow, ease: ease.out });
      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const nx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
        const ny = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
        toX(gsap.utils.clamp(-1, 1, nx) * 4);
        toY(gsap.utils.clamp(-1, 1, ny) * -4);
      };
      const onLeave = () => {
        toX(0);
        toY(0);
      };
      scope.addEventListener("pointermove", onMove);
      scope.addEventListener("pointerleave", onLeave);
      return () => {
        scope.removeEventListener("pointermove", onMove);
        scope.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      cleanup();
      mm.revert();
    };
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <Container className="relative grid gap-16 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-[18ch] font-display text-[2.5rem] leading-[1.08] text-primary md:text-[3.5rem] lg:text-[4rem]">
            {hero.headline}
          </h1>

          <p
            data-motion="lead"
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {hero.supporting}
          </p>

          <div data-motion="actions" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to={site.cta.primary.href}>
                  {site.cta.primary.label}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link to={site.cta.secondary.href}>{site.cta.secondary.label}</Link>
            </Button>
          </div>

          <dl
            data-motion="markers"
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {hero.markers.map((marker) => (
              <div key={marker.label}>
                <dt className="sr-only">{marker.label}</dt>
                <dd>
                  <span
                    data-motion="marker-value"
                    className="block font-display text-3xl text-primary"
                  >
                    {marker.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-muted-foreground">
                    {marker.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/*
          The figure, set into the page rather than framed on it. Two things do
          the blending: `mix-blend-multiply` drops the artwork's white field
          onto the ivory (which is why the panel carries an explicit background
          — multiply needs an opaque surface in its own stacking context, and
          the tilt transform creates one), and the radial mask dissolves her
          edges so there is no rectangle anywhere.
        */}
        <div data-motion="panel" className="relative hidden lg:block">
          <div data-motion="tilt" className="relative aspect-[3/4] w-full bg-background">
            <img
              data-hero="image"
              src="/hero-justice.jpg"
              alt=""
              width={675}
              height={1200}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain object-bottom mix-blend-multiply"
              style={{
                maskImage:
                  "radial-gradient(118% 92% at 58% 38%, #000 52%, rgba(0,0,0,0.45) 78%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(118% 92% at 58% 38%, #000 52%, rgba(0,0,0,0.45) 78%, transparent 100%)",
              }}
            />
          </div>

          {/* Sits under the figure, not over her — she dissolves into this rule. */}
          <div data-motion="caption" className="mt-6 border-t border-border pt-5">
            <p className="font-display text-lg italic leading-snug text-primary">
              Vidhi Setu- “Ask. Understand. Act.- The Vidhi Setu Way”.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Between what the law requires and what your business is trying to do.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
