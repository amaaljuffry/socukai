import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

const changelog = [
  {
    version: "2.1.0",
    date: "2025-01",
    added: [],
    changed: [
      "Build process for Vercel compatibility",
      "Mobile responsiveness and navigation"
    ],
    fixed: [
      "useSearchParams Suspense boundary in static generation",
      "Duplicate exit icons in mobile sidebar",
      "TypeScript errors in tax estimator components"
    ],
    removed: []
  },
  {
    version: "2.0.0",
    date: "2024-12",
    added: [
      "Complete UI/UX redesign (shadcn/ui)",
      "Responsive layout with mobile sidebar",
      "Form validation with Zod",
      "SME tax calculations",
      "Progress tracking"
    ],
    changed: [
      "Migrated to Next.js 15 (App Router)",
      "Full TypeScript implementation"
    ],
    fixed: [],
    removed: []
  },
  {
    version: "1.5.0",
    date: "2024-11",
    added: [
      "Data privacy pages",
      "Contact form with API",
      "Legal compliance pages"
    ],
    changed: [
      "Improved sidebar navigation"
    ],
    fixed: [],
    removed: []
  },
  {
    version: "1.3.0",
    date: "2024-10",
    added: [
      "E-Invoicing info pages",
      "Top-right dropdown menu",
      "Logo in header and sidebar",
      "Help documentation"
    ],
    changed: [],
    fixed: [
      "Duplicate component build errors"
    ],
    removed: []
  },
  {
    version: "1.2.0",
    date: "2024-09",
    added: [
      "Income and expenses forms",
      "SSM and tax status verification",
      "Tax calculation engine",
      "Document upload"
    ],
    changed: [
      "Improved form layouts"
    ],
    fixed: [],
    removed: []
  },
  {
    version: "1.1.0",
    date: "2024-08",
    added: [
      "FAQ system",
      "Checklist for tax compliance",
      "Download center for tax forms",
      "Progress tracking"
    ],
    changed: [
      "Navigation between sections"
    ],
    fixed: [],
    removed: []
  },
  {
    version: "1.0.0",
    date: "2024-07",
    added: [
      "Initial release (SOCUKAI.MY)",
      "Tax estimator for Individual, Sole Prop, Company",
      "Entity type navigation",
      "Responsive design"
    ],
    changed: [],
    fixed: [],
    removed: []
  },
  {
    version: "0.5.0",
    date: "2024-06",
    added: [
      "Project initialization (Next.js)",
      "Core architecture and routing",
      "Basic UI components",
      "Tax calculation logic",
      "Database schema"
    ],
    changed: [
      "Initial design mockups and UX planning"
    ],
    fixed: [],
    removed: []
  },
  {
    version: "2.2.0",
    date: "2025-06",
    added: [],
    changed: [
      "Replaced all references to legal@socukai.my with a Contact Us page link for reporting unauthorized account use and policy breaches."
    ],
    fixed: [],
    removed: [
      "Direct email reporting to legal@socukai.my from Terms of Service and Acceptable Use Policy."
    ]
  }
];

const sectionMeta = {
  added: { label: "Added", color: "success" as BadgeProps["variant"] },
  changed: { label: "Changed", color: "secondary" as BadgeProps["variant"] },
  fixed: { label: "Fixed", color: "destructive" as BadgeProps["variant"] },
  removed: { label: "Removed", color: "outline" as BadgeProps["variant"] },
};

export default function ChangelogPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Changelog</h1>
      <div className="w-full md:w-2/3 space-y-10">
        {changelog.map((entry) => (
          <div key={entry.version}>
            <h2 className="text-2xl font-semibold mb-1">{entry.version} <span className="text-base text-muted-foreground">- {entry.date}</span></h2>
            {(["added", "changed", "fixed", "removed"] as const).map((section) =>
              entry[section].length > 0 ? (
                <div key={section} className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={sectionMeta[section].color}>{sectionMeta[section].label}</Badge>
                  </div>
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
      </div>
    </div>
  );
} 