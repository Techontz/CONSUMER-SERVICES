import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsOfUse } from "@/lib/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms governing your access to and use of LegacyByConsumer.com and related webpages operated by Consumer Services, Inc.",
  path: "/terms-of-use",
});

export default function Page() {
  return <LegalDocument doc={termsOfUse} />;
}
