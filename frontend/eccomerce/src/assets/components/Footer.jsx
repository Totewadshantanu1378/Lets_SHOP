import React from "react";

const Footer = () => {
  return (
    <div>
      <section className="bg-[rgb(96,80,220)] w-full py-4">
        <ul className="flex text-white gap-7 flex-row justify-center ">
          <li>
            <a href="/" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-400">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-blue-400">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>
        <p className="text-center text-gray-400 mt-3">
          &copy; 2025 YourCompany. All rights reserved.
        </p>
      </section>
    </div>
  );
};

export default Footer;
