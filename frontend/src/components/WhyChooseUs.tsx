import { FaGlobe, FaBolt, FaDollarSign, FaBox } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      title: "Global Reach",
      description:
        "We deliver to over 100+ countries with trusted international partners.",
      icon: <FaGlobe className="text-3xl text-orange-500" />,
    },
    {
      title: "Fast Delivery",
      description:
        "Swift and reliable logistics solutions to meet your deadlines.",
      icon: <FaBolt className="text-3xl text-orange-500" />,
    },
    {
      title: "Affordable Rates",
      description:
        "Competitive pricing to help you save without compromising on quality.",
      icon: <FaDollarSign className="text-3xl text-orange-500" />,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your shipments anytime, anywhere with our tracking tools.",
      icon: <FaBox className="text-3xl text-orange-500" />,
    },
  ];
  return (
    <section className="bg-orange-50 py-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
          Why Choose Us
        </h2>
        <p className="text-black mb-12 text-lg">
          Discover Why Our Clients Choose Consyne—Again and Again{" "}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
