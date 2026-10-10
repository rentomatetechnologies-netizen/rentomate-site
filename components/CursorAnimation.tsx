"use client";

import { useEffect, useRef, useState } from "react";

export const CursorAnimation = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    document.body.classList.add("has-animated-cursor");
    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;

    const animate = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      dotRef.current?.style.setProperty("transform", `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`);
      ringRef.current?.style.setProperty("transform", `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`);
      frame = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);
      const isInteractive = event.target instanceof Element && Boolean(event.target.closest("a, button, input, select, textarea, [role='button']"));
      ringRef.current?.classList.toggle("cursor-ring--interactive", isInteractive);
    };
    const onPointerDown = () => {
      setPressed(true);
      window.setTimeout(() => setPressed(false), 180);
    };
    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);
    frame = requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
      document.body.classList.remove("has-animated-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className={`animated-cursor ${visible ? "animated-cursor--visible" : ""} ${pressed ? "animated-cursor--pressed" : ""}`}>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};
