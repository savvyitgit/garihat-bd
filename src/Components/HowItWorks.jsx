const steps = [
  { id: 1, icon: "🔍", title: "Search & Browse", description: "Find vehicles by brand, category, or location" },
  { id: 2, icon: "💬", title: "Contact Seller", description: "Call or message directly, no middleman" },
  { id: 3, icon: "🤝", title: "Inspect & Buy", description: "Meet seller, inspect vehicle, finalize the deal" },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Buying or selling made simple</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-[#DB1408] text-3xl mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;