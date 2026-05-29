import type { Metadata } from "next";
import { CvPage } from "@/components/cv/cv-page";
import { CvToolbar } from "@/components/cv/cv-toolbar";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Janek Rahrt, including experience, open-source projects, and skills.",
};

export default function CvRoute() {
  return (
    <div className="landing-surface bg-background text-foreground min-h-screen print:bg-white print:min-h-0">
      <CvToolbar />
      <CvPage />
    </div>
  );
}
