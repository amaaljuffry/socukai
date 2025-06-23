"use client";
import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  IndividualIncomeExpensesForm, 
  SolePropIncomeExpensesForm, 
  CompanyIncomeExpensesForm 
} from '@/components/ui/income-expenses-form';
import {
  IndividualTaxEstimator as IndividualTaxEstimatorComponent,
  SolePropTaxEstimator as SolePropTaxEstimatorComponent,
  CompanyTaxEstimator as CompanyTaxEstimatorComponent
} from '@/components/ui/tax-estimator';
import { TaxPreparationChecklist, SolePropChecklist, CompanyChecklist } from '@/components/ui/checklist';
import { 
  IndividualFAQ,
  SolePropFAQ,
  CompanyFAQ
} from '@/components/ui/faq';
import { IndividualDownloads, SolePropDownloads, CompanyDownloads } from '@/components/ui/downloads';
import { IncomeCheckCard } from '@/components/ui/income-check-card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export default function EntityPage({ params }: { params: Promise<{ entity: string }> }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  const { entity } = use(params);

  const renderContent = () => {
    switch (tab) {
      case 'overview':
        if (entity === 'individual') {
          return <IndividualOverview />;
        } else if (entity === 'sole-prop') {
          return <SolePropOverview />;
        } else if (entity === 'company') {
          return <CompanyOverview />;
        }
        return <p>This is the Overview for {entity}</p>;
      case 'ssm-tax-status':
        if (entity === 'individual') {
          return <IndividualSSMTaxStatus />;
        } else if (entity === 'sole-prop') {
          return <SolePropSSMTaxStatus />;
        } else if (entity === 'company') {
          return <CompanySSMTaxStatus />;
        }
        return <p>This is the SSM & Tax Status for {entity}</p>;
      case 'income-expenses':
        if (entity === 'individual') {
          return <IndividualIncomeExpenses />;
        } else if (entity === 'sole-prop') {
          return <SolePropIncomeExpenses />;
        } else if (entity === 'company') {
          return <CompanyIncomeExpenses />;
        }
        return <p>This is the Income & Expenses for {entity}</p>;
      case 'tax-estimator':
        if (entity === 'individual') {
          return <IndividualTaxEstimatorComponent />;
        } else if (entity === 'sole-prop') {
          return <SolePropTaxEstimatorComponent />;
        } else if (entity === 'company') {
          return <CompanyTaxEstimatorComponent />;
        }
        return <p>This is the Tax Estimator for {entity}</p>;
      case 'checklist':
        if (entity === 'individual') {
          return <IndividualChecklist />;
        } else if (entity === 'sole-prop') {
          return <SolePropChecklist />;
        } else if (entity === 'company') {
          return <CompanyChecklist />;
        }
        return <p>This is the Checklist for {entity}</p>;
      case 'faq':
        if (entity === 'individual') {
          return <IndividualFAQ />;
        } else if (entity === 'sole-prop') {
          return <SolePropFAQ />;
        } else if (entity === 'company') {
          return <CompanyFAQ />;
        }
        return <p>This is the FAQ for {entity}</p>;
      case 'downloads':
        if (entity === 'individual') {
          return <IndividualDownloads />;
        } else if (entity === 'sole-prop') {
          return <SolePropDownloads />;
        } else if (entity === 'company') {
          return <CompanyDownloads />;
        }
        return <p>This is the Downloads for {entity}</p>;
      case 'e-invoicing':
        if (entity === 'individual') {
          return <IndividualEInvoicing />;
        } else if (entity === 'sole-prop') {
          return <SolePropEInvoicing />;
        } else if (entity === 'company') {
          return <CompanyEInvoicing />;
        }
        return <p>E-invoicing information for {entity}</p>;
      default:
        return <p>Welcome to the {entity} page.</p>;
    }
  };

  return (
    <div className="w-full md:w-2/3 mx-auto">
      {renderContent()}
    </div>
  );
}

function IndividualOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Overview</h1>
      {/* Income Check Card */}
      <IncomeCheckCard />


      {/* Freelancers vs Salary Earners */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Freelancers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👨‍💻</span>
              Freelancers & Self-Employed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Freelancers and self-employed individuals have different tax obligations compared 
              to salary earners, with more complex income reporting requirements.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Income Sources</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Project-based income</li>
                  <li>• Consulting fees</li>
                  <li>• Commission income</li>
                  <li>• Online business income</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Tax Obligations</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Must register for business tax</li>
                  <li>• Quarterly tax payments (CP204)</li>
                  <li>• Detailed expense tracking required</li>
                  <li>• Business-related deductions available</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700">Filing Requirements</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Form B (Business Income)</li>
                  <li>• Detailed profit & loss statement</li>
                  <li>• Supporting documents for expenses</li>
                  <li>• May require professional assistance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Earners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👔</span>
              Salary Earners & Employees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Salary earners typically have simpler tax obligations as their employer handles 
              most of the tax administration through the Monthly Tax Deduction (MTD) system.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Income Sources</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Employment salary</li>
                  <li>• Bonuses and allowances</li>
                  <li>• Benefits-in-kind</li>
                  <li>• Side income (if any)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Tax Obligations</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Monthly Tax Deduction (MTD)</li>
                  <li>• Employer handles tax payments</li>
                  <li>• Standard deductions apply</li>
                  <li>• Relatively straightforward process</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Filing Requirements</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Form BE (Employment Income)</li>
                  <li>• EA Form from employer</li>
                  <li>• Additional income declarations</li>
                  <li>• Can often self-file</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Considerations */}
      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Penalties for Late Filing</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 10% penalty on unpaid tax</li>
                <li>• Additional 5% if not paid within 60 days</li>
                <li>• Possible legal action for persistent non-compliance</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Available Deductions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• EPF contributions (up to RM4,000)</li>
                <li>• Life insurance premiums</li>
                <li>• Medical insurance</li>
                <li>• Education expenses</li>
                <li>• Charitable donations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E-Invoicing Requirements for Individuals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            E-Invoicing Requirements for Individuals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            E-invoicing affects individuals differently based on whether they conduct business activities 
            or are only employees. Understanding your obligations is crucial for compliance.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Individuals with Business Activities */}
            <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <span className="text-xl">👨‍💻</span>
                Individuals with Business Activities
              </h4>
              <p className="text-sm text-orange-800 mb-3">
                <strong>E-Invoicing: REQUIRED</strong> - You must comply based on your annual turnover.
              </p>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Freelancers and consultants</li>
                <li>• Online sellers and dropshippers</li>
                <li>• Professional service providers</li>
                <li>• Independent contractors</li>
                <li>• Anyone with business income (Form B)</li>
              </ul>
              <div className="mt-3 p-2 bg-orange-100 rounded">
                <p className="text-xs text-orange-900">
                  <strong>Implementation:</strong> Based on annual turnover, same timeline as businesses
                </p>
              </div>
            </div>

            {/* Pure Salary Earners */}
            <div className="border rounded-lg p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-xl">👔</span>
                Pure Salary Earners
              </h4>
              <p className="text-sm text-green-800 mb-3">
                <strong>E-Invoicing: NOT REQUIRED</strong> - You don't need to issue e-invoices.
              </p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Employment income only (Form BE)</li>
                <li>• No business activities</li>
                <li>• No side income or freelance work</li>
                <li>• Employer handles tax deductions</li>
                <li>• May receive e-invoices from businesses</li>
              </ul>
              <div className="mt-3 p-2 bg-green-100 rounded">
                <p className="text-xs text-green-900">
                  <strong>Note:</strong> You may receive e-invoices from businesses you purchase from
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Implementation Timeline for Business Activities:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• <strong>August 2024:</strong> Turnover &gt; RM100 million</li>
              <li>• <strong>January 2025:</strong> Turnover RM25M - RM100M</li>
              <li>• <strong>July 2025:</strong> Turnover RM5M - RM25M</li>
              <li>• <strong>January 2026:</strong> Turnover RM1M - RM5M</li>
              <li>• <strong>July 2026:</strong> All remaining businesses</li>
              <li>• <strong>Exempt:</strong> Turnover &lt; RM500,000</li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-600">🔧 Technical Requirements (If Required)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• XML/JSON format (UBL 2.1 standard)</li>
                <li>• MyInvois portal or API integration</li>
                <li>• Digital certificate for signing</li>
                <li>• Real-time validation required</li>
                <li>• QR code generation for delivery</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Compliance Obligations (If Required)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit all invoices to MyInvois</li>
                <li>• 72-hour window for corrections</li>
                <li>• 7-year archiving requirement</li>
                <li>• Penalties: RM200-RM20,000 per violation</li>
                <li>• Cross-border transactions need special handling</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Key Points for Individuals:</h4>
            <ul className="text-yellow-800 space-y-1 text-sm">
              <li>• <strong>Business activities = E-invoicing required</strong> (regardless of business structure)</li>
              <li>• <strong>Employment only = No e-invoicing required</strong> (but may receive e-invoices)</li>
              <li>• <strong>Mixed income:</strong> E-invoicing applies to business portion only</li>
              <li>• <strong>Turnover threshold:</strong> Based on business income, not total income</li>
              <li>• <strong>Support available:</strong> 6-month grace period, free portal access, tax incentives</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IndividualSSMTaxStatus() {
  return (
    <div className="space-y-6">
      {/* SSM & TIN Intro */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SSM Registration & Tax Identification Number (TIN)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Understanding when you need to register with SSM (Companies Commission of Malaysia) and how Tax Identification Numbers (TIN) work is crucial for proper tax compliance. The requirements differ based on your business structure and income type.
          </p>
        </CardContent>
      </Card>
      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>SSM = Business registration with Companies Commission</li>
            <li>TIN = Tax Identification Number from LHDNM (Inland Revenue Board)</li>
            <li>Not all individuals need SSM registration</li>
            <li>TIN is required for all taxpayers</li>
          </ul>
        </CardContent>
      </Card>
      {/* Key Forms & Acts Accordion */}
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="forms">
          <AccordionTrigger>Key Forms (SSM / LHDN / EPF / SOCSO)</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Form</th>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Form BE</td><td className="border p-2">Employment Income</td><td className="border p-2">For individuals earning employment income only. File by 30 April each year.</td></tr>
                  <tr><td className="border p-2">Form B</td><td className="border p-2">Business/Side Income</td><td className="border p-2">For individuals earning income from side gigs, commissions, or freelance jobs (even without SSM). File by 30 June.</td></tr>
                  <tr><td className="border p-2">Form EA</td><td className="border p-2">Salary Statement</td><td className="border p-2">Issued by your employer to summarize your yearly salary, EPF, SOCSO, etc.</td></tr>
                  <tr><td className="border p-2">CP500</td><td className="border p-2">Tax Instalment</td><td className="border p-2">Instalment payment schedule issued by LHDN if you have recurring non-salary income.</td></tr>
                  <tr><td className="border p-2">KWSP i-Saraan</td><td className="border p-2">Voluntary EPF</td><td className="border p-2">For freelancers to contribute voluntarily to EPF and get matching contributions.</td></tr>
                  <tr><td className="border p-2">SOCSO SPS Scheme</td><td className="border p-2">Voluntary SOCSO</td><td className="border p-2">Voluntary social security protection for gig workers and self-employed.</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="acts">
          <AccordionTrigger>Key Acts & Laws</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Act / Law</th>
                    <th className="p-2 border">Purpose / Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Income Tax Act 1967</td><td className="border p-2">Governs personal taxation.</td></tr>
                  <tr><td className="border p-2">Finance Act</td><td className="border p-2">Updated yearly with new rates or reliefs.</td></tr>
                  <tr><td className="border p-2">Employees Provident Fund Act 1991</td><td className="border p-2">Covers EPF for employed and voluntary contributors.</td></tr>
                  <tr><td className="border p-2">Self-Employment Social Security Act 2017</td><td className="border p-2">Enables freelancers to register for PERKESO protection.</td></tr>
                  <tr><td className="border p-2">Employment Act 1955</td><td className="border p-2">Applies if you&apos;re formally employed.</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Who Needs SSM Registration */}
      <Card>
        <CardHeader>
          <CardTitle>Who Needs SSM Registration?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Must Register SSM</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sole proprietors with business name</li>
                <li>• Partnerships</li>
                <li>• Companies (Sdn Bhd, Bhd)</li>
                <li>• Business entities with employees</li>
                <li>• Those requiring business bank accounts</li>
                <li>• Import/export businesses</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600">⚠️ May Not Need SSM</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Individual freelancers using personal name</li>
                <li>• Occasional side income</li>
                <li>• Personal services (consulting, tutoring)</li>
                <li>• Income below RM50,000 annually</li>
                <li>• No business bank account needed</li>
                <li>• No employees or business premises</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Identification Numbers (TIN) */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Identification Numbers (TIN)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A Tax Identification Number (TIN) is a unique identifier assigned by LHDNM to every taxpayer. 
            It&apos;s different from your IC number and is used for all tax-related communications.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">TIN Requirements:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• All taxpayers must have a TIN</li>
              <li>• Automatically assigned when you first file taxes</li>
              <li>• Required for all tax forms and communications</li>
              <li>• Different from business registration numbers</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Example Scenarios */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Example Scenarios</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Scenario 1 */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <span className="text-2xl">🚫</span>
                No SSM + Freelance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Profile:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Graphic designer working from home</li>
                  <li>• Income: RM35,000/year</li>
                  <li>• Uses personal name for work</li>
                  <li>• No employees or business premises</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="border-l-4 border-green-500 pl-3">
                  <h5 className="font-semibold text-green-700">SSM Status:</h5>
                  <p className="text-sm text-muted-foreground">Not required - can operate under personal name</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3">
                  <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                  <p className="text-sm text-muted-foreground">Yes - must register with LHDNM</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                  <p className="text-sm text-muted-foreground">Form BE (Employment Income)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario 2 */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">✅</span>
                SSM Enterprise + LHDN Registered
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Profile:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• IT consultant with business name</li>
                  <li>• Income: RM80,000/year</li>
                  <li>• Has business bank account</li>
                  <li>• Hires subcontractors occasionally</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="border-l-4 border-green-500 pl-3">
                  <h5 className="font-semibold text-green-700">SSM Status:</h5>
                  <p className="text-sm text-muted-foreground">Required - registered as Enterprise</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3">
                  <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                  <p className="text-sm text-muted-foreground">Yes - separate business TIN</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                  <p className="text-sm text-muted-foreground">Form B (Business Income)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario 3 */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <span className="text-2xl">💼</span>
                Salary Earner + Side Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Profile:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Full-time employee (RM60,000/year)</li>
                  <li>• Occasional freelance work (RM15,000/year)</li>
                  <li>• Uses personal name for side work</li>
                  <li>• No business registration needed</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="border-l-4 border-green-500 pl-3">
                  <h5 className="font-semibold text-green-700">SSM Status:</h5>
                  <p className="text-sm text-muted-foreground">Not required - side income under personal name</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3">
                  <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                  <p className="text-sm text-muted-foreground">Yes - one TIN for all income</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                  <p className="text-sm text-muted-foreground">Form BE (Employment + Other Income)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario 4 */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <span className="text-2xl">🏢</span>
                Partnership Business
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Profile:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Two partners running a consultancy</li>
                  <li>• Business income: RM150,000/year</li>
                  <li>• Registered business name</li>
                  <li>• Business bank account and employees</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="border-l-4 border-green-500 pl-3">
                  <h5 className="font-semibold text-green-700">SSM Status:</h5>
                  <p className="text-sm text-muted-foreground">Required - Partnership registration</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3">
                  <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                  <p className="text-sm text-muted-foreground">Yes - business TIN + individual TINs</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-3">
                  <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                  <p className="text-sm text-muted-foreground">Form P (Partnership) + Form B (Individual)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Registration Process */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">SSM Registration</h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li>1. Choose business structure (Sole Proprietor/Partnership/Company)</li>
                <li>2. Reserve business name (if applicable)</li>
                <li>3. Prepare required documents (IC, address proof)</li>
                <li>4. Submit application online or at SSM office</li>
                <li>5. Pay registration fees (RM30-1,000 depending on structure)</li>
                <li>6. Receive business registration certificate</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">TIN Registration</h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li>1. Visit LHDNM office or register online</li>
                <li>2. Provide personal identification (IC/Passport)</li>
                <li>3. Complete registration form</li>
                <li>4. Receive TIN immediately (if in person)</li>
                <li>5. TIN will be mailed if registered online</li>
                <li>6. Use TIN for all future tax filings</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function IndividualIncomeExpenses() {
  return (
    <div className="space-y-6 min-h-[70vh] flex flex-col">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Income & Expenses Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Track your income and expenses to calculate your net profit. This information is essential 
            for accurate tax filing and financial planning. Add multiple income and expense items 
            with detailed categories for better organization.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-900 mb-2">Key Features:</h3>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Real-time net profit calculation</li>
              <li>• Monthly or yearly period selection</li>
              <li>• Predefined income and expense categories</li>
              <li>• Add/remove multiple items dynamically</li>
              <li>• Form validation with error messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Income & Expenses Form */}
      <IndividualIncomeExpensesForm />
    </div>
  );
}

function IndividualChecklist() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tax Preparation Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Use this checklist to ensure you have all the necessary documents and information 
            ready for your tax filing.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-900 mb-2">Key Features:</h3>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Organize your tax documents</li>
              <li>• Check for missing or incomplete documents</li>
              <li>• Ensure all required information is provided</li>
              <li>• Review and update your tax records</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tax Preparation Checklist Component */}
      <TaxPreparationChecklist />
    </div>
  );
}

// ===== SOLE PROPRIETOR COMPONENTS =====

function SolePropOverview() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sole Proprietorship Tax Declaration in Malaysia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Sole proprietorship is a popular business structure in Malaysia where an individual owns and operates 
            a business in their personal capacity. This structure offers simplicity but comes with specific 
            tax obligations and compliance requirements under Malaysian law.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Key Points:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Business income is taxed as personal income</li>
              <li>• SSM registration is mandatory for business activities</li>
              <li>• Quarterly tax payments (CP204) required if income exceeds RM500,000</li>
              <li>• Form B (Business Income) filing required annually</li>
              <li>• Unlimited personal liability for business debts</li>
            </ul>
    </div>
        </CardContent>
      </Card>

      {/* Business Structure Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sole Proprietorship */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Sole Proprietorship
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A business owned and operated by one person, where the business and owner are legally the same entity.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Advantages</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Simple and inexpensive to set up</li>
                  <li>• Full control over business decisions</li>
                  <li>• All profits belong to the owner</li>
                  <li>• Minimal regulatory requirements</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">Disadvantages</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Unlimited personal liability</li>
                  <li>• Limited access to financing</li>
                  <li>• Business ends with owner&apos;s death</li>
                  <li>• Higher tax rates for high income</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Obligations */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Tax Obligations
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Sole proprietors have specific tax obligations that differ from employees and companies.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Income Tax</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Business income taxed as personal income</li>
                  <li>• Progressive rates from 0% to 30%</li>
                  <li>• Form B filing required annually</li>
                  <li>• April 30th deadline for filing</li>
              </ul>
            </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Quarterly Payments</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• CP204 if income exceeds RM500,000</li>
                  <li>• Due on 15th of 3rd, 6th, 9th, 12th month</li>
                  <li>• Based on estimated annual income</li>
                  <li>• Penalties for late payment</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700">Compliance</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Maintain proper accounting records</li>
                  <li>• Keep business and personal finances separate</li>
                  <li>• Submit annual tax returns</li>
                  <li>• Pay taxes on time</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Important Considerations */}
      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Compliance Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SSM registration mandatory</li>
                <li>• Business license (if required by industry)</li>
                <li>• GST registration (if turnover &gt; RM500,000)</li>
                <li>• Proper accounting records for 7 years</li>
              </ul>
                </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Available Deductions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Business operating expenses</li>
                <li>• Office and equipment costs</li>
                <li>• Professional development</li>
                <li>• Business-related travel</li>
              </ul>
                </div>
                </div>
        </CardContent>
      </Card>

      {/* E-Invoicing Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            E-Invoicing Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Malaysia has implemented mandatory e-invoicing for all businesses, including sole proprietorships. 
            Compliance is based on annual turnover, not business structure.
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Implementation Timeline:</h4>
            <ul className="text-orange-800 space-y-1 text-sm">
              <li>• <strong>August 2024:</strong> Turnover &gt; RM100 million</li>
              <li>• <strong>January 2025:</strong> Turnover RM25M - RM100M</li>
              <li>• <strong>July 2025:</strong> Turnover RM5M - RM25M</li>
              <li>• <strong>January 2026:</strong> Turnover RM1M - RM5M</li>
              <li>• <strong>July 2026:</strong> All remaining businesses</li>
              <li>• <strong>Exempt:</strong> Turnover &lt; RM500,000</li>
            </ul>
                </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">🔧 Technical Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• XML/JSON format (UBL 2.1 standard)</li>
                <li>• MyInvois portal or API integration</li>
                <li>• Digital certificate for signing</li>
                <li>• Real-time validation required</li>
                <li>• QR code generation for delivery</li>
              </ul>
                </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Compliance Obligations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit all invoices to MyInvois</li>
                <li>• 72-hour window for corrections</li>
                <li>• 7-year archiving requirement</li>
                <li>• Penalties: RM200-RM20,000 per violation</li>
                <li>• Cross-border transactions need special handling</li>
              </ul>
                </div>
              </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Support Available:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• 6-month grace period for each phase</li>
              <li>• Free MyInvois Portal access</li>
              <li>• Tax deduction up to RM50,000 for MSME implementation costs</li>
              <li>• Technical support: 03-8682 8000</li>
              <li>• Consolidated e-invoice option during transition</li>
            </ul>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SolePropSSMTaxStatus() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SSM Registration & Tax Status for Sole Proprietorship</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Sole proprietors must register their business with SSM (Companies Commission of Malaysia) 
            and obtain a Tax Identification Number (TIN) from LHDNM. This registration is mandatory 
            for all business activities in Malaysia.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Important:</h3>
            <ul className="text-orange-800 space-y-1 text-sm">
              <li>• SSM registration is MANDATORY for all business activities</li>
              <li>• Operating without registration is illegal</li>
              <li>• Registration fees: RM30 for sole proprietorship</li>
              <li>• Annual renewal required</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      {/* SSM Forms & Acts Accordion */}
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="forms">
          <AccordionTrigger>Key Forms (SSM / LHDN / EPF / SOCSO)</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Form</th>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Form A (Borang A)</td><td className="border p-2">Registration of Business</td><td className="border p-2">Register a sole proprietorship or partnership under the Registration of Businesses Act 1956.</td></tr>
                  <tr><td className="border p-2">Form B (LHDN)</td><td className="border p-2">Income Tax Return</td><td className="border p-2">Annual tax declaration by a sole proprietor. Due 30 June every year.</td></tr>
                  <tr><td className="border p-2">CP500</td><td className="border p-2">Tax Instalment Scheme</td><td className="border p-2">Advance payment of income tax based on estimated income. Issued by LHDN.</td></tr>
                  <tr><td className="border p-2">EPF Form KWSP 3</td><td className="border p-2">EPF Registration</td><td className="border p-2">Register as an employer with EPF (KWSP).</td></tr>
                  <tr><td className="border p-2">SOCSO Form 1</td><td className="border p-2">SOCSO Employer Registration</td><td className="border p-2">Register as employer under SOCSO for employee protection.</td></tr>
                  <tr><td className="border p-2">EIS Form SIP 1A</td><td className="border p-2">EIS Employer Registration</td><td className="border p-2">Required under Employment Insurance System Act 2017.</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="acts">
          <AccordionTrigger>Key Acts & Laws</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Act</th>
                    <th className="p-2 border">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Registration of Businesses Act 1956</td><td className="border p-2">Governs registration and regulation of sole proprietors and partnerships.</td></tr>
                  <tr><td className="border p-2">Income Tax Act 1967</td><td className="border p-2">Governs tax responsibilities for individuals and businesses.</td></tr>
                  <tr><td className="border p-2">Employment Act 1955</td><td className="border p-2">Covers working hours, leaves, contracts if you hire employees.</td></tr>
                  <tr><td className="border p-2">Employees Provident Fund Act 1991 (EPF)</td><td className="border p-2">Governs mandatory contributions to EPF.</td></tr>
                  <tr><td className="border p-2">SOCSO Act & Employment Insurance System Act 2017</td><td className="border p-2">Social security protection and unemployment insurance for employees.</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Registration Requirements */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* SSM Registration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              SSM Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Required Documents</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Malaysian IC or Passport</li>
                  <li>• Proof of business address</li>
                  <li>• Business name (if applicable)</li>
                  <li>• Business activity description</li>
                </ul>
    </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Registration Process</h4>
                <ol className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>1. Choose business name (optional)</li>
                  <li>2. Prepare required documents</li>
                  <li>3. Submit application online/offline</li>
                  <li>4. Pay registration fee (RM30)</li>
                  <li>5. Receive business registration certificate</li>
                </ol>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700">Ongoing Obligations</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Annual renewal (RM30/year)</li>
                  <li>• Update business information changes</li>
                  <li>• Maintain business records</li>
                  <li>• Comply with business regulations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Registration */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Tax Registration (TIN)
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">TIN Requirements</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Required for all business income</li>
                  <li>• One TIN for all business activities</li>
                  <li>• Must be obtained before starting business</li>
                  <li>• Used for all tax filings</li>
            </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Registration Process</h4>
                <ol className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>1. Visit LHDNM office or register online</li>
                  <li>2. Provide personal identification</li>
                  <li>3. Complete registration form</li>
                  <li>4. Receive TIN immediately</li>
                  <li>5. Use TIN for tax filings</li>
                </ol>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Tax Filing</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Form B (Business Income) annually</li>
                  <li>• CP204 quarterly payments (if applicable)</li>
                  <li>• April 30th deadline for annual filing</li>
                  <li>• Keep records for 7 years</li>
                </ul>
              </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Business Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Business Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Scenario 1 */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <span className="text-2xl">👨‍💼</span>
                  New Freelancer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Profile:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Starting freelance consulting</li>
                    <li>• Expected income: RM50,000/year</li>
                    <li>• Working from home</li>
                    <li>• No employees</li>
                  </ul>
                  </div>
                
                <div className="space-y-2">
                  <div className="border-l-4 border-green-500 pl-3">
                    <h5 className="font-semibold text-green-700">SSM Status:</h5>
                    <p className="text-sm text-muted-foreground">Required - Sole Proprietorship</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                    <p className="text-sm text-muted-foreground">Yes - Business TIN</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                    <p className="text-sm text-muted-foreground">Form B (Business Income)</p>
                  </div>
                  </div>
              </CardContent>
            </Card>

            {/* Scenario 2 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <span className="text-2xl">🏪</span>
                  Retail Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Profile:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Small retail shop</li>
                    <li>• Annual turnover: RM300,000</li>
                    <li>• 2 part-time employees</li>
                    <li>• Physical business location</li>
                  </ul>
                  </div>
                
                <div className="space-y-2">
                  <div className="border-l-4 border-green-500 pl-3">
                    <h5 className="font-semibold text-green-700">SSM Status:</h5>
                    <p className="text-sm text-muted-foreground">Required - Sole Proprietorship</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                    <p className="text-sm text-muted-foreground">Yes - Business TIN</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                    <p className="text-sm text-muted-foreground">Form B + CP204 (quarterly)</p>
              </div>
            </div>
        </CardContent>
      </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SolePropIncomeExpenses() {
  return (
    <div className="space-y-6 min-h-[70vh] flex flex-col">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Business Income & Expenses Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Track your business income and expenses to calculate your net profit. As a sole proprietor, 
            your business income is taxed as personal income, so accurate record-keeping is essential.
          </p>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-900 mb-2">Key Features:</h3>
            <ul className="text-green-800 space-y-1 text-sm">
              <li>• Real-time net profit calculation</li>
              <li>• Business-specific expense categories</li>
              <li>• Monthly or yearly period selection</li>
              <li>• Track multiple income sources</li>
              <li>• Identify tax-deductible expenses</li>
              </ul>
            </div>
        </CardContent>
      </Card>

      {/* Income & Expenses Form */}
      <SolePropIncomeExpensesForm />
    </div>
  );
}

// ===== COMPANY (SDN BHD) COMPONENTS =====

function CompanyOverview() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Private Limited Company (Sdn Bhd) Tax Declaration in Malaysia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            A Private Limited Company (Sdn Bhd) is a separate legal entity from its shareholders, 
            offering limited liability protection and potential tax advantages. Companies are subject 
            to corporate tax rates and have specific compliance requirements under Malaysian law.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Key Points:</h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Separate legal entity from shareholders</li>
              <li>• Corporate tax rate of 24% (2024)</li>
              <li>• SSM registration and annual compliance required</li>
              <li>• Form C (Company) filing required annually</li>
              <li>• Limited liability for shareholders</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Business Structure Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Private Limited Company */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              Private Limited Company (Sdn Bhd)
            </CardTitle>
        </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A separate legal entity owned by shareholders, offering limited liability and potential tax advantages.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Advantages</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Limited liability for shareholders</li>
                  <li>• Separate legal entity</li>
                  <li>• Easier access to financing</li>
                  <li>• Potential tax advantages</li>
                  <li>• Professional image</li>
                </ul>
                  </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">Disadvantages</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Higher setup and maintenance costs</li>
                  <li>• More complex compliance requirements</li>
                  <li>• Annual audit requirements</li>
                  <li>• Corporate tax rates</li>
                </ul>
                  </div>
                  </div>
          </CardContent>
        </Card>

        {/* Tax Obligations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Tax Obligations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Companies have specific tax obligations that differ from individuals and sole proprietors.
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Corporate Tax</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• 24% corporate tax rate (2024)</li>
                  <li>• Taxed on company profits</li>
                  <li>• Form C filing required annually</li>
                  <li>• July 31st deadline for filing</li>
                </ul>
                  </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Quarterly Payments</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• CP204 mandatory for all companies</li>
                  <li>• Due on 15th of 3rd, 6th, 9th, 12th month</li>
                  <li>• Based on estimated annual profit</li>
                  <li>• Penalties for late payment</li>
                </ul>
                  </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700">Compliance</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Annual audit required</li>
                  <li>• Maintain proper accounting records</li>
                  <li>• Submit annual returns to SSM</li>
                  <li>• Pay taxes on time</li>
                </ul>
              </div>
            </div>
        </CardContent>
      </Card>
      </div>

      {/* Important Considerations */}
      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Compliance Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• SSM registration and annual returns</li>
                <li>• Annual audit by licensed auditor</li>
                <li>• GST registration (if turnover &gt; RM500,000)</li>
                <li>• Proper accounting records for 7 years</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">✅ Available Deductions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Business operating expenses</li>
                <li>• Employee salaries and benefits</li>
                <li>• Depreciation and amortization</li>
                <li>• Research and development costs</li>
              </ul>
            </div>
    </div>
        </CardContent>
      </Card>

      {/* E-Invoicing Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            E-Invoicing Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Malaysia has implemented mandatory e-invoicing for all businesses, including sole proprietorships. 
            Compliance is based on annual turnover, not business structure.
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Implementation Timeline:</h4>
            <ul className="text-orange-800 space-y-1 text-sm">
              <li>• <strong>August 2024:</strong> Turnover &gt; RM100 million</li>
              <li>• <strong>January 2025:</strong> Turnover RM25M - RM100M</li>
              <li>• <strong>July 2025:</strong> Turnover RM5M - RM25M</li>
              <li>• <strong>January 2026:</strong> Turnover RM1M - RM5M</li>
              <li>• <strong>July 2026:</strong> All remaining businesses</li>
              <li>• <strong>Exempt:</strong> Turnover &lt; RM500,000</li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">🔧 Technical Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• XML/JSON format (UBL 2.1 standard)</li>
                <li>• MyInvois portal or API integration</li>
                <li>• Digital certificate for signing</li>
                <li>• Real-time validation required</li>
                <li>• QR code generation for delivery</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600">⚠️ Compliance Obligations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit all invoices to MyInvois</li>
                <li>• 72-hour window for corrections</li>
                <li>• 7-year archiving requirement</li>
                <li>• Penalties: RM200-RM20,000 per violation</li>
                <li>• Cross-border transactions need special handling</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Support Available:</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• 6-month grace period for each phase</li>
              <li>• Free MyInvois Portal access</li>
              <li>• Tax deduction up to RM50,000 for MSME implementation costs</li>
              <li>• Technical support: 03-8682 8000</li>
              <li>• Consolidated e-invoice option during transition</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanySSMTaxStatus() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SSM Registration & Tax Status for Private Limited Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Private Limited Companies must register with SSM (Companies Commission of Malaysia) 
            and obtain a Tax Identification Number (TIN) from LHDNM. Companies have more complex 
            compliance requirements compared to sole proprietorships.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-orange-900 mb-2">Important:</h3>
            <ul className="text-orange-800 space-y-1 text-sm">
              <li>• SSM registration is MANDATORY for all companies</li>
              <li>• Annual audit by licensed auditor required</li>
              <li>• Registration fees: RM1,000 for private company</li>
              <li>• Annual returns must be filed with SSM</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      {/* SSM Forms & Acts Accordion */}
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="forms">
          <AccordionTrigger>Key Forms (SSM / LHDN / KWSP / SOCSO)</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Form</th>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Superform (Section 14)</td><td className="border p-2">Incorporation of a Sdn Bhd</td><td className="border p-2">Register a new private limited company via MyCoID portal.</td></tr>
                  <tr><td className="border p-2">Section 17</td><td className="border p-2">Appointment of First Directors</td><td className="border p-2">Declaration by directors upon company registration.</td></tr>
                  <tr><td className="border p-2">Section 58</td><td className="border p-2">Changes in Director/Secretary/Address</td><td className="border p-2">Update SSM on company changes.</td></tr>
                  <tr><td className="border p-2">Section 78</td><td className="border p-2">Allotment of Shares</td><td className="border p-2">For issuance of new shares.</td></tr>
                  <tr><td className="border p-2">Form EA</td><td className="border p-2">Employee Remuneration Statement</td><td className="border p-2">Given to employees for tax filing.</td></tr>
                  <tr><td className="border p-2">Form E (LHDN)</td><td className="border p-2">Employer Return Form</td><td className="border p-2">Annual declaration of all employees&apos; earnings to LHDN.</td></tr>
                  <tr><td className="border p-2">Form C (LHDN)</td><td className="border p-2">Company Income Tax Return</td><td className="border p-2">For corporate tax filing. Due 7 months after end of financial year.</td></tr>
                  <tr><td className="border p-2">Form CP204</td><td className="border p-2">Estimate of Tax Payable</td><td className="border p-2">Annual estimate of company tax payable, must be submitted within 3 months of new basis period.</td></tr>
                  <tr><td className="border p-2">Form CP204A</td><td className="border p-2">Amendment to CP204</td><td className="border p-2">If actual profits deviate significantly from the estimate.</td></tr>
                  <tr><td className="border p-2">Form 49 (Old)</td><td className="border p-2">Changes in Company Officers (Old)</td><td className="border p-2">Used prior to Companies Act 2016. Now replaced by Section 58.</td></tr>
                  <tr><td className="border p-2">Form KWSP 1 (EPF)</td><td className="border p-2">Company EPF Registration</td><td className="border p-2"></td></tr>
                  <tr><td className="border p-2">SOCSO Form 1</td><td className="border p-2">Company SOCSO Registration</td><td className="border p-2"></td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="acts">
          <AccordionTrigger>Key Acts & Laws</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border">Act</th>
                    <th className="p-2 border">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Companies Act 2016</td><td className="border p-2">Main act regulating Sdn Bhd incorporation, structure, and compliance.</td></tr>
                  <tr><td className="border p-2">Income Tax Act 1967</td><td className="border p-2">Corporate tax obligations and structure.</td></tr>
                  <tr><td className="border p-2">Employment Act 1955</td><td className="border p-2">If you hire employees, governs contracts, benefits, hours, etc.</td></tr>
                  <tr><td className="border p-2">Companies Commission of Malaysia Act 2001</td><td className="border p-2">Governs SSM&apos;s operations.</td></tr>
                  <tr><td className="border p-2">Labuan Companies Act 1990</td><td className="border p-2">Applies only if company is based in Labuan.</td></tr>
                  <tr><td className="border p-2">EPF Act 1991, SOCSO Act, EIS Act 2017</td><td className="border p-2">Governs employee contributions and protections.</td></tr>
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Registration Requirements */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* SSM Registration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              SSM Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Required Documents</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Company name reservation</li>
                  <li>• Memorandum & Articles of Association</li>
                  <li>• Directors&apos; and shareholders&apos; details</li>
                  <li>• Registered office address</li>
                  <li>• Business activity description</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Registration Process</h4>
                <ol className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>1. Reserve company name</li>
                  <li>2. Prepare incorporation documents</li>
                  <li>3. Submit application to SSM</li>
                  <li>4. Pay registration fee (RM1,000)</li>
                  <li>5. Receive Certificate of Incorporation</li>
                </ol>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-700">Ongoing Obligations</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Annual returns to SSM</li>
                  <li>• Annual audit by licensed auditor</li>
                  <li>• Maintain statutory books</li>
                  <li>• Hold annual general meetings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Registration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Tax Registration (TIN)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">TIN Requirements</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Required for all companies</li>
                  <li>• Separate TIN from shareholders</li>
                  <li>• Must be obtained after incorporation</li>
                  <li>• Used for all corporate tax filings</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-700">Registration Process</h4>
                <ol className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>1. Complete SSM incorporation</li>
                  <li>2. Visit LHDNM office or register online</li>
                  <li>3. Provide company documents</li>
                  <li>4. Complete registration form</li>
                  <li>5. Receive company TIN</li>
                </ol>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-700">Tax Filing</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Form C (Company) annually</li>
                  <li>• CP204 quarterly payments (mandatory)</li>
                  <li>• July 31st deadline for annual filing</li>
                  <li>• Keep records for 7 years</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Company Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Scenario 1 */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <span className="text-2xl">💼</span>
                  New Technology Company
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Profile:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Software development company</li>
                    <li>• Expected revenue: RM200,000/year</li>
                    <li>• 3 employees</li>
                    <li>• Office space rented</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="border-l-4 border-green-500 pl-3">
                    <h5 className="font-semibold text-green-700">SSM Status:</h5>
                    <p className="text-sm text-muted-foreground">Required - Private Limited Company</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                    <p className="text-sm text-muted-foreground">Yes - Company TIN</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                    <p className="text-sm text-muted-foreground">Form C (Company) + CP204</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenario 2 */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <span className="text-2xl">🏭</span>
                  Manufacturing Company
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Profile:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Small manufacturing business</li>
                    <li>• Business&apos;s annual turnover.</li>
                    <li>• 15 employees</li>
                    <li>• Factory and office premises</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="border-l-4 border-green-500 pl-3">
                    <h5 className="font-semibold text-green-700">SSM Status:</h5>
                    <p className="text-sm text-muted-foreground">Required - Private Limited Company</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h5 className="font-semibold text-blue-700">TIN Required:</h5>
                    <p className="text-sm text-muted-foreground">Yes - Company TIN</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h5 className="font-semibold text-purple-700">Tax Form:</h5>
                    <p className="text-sm text-muted-foreground">Form C + CP204 + GST (if applicable)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanyIncomeExpenses() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Income & Expenses for Company (Sdn Bhd)</h1>
      <CompanyIncomeExpensesForm />
    </div>
  );
}



function IndividualEInvoicing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">E-Invoicing for Individuals</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How E-Invoicing Affects You as an Individual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            As an individual, the e-invoicing mandate applies to you ONLY if you are conducting business activities. This includes freelancers, consultants, and anyone with side income. It does not apply to pure salary earners.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">You MUST Issue E-Invoices If:</h4>
              <ul className="text-sm text-orange-800 space-y-1 list-disc pl-5">
                <li>You are a freelancer or consultant.</li>
                <li>You run an online store or dropshipping business.</li>
                <li>You receive commissions or professional fees.</li>
                <li>You file your taxes using Form B (Business Income).</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">You DO NOT Issue E-Invoices If:</h4>
              <ul className="text-sm text-green-800 space-y-1 list-disc pl-5">
                <li>You only earn a salary from an employer.</li>
                <li>You have no business or side income.</li>
                <li>You file your taxes using Form BE (Employment Income).</li>
                <li>You may still receive e-invoices for your purchases.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">📅 Implementation Timeline (Based on Business Turnover)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              The requirement to start issuing e-invoices depends on your annual business turnover, not your total personal income.
            </p>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4 bg-green-50">
                  <Badge className="bg-green-600">Phase 1: Aug 2024</Badge>
                  <p className="font-semibold mt-2">Turnover &gt; RM100 million</p>
                </div>
                <div className="border rounded-lg p-4 bg-blue-50">
                  <Badge className="bg-blue-600">Phase 2: Jan 2025</Badge>
                  <p className="font-semibold mt-2">Turnover RM25M - RM100M</p>
                </div>
                <div className="border rounded-lg p-4 bg-orange-50">
                  <Badge className="bg-orange-600">Phase 3: Jul 2025</Badge>
                  <p className="font-semibold mt-2">Turnover RM5M - RM25M</p>
                </div>
                <div className="border rounded-lg p-4 bg-purple-50">
                  <Badge className="bg-purple-600">Phase 4: Jan 2026</Badge>
                  <p className="font-semibold mt-2">Turnover RM1M - RM5M</p>
                </div>
                <div className="border rounded-lg p-4 bg-red-50">
                  <Badge className="bg-red-600">Phase 5: Jul 2026</Badge>
                  <p className="font-semibold mt-2">Turnover up to RM1M</p>
                </div>
                <div className="border rounded-lg p-4 bg-gray-100">
                  <Badge variant="secondary">Exempt</Badge>
                  <p className="font-semibold mt-2">Turnover &lt; RM500,000</p>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="compliance">
          <AccordionTrigger>Compliance & Key Requirements</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">If you are required to issue e-invoices, you must adhere to the following:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Submit invoices to the MyInvois Portal for validation before sending to clients.</li>
                <li>Use either XML or JSON format for your invoices.</li>
                <li>There is a 72-hour window to cancel or have a client reject an invoice after validation.</li>
                <li>Penalties for non-compliance range from RM200 to RM20,000 per violation.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="resources">
          <AccordionTrigger>Support for Individuals & MSMEs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="font-semibold">The government provides several support measures:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>A 6-month grace period for each implementation phase.</li>
                <li>Free access to the MyInvois Portal for manual invoice creation.</li>
                <li>Tax deduction of up to RM50,000 for e-invoicing implementation costs for MSMEs.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function SolePropEInvoicing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">E-Invoicing for Sole Proprietorships</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">E-Invoicing Obligations for Your Business</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            As a sole proprietorship is a registered business, it must comply with the e-invoicing mandate. The rules apply to the business entity, and the implementation date is determined by the business's annual turnover.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Key Considerations for Sole Proprietors:</h3>
            <ul className="text-blue-800 space-y-1 text-sm list-disc pl-5">
              <li>E-invoicing is mandatory for your business based on its turnover.</li>
              <li>You will use your personal Tax Identification Number (TIN) for e-invoices, as the business is not a separate legal entity.</li>
              <li>All sales, services, and business-to-business transactions must be recorded via e-invoice.</li>
              <li>This replaces the need to issue traditional paper or PDF invoices.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">📅 Implementation Timeline (Based on Business Turnover)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your business must start issuing e-invoices based on its annual turnover.
            </p>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <Badge className="bg-green-600">Phase 1: Aug 2024</Badge>
                    <p className="font-semibold mt-2">Turnover &gt; RM100 million</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <Badge className="bg-blue-600">Phase 2: Jan 2025</Badge>
                    <p className="font-semibold mt-2">Turnover RM25M - RM100M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-orange-50">
                    <Badge className="bg-orange-600">Phase 3: Jul 2025</Badge>
                    <p className="font-semibold mt-2">Turnover RM5M - RM25M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-purple-50">
                    <Badge className="bg-purple-600">Phase 4: Jan 2026</Badge>
                    <p className="font-semibold mt-2">Turnover RM1M - RM5M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-red-50">
                    <Badge className="bg-red-600">Phase 5: Jul 2026</Badge>
                    <p className="font-semibold mt-2">Turnover up to RM1M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-100">
                    <Badge variant="secondary">Exempt</Badge>
                    <p className="font-semibold mt-2">Turnover &lt; RM500,000</p>
                  </div>
              </div>
            </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="process">
          <AccordionTrigger>The E-Invoicing Process for Your Business</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">The process is standardized for all businesses:</p>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li><strong>Create Invoice:</strong> Generate an invoice in XML or JSON format. You can use accounting software or the free MyInvois Portal.</li>
                <li><strong>Submit for Validation:</strong> Send the invoice to the IRBM's MyInvois system via API or the portal.</li>
                <li><strong>Receive Validated Invoice:</strong> Once validated, IRBM returns the invoice with a Unique Identifier Number (UIN) and a QR code.</li>
                <li><strong>Share with Customer:</strong> Share the validated invoice (usually the PDF with the QR code) with your customer.</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="compliance">
          <AccordionTrigger>Compliance and Record Keeping</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="font-semibold">Key compliance points:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>You must issue e-invoices for all business transactions, including those to individuals.</li>
                <li>For purchases from suppliers not yet on e-invoicing, you may need to issue a "self-billed" e-invoice to record the expense.</li>
                <li>All e-invoices must be archived for 7 years. The MyInvois system will store a copy.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CompanyEInvoicing() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">E-Invoicing for Companies (Sdn Bhd)</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Corporate E-Invoicing and Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            For companies (Sdn Bhd), e-invoicing is a mandatory part of tax compliance. As a separate legal entity, the company has its own Tax Identification Number (TIN) and must adhere to the e-invoicing framework based on its annual turnover.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <h3 className="font-semibold text-red-900 mb-2">Key Implications for Companies:</h3>
            <ul className="text-red-800 space-y-1 text-sm list-disc pl-5">
              <li>The company&apos;s TIN (not the directors&apos;) must be used on all e-invoices.</li>
              <li>E-invoicing integrates directly into the company&apos;s financial and tax reporting process.</li>
              <li>Crucial for corporate tax filings (Form C) and proving business expenses.</li>
              <li>API integration with existing ERP or accounting systems is highly recommended for efficiency.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">📅 Implementation Timeline (Based on Company Turnover)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your company&apos;s mandatory start date is determined by its annual turnover from the audited financial statements.
            </p>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <Badge className="bg-green-600">Phase 1: Aug 2024</Badge>
                    <p className="font-semibold mt-2">Turnover &gt; RM100 million</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <Badge className="bg-blue-600">Phase 2: Jan 2025</Badge>
                    <p className="font-semibold mt-2">Turnover RM25M - RM100M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-orange-50">
                    <Badge className="bg-orange-600">Phase 3: Jul 2025</Badge>
                    <p className="font-semibold mt-2">Turnover RM5M - RM25M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-purple-50">
                    <Badge className="bg-purple-600">Phase 4: Jan 2026</Badge>
                    <p className="font-semibold mt-2">Turnover RM1M - RM5M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-red-50">
                    <Badge className="bg-red-600">Phase 5: Jul 2026</Badge>
                    <p className="font-semibold mt-2">Turnover up to RM1M</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-100">
                    <Badge variant="secondary">Exempt</Badge>
                    <p className="font-semibold mt-2">Turnover &lt; RM500,000</p>
                  </div>
              </div>
            </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="integration">
          <AccordionTrigger>System Integration and B2B Transactions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                For companies, seamless integration is key. <span className="font-semibold text-red-700">Note: API integration with the MyInvois system is a technical process that typically requires hiring a software developer or IT professional. Most companies will not be able to do this themselves without technical expertise.</span>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>API Integration:</strong> Connect your ERP or accounting software directly to the MyInvois system to automate invoice submission and validation. <span className="text-muted-foreground">(Requires developer/IT support)</span></li>
                <li><strong>Cross-Border Transactions:</strong> For imports, the company must issue a "self-billed" e-invoice. For exports, a standard e-invoice is issued to the foreign buyer.</li>
                <li><strong>Intercompany Transactions:</strong> E-invoices are required for transactions between related companies.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="benefits">
          <AccordionTrigger>Benefits for Your Company</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p className="font-semibold">Adopting e-invoicing offers several advantages:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Streamlines accounts receivable and payable processes.</li>
                <li>Improves accuracy and reduces manual data entry errors.</li>
                <li>Enhances cash flow management with faster invoice processing.</li>
                <li>Ensures digital and standardized tax compliance.</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}