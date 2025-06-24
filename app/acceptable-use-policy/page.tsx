import Link from "next/link";

export default function AcceptableUsePolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Acceptable Use Policy</h1>
      <p className="text-sm text-muted-foreground mb-6">Last Updated: October 26, 2024</p>
      <div className="w-full md:w-2/3 space-y-6">
        <p>
          This policy defines permitted and prohibited uses of Socukai.my (the &quot;Service&quot;). By using the Service, you agree to comply with these rules. Violations may result in account suspension or termination.
        </p>
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Permitted Uses</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Calculate tax estimates for personal or business purposes.</li>
            <li>Access informational content about tax compliance.</li>
            <li>Submit data only if you own it or have legal rights to process it.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Prohibited Activities</h2>
          <h3 className="font-semibold mt-4">A. Illegal or Harmful Activities</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for fraudulent, unlawful, or malicious purposes.</li>
            <li>Submit false or misleading tax/financial information.</li>
            <li>Violate Malaysian tax laws or regulations.</li>
          </ul>
          <h3 className="font-semibold mt-4">B. Security Violations</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Attempt to hack, disrupt, or overload the Service (e.g., DDoS attacks, brute-forcing).</li>
            <li>Bypass access controls or exploit vulnerabilities.</li>
            <li>Share login credentials or compromise other users&apos; accounts.</li>
          </ul>
          <h3 className="font-semibold mt-4">C. Content Restrictions</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Upload viruses, malware, or harmful code.</li>
            <li>Submit sensitive personal data of others without consent (e.g., NRIC numbers, bank details).</li>
            <li>Post defamatory, discriminatory, or harassing content.</li>
          </ul>
          <h3 className="font-semibold mt-4">D. Commercial Misuse</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Scrape, copy, or resell Service content without written permission.</li>
            <li>Use the Service for competitive analysis (e.g., reverse engineering).</li>
            <li>Spam other users (e.g., unsolicited promotions).</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">3. User-Generated Content</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You retain ownership of data you submit but grant Socukai.my a license to process it for Service operation.</li>
            <li>We may remove content violating this policy without notice.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">4. Enforcement</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Investigations:</strong> We may review usage to enforce this policy.</li>
            <li><strong>Actions:</strong> Violations may result in:
              <ul className="list-disc pl-6 space-y-1">
                <li>Warnings (for minor breaches).</li>
                <li>Account suspension or termination (for severe/repeated violations).</li>
                <li>Legal action (if laws are broken).</li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Reporting Violations</h2>
          <p>Report abuse or policy breaches via our <Link href="/contact" className="text-blue-600 underline">Contact Us</Link> page.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
          <p>We may update this AUP. Continued use = acceptance of changes.</p>
        </section>
      </div>
    </div>
  );
} 