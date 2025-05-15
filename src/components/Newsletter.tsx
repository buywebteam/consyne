const Newsletter = () => {
  return (
    <section className="py-30 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 text-lg">
          Subscribe to our newsletter for the latest logistics news and offers.
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-2/3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
