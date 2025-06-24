"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DollarSign, Building } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Malaysia 2024 Income Tax Brackets (RM)
const TAX_BRACKETS = [
  { min: 0, max: 5000, rate: 0.00, description: "0% on first RM5,000" },
  { min: 5000, max: 20000, rate: 0.01, description: "1% on next RM15,000" },
  { min: 20000, max: 35000, rate: 0.03, description: "3% on next RM15,000" },
  { min: 35000, max: 50000, rate: 0.06, description: "6% on next RM15,000" },
  { min: 50000, max: 70000, rate: 0.11, description: "11% on next RM20,000" },
  { min: 70000, max: 100000, rate: 0.19, description: "19% on next RM30,000" },
  { min: 100000, max: 400000, rate: 0.25, description: "25% on next RM300,000" },
  { min: 400000, max: 600000, rate: 0.26, description: "26% on next RM200,000" },
  { min: 600000, max: 2000000, rate: 0.28, description: "28% on next RM1,400,000" },
  { min: 2000000, max: Infinity, rate: 0.30, description: "30% on remaining amount" },
];

// Zod schema for company tax estimation
const companyTaxSchema = z.object({
  profitBeforeTax: z.string().min(1, "Profit Before Tax is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    "Profit must be a positive number"
  ),
  isSME: z.boolean(),
});

// Malaysia 2024 Corporate Tax Brackets
const COMPANY_TAX_RATES = {
  sme: [
    { threshold: 600000, rate: 0.17, description: "17% on first RM600,000" },
    { threshold: Infinity, rate: 0.24, description: "24% on the rest" },
  ],
  nonSme: [
    { threshold: Infinity, rate: 0.24, description: "24% flat rate" },
  ],
};

const individualTaxSchema = z.object({
  netProfit: z.string().min(1, "Net profit is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    "Net profit must be a positive number"
  ),
  epf: z.string().optional(),
  prs: z.string().optional(),
  otherDeductions: z.string().optional(),
});

type IndividualTaxData = z.infer<typeof individualTaxSchema>;

// Relief type for tax reliefs
export type Relief = {
  id: string;
  name: string;
  max: number;
  description: string;
  options?: { label: string; max: number }[];
};

// Relief breakdown item type
export type ReliefBreakdownItem = { name: string; amount: number };

// Helper: Tax savings table for a given relief amount
function TaxSavingsTable({ amount }: { amount: number }) {
  const rates = [0.03, 0.08, 0.11, 0.19, 0.25];
  return (
    <table className="text-xs mt-2 border rounded w-full">
      <thead>
        <tr className="bg-muted text-muted-foreground">
          <th className="p-1">Tax Rate</th>
          <th className="p-1">Tax Saved</th>
        </tr>
      </thead>
      <tbody>
        {rates.map(rate => (
          <tr key={rate}>
            <td className="p-1">{(rate * 100).toFixed(0)}%</td>
            <td className="p-1">RM{(amount * rate).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Helper: More Info section for each relief
function ReliefMoreInfo({ relief }: { relief: Relief }) {
  // Example details, you can expand per relief
  const details: Record<string, { eligibility?: string; covered?: string; proof?: string; note?: string }> = {
    parentMedical: {
      eligibility: "Medical, dental, special needs, carer expenses for parents (certified by doctor).",
      covered: "Yourself, spouse, children.",
      proof: "Official receipts from hospital/clinic. Treatment must be from a registered doctor/hospital.",
      note: "Serious diseases only. Normal check-ups or non-serious treatments have a smaller limit.",
    },
    // ...add more relief-specific details as needed
  };
  const info: Record<string, { eligibility?: string; covered?: string; proof?: string; note?: string }> = details;
  const reliefInfo = info[relief.id] || {};
  return (
    <div className="mt-2 p-2 bg-muted/50 rounded">
      <div><span className="font-semibold">Eligibility:</span> {reliefInfo.eligibility || "See LHDN guidelines."}</div>
      <div><span className="font-semibold">Who is covered:</span> {reliefInfo.covered || "See LHDN guidelines."}</div>
      <div><span className="font-semibold">Proof required:</span> {reliefInfo.proof || "Official receipts required."}</div>
      {reliefInfo.note && <div className="text-xs text-orange-600 mt-1">{reliefInfo.note}</div>}
      <TaxSavingsTable amount={relief.max ?? 0} />
    </div>
  );
}

function ReliefInput({ relief, value, setValue, error }: {
  relief: Relief;
  value: { option?: string; amount?: number | string };
  setValue: (val: { option?: string; amount?: number | string } | ((v: { option?: string; amount?: number | string }) => { option?: string; amount?: number | string })) => void;
  error: string | undefined;
}) {
  const [showMore, setShowMore] = useState(false);
  const max = relief.options && value?.option ? (relief.options.find((opt) => opt.label === value.option)?.max ?? 0) : (relief.max ?? 0);
  // Map relief.id to example/help text for More Info only
  const examples: Record<string, string> = {
    parentMedical: "Example: If your operation cost RM9,000, but only RM7,000 was for eligible treatment, claim only RM7,000.",
    medicalSelfFamily: "Example: If you spent RM2,000 on vaccination and RM8,000 on serious disease treatment, you can claim both, but vaccination is capped at RM1,000.",
    educationFees: "Example: If you paid RM6,000 for a master&apos;s degree, you can claim the full amount (up to RM7,000). For a short upskilling course, claim up to RM2,000.",
    lifestyle: "Example: If you bought a laptop for RM3,000, you can only claim up to RM2,500 for lifestyle relief.",
    childcareFees: "Example: If you paid RM4,000 to a registered kindergarten, you can only claim up to RM3,000.",
    sspDeposit: "Example: If you deposited RM10,000 and withdrew RM3,000 from SSPN, your net deposit is RM7,000 (claimable up to RM8,000).",
    lifeInsuranceEpf: "Example: If you contributed RM5,000 to EPF and RM2,000 to life insurance, you can claim up to RM4,000 for EPF and up to RM3,000 for insurance.",
    prsAnnuity: "Example: If you contributed RM4,000 to PRS, you can only claim up to RM3,000.",
    eduMedicalInsurance: "Example: If you paid RM2,000 for education insurance and RM2,000 for medical insurance, you can claim up to RM3,000 in total.",
    lifestyleSports: "Example: If you bought sports equipment for RM1,500, you can only claim up to RM1,000.",
    breastfeedingEquipment: "Example: If you bought a breast pump for RM1,200, you can only claim up to RM1,000, and only once every 2 years.",
    evCharging: "Example: If you installed an EV charger for RM3,000, you can only claim up to RM2,500.",
    socso: "Example: If you contributed RM400 to SOCSO, you can only claim up to RM350.",
  };
  const exampleText = examples[relief.id];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {relief.name}
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">Max: RM{max}</span>
        </span>
        <Button type="button" variant="ghost" size="sm" className="text-xs px-2 py-0.5" onClick={() => setShowMore((v: boolean) => !v)}>
          {showMore ? "Hide Info" : "More Info"}
        </Button>
      </div>
      {relief.options ? (
        <Select
          onValueChange={(val: string) => setValue((v: any) => ({ ...v, option: val, amount: "" }))}
          value={value?.option || ""}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {relief.options.map((opt: any) => (
              <SelectItem key={opt.label} value={opt.label}>{opt.label} (Max: RM{opt.max})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      <Input
        type="number"
        min={0}
        max={max}
        value={value?.amount || ""}
        onChange={e => setValue((v: any) => ({ ...v, amount: Math.min(Number(e.target.value), max) }))}
        placeholder={`Enter amount (Max: RM${max})`}
        className="w-48"
      />
      <span className="text-xs text-muted-foreground">Enter only the eligible amount. See &quot;More Info&quot; for examples.</span>
      {error && <div className="text-xs text-red-500">{error}</div>}
      {showMore && (
        <>
          <ReliefMoreInfo relief={relief} />
          {exampleText && <div className="text-xs text-blue-700 mt-2">{exampleText}</div>}
        </>
      )}
    </div>
  );
}

export function IndividualTaxEstimator() {
  const [reliefValues, setReliefValues] = useState<Record<string, { option?: string; amount?: number | string }>>({});
  const [reliefErrors, setReliefErrors] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const form = useForm<IndividualTaxData>({
    resolver: zodResolver(individualTaxSchema),
    defaultValues: {
      netProfit: "",
      epf: "",
      prs: "",
      otherDeductions: "",
    },
  });

  const watchedValues = form.watch();

  // --- Relief calculation and validation ---
  let totalReliefs = 0;
  const reliefBreakdown: ReliefBreakdownItem[] = [];
  const errors: Record<string, string> = {};
  groupedReliefs.forEach(group => {
    group.reliefs.forEach(relief => {
      const val = reliefValues[relief.id as string];
      if (val && val.amount) {
        if (relief.options && !val.option) {
          errors[relief.id as string] = "Please select a type.";
        } else {
          const max = relief.options && val.option ? relief.options.find(opt => opt.label === val.option)?.max ?? 0 : relief.max ?? 0;
          if (Number(val.amount) > (max ?? 0)) {
            errors[relief.id as string] = `Cannot exceed RM${max}`;
          }
          const amt = Math.min(Number(val.amount), max ?? 0);
          totalReliefs += amt;
          reliefBreakdown.push({ name: relief.name + (val.option ? ` (${val.option})` : ""), amount: amt });
        }
      }
    });
  });

  // --- Tax calculation logic ---
  const taxCalculation = useMemo(() => {
    const netProfit = Number(watchedValues.netProfit) || 0;
    const epf = Math.min(Number(watchedValues.epf) || 0, 4000);
    const prs = Math.min(Number(watchedValues.prs) || 0, 3000);
    const otherDeductions = Number(watchedValues.otherDeductions) || 0;
    const totalDeductions = epf + prs + otherDeductions + totalReliefs;
    const chargeableIncome = Math.max(0, netProfit - totalDeductions);
    
    if (chargeableIncome <= 0) {
      return {
        netProfit,
        totalDeductions,
        chargeableIncome: 0,
        totalTax: 0,
        effectiveRate: 0,
        breakdown: [],
        taxBracket: "No tax payable",
        totalReliefs,
        reliefBreakdown,
      };
    }

    let totalTax = 0;
    const breakdown: Array<{
      bracket: string;
      taxableAmount: number;
      rate: number;
      tax: number;
    }> = [];

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const bracket = TAX_BRACKETS[i];
      if (chargeableIncome > bracket.min) {
        const taxableAmount = Math.min(
          chargeableIncome - bracket.min,
          bracket.max - bracket.min
        );
        if (taxableAmount > 0) {
          const tax = taxableAmount * bracket.rate;
          totalTax += tax;
          breakdown.push({
            bracket: bracket.description,
            taxableAmount,
            rate: bracket.rate * 100,
            tax,
          });
        }
      }
    }

    const effectiveRate = chargeableIncome > 0 ? (totalTax / chargeableIncome) * 100 : 0;
    
    let taxBracket = "No tax payable";
    for (const bracket of TAX_BRACKETS) {
      if (chargeableIncome > bracket.min && chargeableIncome <= bracket.max) {
        taxBracket = `${(bracket.rate * 100).toFixed(0)}% bracket`;
        break;
      }
    }

    return {
      netProfit,
      totalDeductions,
      chargeableIncome,
      totalTax,
      effectiveRate,
      breakdown,
      taxBracket,
      totalReliefs,
      reliefBreakdown,
    };
  }, [watchedValues, totalReliefs]);

  const onSubmit = () => {
    setReliefErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setShowResults(true);
  };
  
  const resetForm = () => {
    form.reset();
    setReliefValues({});
    setReliefErrors({});
    setShowResults(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Card 2: Tax Estimator (now first/left) */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Tax Estimator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="netProfit" render={({ field }) => ( <FormItem> <FormLabel>Annual Net Profit (RM)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 85000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="epf" render={({ field }) => ( <FormItem> <FormLabel>EPF Contribution (Max RM4,000)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 4000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="prs" render={({ field }) => ( <FormItem> <FormLabel>PRS Contribution (Max RM3,000)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="otherDeductions" render={({ field }) => ( <FormItem> <FormLabel>Other Deductions (RM)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Calculate Tax</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
              </div>
            </form>
          </Form>
          {showResults && (
            <div className="space-y-6 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Net Profit</div>
                  <div className="text-xl font-bold">RM {taxCalculation.netProfit.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Deductions</div>
                  <div className="text-xl font-bold">RM {taxCalculation.totalDeductions.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Chargeable Income</div>
                  <div className="text-xl font-bold">RM {taxCalculation.chargeableIncome.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Estimated Tax</div>
                  <div className="text-xl font-bold text-red-600">RM {taxCalculation.totalTax?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Tax Reliefs Claimed:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {taxCalculation.reliefBreakdown.map((item, idx) => (
                    <li key={idx}>{item.name}: RM{item.amount.toLocaleString()}</li>
                  ))}
                </ul>
                <div className="mt-2 font-bold">Total Reliefs: RM{taxCalculation.totalReliefs.toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Card 1: Tax Relief Estimator (now second/right) */}
      <Card className="flex-1 relative overflow-hidden">
        {/* Overlay for Pro feature */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
          <Button variant="default" size="lg" className="mb-2" disabled>Pro</Button>
          <span className="text-muted-foreground text-center">Tax Relief Estimator is a Pro feature.<br/>Coming soon for subscribers!</span>
        </div>
        <div className="pointer-events-none opacity-90">
          <CardHeader>
            <CardTitle>Individual Tax Relief Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <strong>How does tax relief work?</strong> Think of tax relief as a discount coupon for your taxes. If you have RM9,000 in relief, it&apos;s like getting a RM9,000 discount on the amount of your income that gets taxed. The actual cash you save depends on your tax rate.
            </div>
            <Accordion type="multiple" className="mb-6">
              {groupedReliefs.map(group => (
                <AccordionItem value={group.group} key={group.group}>
                  <AccordionTrigger className="text-lg font-semibold">{group.group}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      {group.reliefs.map(relief => (
                        <ReliefInput
                          key={relief.id}
                          relief={relief}
                          value={reliefValues[relief.id as string]}
                          setValue={(val) => setReliefValues(v => ({ ...v, [relief.id as string]: typeof val === 'function' ? val(v[relief.id as string]) : val }))}
                          error={reliefErrors[relief.id as string]}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="p-4 bg-green-50 rounded shadow">
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="mb-2">Your total tax reliefs: <span className="font-bold">RM{totalReliefs.toLocaleString()}</span></div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {reliefBreakdown.map((item, idx) => (
                  <li key={idx}>{item.name}: RM{item.amount.toLocaleString()}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export function SolePropTaxEstimator() {
  const [reliefValues, setReliefValues] = useState<Record<string, { option?: string; amount?: number | string }>>({});
  const [reliefErrors, setReliefErrors] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const form = useForm<IndividualTaxData>({
    resolver: zodResolver(individualTaxSchema),
    defaultValues: {
      netProfit: "",
      epf: "",
      prs: "",
      otherDeductions: "",
    },
  });

  const watchedValues = form.watch();

  // --- Relief calculation and validation ---
  let totalReliefs = 0;
  const reliefBreakdown: ReliefBreakdownItem[] = [];
  const errors: Record<string, string> = {};
  groupedReliefs.forEach(group => {
    group.reliefs.forEach(relief => {
      const val = reliefValues[relief.id as string];
      if (val && val.amount) {
        if (relief.options && !val.option) {
          errors[relief.id as string] = "Please select a type.";
        } else {
          const max = relief.options && val.option ? relief.options.find(opt => opt.label === val.option)?.max ?? 0 : relief.max ?? 0;
          if (Number(val.amount) > (max ?? 0)) {
            errors[relief.id as string] = `Cannot exceed RM${max}`;
          }
          const amt = Math.min(Number(val.amount), max ?? 0);
          totalReliefs += amt;
          reliefBreakdown.push({ name: relief.name + (val.option ? ` (${val.option})` : ""), amount: amt });
        }
      }
    });
  });

  // --- Tax calculation logic ---
  const taxCalculation = useMemo(() => {
    const netProfit = Number(watchedValues.netProfit) || 0;
    const epf = Math.min(Number(watchedValues.epf) || 0, 4000);
    const prs = Math.min(Number(watchedValues.prs) || 0, 3000);
    const otherDeductions = Number(watchedValues.otherDeductions) || 0;
    const totalDeductions = epf + prs + otherDeductions + totalReliefs;
    const chargeableIncome = Math.max(0, netProfit - totalDeductions);
    
    if (chargeableIncome <= 0) {
      return {
        netProfit,
        totalDeductions,
        chargeableIncome: 0,
        totalTax: 0,
        effectiveRate: 0,
        breakdown: [],
        taxBracket: "No tax payable",
        totalReliefs,
        reliefBreakdown,
      };
    }

    let totalTax = 0;
    const breakdown: Array<{
      bracket: string;
      taxableAmount: number;
      rate: number;
      tax: number;
    }> = [];

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const bracket = TAX_BRACKETS[i];
      if (chargeableIncome > bracket.min) {
        const taxableAmount = Math.min(
          chargeableIncome - bracket.min,
          bracket.max - bracket.min
        );
        if (taxableAmount > 0) {
          const tax = taxableAmount * bracket.rate;
          totalTax += tax;
          breakdown.push({
            bracket: bracket.description,
            taxableAmount,
            rate: bracket.rate * 100,
            tax,
          });
        }
      }
    }

    const effectiveRate = chargeableIncome > 0 ? (totalTax / chargeableIncome) * 100 : 0;
    
    let taxBracket = "No tax payable";
    for (const bracket of TAX_BRACKETS) {
      if (chargeableIncome > bracket.min && chargeableIncome <= bracket.max) {
        taxBracket = `${(bracket.rate * 100).toFixed(0)}% bracket`;
        break;
      }
    }

    return {
      netProfit,
      totalDeductions,
      chargeableIncome,
      totalTax,
      effectiveRate,
      breakdown,
      taxBracket,
      totalReliefs,
      reliefBreakdown,
    };
  }, [watchedValues, totalReliefs]);

  const onSubmit = () => {
    setReliefErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setShowResults(true);
  };
  
  const resetForm = () => {
    form.reset();
    setReliefValues({});
    setReliefErrors({});
    setShowResults(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Card 2: Tax Estimator (now first/left) */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Tax Estimator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="netProfit" render={({ field }) => ( <FormItem> <FormLabel>Annual Net Business Profit (RM)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 85000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="epf" render={({ field }) => ( <FormItem> <FormLabel>EPF Contribution (Max RM4,000)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 4000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="prs" render={({ field }) => ( <FormItem> <FormLabel>PRS Contribution (Max RM3,000)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                <FormField control={form.control} name="otherDeductions" render={({ field }) => ( <FormItem> <FormLabel>Other Personal Deductions (RM)</FormLabel> <FormControl><Input type="number" placeholder="e.g., 5000" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Calculate Tax</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
              </div>
            </form>
          </Form>
          {showResults && (
            <div className="space-y-6 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Net Profit</div>
                  <div className="text-xl font-bold">RM {taxCalculation.netProfit.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Deductions</div>
                  <div className="text-xl font-bold">RM {taxCalculation.totalDeductions.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Chargeable Income</div>
                  <div className="text-xl font-bold">RM {taxCalculation.chargeableIncome.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-sm text-muted-foreground">Estimated Tax</div>
                  <div className="text-xl font-bold text-red-600">RM {taxCalculation.totalTax?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Tax Reliefs Claimed:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {taxCalculation.reliefBreakdown.map((item, idx) => (
                    <li key={idx}>{item.name}: RM{item.amount.toLocaleString()}</li>
                  ))}
                </ul>
                <div className="mt-2 font-bold">Total Reliefs: RM{taxCalculation.totalReliefs.toLocaleString()}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Card 1: Tax Relief Estimator (now second/right) */}
      <Card className="flex-1 relative overflow-hidden">
        {/* Overlay for Pro feature */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
          <Button variant="default" size="lg" className="mb-2" disabled>Pro</Button>
          <span className="text-muted-foreground text-center">Tax Relief Estimator is a Pro feature.<br/>Coming soon for subscribers!</span>
        </div>
        <div className="pointer-events-none opacity-90">
          <CardHeader>
            <CardTitle>Sole Prop Tax Relief Estimator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <strong>How does tax relief work?</strong> Tax relief is like the government pretending your piggy bank is smaller, so you pay less tax on your income. The actual cash you save depends on your tax bracket. See the "More Info" for each relief!
            </div>
            <Accordion type="multiple" className="mb-6">
              {groupedReliefs.map(group => (
                <AccordionItem value={group.group} key={group.group}>
                  <AccordionTrigger className="text-lg font-semibold">{group.group}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6">
                      {group.reliefs.map(relief => (
                        <ReliefInput
                          key={relief.id}
                          relief={relief}
                          value={reliefValues[relief.id as string]}
                          setValue={(val) => setReliefValues(v => ({ ...v, [relief.id as string]: typeof val === 'function' ? val(v[relief.id as string]) : val }))}
                          error={reliefErrors[relief.id as string]}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="p-4 bg-green-50 rounded shadow">
              <h2 className="font-semibold mb-2">Summary</h2>
              <div className="mb-2">Your total tax reliefs: <span className="font-bold">RM{totalReliefs.toLocaleString()}</span></div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {reliefBreakdown.map((item, idx) => (
                  <li key={idx}>{item.name}: RM{item.amount.toLocaleString()}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export function CompanyTaxEstimator() {
  const [showResults, setShowResults] = useState(false);

  const form = useForm<{ profitBeforeTax: string; isSME: boolean }>({
    resolver: zodResolver(companyTaxSchema),
    defaultValues: {
      profitBeforeTax: "",
      isSME: true,
    },
  });

  const watchedValues = form.watch();

  const taxCalculation = useMemo(() => {
    const profit = Number(watchedValues.profitBeforeTax) || 0;
    const isSME = watchedValues.isSME;
    const rates = isSME ? COMPANY_TAX_RATES.sme : COMPANY_TAX_RATES.nonSme;

    let totalTax = 0;
    let remainingProfit = profit;
    const breakdown: Array<{
      bracket: string;
      taxableAmount: number;
      rate: number;
      tax: number;
    }> = [];

    if (isSME) {
      // SME calculation
      const firstTierProfit = Math.min(remainingProfit, 600000);
      if (firstTierProfit > 0) {
        const tax = firstTierProfit * rates[0].rate;
        totalTax += tax;
        breakdown.push({
          bracket: rates[0].description,
          taxableAmount: firstTierProfit,
          rate: rates[0].rate * 100,
          tax,
        });
        remainingProfit -= firstTierProfit;
      }

      if (remainingProfit > 0) {
        const tax = remainingProfit * rates[1].rate;
        totalTax += tax;
        breakdown.push({
          bracket: rates[1].description,
          taxableAmount: remainingProfit,
          rate: rates[1].rate * 100,
          tax,
        });
      }
    } else {
      // Non-SME calculation
      const tax = profit * rates[0].rate;
      totalTax = tax;
      breakdown.push({
        bracket: rates[0].description,
        taxableAmount: profit,
        rate: rates[0].rate * 100,
        tax,
      });
    }
    
    const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;

    return {
      profitBeforeTax: profit,
      isSME,
      totalTax,
      effectiveRate,
      breakdown,
    };
  }, [watchedValues.profitBeforeTax, watchedValues.isSME]);

  const onSubmit = (data: { profitBeforeTax: string; isSME: boolean }) => {
    console.log('Form submitted with data:', data);
    setShowResults(true);
  };

  const resetForm = () => {
    form.reset();
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Tax Estimator (Sdn. Bhd.)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="profitBeforeTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profit Before Tax (RM)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 750000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isSME"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>
                          Are you an SME?
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Paid-up capital ≤ RM2.5mil & annual gross income ≤ RM50mil.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Calculate Tax</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showResults && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <DollarSign className="h-5 w-5" />
              Corporate Tax Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-sm text-muted-foreground">Profit Before Tax</div>
                <div className="text-xl font-bold">RM {taxCalculation.profitBeforeTax.toLocaleString()}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-sm text-muted-foreground">Effective Rate</div>
                <div className="text-xl font-bold">{taxCalculation.effectiveRate.toFixed(2)}%</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-sm text-muted-foreground">Estimated Tax</div>
                <div className="text-xl font-bold text-red-600">RM {taxCalculation.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tax Breakdown:</h4>
              <div className="space-y-2">
                {taxCalculation.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span>{item.bracket}</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      RM {item.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// --- DATA STRUCTURE ---
const groupedReliefs: { group: string; reliefs: Relief[] }[] = [
  {
    group: "Personal & Family",
    reliefs: [
      { id: "individual", name: "Individual and dependent relatives", max: 9000, description: "Standard relief for all taxpayers and their dependents." },
      { id: "parentMedical", name: "Expenses for parents", max: 8000, description: "Medical, dental, special needs, carer expenses for parents (certified by doctor). Complete medical exam restricted to RM1,000.", options: [ { label: "Medical/dental/special needs", max: 8000 }, { label: "Complete medical exam", max: 1000 } ] },
      { id: "supportingEquipment", name: "Supporting equipment for disabled self/spouse/child/parent", max: 6000, description: "Purchase of basic supporting equipment for disabled self, spouse, child or parent." },
      { id: "disabledIndividual", name: "Disabled individual", max: 6000, description: "For individuals registered as disabled." },
      { id: "disabledSpouse", name: "Disabled husband/wife", max: 5000, description: "For spouse registered as disabled." },
      { id: "husbandWifeAlimony", name: "Husband/wife or alimony to former wife", max: 4000, description: "Payment to spouse or alimony to former wife." },
      { id: "childUnder18", name: "Each unmarried child under 18", max: 2000, description: "For each unmarried child under 18 years old." },
      { id: "childAbove18FullTime", name: "Each unmarried child 18+ in full-time education", max: 2000, description: "For each unmarried child 18+ in full-time education (A-Level, certificate, matriculation, preparatory)." },
      { id: "childAbove18HigherEd", name: "Each unmarried child 18+ in higher education", max: 8000, description: "For each unmarried child 18+ in diploma/degree (Malaysia) or degree+ (overseas, accredited)." },
      { id: "disabledChild", name: "Disabled child", max: 6000, description: "For each disabled child." },
      { id: "disabledChildHigherEd", name: "Additional exemption for disabled child in higher education", max: 8000, description: "Additional exemption for disabled child 18+ in diploma or above (Malaysia) or bachelor+ (overseas, accredited)." },
    ]
  },
  {
    group: "Education & Childcare",
    reliefs: [
      { id: "educationFees", name: "Education fees (self)", max: 7000, description: "Degree at masters/doctorate (any course), or other approved courses. Upskilling/self-enhancement restricted to RM2,000.", options: [ { label: "Masters/Doctorate (any course)", max: 7000 }, { label: "Other approved courses", max: 7000 }, { label: "Upskilling/self-enhancement", max: 2000 } ] },
      { id: "childcareFees", name: "Child care fees (child ≤6, registered centre/kindergarten)", max: 3000, description: "Child care fees to a registered child care centre/kindergarten for a child aged 6 years and below." },
      { id: "sspDeposit", name: "Net deposit in Skim Simpanan Pendidikan Nasional (SSPN)", max: 8000, description: "Net deposit in SSPN (total deposit in year minus total withdrawal in year)." },
    ]
  },
  {
    group: "Medical & Health",
    reliefs: [
      { id: "medicalSelfFamily", name: "Medical expenses (self, spouse, child)", max: 10000, description: "Serious diseases, fertility treatment, vaccination (max RM1,000), dental (max RM1,000).", options: [ { label: "Serious diseases/fertility", max: 10000 }, { label: "Vaccination", max: 1000 }, { label: "Dental", max: 1000 } ] },
      { id: "medicalExamCovidMental", name: "Medical exam, COVID-19, mental health (self/spouse/child)", max: 1000, description: "Complete medical exam, COVID-19 test/self-test kit, mental health exam/consultation. Restricted to RM1,000." },
      { id: "childDisabilityAssessment", name: "Child disability assessment/intervention (≤18)", max: 4000, description: "Assessment of intellectual disability diagnosis, early intervention/rehab for child ≤18." },
    ]
  },
  {
    group: "Lifestyle & Equipment",
    reliefs: [
      { id: "lifestyle", name: "Lifestyle (books, computer, internet, courses)", max: 2500, description: "Books, journals, computer, smartphone, internet, skill/personal development course fee. Not for business use." },
      { id: "lifestyleSports", name: "Lifestyle (sports equipment, gym, competition)", max: 1000, description: "Sports equipment, gym, sports facility, competition registration, sports training." },
      { id: "breastfeedingEquipment", name: "Breastfeeding equipment (child ≤2, once every 2 years)", max: 1000, description: "Purchase of breastfeeding equipment for own use for a child aged 2 years and below. Deduction allowed once every 2 years." },
      { id: "evCharging", name: "EV charging facilities (not for business use)", max: 2500, description: "Expenses on charging facilities for Electric Vehicle (not for business use)." },
    ]
  },
  {
    group: "Insurance & Savings",
    reliefs: [
      { id: "lifeInsuranceEpf", name: "Life insurance & EPF", max: 7000, description: "EPF (max RM4,000), life insurance/takaful/voluntary EPF (max RM3,000).", options: [ { label: "EPF (mandatory/voluntary)", max: 4000 }, { label: "Life insurance/takaful/voluntary EPF", max: 3000 } ] },
      { id: "prsAnnuity", name: "Deferred Annuity & Private Retirement Scheme (PRS)", max: 3000, description: "Deferred Annuity and PRS contributions." },
      { id: "eduMedicalInsurance", name: "Education & medical insurance", max: 3000, description: "Education and medical insurance premiums." },
      { id: "socso", name: "SOCSO contribution", max: 350, description: "Contribution to the Social Security Organization (SOCSO)." },
    ]
  },
]; 