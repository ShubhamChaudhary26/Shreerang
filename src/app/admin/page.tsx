'use client';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const baseUrl = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/get-documents`);
        const data = await res.json();
        if (data.success) setDocuments(data.documents);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  const extractText = async (imageUrl: string, id: string) => {
    if (!imageUrl || ocrText[id]) return;
    try {
      setOcrLoading((prev) => ({ ...prev, [id]: true }));
      const { data } = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => console.log(m),
      });
      setOcrText((prev) => ({ ...prev, [id]: data.text.trim() }));
    } catch (err) {
      console.error("OCR error:", err);
      setOcrText((prev) => ({ ...prev, [id]: "Error extracting text" }));
    } finally {
      setOcrLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="text-center py-10">Loading documents...</div>;

  if (documents.length === 0) return <div className="text-center py-10">No documents found</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>

        {isMobile ? (
          // Mobile: vertical card layout
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
              <div key={doc._id} className="bg-white border rounded-lg shadow-md p-4 flex flex-col gap-2">
                <div>
                  <strong>Name:</strong> {doc.name || "-"}
                </div>
                <div>
                  <strong>Phone:</strong> {doc.phone || "-"}
                </div>

                {/* Aadhar */}
                <div>
                  <strong>Aadhar:</strong>
                  {doc.aadharCard ? (
                    <div className="flex flex-col items-center mt-1">
                      <img
                        src={doc.aadharCard}
                        alt="Aadhar Card"
                        className="max-w-[100px] max-h-[100px] object-contain"
                        onLoad={() => extractText(doc.aadharCard, doc._id + "_aadhar")}
                      />
                      <span className="text-xs mt-1">
                        {ocrLoading[doc._id + "_aadhar"] ? "Extracting..." : ocrText[doc._id + "_aadhar"] || "-"}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>

                {/* PAN */}
                <div>
                  <strong>PAN:</strong>
                  {doc.panCard ? (
                    <div className="flex flex-col items-center mt-1">
                      <img
                        src={doc.panCard}
                        alt="PAN Card"
                        className="max-w-[100px] max-h-[100px] object-contain"
                        onLoad={() => extractText(doc.panCard, doc._id + "_pan")}
                      />
                      <span className="text-xs mt-1">
                        {ocrLoading[doc._id + "_pan"] ? "Extracting..." : ocrText[doc._id + "_pan"] || "-"}
                      </span>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>

                {/* Agreement */}
                <div>
                  <strong>Agreement:</strong>
                  {doc.agreementImage ? (
                    doc.agreementImage.endsWith(".pdf") ? (
                      <a href={doc.agreementImage} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        View PDF
                      </a>
                    ) : (
                      <div className="flex flex-col items-center mt-1">
                        <img
                          src={doc.agreementImage}
                          alt="Agreement"
                          className="max-w-[100px] max-h-[100px] object-contain"
                          onLoad={() => extractText(doc.agreementImage, doc._id + "_agreement")}
                        />
                        <span className="text-xs mt-1">
                          {ocrLoading[doc._id + "_agreement"] ? "Extracting..." : ocrText[doc._id + "_agreement"] || "-"}
                        </span>
                      </div>
                    )
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: horizontal table
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
                  <tr key={doc._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{doc.name}</td>
                    <td className="border px-4 py-2">{doc.phone}</td>
                    <td className="border px-4 py-2">
                      {doc.aadharCard && (
                        <img
                          src={doc.aadharCard}
                          alt="Aadhar Card"
                          className="max-w-[100px] max-h-[100px] object-contain"
                          onLoad={() => extractText(doc.aadharCard, doc._id + "_aadhar")}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {doc.panCard && (
                        <img
                          src={doc.panCard}
                          alt="PAN Card"
                          className="max-w-[100px] max-h-[100px] object-contain"
                          onLoad={() => extractText(doc.panCard, doc._id + "_pan")}
                        />
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {doc.agreementImage &&
                        (doc.agreementImage.endsWith(".pdf") ? (
                          <a href={doc.agreementImage} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            View PDF
                          </a>
                        ) : (
                          <img
                            src={doc.agreementImage}
                            alt="Agreement"
                            className="max-w-[100px] max-h-[100px] object-contain"
                            onLoad={() => extractText(doc.agreementImage, doc._id + "_agreement")}
                          />
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocumentsTable;
