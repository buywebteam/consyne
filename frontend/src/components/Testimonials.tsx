function Testimonials() {
  const testimonials = [
    {
      name: "Liam Chen",
      title: "Founder, Nova Electronics",
      comment:
        "Consyne has streamlined our global logistics. Their reliability and efficiency give us peace of mind every time.",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Fatima Bello",
      title: "Logistics Lead, Bella Organics",
      comment:
        "From tracking to delivery, everything is handled professionally. Their team always goes the extra mile.",
      image: "https://i.pravatar.cc/150?img=33",
    },
    {
      name: "Carlos Martinez",
      title: "Supply Chain Manager, AutoParts MX",
      comment:
        "Excellent service and communication. Consyne helps us stay ahead with dependable international logistics.",
      image: "https://i.pravatar.cc/150?img=19",
    },
    {
      name: "Sophia Müller",
      title: "Operations Director, EuroTech GmbH",
      comment:
        "We’ve tried multiple providers, but Consyne stands out with consistency and proactive support.",
      image: "https://i.pravatar.cc/150?img=45",
    },
    {
      name: "David Okoro",
      title: "CEO, Jumia Traders",
      comment:
        "Their commitment to on-time delivery and transparent tracking is unmatched. Highly recommended for African markets.",
      image: "https://i.pravatar.cc/150?img=24",
    },
    {
      name: "Isabelle Dupont",
      title: "Founder, Maison Belle",
      comment:
        "As a growing brand, logistics was a big worry—until we partnered with Consyne. Now everything flows effortlessly.",
      image: "https://i.pravatar.cc/150?img=9",
    },
  ];

  return (
    <section className="py-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          What Our Customers Say
        </h2>
        <p className="mb-12 text-lg">
          Trusted by businesses and entrepreneurs across the globe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
