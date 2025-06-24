import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-sm">Last Updated: 25 June 2025</p>
            <div className="p-4 bg-muted rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Enhanced Terms of Service for Socukai.my: A Stronger Legal Framework</h2>
              <p className="text-sm text-muted-foreground">
                <strong>KUALA LUMPUR, MALAYSIA</strong> – In response to the evolving digital landscape and to ensure robust legal clarity for its users, an enhanced Terms of Service document has been crafted for Socukai.my, an online tax information service. The new terms, which supersede the previous version, incorporate key provisions from Malaysian law, including the Personal Data Protection Act (PDPA) 2010, the Electronic Commerce Act 2006, and the Consumer Protection Act 1999, to provide a more comprehensive and compliant user agreement.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                The updated document, presented below, offers greater detail on user rights and responsibilities, data privacy, and the specific limitations of the service. It is designed to be clearer and more protective for all parties involved.
              </p>
            </div>
            <p>
              Welcome to Socukai.my. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Socukai.my website, including any mobile applications and related tools (collectively, the &quot;Service&quot;). Please read these Terms carefully before using the Service.
            </p>
            <p>
              By accessing or using the Service, you signify your agreement to be bound by these Terms. If you do not agree to these Terms, you must cease using the Service immediately.
            </p>
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-foreground pt-4">1. Definitions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service:</strong> refers to the Socukai.my web/mobile application, including all related content, software, and tools designed to provide general tax information and calculations.</li>
                  <li><strong>We, Us, Our, or Socukai.my:</strong> refers to the owner and operator of the Service.</li>
                  <li><strong>User, You, or Your:</strong> refers to any individual or entity accessing or using the Service.</li>
                  <li><strong>Content:</strong> means any data, text, calculations, information, or other materials generated, provided, or otherwise made accessible on or through the Service.</li>
                  <li><strong>User Data:</strong> means any data or information that you upload, submit, or otherwise provide to the Service.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">2. Eligibility</h3>
                <p>To use this Service, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years of age or have obtained the consent of a parent or legal guardian.</li>
                  <li>If you are using the Service on behalf of a business or entity, you must be duly authorized to act for and bind that entity.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">3. Account Registration</h3>
                <p>To access certain features of the Service, you may be required to create an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during the registration process.</li>
                  <li>Maintain and promptly update your account information.</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                  <li>Notify us immediately of any known or suspected unauthorized use of your account via our <Link href="/contact" className="text-blue-600 underline">Contact Us</Link> page.</li>
                </ul>
                <p>You are solely responsible for all activities that occur under your account.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">4. No Professional Advice</h3>
                <p><strong>Crucially, the Service is not a substitute for professional tax, legal, or financial advice.</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The Content provided by the Service is for informational and general guidance purposes only.</li>
                  <li>The Service does not constitute tax advisory, legal, or financial services. You should not rely on the Service for filing tax returns or making financial decisions.</li>
                  <li>We strongly recommend that you consult with a qualified and licensed tax professional or financial advisor for advice tailored to your specific situation.</li>
                  <li>You bear full and sole responsibility for any decisions or actions you take based on the Content from the Service.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">5. Intellectual Property Rights</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Our Intellectual Property:</strong> All rights, title, and interest in and to the Service, including its source code, design, logos, trademarks, and features, are and will remain the exclusive property of Socukai.my. The Service is protected by copyright and other laws of Malaysia.</li>
                  <li><strong>Your User Data:</strong> You retain all ownership rights to your User Data. However, by using the Service, you grant Socukai.my a worldwide, non-exclusive, royalty-free license to use, process, store, and display your User Data solely for the purpose of operating and providing the Service to you.</li>
                  <li><strong>Restrictions:</strong> You are strictly prohibited from copying, modifying, distributing, selling, reverse engineering, decompiling, or scraping any part of our Service or Content without our prior written consent.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">6. User Responsibilities</h3>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload, post, or transmit any User Data that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
                  <li>Provide any false, inaccurate, or misleading information.</li>
                  <li>Infringe upon any third-party&apos;s rights, including copyright, trademark, or privacy rights.</li>
                  <li>Introduce any viruses, malware, spam, or any other code that may disrupt, damage, or limit the functionality of the Service.</li>
                  <li>Violate any applicable laws or regulations of Malaysia.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">7. Privacy and Personal Data</h3>
                <p>Our collection and use of your personal information are governed by our <strong>Privacy Policy</strong>, which is incorporated by reference into these Terms. By using the Service, you consent to the data practices described in the Privacy Policy, in compliance with the Malaysian Personal Data Protection Act (PDPA) 2010.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">8. Limitation of Liability</h3>
                <p>To the maximum extent permitted by Malaysian law, Socukai.my and its directors, employees, and affiliates shall not be liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to, financial losses, loss of profits, data, or goodwill, resulting from your use of the Service.</li>
                  <li>Any inaccuracies, errors, or omissions in tax calculations or other Content provided by the Service.</li>
                  <li>The actions or content of any third parties, including linked websites or integrated APIs.</li>
                  <li>Any service interruptions, data loss, or security breaches.</li>
                </ul>
                <p>Our maximum aggregate liability to you for any and all claims arising from your use of the Service shall be limited to the amount of fees, if any, paid by you to Socukai.my in the six (6) months preceding the event giving rise to the claim.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">9. Disclaimer of Warranties</h3>
                <p>The Service is provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis. Socukai.my expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, accuracy, reliability, and non-infringement. We do not warrant that the Service will meet your requirements or be uninterrupted, timely, secure, or error-free.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">10. Termination</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>By Us:</strong> We reserve the right to suspend or terminate your access to the Service at our sole discretion, without prior notice, for any reason, including but not limited to, a breach of these Terms.</li>
                  <li><strong>By You:</strong> You may delete your account and terminate this agreement at any time by following the instructions within the Service.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">11. Changes to Terms</h3>
                <p>We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">12. Governing Law and Dispute Resolution</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions. Any dispute, controversy, or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Kuala Lumpur, Malaysia.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">13. Refund Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Subscription Refunds:</strong> If applicable, refunds for subscription-based services will be considered on a pro-rata basis if requested within fourteen (14) days of the payment date.</li>
                  <li><strong>No Refunds for Breach:</strong> No refunds will be issued to Users whose accounts are terminated due to a breach of these Terms.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">14. Third-Party Services</h3>
                <p>The Service may contain links to third-party websites or services that are not owned or controlled by Socukai.my. We do not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services. Your use of any third-party integrations is at your own risk.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">15. Indemnification</h3>
                <p>You agree to indemnify and hold harmless Socukai.my, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.</p>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4">16. General Provisions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Socukai.my concerning the Service.</li>
                  <li><strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, that provision will be struck, and the remaining provisions will remain in full force and effect.</li>
                  <li><strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
                </ul>
              </section>
              <section>
                <h3 className="font-semibold text-foreground pt-4"></h3>
                <Button asChild className="mt-2">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 