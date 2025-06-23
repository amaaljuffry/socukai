import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-sm">Last updated: October 26, 2024</p>
            <p>
              At Socukai.my, your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our application. This Privacy Policy applies to the information that we collect and process through our Service.
            </p>

            <h3 className="font-semibold text-foreground pt-4">1. Information We Collect</h3>
            <p>
              We only collect information about you if we have a reason to do so–for example, to provide our Services, to communicate with you, or to make our Services better.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact Information:</strong> When you use our contact form, we collect your name and email address to respond to your inquiry.
              </li>
              <li>
                <strong>Usage Information:</strong> We may collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.
              </li>
            </ul>

            <h3 className="font-semibold text-foreground pt-4">2. How We Use Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, and to communicate with you. We do not sell our users&apos; private personal information.
            </p>

            <h3 className="font-semibold text-foreground pt-4">3. Data Security</h3>
            <p>
              We work very hard to protect information about you against unauthorized access, use, alteration, or destruction, and take reasonable measures to do so, such as monitoring our Services for potential vulnerabilities and attacks.
            </p>

            <h3 className="font-semibold text-foreground pt-4">4. Links To Other Websites</h3>
            <p>
              Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 