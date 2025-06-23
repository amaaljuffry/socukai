"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Link as LinkIcon } from "lucide-react";

const downloadItems = [
  {
    title: "Sample Invoice Template (Freelancer)",
    description: "A professional and easy-to-use invoice template for your freelance projects. Helps ensure you include all necessary details for prompt payment.",
    format: "DOCX",
    link: "/downloads/sample-invoice-template.docx",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Income & Expense Spreadsheet",
    description: "A simple spreadsheet to track your monthly and annual income and expenses. Essential for accurate tax filing and financial planning.",
    format: "CSV / Excel",
    link: "/downloads/income-expense-tracker.xlsx",
    icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Deductible Expense Categories Guide",
    description: "A comprehensive PDF guide listing common deductible expenses for Malaysian freelancers and self-employed individuals.",
    format: "PDF",
    link: "/downloads/deductible-expenses-guide.pdf",
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
  {
    title: "LHDN e-BE Walkthrough",
    description: "A step-by-step visual guide on how to fill and submit your e-BE form on the LHDN MyTax portal.",
    format: "PDF",
    link: "/downloads/e-be-walkthrough.pdf",
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Yearly Budget Tracker (Google Sheets)",
    description: "A link to a powerful Google Sheets template for planning your yearly budget, setting financial goals, and tracking your progress.",
    format: "External Link",
    link: "https://docs.google.com/spreadsheets/d/1-example-link-for-template/copy",
    icon: <LinkIcon className="h-6 w-6 text-yellow-500" />,
    isExternal: true,
  },
];

export function IndividualDownloads() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {downloadItems.map((item) => (
        <Card key={item.title} className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            {item.icon}
            <div className="flex-1">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="mt-1">{item.format}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href={item.link} target={item.isExternal ? "_blank" : "_self"} rel={item.isExternal ? "noopener noreferrer" : ""} download={!item.isExternal}>
                <Download className="mr-2 h-4 w-4" />
                {item.isExternal ? 'Open Link' : 'Download'}
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

const solePropDownloads = [
  {
    title: "Borang B - Individual Business Tax Form (PDF)",
    description: "Required for annual tax filing by sole proprietors.",
    format: "PDF",
    link: "/downloads/borang-b.pdf",
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
  {
    title: "SSM Business Info Template (Excel)",
    description: "Template to keep business registration and renewal records.",
    format: "Excel",
    link: "/downloads/ssm-business-info.xlsx",
    icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Business Expense Tracker (Google Sheets)",
    description: "Simple monthly tracker for income, expenses, and net profit.",
    format: "Google Sheets",
    link: "https://docs.google.com/spreadsheets/d/1-example-business-tracker/copy",
    icon: <LinkIcon className="h-6 w-6 text-yellow-500" />,
    isExternal: true,
  },
];

export function SolePropDownloads() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {solePropDownloads.map((item) => (
        <Card key={item.title} className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            {item.icon}
            <div className="flex-1">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="mt-1">{item.format}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href={item.link} target={item.isExternal ? "_blank" : "_self"} rel={item.isExternal ? "noopener noreferrer" : ""} download={!item.isExternal}>
                <Download className="mr-2 h-4 w-4" />
                {item.isExternal ? 'Open Link' : 'Download'}
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

const companyDownloads = [
  {
    title: "Form C - Company Tax Return (PDF)",
    description: "Mandatory tax submission for Sdn Bhd companies.",
    format: "PDF",
    link: "/downloads/form-c.pdf",
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
  {
    title: "Company Profile Template (Word)",
    description: "Editable document to prepare a basic company profile for clients or banks.",
    format: "Word",
    link: "/downloads/company-profile.docx",
    icon: <FileText className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Annual Accounting Checklist (Excel)",
    description: "End-of-year checklist for book-keeping, receipts, and audit prep.",
    format: "Excel",
    link: "/downloads/annual-accounting-checklist.xlsx",
    icon: <FileSpreadsheet className="h-6 w-6 text-green-500" />,
  },
];

export function CompanyDownloads() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companyDownloads.map((item) => (
        <Card key={item.title} className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            {item.icon}
            <div className="flex-1">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="mt-1">{item.format}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href={item.link} target={item.isExternal ? "_blank" : "_self"} rel={item.isExternal ? "noopener noreferrer" : ""} download={!item.isExternal}>
                <Download className="mr-2 h-4 w-4" />
                {item.isExternal ? 'Open Link' : 'Download'}
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 