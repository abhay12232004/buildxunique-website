"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine cursor
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Listen to data-cursor attributes on hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = (e.target as HTMLElement).closest("a, button, input, textarea, [role='button']");
        if (clickable) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform,width,height,background-color] duration-200 ease-out hidden md:flex items-center justify-center ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${
        cursorText
          ? "w-20 h-20 bg-[#FF7139] text-white shadow-[0_8px_24px_rgba(255,113,57,0.35)]"
          : isHovered
          ? "w-10 h-10 bg-[#111111]/80 backdrop-blur-xs scale-110"
          : "w-3.5 h-3.5 bg-[#FF7139]"
      }`}
    >
      <span
        ref={textRef}
        className={`text-[10px] font-bold tracking-[0.15em] uppercase text-center select-none ${
          cursorText ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } transition-all duration-150`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {cursorText}
      </span>
    </div>
  );
}
