import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const changelog = [
  {
    version: "2.3.0",
    date: "2024-06-10",
    added: [
      "FAQ section for content creators (individuals)",
      "@vercel/analytics integration",
      "Sidebar footer link to PETAI.AGENCY",
    ],
    changed: [
      "E-Invoicing tab: clearer explanation for business vs. non-business individuals",
      "Timeline and UI improvements for Individual E-Invoicing",
      "FAQ search logic updated to support JSX answers",
    ],
    fixed: [
      "FAQ search logic error (case-insensitive match on JSX)",
      "Build error on Vercel due to JSX filtering in FAQ",
    ],
    removed: [
      "Outdated E-Invoicing explanation for individuals",
      "Redundant closing statements in E-Invoicing section",
    ],
  },
  {
    version: "2.2.0",
    date: "2025-06",
    added: [],
    changed: [
      "Updated policy reporting: replaced all mentions of legal@socukai.my with Contact Us page link",
    ],
    fixed: [],
    removed: [
      "Direct email reporting from Terms of Service and Acceptable Use Policy",
    ],
  },
  {
    version: "2.1.0",
    date: "2025-01",
    added: [],
    changed: [
      "Improved mobile navigation and responsiveness",
      "Updated build process for Vercel compatibility",
    ],
    fixed: [
      "Static generation error (useSearchParams Suspense boundary)",
      "Duplicate icons in mobile sidebar",
      "TypeScript issues in tax estimator components",
    ],
    removed: [],
  },
  {
    version: "2.0.0",
    date: "2024-12",
    added: [
      "Full UI/UX redesign (shadcn/ui)",
      "SME tax calculator",
      "Form validation (Zod)",
      "Progress tracking",
    ],
    changed: [
      "Migrated to Next.js 15 (App Router)",
      "Complete TypeScript refactor",
    ],
    fixed: [],
    removed: [],
  },
  {
    version: "1.5.0",
    date: "2024-11",
    added: [
      "Legal compliance pages",
      "Contact form API",
      "Data privacy section",
    ],
    changed: [
      "Sidebar navigation improvements",
    ],
    fixed: [],
    removed: [],
  },
  {
    version: "1.3.0",
    date: "2024-10",
    added: [
      "E-Invoicing information pages",
      "Dropdown menu and header logo",
      "Help documentation",
    ],
    changed: [],
    fixed: [
      "Duplicate build issues",
    ],
    removed: [],
  },
  {
    version: "1.2.0",
    date: "2024-09",
    added: [
      "Income/expense forms",
      "SSM & tax status checker",
      "Tax engine and document uploader",
    ],
    changed: [
      "Layout improvements for forms",
    ],
    fixed: [],
    removed: [],
  },
  {
    version: "1.1.0",
    date: "2024-08",
    added: [
      "FAQ system",
      "Tax compliance checklist",
      "Download center",
    ],
    changed: [
      "Section-to-section navigation",
    ],
    fixed: [],
    removed: [],
  },
  {
    version: "1.0.0",
    date: "2024-07",
    added: [
      "Initial launch of SOCUKAI.MY",
      "Tax estimator (Individual, Sole Prop, Company)",
      "Entity type selector",
      "Responsive layout",
    ],
    changed: [],
    fixed: [],
    removed: [],
  },
  {
    version: "0.5.0",
    date: "2024-06",
    added: [
      "Project setup (Next.js)",
      "Core logic and database schema",
      "Tax calculation prototype",
    ],
    changed: [
      "Initial design and UX wireframes",
    ],
    fixed: [],
    removed: [],
  },
];

const sectionLabels = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
};

export default function ChangelogPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Changelog — SOCUKAI.MY</h1>
      <div className="w-full md:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Release History & Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            {changelog.map((entry) => (
              <div key={entry.version}>
                <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2">
                  {entry.version}
                  <Badge variant="default" className="text-xs font-normal py-0.5 px-2 align-middle">{entry.date}</Badge>
                </h2>
                {["added", "changed", "fixed", "removed"].map((section) =>
                  entry[section].length > 0 ? (
                    <div key={section} className="mb-2">
                      <div className="font-bold mb-1">{sectionLabels[section]}</div>
                      <ul className="list-disc pl-6 space-y-1">
                        {entry[section].map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 