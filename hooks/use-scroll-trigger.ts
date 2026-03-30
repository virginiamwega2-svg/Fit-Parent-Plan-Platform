"use client";

/**
 * useScrollTrigger — low-level primitive for every GSAP scroll animation.
 *
 * HOW SCROLLTRIGGER WORKS
 * ───────────────────────
 * ScrollTrigger maps a range of the page's scroll progress to a GSAP tween.
 * The two most important concepts:
 *
 *   start / end  — expressed as "triggerEdge viewportEdge", e.g.
 *                  "top 80%"  → when the top of the trigger element reaches
 *                               80% down the viewport (20% from bottom)
 *                  "bottom top" → when the bottom of the trigger exits the
 *                                 top of the viewport
 *
 *   scrub        — when false (default), the tween fires once and plays
 *                  forward at its own speed regardless of scroll speed.
 *                  When true / a number, the tween is locked to scroll
 *                  position: scrub:true is instant lock, scrub:1 is a 1-second
 *                  lag (eases into position). Higher = smoother but less crisp.
 *
 *   pin          — pins the trigger element to the viewport while the scroll
 *                  distance between start and end is consumed. Useful for
 *                  storytelling sections and horizontal scroll containers.
 *
 *   toggleActions — "onEnter onLeave onEnterBack onLeaveBack"
 *                   Each is one of: play | pause | resume | reverse | restart | none
 *                   Example: "play none none reverse" plays on enter, reverses on scroll back.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollTriggerConfig {
  /** CSS string: "triggerEdge viewportEdge"  e.g. "top 80%" */
  start?: string;
  /** CSS string or callback returning "+=${px}"  e.g. "bottom top" */
  end?: string | (() => string);
  /**
   * false  → tween plays independently of scroll speed (snappier)
   * true   → tween position is locked 1-to-1 with scroll
   * number → tween lags behind by N seconds (smoothed scrub)
   */
  scrub?: boolean | number;
  /**
   * true → pins the trigger element to the viewport while the scroll
   * distance between start and end is consumed.
   */
  pin?: boolean;
  pinSpacing?: boolean;
  /** Re-calculates all measurements when the window resizes. Always enable for
   *  anything that derives a pixel value from the DOM (horizontal scroll, etc.) */
  invalidateOnRefresh?: boolean;
  anticipatePin?: number;
  toggleActions?: string;
  /** If true, animation only plays once — never reverses */
  once?: boolean;
  markers?: boolean; // dev only
}

export interface AnimationConfig {
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
  /** Optional GSAP timeline instead of a single to/from */
  timeline?: (tl: gsap.core.Timeline) => void;
}

/**
 * Returns a stable ref you attach to any DOM element.
 * The animation is torn down automatically when the component unmounts.
 *
 * Usage:
 *   const ref = useScrollTrigger<HTMLDivElement>(
 *     { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
 *     { start: "top 85%", toggleActions: "play none none reverse" }
 *   );
 *   return <div ref={ref}>...</div>;
 */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animation: AnimationConfig,
  trigger: ScrollTriggerConfig = {},
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // GSAP context scopes all animations to this component.
    // ctx.revert() kills every tween AND scrolltrigger created inside,
    // with no risk of accidentally killing animations from sibling components.
    const ctx = gsap.context(() => {
      const stConfig: ScrollTrigger.Vars = {
        trigger: el,
        start: trigger.start ?? "top 85%",
        end: trigger.end ?? "bottom top",
        scrub: trigger.scrub ?? false,
        pin: trigger.pin ?? false,
        pinSpacing: trigger.pinSpacing ?? true,
        invalidateOnRefresh: trigger.invalidateOnRefresh ?? false,
        anticipatePin: trigger.anticipatePin ?? 0,
        toggleActions: trigger.once
          ? "play none none none"
          : (trigger.toggleActions ?? "play none none none"),
        markers: trigger.markers ?? false,
      };

      if (animation.timeline) {
        // Timeline path: caller builds the timeline, we attach the ScrollTrigger
        const tl = gsap.timeline({ scrollTrigger: stConfig });
        animation.timeline(tl);
      } else if (animation.from) {
        // fromTo path: explicit start and end states
        gsap.fromTo(el, animation.from, {
          ...animation.to,
          scrollTrigger: stConfig,
        });
      } else {
        // to path: current state → target state
        gsap.to(el, {
          ...animation.to,
          scrollTrigger: stConfig,
        });
      }
    }, el); // ← scope the context to `el` so all selectors are relative to it

    return () => ctx.revert(); // kills all tweens + ScrollTriggers in one call
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // deps intentionally empty: animation config is set once at mount time.
  // Changing props after mount is not a supported pattern for scroll animations.

  return ref;
}
