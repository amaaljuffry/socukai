"use client";

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, HelpCircle } from "lucide-react";

const faqSections = [
  {
    title: "General Tax Questions",
    questions: [
      {
        question: `Do I need to pay tax if I'm a freelancer without SSM registration?`,
        answer: `Yes. Even if you're not registered with SSM, income from freelancing is still taxable under "Other Income". It's your responsibility to declare it honestly to LHDN.`,
      },
      {
        question: `When do I need to start paying income tax?`,
        answer: `You are required to file taxes when your annual income exceeds RM34,000 after EPF deduction (equivalent to ~RM2,833/month).`,
      },
      {
        question: `How do I know if I already have a tax file with LHDN?`,
        answer: `You can call LHDN or check via MyTax. If you're employed, your employer might have registered you automatically.`,
      },
      {
        question: `What's the difference between e-BE and e-B form?`,
        answer: `e-BE: For individuals with employment income (no business income). e-B: For those with business income, such as freelancers or registered sole proprietors.`,
      },
      {
        question: `Can I file taxes even if I earned below the threshold?`,
        answer: `Yes — and it's encouraged! Filing (even if you don't owe tax) helps build your financial credibility for things like loan applications.`,
      },
      {
        question: `Does the new e-invoicing mandate apply to individuals, sole proprietors, and companies?`,
        answer: `Yes. The Malaysian e-invoicing mandate applies to all taxpayers undertaking commercial activities, including individuals (with business income), sole proprietors, and companies. The rollout is phased based on annual turnover, not business structure.`,
      },
      {
        question: `What should I do if I am required to issue e-invoices?`,
        answer: `You must issue e-invoices for all business transactions and submit them to the MyInvois Portal for validation. For API integration, most businesses will need to hire a developer or IT professional.`,
      },
    ],
  },
  {
    title: "Income & Deductions",
    questions: [
      {
        question: `What counts as taxable income for freelancers?`,
        answer: `All payments received for services rendered — including full-time, part-time, commission, project-based, and passive income (like affiliate sales).`,
      },
      {
        question: `What counts as deductible expense?`,
        answer: `Any expense that is wholly and exclusively incurred for your work. Examples: Design software subscription (e.g. Adobe CC), Internet & phone bills (partial claim), Equipment (laptop, drawing tools), Travel for client meetings, Marketing costs.`,
      },
      {
        question: `Can I deduct my personal laptop or phone?`,
        answer: `Yes, but only a reasonable business-use portion. Example: if 50% of use is for work, then you claim 50% of the device cost.`,
      },
      {
        question: `What is lifestyle tax relief?`,
        answer: `This is for individuals (salaried or freelance) to claim purchases like books, gym memberships, smartphones, and internet bills — up to RM2,500/year.`,
      },
      {
        question: `Can I deduct meals or coffee during client meetings?`,
        answer: `Yes, if you're meeting for business purposes. Keep receipts and write a note on them (e.g. "meeting with Client A for Project X").`,
      },
    ],
  },
  {
    title: "LHDN Process",
    questions: [
      {
        question: `How do I register a tax file for the first time?`,
        answer: `Go to MyTax > Register as a taxpayer. You'll need: IC/passport, Proof of income (e.g. invoice or payslip), Valid email and phone number.`,
      },
      {
        question: `When is the deadline to submit taxes?`,
        answer: `e-BE (salaried): ~April 30 each year. e-B (freelancers/business): ~June 30. Check LHDN's official site for yearly updates.`,
      },
      {
        question: `Can I file e-BE or e-B without going to LHDN office?`,
        answer: `Yes, completely online through e-Filing via MyTax. You'll need to register for a digital certificate (PIN) if it's your first time.`,
      },
      {
        question: `What if I made a mistake in filing?`,
        answer: `You can amend your tax form once within a certain period (usually 6 months). Go to the "Amendment" section in e-Filing.`,
      },
      {
        question: `What happens if I don't file taxes at all?`,
        answer: `Failure to file can result in penalties, fines, and future difficulties in securing bank loans, house purchases, or government grants. Better to file even if you owe nothing.`,
      },
    ],
  },
  {
    title: "Content Creators & Online Income",
    questions: [
      {
        question: `I'm a content creator. Do I need to pay tax in Malaysia?`,
        answer: `Yes, if you're earning income (even part-time), you’re considered self-employed and must file tax with LHDN.`,
      },
      {
        question: `I’m a full-time content creator — do I have to pay more tax?`,
        answer: `You must report all your income just like any other business. Your tax amount depends on your total income minus expenses (net profit).`,
      },
      {
        question: `What kind of income should I declare?`,
        answer: (
          <>
            <div>Declare all income sources, including:</div>
            <ul className="list-disc pl-5 mt-2">
              <li>Sponsorship or brand deals</li>
              <li>YouTube/Instagram/TikTok income</li>
              <li>Affiliate commissions</li>
              <li>Ad revenue (e.g. from Google/Meta)</li>
              <li>Sales of digital products or services</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

export function IndividualFAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqSections = faqSections.map(section => ({
    ...section,
    questions: section.questions.filter(
      q =>
        typeof q.question === 'string' && q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof q.answer === 'string' && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  })).filter(section => section.questions.length > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">FAQ: Individual</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search FAQs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type a keyword to search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {filteredFaqSections.length > 0 ? (
        filteredFaqSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              {section.title}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No FAQs found matching your search term.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const solePropFaq = [
  {
    question: `Do I need to register my business with SSM?`,
    answer: `Yes. If you're operating a business under your own name or a trade name, you must register with the Companies Commission of Malaysia (SSM) as a Sole Proprietor under the Registration of Business Act 1956.`,
  },
  {
    question: `When should I start declaring tax as a sole proprietor?`,
    answer: `You must declare your income if your net profit (after expenses) exceeds RM34,000 per year, or RM2,833 per month. Even if it's less, voluntary declaration is encouraged.`,
  },
  {
    question: `What form do I use for tax declaration?`,
    answer: `Use Form B (Borang B) in your LHDN e-Filing account.`,
  },
  {
    question: `Can I deduct business expenses?`,
    answer: `Yes. You can deduct allowable business expenses like: Rental, Utilities, Internet and phone, Advertising and marketing, Travel and petrol, Software subscriptions, Salaries and EPF for staff.`,
  },
  {
    question: `What if I mix personal and business expenses?`,
    answer: `You should separate them. It's highly recommended to open a separate bank account for your business income and expenses.`,
  },
  {
    question: `Do I need to register for SST or GST?`,
    answer: `Currently, GST is not active in Malaysia. You only need to register for SST if your taxable turnover exceeds RM500,000 per year, but most small businesses are exempt.`,
  },
  {
    question: `Can I file the tax myself, or should I hire an agent?`,
    answer: `You can do it yourself using e-Filing. But if you're unsure, hiring a licensed tax agent can save time and reduce costly mistakes.`,
  },
  {
    question: `Does the e-invoicing mandate apply to sole proprietors?`,
    answer: `Yes. All sole proprietors must comply with the e-invoicing mandate according to their business turnover. E-invoices must be issued for all business transactions.`,
  },
  {
    question: `How do I implement e-invoicing as a sole proprietor?`,
    answer: `You can use the free MyInvois Portal for manual e-invoice creation, or integrate your accounting software via API (which usually requires hiring a developer).`
  },
];

export function SolePropFAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = solePropFaq.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">FAQ: Sole Proprietor</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search FAQs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type a keyword to search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>
      <Accordion type="single" collapsible className="w-full">
        {filtered.length > 0 ? filtered.map((faq, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        )) : (
          <Card><CardContent className="pt-6"><p className="text-center text-muted-foreground">No FAQs found matching your search term.</p></CardContent></Card>
        )}
      </Accordion>
    </div>
  );
}

const companyFaq = [
  {
    question: `When should I register a company instead of sole prop?`,
    answer: `If you plan to scale, have partners, or want limited liability, a Sdn Bhd structure is more suitable. You'll need at least one director and a company secretary.`,
  },
  {
    question: `What are my tax obligations as a company?`,
    answer: `Sdn Bhd companies must: Submit CP204 (estimate of tax payable) within 3 months of incorporation; Pay tax installments (if applicable); Submit Form C annually via e-Filing; Maintain proper accounts and audited financial statements.`,
  },
  {
    question: `How is company tax calculated?`,
    answer: `As of now: First RM150,000: 15% tax rate (for SMEs); Remaining amount: 24%. This applies only if your company is resident in Malaysia, and has paid-up capital ≤ RM2.5 million.`,
  },
  {
    question: `Do I still need to file personal tax?`,
    answer: `Yes. If you draw a salary or director's fee, it's considered personal income. You must declare this under Form BE or B depending on whether you do other side gigs.`,
  },
  {
    question: `What if the company makes no profit?`,
    answer: `Even if the company makes no profit (zero or loss), you still need to file Form C. If you're dormant, you can apply for dormancy status.`,
  },
  {
    question: `Can I manage accounting and tax on my own?`,
    answer: `You're legally required to appoint a licensed company secretary and to submit audited accounts. Most businesses hire an accountant or outsource to a firm.`,
  },
  {
    question: `Do I need to register for SST or GST?`,
    answer: `You only need to register for SST if your taxable turnover exceeds RM500,000/year in taxable goods or services. GST is not currently active in Malaysia.`,
  },
  {
    question: `Is e-invoicing mandatory for all companies?`,
    answer: `Yes. All companies (Sdn Bhd) must comply with the e-invoicing mandate, with the implementation date based on annual turnover. E-invoices must be issued for all sales and services.`,
  },
  {
    question: `How can my company get started with e-invoicing?`,
    answer: `You can use the MyInvois Portal for manual e-invoice creation, but for automated integration with your ERP/accounting system, you will need to hire a developer or IT professional to set up API integration.`
  },
];

export function CompanyFAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = companyFaq.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">FAQ: Company (Sdn Bhd)</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search FAQs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type a keyword to search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>
      <Accordion type="single" collapsible className="w-full">
        {filtered.length > 0 ? filtered.map((faq, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        )) : (
          <Card><CardContent className="pt-6"><p className="text-center text-muted-foreground">No FAQs found matching your search term.</p></CardContent></Card>
        )}
      </Accordion>
    </div>
  );
} 