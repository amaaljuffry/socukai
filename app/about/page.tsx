import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">About This App</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
            Socukai.my is designed to simplify the complexities of Malaysian tax regulations for individuals, sole proprietors, and companies. Our goal is to provide a clear, accessible, and user-friendly platform to help you understand your tax obligations, prepare for filing, and stay up-to-date with the latest requirements like e-invoicing.
            </p>
            <p>
              Built with modern technology and a focus on user experience, this tool aims to empower you with the knowledge and resources needed to manage your tax compliance with confidence.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 