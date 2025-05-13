
"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, SetisOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const toggleMobileMenu = (index) => {
    setOpenMobileMenu(openMobileMenu === index ? null : index);
  };

    // Navigation Items
    const navItems = [
      {
        title: "What we do",
        content: [
          {
            heading: "Capabilities",
            links: [
              { name: "Digital Transformation", url: "#" },
              { name: "Web Development", url: "#" },
              { name: "App Development", url: "#" },
              { name: "Custom Software Development", url: "#" },
              { name: "UX/UI Design", url: "#" },
            ],
          },
          {
            heading: "Business Applications",
            links: [
              { name: "D365 ERP", url: "#" },
              { name: "D365 CRM", url: "#" },
              { name: "Power Apps", url: "#" },
            ],
          },
          {
            heading: "Emerging Technologies",
            links: [
              { name: "AI & Machine Learning", url: "#" },
              { name: "Blockchain", url: "#" },
              { name: "IoT", url: "#" },
            ],
          },
        ],
      },
      {
        title: "Who we help",
        content: [
          {
            heading: "Industries",
            links: [
              { name: "Healthcare", url: "#" },
              { name: "E-commerce", url: "#" },
              { name: "Finance", url: "#" },
            ],
          },
          {
            heading: "Case Studies",
            links: [
              { name: "Success Stories", url: "#" },
              { name: "Client Testimonials", url: "#" },
            ],
          },
        ],
      },
      {
        title: "Who We are",
        content: "We are a digital marketing agency helping brands grow through innovative strategies and data-driven decisions.",
      },
      {
        title: "How we deliver",
        content: "We use AI, automation, and deep analytics to optimize performance and deliver results for our clients.",
      },
      {
        title: "JOIN SAAD",
        content: "Be part of our growing team! Contact us to explore opportunities.",
      },
    ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white backdrop-blur-none md:backdrop-blur-md shadow-md z-50">
      <div className="main p-4 ">
        <div className="NavBar">
          <div className="flex items-center justify-between">
            <div className="logo">Car Rental</div>
            <div className="bg-btn">

            </div>
            <button
              onClick={() => SetisOpen(!isOpen)}
              className="md:hidden text-2xl transition-all"
            >
              <div
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180 scale-110 " : "rotate-0 scale-100 "
                }`}
              >
                {isOpen ? <IoMdClose /> : <FaBars />}
              </div>
            </button>




            <div className="hidden md:flex gap-12 z-50">
        <ul className="flex gap-8">
          {navItems.map((item, index) => (
            <li key={index} className="relative">
              {/* Main Link */}
              <button
                onClick={() => toggleMenu(index)}
                className="hover:text-green-600 flex gap-2 items-center"
              >
                {item.title}
                <MdKeyboardArrowDown
                  className={`transition-transform duration-300 ${
                    openMenu === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {openMenu === index && (
                <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-300 rounded-md shadow-lg p-4 transition-all duration-300">
                  {Array.isArray(item.content) ? (
                    item.content.map((section, secIndex) => (
                      <div key={secIndex} className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{section.heading}</h3>
                        <ul className="mt-2 space-y-2">
                          {section.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <a
                                href={link.url}
                                className="block px-4 py-1 hover:bg-gray-100 text-gray-700"
                              >
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 px-4 py-2">{item.content}</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>



      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 p-5 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl"
          onClick={() => SetisOpen(false)}
        >
          <IoMdClose />
        </button>

        {/* Mobile Menu Links */}
        <ul className="mt-10 space-y-6 text-lg">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => toggleMobileMenu(index)}
                className=" hover:text-green-600 flex gap-2 items-center w-full text-left"
              >
                {item.title}
                <MdKeyboardArrowDown
                  className={`transition-transform duration-300 ${
                    openMobileMenu === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              {openMobileMenu === index && (
                <div className="mt-2 bg-gray-100 rounded-md p-3">
                  {Array.isArray(item.content) ? (
                    item.content.map((section, secIndex) => (
                      <div key={secIndex} className="mb-3">
                        <h3 className="text-md font-semibold text-gray-800">{section.heading}</h3>
                        <ul className="mt-2 space-y-1">
                          {section.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <a href={link.url} className="block px-3 py-1 hover:bg-gray-200 text-gray-700">
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700">{item.content}</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

       <Link href="/login">
        <button className="mt-10 border-2 p-2 rounded-3xl transition-all duration-300 border-green-500 hover:bg-green-300">
          Get started 
        </button>
        </Link>
      </div>

      <Link href="/login">
        <button className="mt-10 border-2 p-2 rounded-3xl transition-all duration-300 border-green-500 hover:bg-green-300">
          Get started 
        </button>
        </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
