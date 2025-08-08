"use client";

import { useState } from "react";
import { Upload, FileText, Image } from "lucide-react";

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadharCard: null as File | null,
    panCard: null as File | null,
    agreementImage: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof formData
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Implement submission logic here
  };

  const FileUploadField = ({
    label,
    fieldName,
    icon: Icon,
    accept,
  }: {
    label: string;
    fieldName: keyof typeof formData;
    icon: any;
    accept: string;
  }) => (
    <div className="space-y-2">
      <label
        htmlFor={fieldName}
        className="text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldName}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e, fieldName)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={`flex items-center justify-center w-full h-36 border-2 border-dashed rounded-xl transition-colors duration-300 p-4 text-center ${
            formData[fieldName]
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-blue-900 hover:bg-blue-50"
          }`}
        >
          <div className="pointer-events-none">
            <Icon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {formData[fieldName]
                ? (formData[fieldName] as File).name
                : `Click to upload ${label.toLowerCase()}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 dark:bg-gray-900">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-white">
            Rent Agreement Document Submission
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please fill in your details and upload the required documents.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          {/* File Upload Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUploadField
              label="Aadhar Card Image"
              fieldName="aadharCard"
              icon={Image}
              accept="image/*"
            />
            <FileUploadField
              label="PAN Card Image"
              fieldName="panCard"
              icon={Image}
              accept="image/*"
            />
            <FileUploadField
              label="Agreement Document"
              fieldName="agreementImage"
              icon={FileText}
              accept="image/*,.pdf"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="b1 flex items-center gap-2  text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg transition"
            >
              <Upload className="h-5 w-5" />
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
