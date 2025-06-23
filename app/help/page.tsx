import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function HelpPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      <div className="w-full md:w-2/3">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">
                For questions related to your specific tax entity (Individual, Sole Prop, or Company), please visit the FAQ tab within that section.
              </p>
              <Link href="/individual?tab=faq" className="text-primary hover:underline">
                Go to Individual FAQs
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>External Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <p className="text-muted-foreground">
                For official information, please refer to LHDN&apos;s official portal.
              </p>
              <a href="https://www.hasil.gov.my/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                LHDN Official Website
              </a>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you can&apos;t find what you&apos;re looking for in the FAQs or official resources, please don&apos;t hesitate to send us a message.
              </p>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 