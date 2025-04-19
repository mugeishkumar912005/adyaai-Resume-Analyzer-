import Nav from "./Nav";
import Hero from "../assets/Hero.jpg";
import section2 from "../assets/section2.jpg";
import UploadSection from "./UploadSection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/signup")}
            className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow hover:bg-white transition duration-300"
          >
            Get Started for Free
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={Hero}
            alt="ATS Resume Optimization"
            className="w-full h-120 rounded-2xl shadow-md"
          />
        </div>
      </section>
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 bg-white">
        <div className="w-full lg:w-1/2">
          <img
            src={section2}
            alt="Resume Analyzer"
            className="w-170 h-80 rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-semibold text-black mb-4">
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
        </div>
      </section>
      <section>
        <UploadSection/>
      </section>
      <footer className="bg-blue-900 text-white py-6 mt-10">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <p className="text-sm text-center md:text-left">
      © {new Date().getFullYear()} Smart Resume. All rights reserved.
    </p>
    <div className="flex gap-4 mt-4 md:mt-0">
      <a href="#" className="hover:underline text-sm">Privacy Policy</a>
      <a href="#" className="hover:underline text-sm">Terms of Service</a>
      <a href="#" className="hover:underline text-sm">Contact</a>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Home;
