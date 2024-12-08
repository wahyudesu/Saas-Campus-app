import { Code, Zap, Shield, Rocket } from "lucide-react";
const features = [
  {
    icon: Code,
    title: "Next.js 13 Ready",
    description: "Built with the latest web technologies",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security built-in",
  },
  {
    icon: Rocket,
    title: "Ship Faster",
    description: "Launch your product in record time",
  },
];
export const FeaturesGrid = () => {
  return (
    <div className="py-24 bg-black/20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-gray-800/50 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};