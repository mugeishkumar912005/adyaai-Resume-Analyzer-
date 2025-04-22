import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadSection = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setter(file);
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const HandleHistory = async (result) => {
    try {
      await axios.post(
        "https://adyaai-resume-analyzer-back.onrender.com/api/History/Data",
        {
          Resume_Degree: result.resume_education_keywords.degree,
          JD_Degree: result.jd_education_keywords.degree,
          Resume_CGPA: result.resume_education_keywords.cgpa,
          JD_CGPA: result.jd_education_keywords.cgpa,
          Suggestions: result.suggestions,
          Score: {
            Edu: result.match_scores.education,
            Overall: result.match_scores.overall,
            skills: result.match_scores.skills,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update history");
    }
  };

  const triggerAnalysis = async (RPath, JPath) => {
    if (!RPath || !JPath) {
      toast.warn("Please upload both Resume and JD!");
      return;
    }

    const formData = new FormData();
    formData.append("resumePath", RPath);
    formData.append("jdPath", JPath);

    try {
      const res = await fetch("http://localhost:5000", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        await HandleHistory(result);
        toast.success("Analysis complete!");
        navigate("/Analysis", { state: { result } });
      } else {
        toast.error("Analysis failed: " + result.message);
      }
    } catch (error) {
      toast.error("Something went wrong during analysis!");
    }
  };

  const handleUpload = async () => {
    if (!resumeFile || !jdFile) {
      toast.warn("Please upload both Resume and JD!");
      return;
    }

    const formData = new FormData();
    formData.append("resumeFile", resumeFile);
    formData.append("jdFile", jdFile);
    formData.append("email", "testuser@example.com");

    setLoading(true);

    try {
      const response = await fetch("https://adyaai-resume-analyzer-back.onrender.com/api/uploads/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Files uploaded successfully!");
        triggerAnalysis(result.data.resumePath, result.data.jdPath);
      } else {
        toast.error("Upload failed: " + result.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const DropBox = ({ label, file, onDrop, onChange, accept, inputId }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex-1 min-w-[280px] sm:min-w-[320px] md:min-w-[350px] p-6 border-2 border-dashed border-gray-400 hover:border-blue-500 rounded-xl bg-white hover:bg-blue-50 shadow transition duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 text-center"
    >
      <label htmlFor={inputId} className="flex flex-col items-center w-full h-full cursor-pointer">
        <CloudUpload className="w-10 h-10 text-blue-600" />
        <p className="text-lg font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{accept.toUpperCase()}</p>
        {file && (
          <p className="mt-2 text-green-600 text-sm font-semibold">✔ {file.name}</p>
        )}
      </label>
      <input
        type="file"
        id={inputId}
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
    </motion.div>
  );

  return (
    <div className="px-4 sm:px-10 md:px-20 py-6 bg-gradient-to-br from-white to-blue-50 min-h-[80vh]">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Upload Resume & Job Description
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-20">
        <DropBox
          label="Upload Resume"
          file={resumeFile}
          onDrop={(e) => handleDrop(e, setResumeFile)}
          onChange={(e) => handleFileChange(e, setResumeFile)}
          accept=".pdf,.doc,.docx"
          inputId="resumeUpload"
        />
        <DropBox
          label="Upload Job Description"
          file={jdFile}
          onDrop={(e) => handleDrop(e, setJdFile)}
          onChange={(e) => handleFileChange(e, setJdFile)}
          accept=".pdf,.doc,.docx,.txt"
          inputId="jdUpload"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          className="bg-blue-600 mt-25 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <div className="h-5 w-5 border-4 border-white border-t-transparent animate-spin rounded-full"></div>
          ) : (
            "Upload Files & Analyze"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
