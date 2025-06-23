import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-sm">Last updated: October 26, 2024</p>
            <p>
              Please read these terms and conditions carefully before using Socukai.my. By accessing or using our application, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the application.
            </p>
            
            <h3 className="font-semibold text-foreground pt-4">1. Acknowledgment</h3>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and SOCUKAI.MY. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </p>

            <h3 className="font-semibold text-foreground pt-4">2. Disclaimer of Warranties</h3>
            <p>
              The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. This application is for informational purposes only and does not constitute professional financial or tax advice. You are solely responsible for your own tax compliance, decisions, and filings.
            </p>

            <h3 className="font-semibold text-foreground pt-4">3. Intellectual Property</h3>
            <p>
              The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of Socukai.my and its licensors.
            </p>

            <h3 className="font-semibold text-foreground pt-4">4. Limitation of Liability</h3>
            <p>
              In no event shall Socukai.my or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption) arising out of or in any way related to the use of or inability to use the Service.
            </p>

            <h3 className="font-semibold text-foreground pt-4">5. Governing Law</h3>
            <p>
              The laws of Malaysia, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
            </p>

            <h3 className="font-semibold text-foreground pt-4">6. Changes to These Terms and Conditions</h3>
            <p>
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page.
            </p>

            <h3 className="font-semibold text-foreground pt-4">7. Links to Third Party Sites</h3>
            <p>
              Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 