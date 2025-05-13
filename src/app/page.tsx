import Image from "next/image";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/Herosection";
import Services from "@/components/Services";
import OurTeam from "@/components/OurTeam";
import OwlCarouselComponent from "@/components/OwlCarouselComponent";
import Featured from "@/components/Featured";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="">
      <NavBar />
      <HeroSection />
      <Services />
      <OurTeam />
      <Featured />
      <OwlCarouselComponent />
      <ContactForm />
      <Footer />
    </div>
  );
}
