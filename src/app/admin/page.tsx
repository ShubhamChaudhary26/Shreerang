"use client";

import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

interface DocumentUpload {
  _id: string;
  name: string;
  phone: string;
  rentAmount: number;
  depositAmount: number;
  ownerAadhar?: string;
  ownerPan?: string;
  ownerIndex2?: string;
  renterAadhar?: string;
  renterPan?: string;
}

const AdminDocumentsTable = () => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [ocrText, setOcrText] = useState<{ [key: string]: string }>({});
  const [ocrLoading, setOcrLoading] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  // Modal states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const baseUrl =
          typeof window !== "undefined"
            ? ""
            : process.env.NEXT_PUBLIC_BASE_URL || "";
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
    if (!imageUrl || ocrText[id]) return; // already extracted
    try {
      setOcrLoading((prev) => ({ ...prev, [id]: true }));
      const { data } = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => console.log(m),
      });
      setOcrText((prev) => ({ ...prev, [id]: data.text.trim() }));
    } catch (err) {
      console.error("OCR error:", err);
      setOcrText((prev) => ({ ...prev, [id]: "❌ Error extracting text" }));
    } finally {
      setOcrLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleImageClick = (url: string, key: string) => {
    setSelectedImage(url);
    setSelectedKey(key);
    setIsModalOpen(true);
    extractText(url, key);
  };

  const renderImageWithClick = (url: string, key: string, label: string) => {
    if (!url) return <span>-</span>;
    return (
      <img
        src={url}
        alt={label}
        className="max-w-[120px] max-h-[120px] object-contain cursor-pointer hover:scale-105 transition"
        onClick={() => handleImageClick(url, key)}
      />
    );
  };

  if (loading)
    return <div className="text-center py-10">Loading documents...</div>;
  if (documents.length === 0)
    return <div className="text-center py-10">No documents found</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="bg-white border rounded-lg shadow-md p-4 flex flex-col gap-2"
              >
                <div>
                  <strong>Name:</strong> {doc.name || "-"}
                </div>
                <div>
                  <strong>Phone:</strong> {doc.phone || "-"}
                </div>
                <div>
                  <strong>Rent Amount:</strong> {doc.rentAmount || "-"}
                </div>
                <div>
                  <strong>Deposit Amount:</strong> {doc.depositAmount || "-"}
                </div>
                <div>
                  <strong>Owner Aadhar:</strong>{" "}
                  {renderImageWithClick(
                    doc.ownerAadhar!,
                    doc._id + "_ownerAadhar",
                    "Owner Aadhar"
                  )}
                </div>
                <div>
                  <strong>Owner PAN:</strong>{" "}
                  {renderImageWithClick(
                    doc.ownerPan!,
                    doc._id + "_ownerPan",
                    "Owner PAN"
                  )}
                </div>
                <div>
                  <strong>Owner Index2:</strong>{" "}
                  {renderImageWithClick(
                    doc.ownerIndex2!,
                    doc._id + "_ownerIndex2",
                    "Owner Index2"
                  )}
                </div>
                <div>
                  <strong>Renter Aadhar:</strong>{" "}
                  {renderImageWithClick(
                    doc.renterAadhar!,
                    doc._id + "_renterAadhar",
                    "Renter Aadhar"
                  )}
                </div>
                <div>
                  <strong>Renter PAN:</strong>{" "}
                  {renderImageWithClick(
                    doc.renterPan!,
                    doc._id + "_renterPan",
                    "Renter PAN"
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Rent Amount</th>
                  <th className="border px-4 py-2">Deposit Amount</th>
                  <th className="border px-4 py-2">Owner Aadhar</th>
                  <th className="border px-4 py-2">Owner PAN</th>
                  <th className="border px-4 py-2">Owner Index2</th>
                  <th className="border px-4 py-2">Renter Aadhar</th>
                  <th className="border px-4 py-2">Renter PAN</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 text-center">
                    <td className="border px-4 py-2">{doc.name}</td>
                    <td className="border px-4 py-2">{doc.phone}</td>
                    <td className="border px-4 py-2">{doc.rentAmount}</td>
                    <td className="border px-4 py-2">{doc.depositAmount}</td>
                    <td className="border px-4 py-2">
                      {renderImageWithClick(
                        doc.ownerAadhar!,
                        doc._id + "_ownerAadhar",
                        "Owner Aadhar"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {renderImageWithClick(
                        doc.ownerPan!,
                        doc._id + "_ownerPan",
                        "Owner PAN"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {renderImageWithClick(
                        doc.ownerIndex2!,
                        doc._id + "_ownerIndex2",
                        "Owner Index2"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {renderImageWithClick(
                        doc.renterAadhar!,
                        doc._id + "_renterAadhar",
                        "Renter Aadhar"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {renderImageWithClick(
                        doc.renterPan!,
                        doc._id + "_renterPan",
                        "Renter PAN"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-lg font-bold">Document Preview</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-black text-xl"
                >
                  ✖
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row gap-4 p-4 overflow-auto">
                {/* Left: Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center border p-2 rounded">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-[40vh] md:max-h-[70vh] object-contain w-full "
                    />
                  )}
                </div>
                  
                {/* Right: OCR Text */}
                <div className="w-full md:w-1/2 border p-2 rounded overflow-y-auto max-h-[40vh] md:max-h-[70vh] whitespace-pre-wrap text-sm">
                  {selectedKey &&
                    (ocrLoading[selectedKey]
                      ? "Extracting text..."
                      : ocrText[selectedKey] || "No text extracted yet")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocumentsTable;
