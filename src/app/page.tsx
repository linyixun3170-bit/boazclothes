"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import Products from "@/components/Products";
import Stats from "@/components/Stats";
import About from "@/components/About";
import FactoryTour from "@/components/FactoryTour";
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
          <Products />
          <Stats />
          <About />
          <FactoryTour />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
