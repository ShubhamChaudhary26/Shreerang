"use client";

import React, { useEffect, useState } from "react";

interface DocumentUpload {
  _id: string;
  name: string;
  phone: string;

  ownerAadhar?: string;
  ownerPan?: string;
  ownerIndex2?: string;
  renterAadhar?: string;
  renterPan?: string;

  ownerAadharText?: string;
  ownerPanText?: string;
  ownerIndex2Text?: string;
  renterAadharText?: string;
  renterPanText?: string;

  ownerAadharNumber?: string;
  ownerPanNumber?: string;
  renterAadharNumber?: string;
  renterPanNumber?: string;

  createdAt?: string;
}

const Img = ({ src, alt }: { src?: string; alt: string }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className="max-w-[120px] max-h-[120px] object-contain border rounded-md"
    />
  ) : (
    <span className="text-gray-400">-</span>
  );

const RowKV = ({ k, v }: { k: string; v?: string }) => (
  <div className="flex items-start gap-2">
    <span className="text-gray-600 min-w-[120px]">{k}</span>
    <span className="font-medium break-words">{v || "-"}</span>
  </div>
);

const AdminDocumentsTable = () => {
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showRaw, setShowRaw] = useState<{ [id: string]: boolean }>({});

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
        const res = await fetch(`${baseUrl}/api/get-documents`, { cache: "no-store" });
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

  if (loading) return <div className="text-center py-10">Loading documents...</div>;
  if (documents.length === 0) return <div className="text-center py-10">No documents found</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Uploaded Documents</h2>
          <span className="text-sm text-gray-500">{documents.length} records</span>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
              <div key={doc._id} className="bg-white border rounded-xl shadow p-4">
                <RowKV k="Name" v={doc.name} />
                <RowKV k="Phone" v={doc.phone} />

                <div className="h-[1px] bg-gray-200 my-3" />

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <Img src={doc.ownerAadhar} alt="Owner Aadhaar" />
                    <span className="text-xs">Owner Aadhaar</span>
                    <span className="text-xs font-mono">{doc.ownerAadharNumber || "-"}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Img src={doc.ownerPan} alt="Owner PAN" />
                    <span className="text-xs">Owner PAN</span>
                    <span className="text-xs font-mono">{doc.ownerPanNumber || "-"}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Img src={doc.ownerIndex2} alt="Owner Index 2" />
                    <span className="text-xs">Owner Index 2</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Img src={doc.renterAadhar} alt="Renter Aadhaar" />
                    <span className="text-xs">Renter Aadhaar</span>
                    <span className="text-xs font-mono">{doc.renterAadharNumber || "-"}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Img src={doc.renterPan} alt="Renter PAN" />
                    <span className="text-xs">Renter PAN</span>
                    <span className="text-xs font-mono">{doc.renterPanNumber || "-"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRaw((p) => ({ ...p, [doc._id]: !p[doc._id] }))}
                  className="mt-3 text-sm text-blue-700 underline"
                >
                  {showRaw[doc._id] ? "Hide" : "Show"} Raw OCR Text
                </button>

                {showRaw[doc._id] && (
                  <div className="mt-2 text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded">
                    {[
                      doc.ownerAadharText && `Owner Aadhaar:\n${doc.ownerAadharText}`,
                      doc.ownerPanText && `\nOwner PAN:\n${doc.ownerPanText}`,
                      doc.ownerIndex2Text && `\nOwner Index 2:\n${doc.ownerIndex2Text}`,
                      doc.renterAadharText && `\nRenter Aadhaar:\n${doc.renterAadharText}`,
                      doc.renterPanText && `\nRenter PAN:\n${doc.renterPanText}`,
                    ]
                      .filter(Boolean)
                      .join("\n")}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Owner Aadhaar</th>
                  <th className="px-4 py-2">Owner PAN</th>
                  <th className="px-4 py-2">Owner Index 2</th>
                  <th className="px-4 py-2">Renter Aadhaar</th>
                  <th className="px-4 py-2">Renter PAN</th>
                  <th className="px-4 py-2">Parsed</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2">{doc.phone}</td>
                    <td className="px-4 py-2"><Img src={doc.ownerAadhar} alt="Owner Aadhaar" /></td>
                    <td className="px-4 py-2"><Img src={doc.ownerPan} alt="Owner PAN" /></td>
                    <td className="px-4 py-2"><Img src={doc.ownerIndex2} alt="Owner Index 2" /></td>
                    <td className="px-4 py-2"><Img src={doc.renterAadhar} alt="Renter Aadhaar" /></td>
                    <td className="px-4 py-2"><Img src={doc.renterPan} alt="Renter PAN" /></td>
                    <td className="px-4 py-2 text-xs font-mono">
                      {[
                        doc.ownerAadharNumber && `Owner Aadhaar: ${doc.ownerAadharNumber}`,
                        doc.ownerPanNumber && `Owner PAN: ${doc.ownerPanNumber}`,
                        doc.renterAadharNumber && `Renter Aadhaar: ${doc.renterAadharNumber}`,
                        doc.renterPanNumber && `Renter PAN: ${doc.renterPanNumber}`,
                      ]
                        .filter(Boolean)
                        .join(" | ") || "-"}
                      <div>
                        <button
                          onClick={() => setShowRaw((p) => ({ ...p, [doc._id]: !p[doc._id] }))}
                          className="text-blue-700 underline"
                        >
                          {showRaw[doc._id] ? "Hide" : "Show"} Raw
                        </button>
                        {showRaw[doc._id] && (
                          <div className="mt-1 text-[11px] text-gray-700 whitespace-pre-wrap">
                            {[
                              doc.ownerAadharText && `Owner Aadhaar:\n${doc.ownerAadharText}`,
                              doc.ownerPanText && `\nOwner PAN:\n${doc.ownerPanText}`,
                              doc.ownerIndex2Text && `\nOwner Index 2:\n${doc.ownerIndex2Text}`,
                              doc.renterAadharText && `\nRenter Aadhaar:\n${doc.renterAadharText}`,
                              doc.renterPanText && `\nRenter PAN:\n${doc.renterPanText}`,
                            ]
                              .filter(Boolean)
                              .join("\n")}
                          </div>
                        )}
                      </div>
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
