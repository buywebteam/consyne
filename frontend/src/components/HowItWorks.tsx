function HowItWorks() {
  const steps = [
    {
      title: "1. Request a Quote",
      description:
        "Fill out our online form with your shipment details to get an instant estimate.",
      icon: "📝",
    },
    {
      title: "2. Confirm & Schedule",
      description:
        "Approve your quote and choose a pickup or drop-off time that fits your schedule.",
      icon: "📆",
    },
    {
      title: "3. We Pick Up",
      description:
        "Our team arrives to collect your package and begin the shipment process.",
      icon: "🚚",
    },
    {
      title: "4. Track & Deliver",
      description:
        "Use our real-time tracking system to monitor your shipment until it's delivered.",
      icon: "📍",
    },
  ];

  return (
    <section className="bg-orange-50 py-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="mb-12 text-lg">
          A simple 4-step process to get your shipment moving.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
