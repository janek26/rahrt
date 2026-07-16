"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CV_CONTACTS, CV_VARIANT_LIST, CV_VARIANTS } from "@/components/cv/cv-data";
import { cn } from "@/lib/utils";
const PAPER_NOISE_DATA_URI = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'>
    <filter id='noiseFilter'>
      <feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
      <feComponentTransfer>
        <feFuncA type='table' tableValues='0 0.18'/>
      </feComponentTransfer>
    </filter>
    <rect width='100%' height='100%' filter='url(%23noiseFilter)' />
  </svg>`
)}")`;

function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const isHighlighted = part.startsWith("**") && part.endsWith("**");
    if (!isHighlighted) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const value = part.slice(2, -2);
    return (
      <strong
        key={`${value}-${index}`}
        className="font-semibold text-slate-900"
      >
        {value}
      </strong>
    );
  });
}

function CvVariantTabBar({
  active,
}: {
  active: string;
}) {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const buildHref = useCallback(
    (id: string) => {
      if (!params) return `/cv?variant=${id}`;
      const next = new URLSearchParams(params);
      next.set("variant", id);
      return `/cv?${next.toString()}`;
    },
    [params],
  );

  return (
    <nav
      className="cv-variant-tabs mx-auto mb-6 flex w-full max-w-5xl justify-center print:hidden"
      aria-label="CV Variants"
    >
      <div className="border-foreground/10 bg-background/60 inline-flex rounded-full border p-1 shadow-[0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur">
        {CV_VARIANT_LIST.map((variant) => (
          <a
            key={variant.id}
            href={buildHref(variant.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-200 ease-out",
              active === variant.id
                ? "bg-foreground text-background shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06]",
            )}
          >
            {variant.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function readVariant(): string {
  if (typeof window === "undefined") return CV_VARIANT_LIST[0].id;
  const params = new URLSearchParams(window.location.search);
  const variant = params.get("variant");
  if (variant && CV_VARIANTS[variant]) return variant;
  return CV_VARIANT_LIST[0].id;
}
export function CvPage() {
  const [variantId, setVariantId] = useState(() => readVariant());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVariantId(readVariant());
  }, []);

  const data = CV_VARIANTS[variantId];

  return (
    <div className="cv-print-root px-3 pt-4 pb-10 transition-colors duration-300 sm:px-6 sm:pt-5 sm:pb-12 print:min-h-0 print:bg-white print:p-0">
      <div className="cv-print-container mx-auto flex w-full max-w-5xl flex-col items-center gap-0 print:max-w-none print:gap-0">
        <CvVariantTabBar active={variantId} />
        <article
          data-variant={variantId}
          className="cv-sheet relative w-full overflow-hidden border border-[#d7dde6] bg-[#fbfcfd] print:border-0 print:bg-white"
          style={{
            boxShadow:
              "0 1px 0 rgba(30,41,59,0.05), 0 16px 38px rgba(15,23,42,0.11)",
            filter: "drop-shadow(0 1px 1px rgba(15,23,42,0.03))",
          }}
        >
          <div
            className="cv-paper-noise pointer-events-none absolute inset-0"
            style={{
              backgroundImage: PAPER_NOISE_DATA_URI,
              backgroundSize: "180px 180px",
              opacity: 0.014,
              mixBlendMode: "multiply",
            }}
          />
          <div className="cv-paper-inner-shadow pointer-events-none absolute inset-[12px] shadow-[inset_0_0_10px_rgba(15,23,42,0.018)]" />
          <header className="relative px-8 pt-10 pb-6 md:px-12 print:px-7 print:pt-5 print:pb-3">
            <div className="flex flex-col justify-between gap-8 md:flex-row print:gap-4">
              <div>
                <h1
                  className="mb-2 text-4xl leading-none font-semibold tracking-tight text-[#1f2937] md:text-5xl print:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Janek Rahrt
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#5c6673]">
                  <span className="text-[#292c31]">{data.role}</span>
                  <span>·</span>
                  <span style={{ color: data.accent }}>
                    {data.domain}
                  </span>
                </div>
                <p className="mt-2 text-xs tracking-wide text-[#6b7280]">
                  Remote, based in Germany
                </p>
              </div>

              <div className="space-y-1 text-left text-xs text-[#5f6875] md:text-right">
                {CV_CONTACTS.map((contact) =>
                  contact.href ? (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={
                        contact.href.startsWith("mailto:")
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        contact.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="block transition-colors hover:text-[#1f2937]"
                    >
                      {contact.label}
                    </a>
                  ) : (
                    <span key={contact.label}>{contact.label}</span>
                  )
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-[#dce3ea] pt-5 text-sm leading-7 tracking-[0.01em] text-[#2a2f36] print:mt-2 print:pt-1.5 print:text-[11px] print:leading-[1.3]">
              {renderRichText(data.profile)}
            </div>
          </header>
          {variantId === "ai" && (
            <div className="cv-ai-banner relative mx-8 mb-6 flex items-center gap-4 rounded-xl bg-[#f4f7fb] px-5 py-3.5 md:mx-12 print:mx-7 print:mb-2 print:gap-2 print:rounded-lg print:px-4 print:py-2 print:text-[9px]">
              <div className="flex-1 min-w-0">
                <p className="mb-1 font-mono text-[0.58rem] font-semibold tracking-[0.22em] uppercase text-[#6b7a8d] print:text-[7px] print:mb-0.5">
                  Ask an AI about me
                </p>
                <code className="block select-all text-[0.72rem] leading-relaxed font-medium tracking-[0.01em] text-[#1f2937] print:text-[8px] print:leading-[1.4]">
                  claude mcp add janek-portfolio -- npx -y mcp-remote https://rahrt-portfolio-mcp-production.up.railway.app/mcp
                </code>
              </div>
              <motion.button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "claude mcp add janek-portfolio -- npx -y mcp-remote https://rahrt-portfolio-mcp-production.up.railway.app/mcp",
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                animate={
                  copied
                    ? { borderColor: "#a7d1b3", backgroundColor: "#ecf8ef" }
                    : { borderColor: "#cdd6e1", backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="print:hidden shrink-0 w-[4.25rem] rounded-lg border px-0 py-2 font-mono text-[0.58rem] font-semibold tracking-[0.14em] uppercase shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07)] active:scale-[0.97]"
                aria-label="Copy MCP command"
                title="Copy command"
                whileHover={{ borderColor: copied ? "#a7d1b3" : "#94a3b8" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[#2d7a46]"
                    >
                      Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-[#475569]"
                    >
                      Copy
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          )}

          <div className="cv-content relative space-y-8 px-8 pt-6 pb-10 md:px-12 print:space-y-3 print:px-7 print:pt-3 print:pb-3">
            <CvSectionLabel title="Experience" />
            <div className="space-y-4 print:space-y-1.5">
              {data.experiences.map((experience) => (
                <div
                  key={`${experience.company}-${experience.period}`}
                  className={cn(
                    "cv-print-item",
                    experience.nested &&
                      "border-border/80 ml-3 border-l-2 pl-4 md:ml-6"
                  )}
                >
                  <div className="space-y-1">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h2 className="text-lg leading-tight font-semibold tracking-tight text-[#1f2937] print:text-base">
                          {experience.company}
                        </h2>
                        <span
                          className="text-sm font-medium"
                          style={{ color: data.accent }}
                        >
                          {experience.role}
                        </span>
                        {experience.note ? (
                          <span className="text-xs text-[#687380] italic">
                            {experience.note}
                          </span>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-right text-xs leading-6 text-[#6b7280] print:leading-[1.3]">
                        {experience.period}
                      </p>
                    </div>
                    <ul className="space-y-1 md:pr-5 print:pr-3">
                      {experience.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm leading-6 tracking-[0.01em] text-[#2b3036] before:mr-2 before:font-semibold before:text-[#7c8794] before:content-['›'] print:text-[11px] print:leading-[1.3]"
                        >
                          {renderRichText(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <section className="cv-print-section cv-print-open-source">
              <CvSectionLabel title="Open Source" />
              <div className="grid gap-x-5 gap-y-1 md:grid-cols-3 print:gap-x-3 print:gap-y-0">
                {data.openSource.map((item) => (
                  <div
                    key={item.name}
                    className="cv-print-item space-y-1 py-3 print:py-1.5"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-sm font-semibold text-[#1f2937]">
                        {item.name}
                      </h3>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: data.accent }}
                      >
                        {item.stat}
                      </span>
                    </div>
                    <p className="text-xs leading-5 tracking-[0.01em] text-[#474c54]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-print-section">
              <CvSectionLabel title="Skills" />
              <div className="grid gap-4 md:grid-cols-5 print:gap-1">
                {data.skills.map((skill) => (
                  <div key={skill.area} className="cv-print-item">
                    <h3 className="text-[10px] font-bold tracking-[0.13em] text-[#707b88] uppercase">
                      {skill.area}
                    </h3>
                    <p className="mt-1 text-xs leading-6 tracking-[0.01em] text-[#444b53] print:text-[10.5px] print:leading-[1.25]">
                      {skill.items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-print-section">
              <div className="cv-footer-grid grid gap-8 border-t border-[#e2e8ef] pt-8 md:grid-cols-[1.5fr_1fr_1fr] print:gap-2.5 print:pt-2.5">
                {data.footer.map((column) => (
                  <div key={column.label} className="cv-print-item">
                    <h3 className="mb-2 text-[10px] font-bold tracking-[0.16em] text-[#707b88] uppercase">
                      {column.label}
                    </h3>
                    {column.talks ? (
                      <div className="space-y-3 print:space-y-1">
                        {column.talks.map((talk) => (
                          <div key={talk.title}>
                            <p className="text-sm text-[#1f2937] italic">
                              {talk.title}
                            </p>
                            <p className="text-xs text-[#525860]">
                              {talk.meta}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {column.lines ? (
                      <div className="space-y-1 text-sm leading-6 tracking-[0.01em] text-[#3d434b] print:text-[11px] print:leading-[1.3]">
                        {column.lines.map((line) => (
                          <p key={line}>{renderRichText(line)}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

function CvSectionLabel({ title }: { title: string }) {
  return (
    <div className="cv-section-label mb-2 flex items-center gap-3 print:mb-1 print:gap-2">
      <span className="text-[10px] font-bold tracking-[0.15em] text-[#6f7a86] uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-[#dfe6ee]" />
    </div>
  );
}
