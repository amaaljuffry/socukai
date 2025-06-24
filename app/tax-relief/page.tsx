"use client";

import { useState } from "react";

// Data structures for reliefs and deductions
const personalReliefs = [
  { id: "individual", name: "Individual and dependent relatives", max: 9000, description: "Standard relief for all taxpayers and their dependents." },
  { id: "parentMedical", name: "Medical expenses for parents", max: 8000, description: "Medical, dental, special needs, and carer expenses for parents (with doctor certification)." },
  { id: "disabled", name: "Disabled individual", max: 6000, description: "For individuals registered as disabled." },
  // ...add more as needed
];

const businessDeductions = [
  { id: "rent", name: "Business Rent", description: "Rental paid for business premises." },
  { id: "utilities", name: "Utilities", description: "Electricity, water, and other utilities for business use." },
  { id: "supplies", name: "Supplies", description: "Office and business supplies." },
  // ...add more as needed
];

const companyIncentives = [
  { id: "capitalAllowance", name: "Capital Allowance", description: "Claim depreciation on business assets." },
  // ...add more as needed
];

function ReliefForm({ reliefs, values, setValues }: { reliefs: { id: string; name: string; max: number; description: string }[]; values: Record<string, number>; setValues: React.Dispatch<React.SetStateAction<Record<string, number>>> }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Personal Tax Reliefs</h3>
      {reliefs.map((r: { id: string; name: string; max: number; description: string }) => (
        <div key={r.id} className="mb-3">
          <label className="block font-medium">{r.name} (Max: RM{r.max})
            <span title={r.description} className="ml-2 cursor-help text-blue-500">?</span>
          </label>
          <input
            type="number"
            max={r.max}
            min={0}
            value={values[r.id] || ""}
            onChange={e => setValues((v: Record<string, number>) => ({ ...v, [r.id]: Math.min(Number(e.target.value), r.max) }))}
            className="border rounded px-2 py-1 w-40"
          />
        </div>
      ))}
    </div>
  );
}

function BusinessForm({ deductions, values, setValues }: { deductions: { id: string; name: string; description: string }[]; values: Record<string, number>; setValues: React.Dispatch<React.SetStateAction<Record<string, number>>> }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Business Income & Expenses</h3>
      {deductions.map((d: { id: string; name: string; description: string }) => (
        <div key={d.id} className="mb-3">
          <label className="block font-medium">{d.name}
            <span title={d.description} className="ml-2 cursor-help text-blue-500">?</span>
          </label>
          <input
            type="number"
            min={0}
            value={values[d.id] || ""}
            onChange={e => setValues((v: Record<string, number>) => ({ ...v, [d.id]: Number(e.target.value) }))}
            className="border rounded px-2 py-1 w-40"
          />
        </div>
      ))}
    </div>
  );
}

function CompanyIncentivesForm({ incentives, values, setValues }: { incentives: { id: string; name: string; description: string }[]; values: Record<string, number>; setValues: React.Dispatch<React.SetStateAction<Record<string, number>>> }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Company Tax Incentives</h3>
      {incentives.map((i: { id: string; name: string; description: string }) => (
        <div key={i.id} className="mb-3">
          <label className="block font-medium">{i.name}
            <span title={i.description} className="ml-2 cursor-help text-blue-500">?</span>
          </label>
          <input
            type="number"
            min={0}
            value={values[i.id] || ""}
            onChange={e => setValues((v: Record<string, number>) => ({ ...v, [i.id]: Number(e.target.value) }))}
            className="border rounded px-2 py-1 w-40"
          />
        </div>
      ))}
    </div>
  );
}

export default function TaxReliefPage() {
  const [entityType, setEntityType] = useState("");
  const [personalValues, setPersonalValues] = useState({});
  const [businessValues, setBusinessValues] = useState({});
  const [companyValues, setCompanyValues] = useState({});
  const [businessIncome, setBusinessIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");

  // Calculation logic
  const sum = (obj: Record<string, number | string | undefined>): number => Object.values(obj).reduce((a: number, b) => a + (Number(b) || 0), 0);
  let summary = null;
  if (entityType === "individual") {
    const totalReliefs: number = sum(personalValues);
    summary = (
      <div className="mt-4 p-4 bg-green-50 rounded">
        <strong>Your total tax reliefs:</strong> RM{totalReliefs.toLocaleString()}
      </div>
    );
  } else if (entityType === "soleprop") {
    const netBusiness: number = Number(businessIncome) - sum(businessValues);
    const totalReliefs: number = sum(personalValues);
    summary = (
      <div className="mt-4 p-4 bg-green-50 rounded">
        <div><strong>Your net business income:</strong> RM{netBusiness.toLocaleString()}</div>
        <div><strong>Your total tax reliefs:</strong> RM{totalReliefs.toLocaleString()}</div>
        <div><strong>Your taxable income:</strong> RM{(netBusiness + Number(otherIncome) - totalReliefs).toLocaleString()}</div>
      </div>
    );
  } else if (entityType === "company") {
    const netBusiness: number = Number(businessIncome) - sum(businessValues);
    const totalIncentives: number = sum(companyValues);
    summary = (
      <div className="mt-4 p-4 bg-green-50 rounded">
        <div><strong>Your net business income:</strong> RM{netBusiness.toLocaleString()}</div>
        <div><strong>Your company&apos;s taxable income:</strong> RM{(netBusiness - totalIncentives).toLocaleString()}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tax Relief &amp; Deductions</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Who are you filing as?</label>
        <select
          value={entityType}
          onChange={e => {
            setEntityType(e.target.value);
            setPersonalValues({});
            setBusinessValues({});
            setCompanyValues({});
            setBusinessIncome("");
            setOtherIncome("");
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">Select...</option>
          <option value="individual">Individual</option>
          <option value="soleprop">Sole Proprietor</option>
          <option value="company">Company (Sdn Bhd)</option>
        </select>
        {entityType === "soleprop" && (
          <div className="mt-2 text-blue-700 text-sm">You can claim both business expenses and personal tax reliefs.</div>
        )}
        {entityType === "company" && (
          <div className="mt-2 text-blue-700 text-sm">Companies can only claim business expenses and certain incentives, not personal reliefs.</div>
        )}
      </div>
      {entityType === "individual" && (
        <ReliefForm reliefs={personalReliefs} values={personalValues} setValues={setPersonalValues} />
      )}
      {entityType === "soleprop" && (
        <>
          <div className="mb-4">
            <label className="block font-medium">Business Income</label>
            <input
              type="number"
              min={0}
              value={businessIncome}
              onChange={e => setBusinessIncome(e.target.value)}
              className="border rounded px-2 py-1 w-40"
            />
          </div>
          <BusinessForm deductions={businessDeductions} values={businessValues} setValues={setBusinessValues} />
          <div className="mb-4">
            <label className="block font-medium">Other Income (optional)</label>
            <input
              type="number"
              min={0}
              value={otherIncome}
              onChange={e => setOtherIncome(e.target.value)}
              className="border rounded px-2 py-1 w-40"
            />
          </div>
          <ReliefForm reliefs={personalReliefs} values={personalValues} setValues={setPersonalValues} />
        </>
      )}
      {entityType === "company" && (
        <>
          <div className="mb-4">
            <label className="block font-medium">Business Income</label>
            <input
              type="number"
              min={0}
              value={businessIncome}
              onChange={e => setBusinessIncome(e.target.value)}
              className="border rounded px-2 py-1 w-40"
            />
          </div>
          <BusinessForm deductions={businessDeductions} values={businessValues} setValues={setBusinessValues} />
          <CompanyIncentivesForm incentives={companyIncentives} values={companyValues} setValues={setCompanyValues} />
        </>
      )}
      {summary}
    </div>
  );
} 