"use client";
import React, { useState } from "react";

const LogoUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <section className=" mx-auto px-1 py-10">

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label
          htmlFor="logo-upload"
          className="flex flex-col items-center justify-center w-40 h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500"
        >
          <svg
            className="w-8 h-8  mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8M8 12l4-4 4 4"
            />
          </svg>
          <span className=" h5">Browse Logo</span>
          <input
            id="logo-upload"
            type="file"
            accept=".jpg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className=" h5 max-w-xs">
          Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are
          .jpg & .png
        </p>
      </div>

      {fileName && (
        <p className="mt-2 text-green-600 h5">Selected file: {fileName}</p>
      )}
    </section>
  );
};

export default LogoUpload;
