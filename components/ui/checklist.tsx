"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, FileText, User, Briefcase, Receipt, Send } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  required: boolean;
  category: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const checklistData: ChecklistSection[] = [
  {
    id: "personal-registration",
    title: "Personal & Registration",
    icon: <User className="h-5 w-5" />,
    items: [
      {
        id: "ssm-registration",
        text: "Have SSM registration (if applicable)",
        description: "Required for business owners, freelancers with business names, or those with employees",
        required: false,
        category: "personal-registration"
      },
      {
        id: "tax-file-number",
        text: "Have Tax File Number (TIN)",
        description: "Unique identifier from LHDNM for tax purposes",
        required: true,
        category: "personal-registration"
      },
      {
        id: "my-tax-access",
        text: "Have access to MyTax portal",
        description: "Online access to LHDNM's tax filing system",
        required: true,
        category: "personal-registration"
      },
      {
        id: "personal-details",
        text: "Updated personal details",
        description: "Current address, contact information, and banking details",
        required: true,
        category: "personal-registration"
      }
    ]
  },
  {
    id: "income-expenses",
    title: "Income & Expenses",
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      {
        id: "all-income-recorded",
        text: "Recorded all income sources",
        description: "Employment salary, freelance income, rental income, investments, etc.",
        required: true,
        category: "income-expenses"
      },
      {
        id: "expenses-categorized",
        text: "Categorized all expenses",
        description: "Business expenses, personal deductions, and allowable expenses",
        required: true,
        category: "income-expenses"
      },
      {
        id: "income-expenses-calculated",
        text: "Calculated net profit/loss",
        description: "Total income minus total expenses",
        required: true,
        category: "income-expenses"
      },
      {
        id: "deductions-identified",
        text: "Identified applicable deductions",
        description: "EPF, insurance, medical, education, charitable donations",
        required: false,
        category: "income-expenses"
      },
      {
        id: "side-income-declared",
        text: "Declared all side income",
        description: "Part-time work, freelance projects, online sales, etc.",
        required: true,
        category: "income-expenses"
      }
    ]
  },
  {
    id: "documents",
    title: "Documents",
    icon: <FileText className="h-5 w-5" />,
    items: [
      {
        id: "ea-form",
        text: "EA Form from employer",
        description: "Employment income statement from your employer",
        required: true,
        category: "documents"
      },
      {
        id: "invoices",
        text: "All invoices and receipts",
        description: "Business income invoices and expense receipts",
        required: true,
        category: "documents"
      },
      {
        id: "payment-slips",
        text: "Payment slips and bank statements",
        description: "Proof of income and expense payments",
        required: true,
        category: "documents"
      },
      {
        id: "ssm-documents",
        text: "SSM registration documents (if applicable)",
        description: "Business registration certificate and related documents",
        required: false,
        category: "documents"
      },
      {
        id: "insurance-documents",
        text: "Insurance policy documents",
        description: "Life insurance, medical insurance, and other policies",
        required: false,
        category: "documents"
      },
      {
        id: "investment-documents",
        text: "Investment income documents",
        description: "Dividend statements, interest certificates, etc.",
        required: false,
        category: "documents"
      }
    ]
  },
  {
    id: "tax-submission",
    title: "Tax Submission",
    icon: <Send className="h-5 w-5" />,
    items: [
      {
        id: "form-selected",
        text: "Selected correct tax form",
        description: "Form BE (Employment) or Form B (Business) based on income type",
        required: true,
        category: "tax-submission"
      },
      {
        id: "income-declared",
        text: "Declared all income in form",
        description: "All income sources properly entered in the tax form",
        required: true,
        category: "tax-submission"
      },
      {
        id: "expenses-declared",
        text: "Declared all expenses and deductions",
        description: "All allowable expenses and deductions entered",
        required: true,
        category: "tax-submission"
      },
      {
        id: "form-reviewed",
        text: "Reviewed form for accuracy",
        description: "Double-checked all entries and calculations",
        required: true,
        category: "tax-submission"
      },
      {
        id: "form-submitted",
        text: "Submitted tax form",
        description: "Successfully submitted through MyTax portal",
        required: true,
        category: "tax-submission"
      },
      {
        id: "payment-arranged",
        text: "Arranged tax payment (if applicable)",
        description: "Set up payment for any tax due",
        required: false,
        category: "tax-submission"
      }
    ]
  }
];

const STORAGE_KEY_INDIVIDUAL = 'tax-checklist-progress-individual';

export function TaxPreparationChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved progress from localStorage on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_INDIVIDUAL);
      if (savedProgress) {
        const savedItems = JSON.parse(savedProgress);
        if (Array.isArray(savedItems)) {
          setCheckedItems(new Set(savedItems));
        }
      }
    } catch (error) {
      console.error('Error loading checklist progress:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage whenever checkedItems changes
  useEffect(() => {
    if (isLoaded) {
      try {
        const itemsArray = Array.from(checkedItems);
        localStorage.setItem(STORAGE_KEY_INDIVIDUAL, JSON.stringify(itemsArray));
      } catch (error) {
        console.error('Error saving checklist progress:', error);
      }
    }
  }, [checkedItems, isLoaded]);

  // Calculate progress
  const progress = useMemo(() => {
    const totalItems = checklistData.reduce((sum, section) => sum + section.items.length, 0);
    const checkedCount = checkedItems.size;
    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
  }, [checkedItems]);

  // Calculate section progress
  const sectionProgress = useMemo(() => {
    return checklistData.map(section => {
      const totalItems = section.items.length;
      const checkedCount = section.items.filter(item => checkedItems.has(item.id)).length;
      return {
        ...section,
        progress: totalItems > 0 ? (checkedCount / totalItems) * 100 : 0,
        checkedCount,
        totalItems
      };
    });
  }, [checkedItems]);

  // Handle checkbox changes
  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  // Clear all progress
  const clearProgress = () => {
    setCheckedItems(new Set());
    localStorage.removeItem(STORAGE_KEY_INDIVIDUAL);
  };

  // Get motivational message based on progress
  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) {
      return "🚀 Ready to start your tax preparation journey! Let's get organized.";
    } else if (progress < 25) {
      return "💪 Great start! Every step counts towards a stress-free tax filing.";
    } else if (progress < 50) {
      return "📈 You're making excellent progress! Keep up the momentum.";
    } else if (progress < 75) {
      return "🎯 You're more than halfway there! The finish line is in sight.";
    } else if (progress < 100) {
      return "🌟 Almost there! Just a few more items to complete your preparation.";
    } else {
      return "🎉 Congratulations! You're fully prepared for tax filing. Well done!";
    }
  };

  // Get item status
  const getItemStatus = (item: ChecklistItem) => {
    const isChecked = checkedItems.has(item.id);
    return {
      isChecked,
      isRequired: item.required,
      icon: isChecked ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />
    };
  };

  // Don't render until data is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading checklist...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Motivational Summary Widget */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="text-xl font-bold text-gray-800">
                    {progress.toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {checkedItems.size} of {checklistData.reduce((sum, section) => sum + section.items.length, 0)} items completed
                </h3>
                <p className="text-sm text-gray-600">
                  {getMotivationalMessage(progress)}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-right">
                <div className="text-sm text-gray-500">Required items</div>
                <div className="text-lg font-semibold text-gray-900">
                  {checklistData.flatMap(s => s.items).filter(item => item.required && checkedItems.has(item.id)).length}/
                  {checklistData.flatMap(s => s.items).filter(item => item.required).length}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Tax Preparation Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {checkedItems.size} of {checklistData.reduce((sum, section) => sum + section.items.length, 0)} completed
              </span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="text-xs text-muted-foreground">
              {progress.toFixed(0)}% complete
            </div>
          </div>

          {/* Section Progress */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {sectionProgress.map((section) => (
              <div key={section.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {section.icon}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {section.checkedCount}/{section.totalItems}
                  </span>
                  <Badge variant={section.progress === 100 ? "default" : "secondary"}>
                    {section.progress.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Progress Button */}
          {checkedItems.size > 0 && (
            <div className="pt-2 border-t">
              <button
                onClick={clearProgress}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all progress
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Checklist Sections */}
      <Accordion type="multiple" className="space-y-4">
        {checklistData.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="font-semibold">{section.title}</span>
                <Badge variant="outline" className="ml-auto">
                  {section.items.filter(item => checkedItems.has(item.id)).length}/{section.items.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {section.items.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={status.isChecked}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <label
                          htmlFor={item.id}
                          className={`text-sm font-medium cursor-pointer ${
                            status.isChecked ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {item.text}
                          {status.isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {status.icon}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Summary</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Required items completed:</span>
                  <span className="text-sm font-medium">
                    {checklistData.flatMap(s => s.items).filter(item => item.required && checkedItems.has(item.id)).length}/
                    {checklistData.flatMap(s => s.items).filter(item => item.required).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Optional items completed:</span>
                  <span className="text-sm font-medium">
                    {checklistData.flatMap(s => s.items).filter(item => !item.required && checkedItems.has(item.id)).length}/
                    {checklistData.flatMap(s => s.items).filter(item => !item.required).length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Overall completion:</span>
                  <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant={progress === 100 ? "default" : progress >= 80 ? "secondary" : "outline"}>
                    {progress === 100 ? "Complete" : progress >= 80 ? "Almost Ready" : "In Progress"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const solePropChecklistData: ChecklistSection[] = [
  {
    id: "registration-compliance",
    title: "Registration & Compliance",
    icon: <FileText className="h-5 w-5" />,
    items: [
      { id: "sp-ssm-registration", text: "Register business with SSM (Enterprise/Sole Prop)", required: true, category: "registration-compliance", description: "Mandatory for all businesses in Malaysia." },
      { id: "sp-ssm-renewal", text: "Renew SSM certificate annually", required: true, category: "registration-compliance", description: "Renewal must be done before the expiry date." },
    ]
  },
  {
    id: "financial-management",
    title: "Financial Management",
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      { id: "sp-track-income-expenses", text: "Track monthly income and expenses", required: true, category: "financial-management", description: "Use a spreadsheet or accounting software." },
      { id: "sp-keep-receipts", text: "Keep receipts for all business expenses", description: "Keep for at least 7 years for audit purposes.", required: true, category: "financial-management" },
    ]
  },
  {
    id: "tax-filing",
    title: "Tax Filing",
    icon: <Send className="h-5 w-5" />,
    items: [
      { id: "sp-borang-b", text: "File taxes using Borang B", description: "Deadline is June 30th for manual filing, July 15th for e-Filing.", required: true, category: "tax-filing" },
      { id: "sp-file-eb", text: "Consider filing e-B via LHDN portal", required: false, category: "tax-filing", description: "e-Filing is faster and more convenient." },
    ]
  },
  {
    id: "contributions",
    title: "Voluntary Contributions",
    icon: <User className="h-5 w-5" />,
    items: [
      { id: "sp-epf-socso", text: "Contribute to EPF/PRS/SOCSO voluntarily", required: false, category: "contributions", description: "Optional but recommended for retirement and social security." },
    ]
  }
];

const STORAGE_KEY_SOLE_PROP = 'tax-checklist-progress-sole-prop';

export function SolePropChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_SOLE_PROP);
      if (savedProgress) {
        const savedItems = JSON.parse(savedProgress);
        if (Array.isArray(savedItems)) {
          setCheckedItems(new Set(savedItems));
        }
      }
    } catch (error) {
      console.error('Error loading checklist progress:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const itemsArray = Array.from(checkedItems);
        localStorage.setItem(STORAGE_KEY_SOLE_PROP, JSON.stringify(itemsArray));
      } catch (error) {
        console.error('Error saving checklist progress:', error);
      }
    }
  }, [checkedItems, isLoaded]);

  const progress = useMemo(() => {
    const totalItems = solePropChecklistData.reduce((sum, section) => sum + section.items.length, 0);
    const checkedCount = checkedItems.size;
    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
  }, [checkedItems]);

  const sectionProgress = useMemo(() => {
    return solePropChecklistData.map(section => {
      const totalItems = section.items.length;
      const checkedCount = section.items.filter(item => checkedItems.has(item.id)).length;
      return {
        ...section,
        progress: totalItems > 0 ? (checkedCount / totalItems) * 100 : 0,
        checkedCount,
        totalItems
      };
    });
  }, [checkedItems]);

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const clearProgress = () => {
    setCheckedItems(new Set());
    localStorage.removeItem(STORAGE_KEY_SOLE_PROP);
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "🚀 Ready to tackle your business compliance! Let's get started.";
    if (progress < 50) return "💪 Good progress! Staying organized is key to a smooth year.";
    if (progress < 100) return "🌟 Almost there! Just a few more steps to full compliance.";
    return "🎉 Congratulations! You are on top of your compliance checklist.";
  };

  const getItemStatus = (item: ChecklistItem) => {
    const isChecked = checkedItems.has(item.id);
    return {
      isChecked,
      isRequired: item.required,
      icon: isChecked ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />
    };
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <Card><CardContent className="pt-6"><div className="flex items-center justify-center py-8"><div className="text-muted-foreground">Loading checklist...</div></div></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="text-xl font-bold text-gray-800">{progress.toFixed(0)}%</div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{checkedItems.size} of {solePropChecklistData.reduce((sum, section) => sum + section.items.length, 0)} items completed</h3>
                <p className="text-sm text-gray-600">{getMotivationalMessage(progress)}</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-right">
                <div className="text-sm text-gray-500">Required items</div>
                <div className="text-lg font-semibold text-gray-900">
                  {solePropChecklistData.flatMap(s => s.items).filter(item => item.required && checkedItems.has(item.id)).length}/{solePropChecklistData.flatMap(s => s.items).filter(item => item.required).length}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5" />Compliance Progress</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-sm font-medium">Overall Progress</span><span className="text-sm text-muted-foreground">{checkedItems.size} of {solePropChecklistData.reduce((sum, section) => sum + section.items.length, 0)} completed</span></div>
            <Progress value={progress} className="h-3" />
            <div className="text-xs text-muted-foreground">{progress.toFixed(0)}% complete</div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {sectionProgress.map((section) => (
              <div key={section.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">{section.icon}<span className="text-sm font-medium">{section.title}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">{section.checkedCount}/{section.totalItems}</span><Badge variant={section.progress === 100 ? "default" : "secondary"}>{section.progress.toFixed(0)}%</Badge></div>
              </div>
            ))}
          </div>
          {checkedItems.size > 0 && (<div className="pt-2 border-t"><button onClick={clearProgress} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Clear all progress</button></div>)}
        </CardContent>
      </Card>

      <Accordion type="multiple" className="space-y-4">
        {solePropChecklistData.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline"><div className="flex items-center gap-3">{section.icon}<span className="font-semibold">{section.title}</span><Badge variant="outline" className="ml-auto">{section.items.filter(item => checkedItems.has(item.id)).length}/{section.items.length}</Badge></div></AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {section.items.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox id={item.id} checked={status.isChecked} onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)} className="mt-1" />
                      <div className="flex-1 space-y-1">
                        <label htmlFor={item.id} className={`text-sm font-medium cursor-pointer ${status.isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>{item.text}{status.isRequired && (<span className="text-red-500 ml-1">*</span>)}</label>
                        {item.description && (<p className="text-xs text-muted-foreground">{item.description}</p>)}
                      </div>
                      {status.icon}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

const companyChecklistData: ChecklistSection[] = [
  {
    id: "setup-registration",
    title: "Company Setup & Registration",
    icon: <FileText className="h-5 w-5" />,
    items: [
      { id: "c-ssm-registration", text: "Register company with SSM (Sdn Bhd)", required: true, category: "setup-registration", description: "A private limited company is a separate legal entity." },
      { id: "c-appoint-secretary", text: "Appoint at least one Company Secretary", required: true, category: "setup-registration", description: "Must be a licensed secretary from a prescribed body." },
      { id: "c-open-bank-account", text: "Open a corporate bank account", required: true, category: "setup-registration", description: "Keep company and personal finances separate." },
    ]
  },
  {
    id: "operations-finance",
    title: "Operations & Finance",
    icon: <Briefcase className="h-5 w-5" />,
    items: [
      { id: "c-issue-invoices", text: "Issue proper invoices with company details", required: true, category: "operations-finance", description: "Include company name, registration number, address, and SST number if applicable." },
      { id: "c-monthly-accounting", text: "Maintain proper accounting records", required: true, category: "operations-finance", description: "Required by the Companies Act 2016." },
      { id: "c-pay-sst", text: "Register for SST if annual turnover exceeds RM500,000", required: false, category: "operations-finance", description: "Sales and Service Tax may apply to your business." },
    ]
  },
  {
    id: "annual-compliance",
    title: "Annual Compliance & Filing",
    icon: <Send className="h-5 w-5" />,
    items: [
      { id: "c-form-c", text: "Submit Form C (company tax return)", description: "Due 7 months after the financial year end.", required: true, category: "annual-compliance" },
      { id: "c-audit-accounts", text: "Have accounts audited by a licensed auditor", required: true, category: "annual-compliance", description: "Mandatory for all Sdn Bhd companies." },
      { id: "c-hold-agm", text: "Lodge Annual Return and Financial Statements with SSM", required: true, category: "annual-compliance", description: "Must be done within 30 days of the anniversary of incorporation." },
    ]
  }
];

const STORAGE_KEY_COMPANY = 'tax-checklist-progress-company';

export function CompanyChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_COMPANY);
      if (savedProgress) {
        const savedItems = JSON.parse(savedProgress);
        if (Array.isArray(savedItems)) {
          setCheckedItems(new Set(savedItems));
        }
      }
    } catch (error) {
      console.error('Error loading checklist progress:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        const itemsArray = Array.from(checkedItems);
        localStorage.setItem(STORAGE_KEY_COMPANY, JSON.stringify(itemsArray));
      } catch (error) {
        console.error('Error saving checklist progress:', error);
      }
    }
  }, [checkedItems, isLoaded]);

  const progress = useMemo(() => {
    const totalItems = companyChecklistData.reduce((sum, section) => sum + section.items.length, 0);
    const checkedCount = checkedItems.size;
    return totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
  }, [checkedItems]);

  const sectionProgress = useMemo(() => {
    return companyChecklistData.map(section => {
      const totalItems = section.items.length;
      const checkedCount = section.items.filter(item => checkedItems.has(item.id)).length;
      return {
        ...section,
        progress: totalItems > 0 ? (checkedCount / totalItems) * 100 : 0,
        checkedCount,
        totalItems
      };
    });
  }, [checkedItems]);

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const clearProgress = () => {
    setCheckedItems(new Set());
    localStorage.removeItem(STORAGE_KEY_COMPANY);
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "🚀 Ready to manage your company's compliance! Let's begin.";
    if (progress < 50) return "💪 Making steady progress. Attention to detail is crucial.";
    if (progress < 100) return "🌟 Excellent work! Your company is close to being fully compliant.";
    return "🎉 Congratulations! All compliance tasks are completed.";
  };

  const getItemStatus = (item: ChecklistItem) => {
    const isChecked = checkedItems.has(item.id);
    return {
      isChecked,
      isRequired: item.required,
      icon: isChecked ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4 text-gray-400" />
    };
  };

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <Card><CardContent className="pt-6"><div className="flex items-center justify-center py-8"><div className="text-muted-foreground">Loading checklist...</div></div></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="text-xl font-bold text-gray-800">{progress.toFixed(0)}%</div>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-900">{checkedItems.size} of {companyChecklistData.reduce((sum, section) => sum + section.items.length, 0)} items completed</h3>
                <p className="text-sm text-gray-600">{getMotivationalMessage(progress)}</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-right">
                <div className="text-sm text-gray-500">Required items</div>
                <div className="text-lg font-semibold text-gray-900">
                  {companyChecklistData.flatMap(s => s.items).filter(item => item.required && checkedItems.has(item.id)).length}/{companyChecklistData.flatMap(s => s.items).filter(item => item.required).length}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5" />Compliance Progress</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-sm font-medium">Overall Progress</span><span className="text-sm text-muted-foreground">{checkedItems.size} of {companyChecklistData.reduce((sum, section) => sum + section.items.length, 0)} completed</span></div>
            <Progress value={progress} className="h-3" />
            <div className="text-xs text-muted-foreground">{progress.toFixed(0)}% complete</div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {sectionProgress.map((section) => (
              <div key={section.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">{section.icon}<span className="text-sm font-medium">{section.title}</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">{section.checkedCount}/{section.totalItems}</span><Badge variant={section.progress === 100 ? "default" : "secondary"}>{section.progress.toFixed(0)}%</Badge></div>
              </div>
            ))}
          </div>
          {checkedItems.size > 0 && (<div className="pt-2 border-t"><button onClick={clearProgress} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Clear all progress</button></div>)}
        </CardContent>
      </Card>

      <Accordion type="multiple" className="space-y-4">
        {companyChecklistData.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline"><div className="flex items-center gap-3">{section.icon}<span className="font-semibold">{section.title}</span><Badge variant="outline" className="ml-auto">{section.items.filter(item => checkedItems.has(item.id)).length}/{section.items.length}</Badge></div></AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {section.items.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox id={item.id} checked={status.isChecked} onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)} className="mt-1" />
                      <div className="flex-1 space-y-1">
                        <label htmlFor={item.id} className={`text-sm font-medium cursor-pointer ${status.isChecked ? 'line-through text-gray-500' : 'text-gray-900'}`}>{item.text}{status.isRequired && (<span className="text-red-500 ml-1">*</span>)}</label>
                        {item.description && (<p className="text-xs text-muted-foreground">{item.description}</p>)}
                      </div>
                      {status.icon}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 