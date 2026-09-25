import Hero from "./home/Hero";
import Features from "./home/Features";
import HowItWorks from "./home/HowItWorks";
import BecomeProvider from "./home/BecomeProvider";
import CTA from "./home/CTA";
import heroIllustration from "../../assets/images/lifty-hero-illustration.png";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <BecomeProvider />
      <CTA />
    </>
  );
}

export default Home;