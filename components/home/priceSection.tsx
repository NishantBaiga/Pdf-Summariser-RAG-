'use client';
import { Check, Star, Zap, Crown, Building, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Card } from '../common/card';
import { SectionTitle } from '../common/sectionTitle';
import { PricingCard } from './priceSection/priceCard';
import { FeatureComparison, Plan } from './priceSection/featureComparison';

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Starter',
    description: 'Perfect for trying out and personal projects',
    price: '$0',
    pricePeriod: 'forever',
    popular: false,
    icon: Sparkles,
    color: 'gray',
    features: [
      '5 PDF credits per month',
      'Basic summarization models',
      'Standard processing speed',
      'Up to 50 pages per document',
      'Basic dashboard access',
      'Community support'
    ],
    cta: 'Start Free',
    href: '/signup?plan=free'
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For professionals and growing teams',
    price: '$19',
    pricePeriod: 'per month',
    popular: true,
    icon: Crown,
    color: 'orange',
    features: [
      'Unlimited PDF credits',
      'Advanced Gemini models (priority access)',
      '2x faster processing',
      'Up to 2,000 pages per document',
      'Advanced analytics dashboard',
      'Email & chat support',
      'Export to multiple formats',
      'Team collaboration features'
    ],
    cta: 'Go Professional',
    href: '/signup?plan=pro'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: 'Custom',
    pricePeriod: 'tailored pricing',
    popular: false,
    icon: Building,
    color: 'purple',
    features: [
      'Dedicated AI infrastructure',
      'Custom model training (Ollama)',
      '99.9% uptime SLA',
      'Unlimited pages & documents',
      'Full API access',
      'Dedicated account manager',
      'Custom security & compliance',
      'On-premise deployment options',
      'White-label solutions'
    ],
    cta: 'Contact Sales',
    href: '/contact'
  }
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <SectionTitle align='center'>Simple, Transparent Pricing</SectionTitle>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`
              px-6 py-3 rounded-md font-medium transition-all duration-200
              ${!isAnnual 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`
              px-6 py-3 rounded-md font-medium transition-all duration-200 relative
              ${isAnnual 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            Annual
            {isAnnual && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map(plan => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              isAnnual={isAnnual}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison plans={plans} />

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              No credit card required to start
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Cancel or change plans anytime
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              14-day money-back guarantee
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our enterprise plans offer custom AI model training, dedicated infrastructure, 
              and white-label solutions tailored to your organization's specific requirements.
            </p>
            <Button variant="outline" size="lg">
              Schedule a Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};


