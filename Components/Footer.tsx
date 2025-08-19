import React from "react";
import flag from "../asstes/flag.png"; 
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 md:px-12 lg:px-24 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Copyright Section */}
        <div className="text-xs md:text-sm font-light opacity-75 tracking-wide">
          © 2025 Example@Test Limited. All rights reserved.
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 md:gap-6 lg:gap-8">
          {["FAQs", "Contact Us", "Shipment Charges", "Privacy Policy", "Terms"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm md:text-base font-medium hover:text-blue-300 transition-colors duration-200 ease-in-out hover:underline underline-offset-4"
              aria-label={item}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Version and Flag Section */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Image
              src={flag}
              alt="Language flag"
              className="h-6 w-6 md:h-7 md:w-7 object-contain group-hover:scale-110 transition-transform duration-200"
              width={28}
              height={28}
            />
            <span className="text-sm md:text-base font-medium uppercase tracking-wide group-hover:text-blue-300 transition-colors duration-200">
              English
            </span>
          </div>
          <span className="text-xs md:text-sm font-light opacity-75">Version 1.0.1</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;