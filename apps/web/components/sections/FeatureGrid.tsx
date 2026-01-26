"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./feature-grid.css";
import careergideImage from "@/assets/career-guide-ai.png";
import BusinessMateImage from "@/assets/business-mate-ai.png";
import ThinkforgeImage from "@/assets/thinkforge-learning.png";
import NetworkImage from "@/assets/network-mentorship.png";

const features = [
    {
        image: careergideImage,
        title: "CareerGuide AI",
        description: "Personalized career path recommendations and skills gap analysis",
        points: ["CV Builder", "Skills Insights", "Job Matching"]
    },
    {
        image: BusinessMateImage,
        title: "BusinessMate AI",
        description: "Strategic business intelligence and market insights",
        points: ["Market Intelligence", "Growth Tools", "Strategic Foresight"]
    },
    {
        image: ThinkforgeImage,
        title: "Thinkforge Learning",
        description: "Industry-relevant courses and practical training",
        points: ["6 Course Tracks", "Expert Masterclasses", "Hands-on Projects"]
    },
    {
        image: NetworkImage,
        title: "Network & Mentorship",
        description: "Connect with successful professionals and mentors",
        points: ["Find Mentors", "Build Connections"]
    },
];

export default function FeatureGrid() {
    return (
        <section className="feature-section">
            <div className="feature-container">

                {/* Header Section */}
                <div className="feature-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="feature-title"
                    >
                        Tailored for Your Ambition
                    </motion.h2>
                    <p className="feature-subtitle">
                        AI-Powered Foresight for Africa's Innovators
                    </p>
                </div>

                {/* Grid Section */}
                <div className="feature-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="feature-card"
                        >
                            {/* 
                                THE SHAPE CONTAINER 
                                Uses the double-layer clip-path technique for the border
                            */}
                            <div className="feature-shape-container">
                                {/* Layer 1: The Blue Border */}
                                <div className="feature-shape-border"></div>

                                {/* Layer 2: The Image (Inset) */}
                                <div className="feature-shape-image">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="feature-card-title">
                                {feature.title}
                            </h3>
                            <p className="feature-card-desc">
                                {feature.description}
                            </p>

                            {/* Bullet Points List */}
                            <ul className="feature-card-list">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="feature-card-list-item">
                                        <svg className="w-4 h-4 text-[#003DA5] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}