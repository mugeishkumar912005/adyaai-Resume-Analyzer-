import { useState } from "react";
import { CloudUpload } from "lucide-react"; 

const UploadSection = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setter(file);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  const dropBoxStyle = `
    relative flex flex-col items-center justify-center 
    w-full h-48 border-2 border-dashed rounded-xl 
    transition duration-300 ease-in-out bg-white 
    hover:border-blue-500 hover:bg-blue-50 shadow-sm
  `;

  return (
    <div className="px-6 md:px-100 py-10 bg-bl from-white to-blue-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
        Upload Resume & Job Description
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div
          className={dropBoxStyle}
          onDrop={(e) => handleDrop(e, setResumeFile)}
          onDragOver={(e) => e.preventDefault()}
        >
          <label htmlFor="resumeUpload" className="flex flex-col items-center cursor-pointer px-4">
            <CloudUpload className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-gray-800 font-medium text-lg">Upload Resume</p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX</p>
            {resumeFile && (
              <p className="mt-2 text-green-600 text-sm font-semibold">✔ {resumeFile.name}</p>
            )}
          </label>
          <input
            type="file"
            id="resumeUpload"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFileChange(e, setResumeFile)}
          />
        </div>

        {/* JD Upload */}
        <div
          className={dropBoxStyle}
          onDrop={(e) => handleDrop(e, setJdFile)}
          onDragOver={(e) => e.preventDefault()}
        >
          <label htmlFor="jdUpload" className="flex flex-col items-center cursor-pointer px-4">
            <CloudUpload className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-gray-800 font-medium text-lg">Upload Job Description</p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT</p>
            {jdFile && (
              <p className="mt-2 text-green-600 text-sm font-semibold">✔ {jdFile.name}</p>
            )}
          </label>
          <input
            type="file"
            id="jdUpload"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFileChange(e, setJdFile)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
