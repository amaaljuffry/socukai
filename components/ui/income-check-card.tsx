"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TAX_THRESHOLD = 34000;

export function IncomeCheckCard() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [epfRate, setEpfRate] = useState('11');
  const [contributesToEpf, setContributesToEpf] = useState(true);

  const calculations = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const rate = parseFloat(epfRate) || 0;

    if (income === 0) {
      return null;
    }

    const yearlyIncome = income * 12;
    const epfDeduction = contributesToEpf ? (income * (rate / 100)) * 12 : 0;
    const netChargeableIncome = yearlyIncome - epfDeduction;
    const progress = Math.min((netChargeableIncome / TAX_THRESHOLD) * 100, 100);

    return {
      yearlyIncome,
      epfDeduction,
      netChargeableIncome,
      progress,
      isTaxable: netChargeableIncome >= TAX_THRESHOLD,
    };
  }, [monthlyIncome, epfRate, contributesToEpf]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 w-full py-8">
      {/* Tax Check Card */}
      <Card className="w-full md:w-1/3 min-w-[320px] mx-auto h-full flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Do I Need to File Taxes?</CardTitle>
          <CardDescription>
            For Malaysian freelancers, salaried individuals, and gig workers. Enter your details to check.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-income">Monthly Income (RM)</Label>
              <Input
                id="monthly-income"
                type="number"
                placeholder="e.g., 3000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="epf-switch">Do you contribute to EPF?</Label>
              <Switch
                id="epf-switch"
                checked={contributesToEpf}
                onCheckedChange={setContributesToEpf}
              />
            </div>
            {contributesToEpf && (
              <div className="space-y-2 animate-in fade-in-50">
                <Label htmlFor="epf-rate">EPF Contribution Rate (%)</Label>
                <Input
                  id="epf-rate"
                  type="number"
                  placeholder="e.g., 11"
                  value={epfRate}
                  onChange={(e) => setEpfRate(e.target.value)}
                  disabled={!contributesToEpf}
                />
              </div>
            )}
          </div>

          {/* Results Section */}
          {calculations && (
            <div className="space-y-4 pt-4 border-t animate-in fade-in-50">
              <h3 className="text-lg font-semibold">Your Estimated Yearly Breakdown</h3>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>RM 0</span>
                  <span>Threshold: RM {TAX_THRESHOLD.toLocaleString()}</span>
                </div>
                <Progress value={calculations.progress} className="w-full" />
                <p className="text-right text-sm font-medium">
                  Net Income: RM {calculations.netChargeableIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Calculation Details */}
              <div className="text-sm space-y-2 p-3 bg-muted rounded-md">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yearly Gross Income:</span>
                  <span className="font-medium">RM {calculations.yearlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {contributesToEpf && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EPF Deduction ({epfRate}%):</span>
                    <span className="font-medium text-red-600">- RM {calculations.epfDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Net Chargeable Income:</span>
                  <span className="font-semibold">RM {calculations.netChargeableIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              
              {/* Final Verdict */}
              <div className={cn(
                  "p-4 rounded-lg flex items-start gap-4 animate-in fade-in-50",
                  calculations.isTaxable ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
              )}>
                {calculations.isTaxable ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  {calculations.isTaxable ? (
                    <p className="font-semibold text-green-800">Yes, you are required to declare your income tax with LHDN.</p>
                  ) : (
                    <p className="font-semibold text-amber-800">You are not legally required to file taxes, but it is highly encouraged for financial credibility.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {calculations && (
          <CardFooter>
            <Button asChild variant="link" className="w-full">
              <Link href="/individual?tab=faq">
                Learn More at the FAQ section <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Info Card */}
      <Card className="w-full md:w-1/3 min-w-[320px] mx-auto h-full flex-1 flex flex-col justify-center">
        <CardHeader>
          <CardTitle>Individual Tax Declaration in Malaysia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
            Individual tax declaration in Malaysia is a mandatory annual process where residents and non-residents who earn income in Malaysia must report their income to the Inland Revenue Board of Malaysia (LHDNM). This process ensures compliance with Malaysian tax laws and determines the amount of tax payable or refundable.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Key Points:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>Tax year runs from January 1st to December 31st</li>
              <li>Filing deadline is typically April 30th of the following year</li>
              <li>Both Malaysian residents and non-residents must file if they have Malaysian-sourced income</li>
              <li>Progressive tax rates ranging from 0% to 30%</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 