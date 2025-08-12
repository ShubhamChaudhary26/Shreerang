"use client";

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchDocuments() {
      const res = await fetch("/api/get-documents"); // You need to create this API
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
      setLoading(false);
    }
    fetchDocuments();
  }, []);

  if (loading) return <div className="text-center justify-center ">Loading...</div>;

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
              <td className="border px-4 py-2">
                <img
                  src={doc.aadharCard}
                  alt="Aadhar Card"
                  style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                />
              </td>
              <td className="border px-4 py-2">
                <img
                  src={doc.panCard}
                  alt="PAN Card"
                  style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                />
              </td>
              <td className="border px-4 py-2">
                {doc.agreementImage.endsWith(".pdf") ? (
                  <a href={doc.agreementImage} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    View PDF
                  </a>
                ) : (
                  <img
                    src={doc.agreementImage}
                    alt="Agreement Document"
                    style={{ maxWidth: 100, maxHeight: 100, objectFit: "contain" }}
                  />
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
