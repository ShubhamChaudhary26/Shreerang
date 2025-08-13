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

  useEffect(() => {
    async function fetchDocuments() {
      const res = await fetch("/api/get-documents");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
      setLoading(false);
    }
    fetchDocuments();
  }, []);

  const extractText = async (imageUrl: string, id: string) => {
    const { data } = await Tesseract.recognize(imageUrl, "eng");
    setOcrText((prev) => ({ ...prev, [id]: data.text.trim() }));
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="overflow-x-auto">
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
            <tr key={doc._id}>
              <td className="border px-4 py-2">{doc.name}</td>
              <td className="border px-4 py-2">{doc.phone}</td>

              {/* Aadhar */}
              <td className="border px-4 py-2">
                <div className="flex flex-col items-center">
                  <img
                    src={doc.aadharCard}
                    alt="Aadhar Card"
                    style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                    onLoad={() => extractText(doc.aadharCard, doc._id + "_aadhar")}
                  />
                  <p className="text-xs mt-1">{ocrText[doc._id + "_aadhar"] || "Extracting..."}</p>
                </div>
              </td>

              {/* PAN */}
              <td className="border px-4 py-2">
                <div className="flex flex-col items-center">
                  <img
                    src={doc.panCard}
                    alt="PAN Card"
                    style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                    onLoad={() => extractText(doc.panCard, doc._id + "_pan")}
                  />
                  <p className="text-xs mt-1">{ocrText[doc._id + "_pan"] || "Extracting..."}</p>
                </div>
              </td>

              {/* Agreement */}
              <td className="border px-4 py-2">
                {doc.agreementImage.endsWith(".pdf") ? (
                  <a href={doc.agreementImage} target="_blank" rel="noreferrer" className="text-blue-600 underline">
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
                    <p className="text-xs mt-1">{ocrText[doc._id + "_agreement"] || "Extracting..."}</p>
                  </div>
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
