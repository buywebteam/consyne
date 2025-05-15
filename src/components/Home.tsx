import About from "./About";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";
import StickyTelegramIcon from "./TelegramIcon";

function Home() {
  return (
    <div id="home" className="scroll-mt-20">
      <Hero />
      <WhyChooseUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <About />
      <Contact />
      <FAQ />
      <Newsletter />
      <Footer />
      <StickyTelegramIcon />
    </div>
  );
}

export default Home;
