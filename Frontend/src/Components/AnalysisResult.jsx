import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import Resume from "../assets/Resume.jpg";
import { FaFileDownload } from 'react-icons/fa'; 

const COLORS = ['#4f46e5', '#22c55e', '#facc15'];

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, resumeFile, jdFile } = location.state || {};

  if (!result) {
    return <div className="text-center text-lg text-gray-500 mt-10">Loading...</div>;
  }

  const {
    match_scores,
    resume_skills,
    jd_skills,
    suggestions,
    resume_education_keywords,
    jd_education_keywords,
  } = result;

  const barData = [
    { name: 'Skill', score: match_scores.skills },
    { name: 'Education', score: match_scores.education },
    { name: 'Overall', score: match_scores.overall },
  ];

  const pieData = [
    { name: 'Resume Skills Match', value: match_scores.skills },
    { name: 'JD Skills Match', value: 100 - match_scores.skills },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="px-4 sm:px-6 py-10 min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#fefce8] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-md">Smart Resume</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-lg"
          >
            ← Back
          </button>
        </div>

        {/* Download Links */}
        <div className="flex justify-start items-center mb-6 gap-4">
          {resumeFile && (
            <a
              href={URL.createObjectURL(resumeFile)}
              download={resumeFile.name}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <FaFileDownload className="mr-2" />
              Download Resume
            </a>
          )}
          {jdFile && (
            <a
              href={URL.createObjectURL(jdFile)}
              download={jdFile.name}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <FaFileDownload className="mr-2" />
              Download Job Description
            </a>
          )}
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-3xl font-semibold text-center text-indigo-800 mb-10">Analysis Result</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[{ label: 'Skill Match Score', value: match_scores.skills },
              { label: 'Education Match Score', value: match_scores.education },
              { label: 'Overall Match Score', value: match_scores.overall },
            ].map((score, index) => (
              <motion.div
                key={index}
                className="relative group bg-gradient-to-br from-indigo-200 via-indigo-100 to-yellow-100 rounded-2xl shadow-xl p-6 text-center overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-indigo-400/30 to-yellow-200/20 pointer-events-none" />
                <h3 className="text-xl font-semibold text-indigo-700 drop-shadow">{score.label}</h3>
                <p className="text-4xl font-bold text-indigo-900 mt-4 mb-2 drop-shadow-lg">{score.value}%</p>
                <div className="w-16 h-1 mx-auto rounded bg-gradient-to-r from-indigo-400 to-yellow-300 mb-2" />
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-center text-indigo-700 mb-6">Match Score Visualization</h3>
          <div className='flex flex-col lg:flex-row gap-8'>
            <motion.div
              className="flex-1"
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="bg-white/90 rounded-xl shadow-lg p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="bg-white/90 rounded-xl shadow-lg p-4">
                <h3 className="text-2xl font-semibold text-center text-indigo-700 mb-6">Resume vs JD Skill Match</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                      dataKey="value"
                      labelLine={false}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-700 mb-6 mt-12">Education Details</h3>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
            <motion.div
              className="rounded-2xl shadow-md w-full lg:w-1/2 h-[350px] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-yellow-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ minHeight: 350, maxHeight: 350 }}
            >
              <img
                src={Resume}
                alt="Resume"
                className="rounded-xl object-cover w-full h-full"
                style={{ minHeight: 350, maxHeight: 350 }}
              />
            </motion.div>
            <div
              className="bg-indigo-50/70 hover:bg-indigo-100/80 transition duration-300 rounded-xl shadow-md w-full lg:w-1/2 h-[350px] flex flex-col justify-center border border-indigo-200 p-6 space-y-4"
              style={{ minHeight: 350, maxHeight: 350 }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Your Degree</span>
                <span className="text-lg font-bold text-indigo-900">{resume_education_keywords?.degree || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Required Degree</span>
                <span className="text-lg font-bold text-yellow-800">{jd_education_keywords?.degree || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Your CGPA</span>
                <span className="text-lg font-bold text-indigo-900">{resume_education_keywords?.cgpa || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Required CGPA</span>
                <span className="text-lg font-bold text-yellow-800">{jd_education_keywords?.cgpa || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Skills Comparison</h3>
            <div className="bg-white rounded-xl shadow-inner p-6 text-gray-800">
              <div className='mb-4'>
                <strong>Resume Skills:</strong>
                <div className="flex flex-wrap mt-2 gap-2">
                  {resume_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Job Description Skills:</strong>
                <div className="flex flex-wrap mt-2 gap-2">
                  {jd_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Suggestions</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="leading-relaxed">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
