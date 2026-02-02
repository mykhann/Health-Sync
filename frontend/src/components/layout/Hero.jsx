import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-blue-50 to-white p-5 md:p-16 overflow-hidden">
      
      {/* Background abstract shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      
      {/* Text Section */}
      <div className="relative z-10 w-full md:w-1/2 max-w-xl p-5 md:p-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Comprehensive <span className="text-blue-700">Care</span> for Your Family
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Experience healthcare that puts you first — expert physicians, personalized treatment plans, and care tailored for every member of your family.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/doctors">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold">
              Book an Appointment
            </button>
          </Link>
          <Link to="/about">
            <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-700 hover:text-white shadow-lg hover:scale-105 transition-all font-semibold">
              Learn About Us
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative z-10 w-full md:w-1/2 max-w-lg flex justify-center">
        <div className="bg-gradient-to-tr from-blue-100/50 to-white rounded-3xl p-2 shadow-xl">
          <img
            src="/bg.png"
            alt="Healthcare Services"
            className="rounded-3xl object-cover w-full h-full shadow-2xl"
          />
        </div>
      </div>

      {/* Optional overlay gradient for a 3D/soft feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/70 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
