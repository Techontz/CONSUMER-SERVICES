import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/lib/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Consumer Services, Inc. collects, uses, retains, protects and discloses information received through LegacyByConsumer.com.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalDocument doc={privacyPolicy} />;
}
