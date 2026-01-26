"use client";
import React from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import FeatureGrid from '../components/sections/FeatureGrid';
import Partners from '../components/sections/Partners';
import ContextSection from '../components/sections/ContextSection';
import Footer from '../components/sections/Footer';

export default function LandingPage() {
  return (
    <Preloader>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Partners />
      <ContextSection />
      <Footer />
    </Preloader>
  );
}