import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
const plans = [
  {
    name: "Starter",
    price: "$199",
    features: [
      "Next.js boilerplate",
      "Basic features",
      "Email authentication",
      "Basic landing page",
    ],
  },
  {
    name: "Pro",
    price: "$249",
    features: [
      "Everything in Starter",
      "Advanced features",
      "Multiple templates",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$299",
    features: [
      "Everything in Pro",
      "Custom development",
      "Dedicated support",
      "SLA guarantee",
    ],
  },
];
export const PricingSection = () => {
  return (
    <div className="py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simple, transparent pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="p-8 rounded-lg bg-gray-800/50 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};