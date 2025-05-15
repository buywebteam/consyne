function ContactSection() {
  return (
    <section className="bg-orange-50 py-30 px-4 scroll-mt-20" id="contact">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Contact Us
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-lg">
          Have a question or want to get a quote? Our team is here to help. Fill
          out the form or reach out directly via telegram or email.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white shadow-md rounded-lg p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center text-center md:text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">
                45B, Velocity Street, Logistics Hub, Wellington, NZ
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 8:00am - 6:00pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
