"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Products from "@/components/Products";
import FactoryTour from "@/components/FactoryTour";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import SchemaOrg from "@/components/SchemaOrg";

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <SchemaOrg />
        <Navbar />
        <main>
          <HeroSection />
          <Stats />
          <About />
          <Products />
          <FactoryTour />
          <Testimonials />
          <CTASection />
          <FAQ />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
