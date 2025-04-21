import React, { useRef } from "react";
import Nav from "./Nav";
import Hero from "../assets/Hero.jpg";
import section2 from "../assets/section2.jpg";
import UploadSection from "./UploadSection";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const Token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const uploadSectionRef = useRef(null);
  const GotoUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const GotoSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Nav />
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 bg-blue-500">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Optimize Your Resume to Get More Interviews
          </h1>
          <p className="text-lg text-white mb-6">
            Smart Resume helps you tailor your resume for each job by comparing it
            to job descriptions, improving your chances of getting noticed by ATS.
          </p>
          <button
            onClick={Token ? GotoUpload : GotoSignup}
            className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow hover:bg-white transition duration-300"
          >
            {Token ? "Upload Files" : "Get Started for Free"}
          </button>
        </div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={Hero}
            alt="ATS Resume Optimization"
            className="w-full h-100 rounded-2xl shadow-md"
          />
        </motion.div>
      </section>

      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 bg-white">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={section2}
            alt="Resume Analyzer"
            className="w-170 h-80 rounded-2xl shadow-md"
          />
        </motion.div>

        <motion.div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold text-black mb-4">
            Understand Your ATS Score
          </h2>
          <p className="text-lg text-black mb-6">
            Our system scans your resume like an Applicant Tracking System (ATS),
            providing real-time feedback on keyword matches, formatting, and
            optimization tips to help you get past the bots.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li className="text-black">Instant resume-to-job comparison</li>
            <li className="text-black">Keyword highlighting and suggestions</li>
            <li className="text-black">Real ATS scoring simulation</li>
          </ul>
        </motion.div>
      </section>
      <section className="flex flex-col items-center justify-between px-8 lg:px-20 py-20 gap-10 bg-white">
      <h1 className="text-2xl font-bold">Get Into</h1>
      <div className="overflow-hidden w-250 py-6 bg-white-50">
                <div className="whitespace-nowrap animate-scroll flex gap-20 ">
                    {[
                    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
                    { name: "Google", logo: "https://logo.clearbit.com/google.com" },
                    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
                    { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
                    { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
                    { name: "Zoho", logo: "https://logo.clearbit.com/zoho.com" },
                    { name: "Adya", logo: "https://logo.clearbit.com/adya.io" },
                    { name: "TCS", logo: "https://logo.clearbit.com/tcs.com" },

                    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
                    { name: "Google", logo: "https://logo.clearbit.com/google.com" },
                    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
                    { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
                    { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
                    { name: "Zoho", logo: "https://logo.clearbit.com/zoho.com" },
                    { name: "Adya", logo: "https://logo.clearbit.com/adya.io" },
                    { name: "TCS", logo: "https://logo.clearbit.com/tcs.com" },
                    ].map((company, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-white px-8 py-4 rounded-xl shadow-sm pr-15"
                    >
                        <img src={company.logo} alt={company.name} className="h-6 w-auto object-contain" />
                        <span className="text-sm font-medium text-gray-800">{company.name}</span>
                    </div>
                    ))}
                </div>
                </div>
      </section>
      <section ref={uploadSectionRef} className="">
        <UploadSection />
      </section>

      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Smart Resume. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline text-sm">
              Terms of Service
            </a>
            <a href="#" className="hover:underline text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
