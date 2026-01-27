"use client";
import React from 'react';

import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import FeatureGrid from '../components/sections/FeatureGrid';
import Partners from '../components/sections/Partners';
import ContextSection from '../components/sections/ContextSection';
import CTA from '../components/sections/CTA';
import Footer from '../components/sections/Footer';

import MapBackground from '../components/ui/MapBackground';

export default function LandingPage() {
  return (
    <>
      <MapBackground />
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Partners />
      <div className="mt-16 md:mt-24">
        <ContextSection />
      </div>
      <CTA />
      <Footer />
    </>
  );
}