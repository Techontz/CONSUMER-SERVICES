import { LegalDocument } from "@/components/sections/LegalDocument";
import { dataSharingDisclosure } from "@/lib/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Data Sharing Disclosure",
  description:
    "When, why and with whom Consumer Services, Inc. may share information supplied through LegacyByConsumer.com.",
  path: "/data-sharing",
});

export default function Page() {
  return <LegalDocument doc={dataSharingDisclosure} />;
}
