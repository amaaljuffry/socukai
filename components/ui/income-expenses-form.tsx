'use client';

import React, { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Briefcase,
  Building,
  Calculator,
  Calendar,
  CheckCircle,
  DollarSign,
  Plus,
  RefreshCw,
  Trash2,
  TrendingDown,
  TrendingUp,
  User,
} from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// 1. ZOD SCHEMA (No changes needed, this was well-defined)
const incomeExpenseItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Amount must be a positive number'),
  category: z.string().min(1, 'Category is required'),
});

const formSchema = z.object({
  period: z.enum(['monthly', 'yearly']),
  incomeItems: z.array(incomeExpenseItemSchema).min(1, 'At least one income item is required'),
  expenseItems: z.array(incomeExpenseItemSchema).min(1, 'At least one expense item is required'),
});

type FormData = z.infer<typeof formSchema>;

type FormType = "individual" | "soleprop" | "company";

// 2. REUSABLE CALCULATOR COMPONENT
// All logic is now centralized here to avoid duplication.
// It accepts props to customize its behavior for different entity types.
function IncomeExpenseCalculator({ formType, defaultValues, incomeCategories, expenseCategories }: {
  formType: FormType;
  defaultValues: FormData;
  incomeCategories: string[];
  expenseCategories: string[];
}) {
  const [submissionResult, setSubmissionResult] = useState(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;
  const watchedValues = watch();

  const {
    fields: incomeFields,
    append: appendIncome,
    remove: removeIncome,
  } = useFieldArray({
    control,
    name: 'incomeItems',
  });

  const {
    fields: expenseFields,
    append: appendExpense,
    remove: removeExpense,
  } = useFieldArray({
    control,
    name: 'expenseItems',
  });

  // Calculation logic is memoized for performance
  const calculationResult = useMemo(() => {
    const totalIncome = (watchedValues.incomeItems || []).reduce(
      (sum, item) => sum + (Number(item?.amount) || 0),
      0
    );
    const totalExpenses = (watchedValues.expenseItems || []).reduce(
      (sum, item) => sum + (Number(item?.amount) || 0),
      0
    );
    const profit = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, profit };
  }, [watchedValues.incomeItems, watchedValues.expenseItems]);

  const periodCalculations = useMemo(() => {
    const { totalIncome, totalExpenses, profit } = calculationResult;
    const isMonthly = watchedValues.period === 'monthly';
    if (isMonthly) {
      return {
        monthly: { income: totalIncome, expenses: totalExpenses, profit },
        annual: { income: totalIncome * 12, expenses: totalExpenses * 12, profit: profit * 12 },
      };
    } else {
      return {
        monthly: { income: totalIncome / 12, expenses: totalExpenses / 12, profit: profit / 12 },
        annual: { income: totalIncome, expenses: totalExpenses, profit },
      };
    }
  }, [calculationResult, watchedValues.period]);

  const { totalIncome, totalExpenses, profit: netProfit } = calculationResult;

  // Form handlers
  const onSubmit = (data: FormData) => {
    setSubmissionResult({
      ...periodCalculations,
      period: data.period,
      incomeItemsCount: data.incomeItems.length,
      expenseItemsCount: data.expenseItems.length,
    });
  };

  const handleReset = () => {
    reset(defaultValues);
    setSubmissionResult(null);
  };

  const onError = (errors) => {
    console.error('Form validation errors:', errors);
    setSubmissionResult(null);
  };

  // Dynamic titles and labels based on formType
  const entityConfig = {
    individual: {
      title: 'Personal',
      Icon: User,
      incomeLabel: 'Income',
      expenseLabel: 'Expenses',
      profitLabel: 'Net Income',
      revenueLabel: 'Income',
    },
    soleprop: {
      title: 'Business',
      Icon: Briefcase,
      incomeLabel: 'Income',
      expenseLabel: 'Expenses',
      profitLabel: 'Net Profit',
      revenueLabel: 'Income',
    },
    company: {
      title: 'Corporate',
      Icon: Building,
      incomeLabel: 'Revenue',
      expenseLabel: 'Expenses',
      profitLabel: 'Net Profit',
      revenueLabel: 'Revenue',
    },
  };
  const config = entityConfig[formType];

  return (
    // Main container with adjusted spacing (space-y-4)
    <div className="space-y-4">
      {/* --- SUMMARY CARDS --- */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Calculator className="h-5 w-5" />
            {config.title} {config.profitLabel} Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                RM{' '}
                {totalIncome.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">Total {config.incomeLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                RM{' '}
                {totalExpenses.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">Total {config.expenseLabel}</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                RM{' '}
                {netProfit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-muted-foreground">{config.profitLabel}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly vs. Annual Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left font-semibold">Category</th>
                  <th className="p-3 text-right font-semibold">Monthly (RM)</th>
                  <th className="p-3 text-right font-semibold">Annual (RM)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-green-700">{config.revenueLabel}</td>
                  <td className="p-3 text-right font-bold text-green-600">
                    {periodCalculations.monthly.income.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="p-3 text-right font-bold text-green-600">
                    {periodCalculations.annual.income.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-red-700">{config.expenseLabel}</td>
                  <td className="p-3 text-right font-bold text-red-600">
                    {periodCalculations.monthly.expenses.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="p-3 text-right font-bold text-red-600">
                    {periodCalculations.annual.expenses.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <td className="p-3 font-semibold text-gray-900">{config.profitLabel}</td>
                  <td
                    className={`p-3 text-right font-bold ${periodCalculations.monthly.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {periodCalculations.monthly.profit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td
                    className={`p-3 text-right font-bold ${periodCalculations.annual.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {periodCalculations.annual.profit.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <div className="flex items-center gap-2 text-blue-800">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">
                Currently entering: {watchedValues.period === 'monthly' ? 'Monthly' : 'Annual'}{' '}
                values
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- FORM SECTIONS --- */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Period</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Income Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="h-5 w-5" />
                {config.title} {config.incomeLabel} Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {incomeFields.map((field, index) => (
                <div key={field.id} className="grid items-baseline gap-4 md:grid-cols-4">
                  <FormField
                    control={control}
                    name={`incomeItems.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder={`e.g., Monthly ${config.incomeLabel}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`incomeItems.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (RM)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`incomeItems.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {incomeCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIncome(index)}
                    disabled={incomeFields.length === 1}
                    className="self-end"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendIncome({ description: '', amount: '', category: '' })}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {config.incomeLabel} Item
              </Button>
            </CardContent>
          </Card>

          {/* Expense Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <TrendingDown className="h-5 w-5" />
                {config.title} {config.expenseLabel} Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenseFields.map((field, index) => (
                <div key={field.id} className="grid items-baseline gap-4 md:grid-cols-4">
                  <FormField
                    control={control}
                    name={`expenseItems.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder={`e.g., Office Rent`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`expenseItems.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (RM)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`expenseItems.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {expenseCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeExpense(index)}
                    disabled={expenseFields.length === 1}
                    className="self-end"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendExpense({ description: '', amount: '', category: '' })}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {config.expenseLabel} Item
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              <Calculator className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Calculating...' : 'Calculate & Show Results'}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Form
            </Button>
          </div>
        </form>
      </Form>

      {/* --- RESULT DISPLAY --- */}
      {submissionResult && (
        <Card className="mt-4 animate-in fade-in-50 border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <CheckCircle className="h-6 w-6" />
              Calculation Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your {formType} data has been calculated and is ready for review!
            </p>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {submissionResult.incomeItemsCount}
                </div>
                <div className="text-xs text-muted-foreground">{config.incomeLabel} Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {submissionResult.expenseItemsCount}
                </div>
                <div className="text-xs text-muted-foreground">{config.expenseLabel} Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {submissionResult.period === 'monthly' ? 'Monthly' : 'Annual'}
                </div>
                <div className="text-xs text-muted-foreground">Input Period</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {submissionResult.monthly.profit >= 0 ? '✅' : '⚠️'}
                </div>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>
            {/* Detailed Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Category</th>
                    <th className="p-3 text-right font-semibold">Monthly (RM)</th>
                    <th className="p-3 text-right font-semibold">Annual (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-green-100">
                    <td className="p-3 font-medium text-green-700">{config.revenueLabel}</td>
                    <td className="p-3 text-right font-bold text-green-600">
                      {submissionResult.monthly.income.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-3 text-right font-bold text-green-600">
                      {submissionResult.annual.income.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-green-100">
                    <td className="p-3 font-medium text-red-700">{config.expenseLabel}</td>
                    <td className="p-3 text-right font-bold text-red-600">
                      {submissionResult.monthly.expenses.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-3 text-right font-bold text-red-600">
                      {submissionResult.annual.expenses.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-green-300 bg-green-100/80">
                    <td className="p-3 font-semibold text-gray-900">{config.profitLabel}</td>
                    <td
                      className={`p-3 text-right font-bold ${submissionResult.monthly.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {submissionResult.monthly.profit.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`p-3 text-right font-bold ${submissionResult.annual.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {submissionResult.annual.profit.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// 3. SPECIFIC COMPONENT IMPLEMENTATIONS
// These are now lightweight wrappers that pass the correct data to the main calculator.

// --- Categories and Defaults ---

const individualIncomeCategories = [
  'Employment Salary',
  'Freelance Income',
  'Side Business',
  'Investment Income',
  'Rental Income',
  'Commission Income',
  'Online Sales',
  'Consulting Fees',
  'Part-time Work',
  'Other Income',
];
const individualExpenseCategories = [
  'Transportation',
  'Meals & Entertainment',
  'Home Office Expenses',
  'Professional Development',
  'Insurance Premiums',
  'Medical Expenses',
  'Education Expenses',
  'Charitable Donations',
  'Investment Tools',
  'Other Expenses',
];
const individualDefaultValues = {
  period: 'monthly',
  incomeItems: [{ description: 'Monthly Salary', amount: '5000', category: 'Employment Salary' }],
  expenseItems: [
    { description: 'Transportation & Meals', amount: '800', category: 'Transportation' },
  ],
};

const solePropIncomeCategories = [
  'Consulting Fees',
  'Project Fees',
  'Service Income',
  'Commission Income',
  'Online Sales',
  'Training & Workshops',
  'Design Services',
  'Technical Services',
  'Rental Income',
  'Other Business Income',
];
const solePropExpenseCategories = [
  'Office Rental',
  'Tools & Software',
  'Internet & Phone',
  'Transportation',
  'Marketing & Advertising',
  'Professional Services',
  'Insurance',
  'Utilities',
  'Office Supplies',
  'Travel Expenses',
  'Training & Education',
  'Business Equipment',
  'Other Business Expenses',
];
const solePropDefaultValues = {
  period: 'monthly',
  incomeItems: [{ description: 'Consulting Project', amount: '8000', category: 'Consulting Fees' }],
  expenseItems: [
    { description: 'Office Rent & Utilities', amount: '1500', category: 'Office Rental' },
  ],
};

const companyIncomeCategories = [
  'Service Revenue',
  'Product Sales',
  'Consulting Fees',
  'Licensing Income',
  'Investment Income',
  'Rental Income',
  'Commission Income',
  'Training Revenue',
  'Maintenance Fees',
  'Other Revenue',
];
const companyExpenseCategories = [
  'Employee Costs',
  'Office Rental',
  'Utilities',
  'Marketing & Advertising',
  'Professional Services',
  'Insurance',
  'Office Supplies',
  'Travel Expenses',
  'Training & Development',
  'Equipment & Technology',
  'Legal & Compliance',
  'Bank Charges',
  'Other Operating Expenses',
];
const companyDefaultValues = {
  period: 'monthly',
  incomeItems: [{ description: 'Software Services', amount: '25000', category: 'Service Revenue' }],
  expenseItems: [{ description: 'Employee Salaries', amount: '12000', category: 'Employee Costs' }],
};

// --- Exported Components ---

export function IndividualIncomeExpensesForm() {
  return (
    <IncomeExpenseCalculator
      formType="individual"
      defaultValues={individualDefaultValues}
      incomeCategories={individualIncomeCategories}
      expenseCategories={individualExpenseCategories}
    />
  );
}

export function SolePropIncomeExpensesForm() {
  return (
    <IncomeExpenseCalculator
      formType="soleprop"
      defaultValues={solePropDefaultValues}
      incomeCategories={solePropIncomeCategories}
      expenseCategories={solePropExpenseCategories}
    />
  );
}

export function CompanyIncomeExpensesForm() {
  return (
    <IncomeExpenseCalculator
      formType="company"
      defaultValues={companyDefaultValues}
      incomeCategories={companyIncomeCategories}
      expenseCategories={companyExpenseCategories}
    />
  );
}

// Kept for backward compatibility if needed
export function IncomeExpensesForm() {
  return <IndividualIncomeExpensesForm />;
}
