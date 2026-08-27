import { PolicyPage } from "@/components/sections/PolicyPage";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Privacy Policy",
    description:
      "How Consumer Services, Inc. handles information submitted through LegacyByConsumer.com.",
    path: "/privacy-policy",
  }),
  // Not indexed until the policy text itself is published.
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PolicyPage
      eyebrow="Legal"
      headline="Privacy Policy"
      summary="How Consumer Services, Inc. collects, uses and protects the information you share with us through this website."
    />
  );
}
