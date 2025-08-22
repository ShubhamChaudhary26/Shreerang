"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Image } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { ShieldCheck, Lock, Headset, Users } from "lucide-react";

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    rentAmount: "",
    depositAmount: "",
    ownerAadhar: null as File | null,
    ownerPan: null as File | null,
    ownerIndex2: null as File | null,
    renterAadhar: null as File | null,
    renterPan: null as File | null,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    rentAmount: "",
    depositAmount: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    rentAmount: false,
    depositAmount: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 12000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validate = () => {
    let nameError = "";
    let phoneError = "";
    let rentAmountError = "";
    let depositAmountError = "";

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

    setErrors({
      name: nameError,
      phone: phoneError,
      rentAmount: rentAmountError,
      depositAmount: depositAmountError,
    });
    return !(nameError || phoneError || rentAmountError || depositAmountError);
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
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert(`${fieldName} image must be less than 2MB`);
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

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("phone", formData.phone.trim());
    data.append("rentAmount", formData.rentAmount.trim());
    data.append("depositAmount", formData.depositAmount.trim());

    data.append("captcha", captchaToken);
    if (formData.ownerAadhar) data.append("ownerAadhar", formData.ownerAadhar);
    if (formData.ownerPan) data.append("ownerPan", formData.ownerPan);
    if (formData.ownerIndex2) data.append("ownerIndex2", formData.ownerIndex2);
    if (formData.renterAadhar)
      data.append("renterAadhar", formData.renterAadhar);
    if (formData.renterPan) data.append("renterPan", formData.renterPan);

    try {
      const res = await fetch("/api/document-upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        setSuccessMsg(
          "✅ Thank you for your message. Welcome to The Shreerang Associates Rent Agreement Services. Our team will connect with you shortly 🙏🙏"
        );

        setFormData({
          name: "",
          phone: "",
          rentAmount: "",
          depositAmount: "",
          ownerAadhar: null,
          ownerPan: null,
          ownerIndex2: null,
          renterAadhar: null,
          renterPan: null,
        });
        setTouched({
          name: false,
          phone: false,
          rentAmount: false,
          depositAmount: false,
        });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        setSuccessMsg("❌ Upload failed. Please try again.");
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
  }: {
    label: string;
    fieldName: keyof typeof formData;
  }) => (
    <div className="space-y-2">
      <label htmlFor={fieldName} className="text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldName}
          type="file"
          accept="image/*"
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
            <Image className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {formData[fieldName]
                ? (formData[fieldName] as File).name
                : `Click to upload ${label}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      id="agreement"
    >
      <div className="bg-white shadow-none md:shadow-sm rounded-2xl p-6 sm:p-10 lg:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Rent Agreement Document Submission
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Please fill in your details and upload the required documents. Our
            team will contact you.
          </p>
          <div className="mt-6 text-gray-700 max-w-2xl mx-auto">
            <div className="mt-6 text-gray-700 max-w-2xl mx-auto">
              {/* Trust Points */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5  mb-4 text-green-600" />
                  <p className="font-medium">१००% कायदेशीर मान्यता</p>
                </div>

                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 mb-4 text-blue-600" />
                  <p className="font-medium">सुरक्षित व गोपनीय</p>
                </div>

                <div className="flex items-center gap-2">
                  <Headset className="w-5 h-5 mb-4 text-yellow-600" />
                  <p className="font-medium">समर्पित सहाय्य</p>
                </div>
              </div>

              {/* Assurance Line */}
              <p className="mt-4 text-sm text-gray-500 text-center">
                आपली माहिती आमच्याकडे पूर्णपणे सुरक्षित आहे. आम्ही गोपनीयता जपतो
                आणि सरकारी मान्यताप्राप्त भाडेकरार आपल्या दारापर्यंत पोहोचवतो.
              </p>

              {/* Extra Trust for Marathi Users */}
              <div className="flex items-center gap-2 justify-center mt-3">
                <p className="text-sm text-gray-600 text-center">
                  हजारो समाधानी ग्राहकांनी आमच्यावर विश्वास ठेवला आहे. आम्ही
                  पारदर्शक प्रक्रिया, कायदेशीर सुरक्षितता आणि जलद सेवा याची हमी
                  देतो.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-800"
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
                className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-800"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleBlur("phone")}
                maxLength={10}
                className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition ${
                  touched.phone && errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Per Month Rent Amount */}
            <div>
              <label
                htmlFor="rentAmount"
                className="text-sm font-medium text-gray-800"
              >
                Per Month Rent Amount
              </label>
              <input
                id="rentAmount"
                name="rentAmount"
                type="number"
                inputMode="numeric"
                placeholder="Enter rent amount"
                value={formData.rentAmount}
                onChange={handleInputChange}
                onBlur={() => handleBlur("rentAmount")}
                className="w-full mt-1 px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Refundable Deposit Amount */}
            <div>
              <label
                htmlFor="depositAmount"
                className="text-sm font-medium text-gray-800"
              >
                Refundable Deposit Amount
              </label>
              <input
                id="depositAmount"
                name="depositAmount"
                type="number"
                inputMode="numeric"
                placeholder="Enter deposit amount"
                value={formData.depositAmount}
                onChange={handleInputChange}
                onBlur={() => handleBlur("depositAmount")}
                className="w-full mt-1 px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>
          </div>

          {/* Owner Docs */}
          <h3 className="text-lg font-semibold text-gray-700">
            Owner Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FileUploadField
              label="Owner Aadhar Card"
              fieldName="ownerAadhar"
            />
            <FileUploadField label="Owner PAN Card" fieldName="ownerPan" />
            <FileUploadField
              label="Owner Index 2 Photo Copy"
              fieldName="ownerIndex2"
            />
          </div>

          {/* Renter Docs */}
          <h3 className="text-lg font-semibold text-gray-700">
            Renter Documents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
            <FileUploadField
              label="Renter Aadhar Card"
              fieldName="renterAadhar"
            />
            <FileUploadField label="Renter PAN Card" fieldName="renterPan" />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
              onChange={(token) => setCaptchaToken(token)}
              ref={recaptchaRef}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                !!errors.name ||
                !!errors.phone ||
                isSubmitting ||
                !touched.name ||
                !touched.phone ||
                !captchaToken
              }
              className={`flex items-center gap-2 text-white text-lg font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform duration-300 ${
                !!errors.name ||
                !!errors.phone ||
                isSubmitting ||
                !touched.name ||
                !touched.phone ||
                !captchaToken
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-900 hover:bg-blue-800 active:scale-95"
              }`}
            >
              <Upload
                className={`h-5 w-5 ${isSubmitting ? "animate-spin" : ""}`}
              />
              {isSubmitting ? "Submitting..." : "Submit Documents"}
            </button>
          </div>
        </form>
        {successMsg && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-4">
      <h2 className="text-xl font-bold text-green-700 mb-4">Thank you!</h2>
      <p className="text-gray-700 mb-6">
        {successMsg}
      </p>
      <button
        onClick={() => setSuccessMsg("")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default DocumentUploadForm;
