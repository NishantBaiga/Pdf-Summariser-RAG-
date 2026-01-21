import { Card } from "@/components/common/card";



import { LucideIcon } from "lucide-react";

 export interface Plan {
  id: "free" | "pro" | "enterprise";
  name: string;
  description: string;
  price: string;
  pricePeriod: string;
  popular: boolean;
  icon: LucideIcon;
  color: "gray" | "orange" | "purple";
  features: string[];
  cta: string;
  href: string;
}

 interface FeatureRow {
  feature: string;
  values: Record<Plan["id"], string>;
}

interface FeatureComparisonProps {
  plans: Plan[];
  // rows: FeatureRow[];
}

export const FeatureComparison = ({ plans }: FeatureComparisonProps) => (
  <Card className="mt-16">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
      Compare Plans Feature by Feature
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 font-semibold text-gray-900 dark:text-white">
              Feature
            </th>
            {plans.map(plan => (
              <th key={plan.id} className="text-center py-4 font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { feature: 'PDF Credits', free: '5/month', pro: 'Unlimited', enterprise: 'Unlimited' },
            { feature: 'Page Limit', free: '50 pages', pro: '2,000 pages', enterprise: 'Unlimited' },
            { feature: 'AI Models', free: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
            { feature: 'Processing Speed', free: 'Standard', pro: '2x Faster', enterprise: 'Priority' },
            { feature: 'Support', free: 'Community', pro: 'Email & Chat', enterprise: '24/7 Dedicated' },
            { feature: 'Export Formats', free: 'Basic', pro: 'Multiple', enterprise: 'All + API' },
          ].map((row, index) => (
            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-4 font-medium text-gray-700 dark:text-gray-300">
                {row.feature}
              </td>
              <td className="text-center py-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">{row.free}</span>
              </td>
              <td className="text-center py-4">
                <span className="text-sm font-semibold text-orange-600">{row.pro}</span>
              </td>
              <td className="text-center py-4">
                <span className="text-sm font-semibold text-purple-600">{row.enterprise}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);