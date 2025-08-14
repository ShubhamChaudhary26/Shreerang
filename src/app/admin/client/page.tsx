'use client';

import React, { useState, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { User, Mail, Phone, Calendar } from "lucide-react";
import type { ColumnsType } from "antd/es/table";

interface Client {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/joinus/verifyotp", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok)
          throw new Error(`Failed to fetch clients: ${response.statusText}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length) setClients(data);
        else setError("No clients found");
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch clients");
        message.error(err.message || "Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const columns: ColumnsType<Client> = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => (
        <span className="flex items-center text-gray-900">
          <User size={16} className="mr-2 text-indigo-600" />
          {text || "N/A"}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <span className="flex items-center text-gray-900">
          <Mail size={16} className="mr-2 text-indigo-600" />
          {text || "N/A"}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => (
        <span className="flex items-center text-gray-900">
          <Phone size={16} className="mr-2 text-indigo-600" />
          {text || "N/A"}
        </span>
      ),
    },
    {
      title: "Submission Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text ? (
          <span className="flex items-center text-gray-900">
            <Calendar size={16} className="mr-2 text-indigo-600" />
            {new Date(text).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ) : (
          "N/A"
        ),
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-center text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 px-4">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Registered Clients</h2>

        {isMobile ? (
          // Mobile: render vertical card-style table
          <div className="flex flex-col gap-4">
            {clients.map((client) => (
              <div
                key={client._id}
                className="bg-white border rounded-lg shadow-md p-4 flex flex-col gap-2"
              >
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-indigo-600" />
                  <span className="font-semibold">{client.fullName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-indigo-600" />
                  <span>{client.email || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-indigo-600" />
                  <span>{client.phone || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-indigo-600" />
                  <span>
                    {client.createdAt
                      ? new Date(client.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: normal horizontal table
          <Table
            columns={columns}
            dataSource={clients}
            rowKey="_id"
            pagination={{ pageSize: 10, position: ["bottomRight"] }}
            scroll={{ x: "max-content" }}
            size="middle"
            bordered
            className="bg-white border border-blue-600 rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ClientList;
