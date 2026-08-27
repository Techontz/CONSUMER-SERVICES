import { PolicyPage } from "@/components/sections/PolicyPage";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Data Sharing",
    description:
      "How Consumer Services, Inc. shares information with the collaborating professionals and resources involved in a project.",
    path: "/data-sharing",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="Legal"
      headline="Data Sharing"
      summary="When and how information you provide may be shared with the attorneys, accountants, licensed professionals and other specialised resources a project may involve."
    />
  );
}
