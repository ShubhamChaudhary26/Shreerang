"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Image } from "lucide-react";

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadharCard: null as File | null,
    panCard: null as File | null,
    agreementImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  // Track if user touched (focused & blurred) the inputs
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let nameError = "";
    let phoneError = "";

    // Validate name only if touched or on submit
    if (touched.name || isSubmitting) {
      if (!formData.name.trim()) {
        nameError = "Full name is required";
      } else if (formData.name.trim().length < 3) {
        nameError = "Full name should be at least 3 characters";
      }
    }

    // Validate phone only if touched or on submit
    if (touched.phone || isSubmitting) {
      if (!formData.phone.trim()) {
        phoneError = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        phoneError = "Phone number must be exactly 10 digits";
      }
    }

    setErrors({ name: nameError, phone: phoneError });

    // Return true if no errors
    return !(nameError || phoneError);
  };

  // Run validation when formData or touched changes
  useEffect(() => {
    validate();
  }, [formData, touched]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof formData
  ) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("phone", formData.phone.trim());
    if (formData.aadharCard) data.append("aadharCard", formData.aadharCard);
    if (formData.panCard) data.append("panCard", formData.panCard);
    if (formData.agreementImage) data.append("agreementImage", formData.agreementImage);

    try {
      const res = await fetch("/api/document-upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        alert("Documents submitted successfully!");
        setFormData({ name: "", phone: "", aadharCard: null, panCard: null, agreementImage: null });
        setTouched({ name: false, phone: false });
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Error submitting the form. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
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
                onBlur={() => handleBlur("name")}
                required
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                  touched.name && errors.name ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1" id="name-error">
                  {errors.name}
                </p>
              )}
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
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleBlur("phone")}
                required
                maxLength={10}
                className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                  touched.phone && errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.phone}
                aria-describedby="phone-error"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1" id="phone-error">
                  {errors.phone}
                </p>
              )}
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
              disabled={
                !!errors.name || !!errors.phone || isSubmitting || !touched.name || !touched.phone
              }
              className={`b1 flex items-center gap-2 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg transition ${
                !!errors.name || !!errors.phone || isSubmitting || !touched.name || !touched.phone
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-700"
              }`}
            >
              <Upload className={`h-5 w-5 ${isSubmitting ? "animate-spin" : ""}`} />
              {isSubmitting ? "Submitting..." : "Submit Documents"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
