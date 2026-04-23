"use client";

import { CV_CONTACTS, CV_DATA } from "@/components/cv/cv-data";
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

export function CvPage() {
  return (
    <div className="cv-print-root text-foreground min-h-screen bg-[#ece9e2] px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-10 dark:bg-[#171a20] print:min-h-0 print:bg-white print:p-0">
      <div className="cv-print-container mx-auto flex w-full max-w-5xl flex-col items-center gap-0 print:max-w-none print:gap-0">
        <article
          className="cv-sheet relative w-full overflow-hidden border border-[#d7d1c4] bg-[#fbfaf7] print:border-0 print:bg-white"
          style={{
            boxShadow:
              "0 1px 0 rgba(30,29,26,0.05), 0 16px 34px rgba(15,16,18,0.12)",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.03))",
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
          <div className="cv-paper-inner-shadow pointer-events-none absolute inset-[12px] shadow-[inset_0_0_10px_rgba(12,16,24,0.015)]" />
          <header className="relative px-8 pt-10 pb-6 md:px-12 print:px-7 print:pt-6 print:pb-4">
            <div className="flex flex-col justify-between gap-8 md:flex-row print:gap-5">
              <div>
                <h1
                  className="mb-2 text-4xl leading-none font-semibold tracking-tight text-[#1f2937] md:text-5xl print:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Janek Rahrt
                </h1>
                <div className="flex items-center gap-2 text-sm text-[#5f5f5a]">
                  <span className="text-[#292c31]">{CV_DATA.role}</span>
                  <span>·</span>
                  <span style={{ color: CV_DATA.accent }}>
                    {CV_DATA.domain}
                  </span>
                </div>
                <p className="mt-2 text-xs tracking-wide text-[#6f6a62]">
                  Remote, based in Germany
                </p>
              </div>

              <div className="space-y-1 text-left text-xs text-[#5f5c56] md:text-right">
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

            <div className="mt-6 border-t border-[#ddd6c8] pt-5 text-sm leading-7 tracking-[0.01em] text-[#2a2f36] print:mt-4 print:pt-3 print:text-[13px] print:leading-5">
              {renderRichText(CV_DATA.profile)}
            </div>
          </header>

          <div className="relative space-y-8 px-8 pt-6 pb-10 md:px-12 print:space-y-5 print:px-7 print:pt-4 print:pb-6">
            <CvSectionLabel title="Experience" />
            <div className="space-y-4 print:space-y-2.5">
              {CV_DATA.experiences.map((experience) => (
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
                          style={{ color: CV_DATA.accent }}
                        >
                          {experience.role}
                        </span>
                        {experience.note ? (
                          <span className="text-xs text-[#686761] italic">
                            {experience.note}
                          </span>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-right text-xs leading-6 text-[#6f6a62] print:leading-5">
                        {experience.period}
                      </p>
                    </div>
                    <ul className="space-y-1 md:pr-5 print:pr-3">
                      {experience.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm leading-6 tracking-[0.01em] text-[#2b3036] before:mr-2 before:font-semibold before:text-[#807b71] before:content-['›'] print:text-[12.5px] print:leading-5"
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
                {CV_DATA.openSource.map((item, index) => (
                  <div
                    key={item.name}
                    className={cn(
                      "cv-print-item space-y-1 border-b border-[#e4dfd2] py-3 print:py-2",
                      index >= 3 && "md:border-b-0"
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-sm font-semibold text-[#1f2937]">
                        {item.name}
                      </h3>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: CV_DATA.accent }}
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
              <div className="grid gap-4 md:grid-cols-5 print:gap-2">
                {CV_DATA.skills.map((skill) => (
                  <div key={skill.area} className="cv-print-item">
                    <h3 className="text-[10px] font-bold tracking-[0.13em] text-[#767169] uppercase">
                      {skill.area}
                    </h3>
                    <p className="mt-1 text-xs leading-6 tracking-[0.01em] text-[#444b53] print:text-[11.5px] print:leading-5">
                      {skill.items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-print-section">
              <div className="grid gap-8 border-t border-[#e4dfd2] pt-8 md:grid-cols-[1.5fr_1fr_1fr] print:gap-4 print:pt-5">
                {CV_DATA.footer.map((column) => (
                  <div key={column.label} className="cv-print-item">
                    <h3 className="mb-2 text-[10px] font-bold tracking-[0.16em] text-[#767169] uppercase">
                      {column.label}
                    </h3>
                    {column.talks ? (
                      <div className="space-y-3 print:space-y-2">
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
                      <div className="space-y-1 text-sm leading-6 tracking-[0.01em] text-[#3d434b] print:text-[13px] print:leading-5">
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
      <span className="text-[10px] font-bold tracking-[0.15em] text-[#757168] uppercase">
        {title}
      </span>
      <div className="h-px flex-1 bg-[#e2dccf]" />
    </div>
  );
}
