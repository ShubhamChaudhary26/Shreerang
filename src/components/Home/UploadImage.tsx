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

  const [errors, setErrors] = useState({ name: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let nameError = "";
    let phoneError = "";

    if (touched.name || isSubmitting) {
      if (!formData.name.trim()) {
        nameError = "Full name is required";
      } else if (formData.name.trim().length < 3) {
        nameError = "Full name should be at least 3 characters";
      }
    }

    if (touched.phone || isSubmitting) {
      if (!formData.phone.trim()) {
        phoneError = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        phoneError = "Phone number must be exactly 10 digits";
      }
    }

    setErrors({ name: nameError, phone: phoneError });
    return !(nameError || phoneError);
  };

  useEffect(() => {
    validate();
  }, [formData, touched]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof typeof formData
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const maxSize =
        fieldName === "agreementImage" ? 5 * 1024 * 1024 : 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(
          `${fieldName === "agreementImage" ? "Agreement" : "Image"} file size should be less than ${
            fieldName === "agreementImage" ? "5MB" : "2MB"
          }`
        );
        return;
      }
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
        setFormData({
          name: "",
          phone: "",
          aadharCard: null,
          panCard: null,
          agreementImage: null,
        });
        setTouched({ name: false, phone: false });
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Error submitting the form. Please try again.");
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
      <label htmlFor={fieldName} className="text-sm font-medium text-gray-800">
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
          className={`flex items-center justify-center w-full h-36 border-2 border-dashed rounded-xl p-4 text-center transition ${
            formData[fieldName]
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="agreement">
      <div className="bg-white shadow-none md:shadow-sm rounded-2xl p-6 sm:p-10 lg:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Rent Agreement Document Submission
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Please fill in your details and upload the required documents. Our team will contact you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-800">
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
                className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition ${
                  touched.name && errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-800">
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
                maxLength={10}
                className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition ${
                  touched.phone && errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FileUploadField label="Aadhar Card Image" fieldName="aadharCard" icon={Image} accept="image/*" />
            <FileUploadField label="PAN Card Image" fieldName="panCard" icon={Image} accept="image/*" />
            <FileUploadField label="Agreement Document" fieldName="agreementImage" icon={FileText} accept="application/pdf,image/*" />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                !!errors.name || !!errors.phone || isSubmitting || !touched.name || !touched.phone
              }
              className={`flex items-center gap-2 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform duration-300 ${
                !!errors.name || !!errors.phone || isSubmitting || !touched.name || !touched.phone
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800 active:scale-95"
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
