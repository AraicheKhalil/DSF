

import Navbar from "@/components/LandingPage/Navbar/Navbar";
import Landing from "@/components/LandingPage/Landing/Landing";
import Pricing from "@/components/LandingPage/Pricing/Pricing";
import WhyUs from "@/components/LandingPage/WhyUs/WhyUs";
import Footer from "@/components/LandingPage/Footer/Footer";
import Testimonials from "@/components/LandingPage/Testemonials/Testimonials";
import OurOutcomes from "@/components/LandingPage/OurOutcomes/OurOutcomes";
import Playground from "@/components/LandingPage/Playground/PlayGround";
import OurSolutions from "@/components/LandingPage/OurSolutions/OurSolutions";
import './home.css'
import HowToUse from "@/components/LandingPage/HowToUse/HowToUse";
import Performance from "@/components/LandingPage/Performance/Performance";

const LandingPage = () => {

  return (
    <div className="font-DM-Sans bg-[#fff] !text-[#28282B] overflow-hidden">
      
      <Navbar />
      <Landing />
      <Playground />
      {/* <HowToUse /> */}
      <OurSolutions />
      <Performance />
      <OurOutcomes />
      <Testimonials />
      {/* <WhyUs /> */}
      {/* <Pricing /> */}
      <Footer />

    </div>
  )
}

export default LandingPage;
