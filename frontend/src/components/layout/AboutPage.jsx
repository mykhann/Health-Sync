import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        {/* About Section */}
        <section className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 border border-white/30">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-4">
            About Us
          </h2>
          <p className="text-gray-700 text-center md:text-lg leading-relaxed">
            At Save The People, we bring together a team of experienced healthcare professionals, writers, and researchers dedicated to delivering accurate and up-to-date content. Our extensive directory of healthcare providers connects patients with qualified professionals in their area, while our educational resources cover a wide range of topics, from preventive care and wellness tips to the latest advancements in medical research.
          </p>
        </section>

        {/* Mission Section */}
        <section className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 border border-white/30">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-center md:text-lg leading-relaxed">
            Our mission is to provide high-quality healthcare services to our community, ensuring accessibility, compassion, and excellence in patient care. We strive to make a positive impact on the lives of those we serve.
          </p>
        </section>

        {/* Strengths Section */}
        <section className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 border border-white/30">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-4">
            Our Strengths
          </h2>
          <p className="text-gray-700 text-center md:text-lg leading-relaxed">
            At Save The People, we pride ourselves on delivering exceptional healthcare resources and services designed to empower patients and medical professionals alike. Our website combines user-friendly navigation with a wealth of reliable medical information, ensuring that users can easily access the resources they need. We feature a comprehensive directory of qualified healthcare providers, enabling patients to connect with trusted specialists in their area. Additionally, our platform offers a range of educational articles, wellness tips, and the latest medical news, fostering a community of informed individuals dedicated to improving their health. With a commitment to high-quality content and user satisfaction, we are here to support every step of your healthcare journey.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
