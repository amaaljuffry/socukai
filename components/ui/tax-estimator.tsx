"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calculator, TrendingUp, Receipt, DollarSign, Building } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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

export function IndividualTaxEstimator() {
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

  const taxCalculation = useMemo(() => {
    const netProfit = Number(watchedValues.netProfit) || 0;
    const epf = Math.min(Number(watchedValues.epf) || 0, 4000);
    const prs = Math.min(Number(watchedValues.prs) || 0, 3000);
    const otherDeductions = Number(watchedValues.otherDeductions) || 0;
    const totalDeductions = epf + prs + otherDeductions;
    
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
    };
  }, [watchedValues]);

  const onSubmit = (data: IndividualTaxData) => {
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
            <Calculator className="h-5 w-5" />
            Individual Tax Estimator
          </CardTitle>
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
        </CardContent>
      </Card>

      {showResults && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <DollarSign className="h-5 w-5" />
              Individual Tax Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                 <div className="text-xl font-bold text-red-600">RM {taxCalculation.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
               </div>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
               <div className="p-4 bg-white rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                   <TrendingUp className="h-4 w-4" />
                   <span className="font-semibold">Effective Tax Rate</span>
                 </div>
                 <div className="text-3xl font-bold text-green-700">{taxCalculation.effectiveRate.toFixed(2)}%</div>
               </div>
               <div className="p-4 bg-white rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                   <Receipt className="h-4 w-4" />
                   <span className="font-semibold">Tax Bracket</span>
                 </div>
                 <div className="text-3xl font-bold">{taxCalculation.taxBracket}</div>
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

export function SolePropTaxEstimator() {
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

  const taxCalculation = useMemo(() => {
    const netProfit = Number(watchedValues.netProfit) || 0;
    const epf = Math.min(Number(watchedValues.epf) || 0, 4000);
    const prs = Math.min(Number(watchedValues.prs) || 0, 3000);
    const otherDeductions = Number(watchedValues.otherDeductions) || 0;
    const totalDeductions = epf + prs + otherDeductions;
    
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
    };
  }, [watchedValues]);

  const onSubmit = (data: IndividualTaxData) => {
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
            <Calculator className="h-5 w-5" />
            Sole Proprietor Tax Estimator
          </CardTitle>
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
        </CardContent>
      </Card>

      {showResults && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <DollarSign className="h-5 w-5" />
              Sole Proprietor Tax Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                 <div className="text-xl font-bold text-red-600">RM {taxCalculation.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
               </div>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
               <div className="p-4 bg-white rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                   <TrendingUp className="h-4 w-4" />
                   <span className="font-semibold">Effective Tax Rate</span>
                 </div>
                 <div className="text-3xl font-bold text-green-700">{taxCalculation.effectiveRate.toFixed(2)}%</div>
               </div>
               <div className="p-4 bg-white rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                   <Receipt className="h-4 w-4" />
                   <span className="font-semibold">Tax Bracket</span>
                 </div>
                 <div className="text-3xl font-bold">{taxCalculation.taxBracket}</div>
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