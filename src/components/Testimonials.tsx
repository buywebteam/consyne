function Testimonials() {
  const testimonials = [
    {
      name: "Anita Medic",
      title: "CEO, Medical Institute",
      comment:
        "ConsiTrack has completely transformed how we handle our international logistics. Reliable, professional, and always on time!",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "James George",
      title: "Operations Manager, QuickTech",
      comment:
        "Their real-time tracking and customer support are second to none. I can’t recommend them enough.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Amaka Okafor",
      title: "Founder, Amaka Fashion",
      comment:
        "Working with ConsiTrack has been seamless. They make shipping simple and stress-free for my growing business.",
      image: "https://i.pravatar.cc/150?img=38",
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
              className="bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
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
