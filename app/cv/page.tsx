import type { Metadata } from "next";
import Link from "next/link";
import { CvPage } from "@/components/cv/cv-page";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Janek Rahrt, including experience, open-source projects, and skills.",
};

export default function CvRoute() {
  return (
    <>
      <div className="print:hidden">
        <Header
          sticky={false}
          showPrintButton
          downloadHref="/cv.pdf"
          downloadName="janek-rahrt-cv.pdf"
          leadingContent={
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>Back to home</span>
            </Link>
          }
        />
      </div>
      <CvPage />
    </>
  );
}
