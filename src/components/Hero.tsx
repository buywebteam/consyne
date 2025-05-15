import Button from "./Button";

function Hero() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat text-black"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="bg-orange-50 bg-opacity-70">
        {" "}
        {/* optional overlay */}
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32 flex justify-center items-center">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center">
              Reliable, Scalable, Global Logistics{" "}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6 text-center">
              Let us manage the complexities of transport and logistics, giving
              you the freedom to concentrate on scaling your business and
              delivering exceptional value to your customers
            </p>
            <div className="flex justify-center items-center">
              <a href="https://wa.me/1234567890">
                <Button label="Track Shipment" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
