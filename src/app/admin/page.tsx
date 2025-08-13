"use client";

import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

interface DocumentUpload {
  _id: string;
  name: string;
  phone: string;
  aadharCard: string;
  panCard: string;
  agreementImage: string;
}

const AdminDocumentsTable = () => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [ocrText, setOcrText] = useState<{ [key: string]: string }>({});
  const [ocrLoading, setOcrLoading] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchDocuments() {
      try {
        // Absolute URL for Vercel production
        const baseUrl = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/get-documents`);
        const data = await res.json();
        if (data.success) {
          setDocuments(data.documents);
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  const extractText = async (imageUrl: string, id: string) => {
    if (!imageUrl) return;
    if (ocrText[id]) return; // Skip if already extracted

    try {
      setOcrLoading((prev) => ({ ...prev, [id]: true }));
      const { data } = await Tesseract.recognize(imageUrl, "eng", { logger: (m) => console.log(m) });
      setOcrText((prev) => ({ ...prev, [id]: data.text.trim() }));
    } catch (err) {
      console.error("OCR error:", err);
      setOcrText((prev) => ({ ...prev, [id]: "Error extracting text" }));
    } finally {
      setOcrLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="text-center py-10">Loading documents...</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Aadhar</th>
            <th className="border px-4 py-2">PAN</th>
            <th className="border px-4 py-2">Agreement</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{doc.name}</td>
              <td className="border px-4 py-2">{doc.phone}</td>

              {/* Aadhar */}
              <td className="border px-4 py-2">
                {doc.aadharCard ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={doc.aadharCard}
                      alt="Aadhar Card"
                      style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                      onLoad={() => extractText(doc.aadharCard, doc._id + "_aadhar")}
                    />
                    <p className="text-xs mt-1">
                      {ocrLoading[doc._id + "_aadhar"]
                        ? "Extracting..."
                        : ocrText[doc._id + "_aadhar"] || "-"}
                    </p>
                  </div>
                ) : (
                  "-"
                )}
              </td>

              {/* PAN */}
              <td className="border px-4 py-2">
                {doc.panCard ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={doc.panCard}
                      alt="PAN Card"
                      style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                      onLoad={() => extractText(doc.panCard, doc._id + "_pan")}
                    />
                    <p className="text-xs mt-1">
                      {ocrLoading[doc._id + "_pan"] ? "Extracting..." : ocrText[doc._id + "_pan"] || "-"}
                    </p>
                  </div>
                ) : (
                  "-"
                )}
              </td>

              {/* Agreement */}
              <td className="border px-4 py-2">
                {doc.agreementImage ? (
                  doc.agreementImage.endsWith(".pdf") ? (
                    <a
                      href={doc.agreementImage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    <div className="flex flex-col items-center">
                      <img
                        src={doc.agreementImage}
                        alt="Agreement Document"
                        style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                        onLoad={() => extractText(doc.agreementImage, doc._id + "_agreement")}
                      />
                      <p className="text-xs mt-1">
                        {ocrLoading[doc._id + "_agreement"]
                          ? "Extracting..."
                          : ocrText[doc._id + "_agreement"] || "-"}
                      </p>
                    </div>
                  )
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDocumentsTable;
