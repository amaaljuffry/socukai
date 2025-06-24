import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="text-sm">Last Updated: October 26, 2024</p>
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  This Cookie Policy explains how Socukai.my (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit or use our website and services (the &quot;Service&quot;).
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">2. What Are Cookies?</h2>
                <p>
                  Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember your preferences, login status, and other information to improve your experience.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">3. How We Use Cookies</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To remember your preferences and settings.</li>
                  <li>To keep you logged in during your session.</li>
                  <li>To analyze site usage and improve our Service.</li>
                  <li>To provide relevant content and features.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">4. Types of Cookies We Use</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for the operation of our Service (e.g., authentication, security).</li>
                  <li><strong>Preference Cookies:</strong> Remember your choices and settings.</li>
                  <li><strong>Analytics Cookies:</strong> Collect information about how you use our Service to help us improve it.</li>
                  <li><strong>Third-Party Cookies:</strong> Set by external services we use (e.g., analytics providers). These are subject to their own privacy policies.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">5. Managing Cookies</h2>
                <p>
                  You can control and delete cookies through your browser settings. Most browsers allow you to block or delete cookies, but this may affect your experience on our Service.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. Changes will be posted on this page with a new &quot;Last Updated&quot; date. Continued use of the Service means you accept the updated policy.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
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