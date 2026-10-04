import Script from "next/script";

/**
 * The client's SERVICE INQUIRY form, embedded from their own CRM.
 *
 * This replaced the hand-built ContactForm on /contact. That component and
 * its `/api/contact` route are still in the repo and still work — they are
 * simply no longer mounted anywhere, because leads now have to land in the
 * client's CRM rather than in the Laravel admin. Reinstating the old form
 * is a one-line swap on the contact page, which is why nothing was deleted.
 *
 * What is inside the frame is not ours: the fields, their validation, the
 * submit button and the success state are all configured in the CRM, so no
 * amount of styling here will make the form match the site's design system.
 * The page gives it a frame and gets out of the way.
 *
 * Every data- attribute below is load-bearing — `form_embed.js` reads them
 * to find the frame and to drive its auto-resize — so they are reproduced
 * exactly as the client supplied them, including the single quotes inside
 * `data-layout`.
 */

const FORM_ID = "7mxEHDXJQw1VprqAdVJJ";
const FRAME_ID = `inline-${FORM_ID}`;

/**
 * The height the form is designed at. The embed script overrides this once
 * it has measured the real content, but it has to be set here too: the
 * client's snippet asks for `height:100%`, and a percentage height inside
 * an auto-height parent resolves to nothing. The frame would open as a
 * zero-pixel sliver and then jump to full height when the script landed.
 */
const FORM_HEIGHT = 1214;

export function InquiryForm() {
  return (
    <>
      <iframe
        src={`https://www.legacybyconsumer.com/widget/form/${FORM_ID}`}
        id={FRAME_ID}
        title="Service Inquiry"
        className="block w-full"
        style={{ height: FORM_HEIGHT, border: "none" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="SERVICE INQUIRY"
        data-height={FORM_HEIGHT}
        data-layout-iframe-id={FRAME_ID}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
      />
      {/* afterInteractive, not beforeInteractive: the script's only job is
          to resize a frame that is already rendering its own content, so
          nothing is gained by blocking first paint on a third-party host. */}
      <Script
        src="https://www.legacybyconsumer.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
