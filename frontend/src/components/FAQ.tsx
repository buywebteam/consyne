const FAQ = () => {
  return (
    <section className="py-30 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h4 className="text-xl font-semibold mb-2">
              How do I track my shipment?
            </h4>
            <p>
              You can track your shipment using the tracking ID sent to your
              email after dispatch.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">
              Do you offer international shipping?
            </h4>
            <p>
              Yes, we provide global shipping to over 100+ countries with fast
              customs clearance.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">
              What if my package is delayed?
            </h4>
            <p>
              In rare cases of delays, we offer real-time updates and customer
              support to assist you immediately.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">
              Can I change the delivery address?
            </h4>
            <p>
              Yes, address changes are allowed before dispatch. Contact support
              for urgent modifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
