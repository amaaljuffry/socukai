import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

export default function ChangelogPage() {
  const changes = [
    {
      version: "1.1.0",
      date: "October 2024",
      items: [
        { type: "New", text: "Added top-right dropdown menu for About, Help, and Changelog." },
        { type: "New", text: "Added E-Invoicing information pages for all entity types." },
        { type: "Fix", text: "Resolved duplicate component build error." },
        { type: "Update", text: "Added logos to header and sidebar." }
      ],
    },
    {
      version: "1.0.0",
      date: "September 2024",
      items: [
        { type: "New", text: "Initial release of the Tax Compliance App." },
        { type: "New", text: "Features include Tax Estimator, Checklists, and FAQs for Individual, Sole Proprietor, and Company." },
      ],
    },
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'New': return 'default';
      case 'Fix': return 'destructive';
      case 'Update': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Changelog</h1>
      <div className="w-full md:w-2/3">
        <div className="space-y-8">
          {changes.map((change) => (
            <div key={change.version}>
              <h2 className="text-2xl font-semibold mb-2">{change.version}</h2>
              <p className="text-sm text-muted-foreground mb-4">{change.date}</p>
              <ul className="space-y-2">
                {change.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(item.type) as BadgeProps["variant"]}>{item.type}</Badge>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 