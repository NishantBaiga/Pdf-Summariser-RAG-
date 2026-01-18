import { Card } from "@/components/common/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

export const PricingCard = ({ plan, isAnnual }) => {
  const Icon = plan.icon;
  
  const calculateAnnualPrice = (monthlyPrice) => {
    if (monthlyPrice === '$0') return '$0';
    if (monthlyPrice === 'Custom') return 'Custom';
    const price = parseInt(monthlyPrice.replace('$', ''));
    return `$${Math.floor(price * 12 * 0.8)}`; // 20% discount
  };

  const displayPrice = isAnnual ? calculateAnnualPrice(plan.price) : plan.price;
  const annualSavings = isAnnual && plan.price !== '$0' && plan.price !== 'Custom' 
    ? `Save $${Math.floor(parseInt(plan.price.replace('$', '')) * 12 * 0.2)}/year` 
    : null;

  return (
    <Card className={`
      relative flex flex-col h-full transition-all duration-300 hover:scale-[1.02]
      ${plan.popular 
        ? 'border-2 border-orange-500 shadow-2xl shadow-orange-500/20 ring-2 ring-orange-100 dark:ring-orange-900/30' 
        : 'border border-gray-200 dark:border-gray-700'
      }
    `}>
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className={`
          inline-flex items-center justify-center p-3 rounded-2xl mb-4
          ${plan.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
            plan.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
            'bg-gray-100 dark:bg-gray-800 text-gray-600'
          }
        `}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
            {displayPrice}
          </span>
          {plan.price !== 'Custom' && plan.price !== '$0' && (
            <span className="text-xl font-medium text-gray-500 dark:text-gray-400 ml-2">
              /{isAnnual ? 'year' : 'month'}
            </span>
          )}
        </div>
        {annualSavings && (
          <div className="text-green-600 dark:text-green-400 font-semibold text-sm">
            {annualSavings}
          </div>
        )}
        {plan.pricePeriod && plan.price !== 'Custom' && (
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {plan.pricePeriod}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="flex-grow mb-8 space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Check className={`
              w-5 h-5 mt-0.5 flex-shrink-0
              ${plan.color === 'orange' ? 'text-orange-500' :
                plan.color === 'purple' ? 'text-purple-500' :
                'text-gray-400'
              }
            `} />
            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a href={plan.href} className="mt-auto">
        <Button
          variant={plan.popular ? 'secondary' : 'outline'}
          size="lg"
          className={`
            w-full
            ${plan.popular ? 'shadow-lg shadow-orange-500/25' : ''}
          `}
        >
          {plan.cta}
          {plan.popular && <Zap className="w-4 h-4 ml-2" />}
        </Button>
      </a>
    </Card>
  );
};