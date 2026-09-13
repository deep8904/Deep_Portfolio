"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/data";

const inputClass =
  "h-11 w-full rounded-[9px] border border-line-strong bg-surface px-3.5 text-[14.5px] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-line-hover";
const labelClass = "text-[13px] font-medium text-ink-secondary";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = `${message}\n\nFrom: ${name}${email ? ` (${email})` : ""}`;
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("opening");
    window.location.href = mailto;
    window.setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 tab:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-ink-faint">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-ink-faint">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="text-ink-faint">*</span>
        </label>
        <input id="subject" name="subject" type="text" required className={inputClass} placeholder="What's this about?" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-ink-faint">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-[9px] border border-line-strong bg-surface px-3.5 py-3 text-[14.5px] leading-[1.6] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-line-hover"
          placeholder="Tell me a bit about what you have in mind."
        />
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] bg-accent px-6 text-[13.5px] font-medium text-accent-cream transition-[background,transform] duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.985]"
        >
          {status === "opening" ? "Opening your email app…" : "Send Message"}
          {status === "idle" && (
            <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          )}
        </button>
        <span className="text-[12.5px] text-ink-faint">Opens in your email app, addressed to me. Nothing is sent from this site.</span>
      </div>
    </form>
  );
}
