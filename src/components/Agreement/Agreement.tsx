"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import heroImg from "@/src/assets/hero-property.jpg";
import WhyChooseShreerang from "./WhyChooseus";
import Image from "next/image";
import Link from "next/link";
import DocumentUploadForm from "../Home/UploadImage";
import { Phone } from "lucide-react";

// --- Schema ---
const MAX_IMG_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Enter a valid 10-digit phone number" }),
  aadhar: z
    .any()
    .refine(
      (f) => f && f.type?.startsWith("image/") && f.size <= MAX_IMG_SIZE,
      "Aadhar image (<=2MB) required"
    ),
  pan: z
    .any()
    .refine(
      (f) => f && f.type?.startsWith("image/") && f.size <= MAX_IMG_SIZE,
      "PAN image (<=2MB) required"
    ),
  agreement: z
    .any()
    .refine(
      (f) => f && f.type === "application/pdf" && f.size <= MAX_PDF_SIZE,
      "PDF (<=5MB) required"
    ),
});

type FormValues = z.infer<typeof schema>;

// --- FileDrop ---
function FileDrop({
  label,
  accept,
  file,
  onFileChange,
}: {
  label: string;
  accept: string;
  file?: File | null;
  onFileChange: (f: File | null) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer  hover:bg-gray-50 relative">
        <input
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) =>
            e.target.files?.[0] && onFileChange(e.target.files[0])
          }
        />
        {!file ? (
          <p className="text-gray-400">Click or drag to upload</p>
        ) : (
          <div className="space-y-2">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mx-auto max-h-40 rounded-md"
              />
            ) : (
              <div className="text-sm">
                {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </div>
            )}
            <button
              type="button"
              className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
              onClick={() => onFileChange(null)}
            >
              Remove
            </button>
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2">Accepted: {accept}</div>
      </div>
    </div>
  );
}
<WhyChooseShreerang />;

// --- Accordion ---
type AccordionItemType = { id: string; title: string; content: string };
const Accordion = ({ items }: { items: AccordionItemType[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {items.map(({ id, title, content }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="border-b last:border-b-0">
            <button
              onClick={() => toggle(id)}
              className={`w-full flex justify-between items-center px-4 sm:px-6 py-4 text-left font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors duration-200 ${
                isOpen ? "bg-blue-50" : ""
              }`}
            >
              <span className="text-sm sm:text-base">{title}</span>
              <svg
                className={`w-5 h-5 text-blue-600 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`px-4 sm:px-6 text-gray-700 overflow-hidden transition-all duration-300 ${
                isOpen ? "py-4 max-h-96" : "max-h-0"
              }`}
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- Main Page ---
export default function RegistrationAgreement() {
  const [aadhar, setAadhar] = useState<File | null>(null);
  const [pan, setPan] = useState<File | null>(null);
  const [agreement, setAgreement] = useState<File | null>(null);

  const {
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => alert("Form submitted (mock)");

  // Sync files
  useEffect(() => {
    if (aadhar) setValue("aadhar", aadhar as any);
    if (pan) setValue("pan", pan as any);
    if (agreement) setValue("agreement", agreement as any);
  }, [aadhar, pan, agreement, setValue]);

  const faqs: AccordionItemType[] = [
    {
      id: "faq1",
      title: "Which documents are required?",
      content: "Aadhaar (image), PAN (image), and the agreement PDF.",
    },
    {
      id: "faq2",
      title: "How long does it take?",
      content: "Most agreements are processed within 24–48 hours.",
    },
    {
      id: "faq3",
      title: "Is biometric eKYC available?",
      content: "Yes, doorstep biometric eKYC can be arranged.",
    },
    {
      id: "faq4",
      title: "Is e-stamp legally valid?",
      content: "Yes, e-stamp is legally valid and widely accepted.",
    },
    {
      id: "faq5",
      title: "How do I get help?",
      content: "Visit our Contact page or call our support team.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-property.jpg" // public folder me image ka path
            alt="Property Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Rent Agreement Document Submission
          </h1>

          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Fast, secure and fully compliant. Upload Aadhaar, PAN and your
            agreement PDF to get started.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
            <Link href="/agreement#agreement">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded shadow-lg transition">
                Create Agreement Now
              </button>
            </Link>

            <Link href="/agreement#faq">
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow transition hover:bg-gray-100">
                View FAQs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Form */}
      <DocumentUploadForm />

      <WhyChooseShreerang />
      {/* FAQs */}
      <section className="py-16 bg-gray-100" id="faq">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-full">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our experienced team help you with all your property rental and
            legal documentation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition"
            >
              Get Started Today
            </Link>
            <a
              href="tel:5551234567"
              className="flex items-center justify-center gap-2 border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              <Phone className="w-5 h-5" />
              +91 7498776389
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
