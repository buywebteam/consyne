import { FaTruck, FaWarehouse, FaBox } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

function Services() {
  const services = [
    {
      title: "Freight Forwarding",
      description:
        "Efficient air, sea, and land freight solutions tailored to your business needs.",
      icon: <FaTruck className="text-3xl text-orange-500" />,
    },
    {
      title: "Customs Clearance",
      description:
        "Seamless documentation and customs handling to ensure smooth deliveries.",
      icon: <MdDescription className="text-3xl text-orange-500" />,
    },
    {
      title: "Warehousing",
      description:
        "Secure and flexible storage options for your goods with inventory management.",
      icon: <FaWarehouse className="text-3xl text-orange-500" />,
    },
    {
      title: "Last Mile Delivery",
      description:
        "Timely and reliable delivery to your customer’s doorstep anywhere, anytime.",
      icon: <FaBox className="text-3xl text-orange-500" />,
    },
  ];

  return (
    <section className="bg-white py-30 px-4 scroll-mt-20" id="services">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
        <p className="mb-12 text-lg">
          Your Trusted Partner for Complete Logistics and Transport Services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-orange-50 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 text-center"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
