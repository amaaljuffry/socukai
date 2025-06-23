import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataPrivacyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Data Privacy</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Your Data, Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-sm">Last updated: October 26, 2024</p>
            <p>
            Socukai.my is committed to protecting your data and respecting your rights under data privacy laws such as the Personal Data Protection Act (PDPA) in Malaysia. This page outlines your rights concerning your personal data.
            </p>

            <h3 className="font-semibold text-foreground pt-4">1. Your Rights Under PDPA</h3>
            <p>
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>The Right to Access:</strong> You have the right to request copies of your personal data.
              </li>
              <li>
                <strong>The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
              </li>
              <li>
                <strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.
              </li>
              <li>
                <strong>The Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.
              </li>
            </ul>

            <h3 className="font-semibold text-foreground pt-4">2. Data Controller</h3>
            <p>
              For the purpose of data protection law, SOCUKAI.MY is the data controller of your personal information. If you have any questions about this privacy notice, including any requests to exercise your legal rights, please contact us using the details set out in the Contact Us section.
            </p>

            <h3 className="font-semibold text-foreground pt-4">3. Contacting Us About Your Data</h3>
            <p>
              To exercise any of your rights, please visit our Contact page. We will respond to your request within a reasonable timeframe.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 