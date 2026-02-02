import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-900/90 backdrop-blur-md p-6 relative overflow-hidden shadow-lg">
      
      {/* Optional floating shapes for subtle modern effect */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-white">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="logo-ct"
            className="w-36 h-36 object-contain hover:scale-105 transition-transform duration-300"
          />
          <Typography className="ml-2 text-xl md:text-2xl font-bold tracking-wide text-white">
            HealthCare
          </Typography>
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap items-center gap-4 md:gap-6 justify-center md:justify-start">
          <Link to="/about">
            <li className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
              <Typography as="span" className="text-white font-medium">
                About Us
              </Typography>
            </li>
          </Link>
          <Link to="/doctors">
            <li className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
              <Typography as="span" className="text-white font-medium">
                Staff
              </Typography>
            </li>
          </Link>
          <Link to="/doctor/login">
            <li className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
              <Typography as="span" className="text-white font-medium">
                Doctor Dashboard
              </Typography>
            </li>
          </Link>
          <Link to="/admin/dashboard">
            <li className="hover:text-blue-300 transition-colors duration-300 cursor-pointer">
              <Typography as="span" className="text-white font-medium">
                Admin Dashboard
              </Typography>
            </li>
          </Link>
        </ul>
      </div>

      {/* Divider */}
      <hr className="my-6 border-white/30" />

      {/* Copyright */}
      <Typography className="text-center text-white font-semibold relative z-10">
        &copy; 2026 HealthCare. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
