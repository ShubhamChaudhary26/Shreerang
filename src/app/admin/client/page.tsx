"use client";
import React, { useState, useEffect } from 'react';
import { Table, Spin, Card, message, Tooltip, Modal, Descriptions } from 'antd';
import { User, Mail, Phone, Briefcase, MessageSquare, Calendar } from 'lucide-react';

interface Client {
  _id: string;
  fullName: string;
  companyName: string;
  email: string; // Business email
  phone: string;
  industry: string;
  message: string;
  createdAt: string;
  role: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/requestquote', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch clients: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched clients:', data); // Debug log
        if (Array.isArray(data) && data.length) {
          setClients(data);
        } else {
          setError('No clients found');
        }
      } catch (err: any) {
        console.error('Error fetching clients:', err);
        setError(err.message || 'Failed to fetch clients');
        message.error(err.message || 'Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const showClientDetails = (client: Client) => {
    setSelectedClient(client);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedClient(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      render: (text: string, record: Client) => (
        <span
          className="flex items-center text-sm font-medium text-indigo-600 cursor-pointer hover:underline"
          onClick={() => showClientDetails(record)}
        >
          <User size={16} className="text-indigo-600 mr-2" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Business Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text: string) => (
        <span className="flex items-center text-sm text-gray-900">
          <Mail size={16} className="text-indigo-600 mr-2" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      render: (text: string) => (
        <span className="flex items-center text-sm text-gray-900">
          <Phone size={16} className="text-indigo-600 mr-2" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 150,
      render: (text: string) => (
        <span className="flex items-center text-sm text-gray-900">
          <Briefcase size={16} className="text-indigo-600 mr-2" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      width: 180,
      render: (text: string) => (
        <Tooltip title={text} placement="top">
          <span className="flex items-center text-sm text-gray-900 truncate">
            <Briefcase size={16} className="text-indigo-600 mr-2 flex-shrink-0" />
            <span className="truncate max-w-[140px]">{text || 'N/A'}</span>
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 200,
      render: (text: string) => (
        <Tooltip title={text} placement="top">
          <span className="flex items-center text-sm text-gray-900 truncate">
            <MessageSquare size={16} className="text-indigo-600 mr-2" />
            <span className="truncate max-w-[160px]">{text || 'N/A'}</span>
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (text: string) => (
        <span className="flex items-center text-sm text-gray-900">
          <Calendar size={16} className="text-indigo-600 mr-2" />
          {text ? new Date(text).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }) : 'N/A'}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="bg-white shadow-2xl rounded-xl border border-gray-200 p-6">
          <p className="text-red-600 text-center text-lg font-semibold">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-2 px-4">
      <main className="w-full max-w-6xl">
        <Card
          title={<h2 className="text-2xl font-bold text-gray-900">Registered Clients</h2>}
          className="bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden"
          headStyle={{ padding: '25px 24px', borderBottom: '1px solid #e5e7eb' }}
          bodyStyle={{ padding: '30px 30px 20px' }}
        >
          <Table
            columns={columns}
            dataSource={clients}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              position: ['bottomRight'],
              size: 'small',
              showTotal: (total) => `Total ${total} clients`,
              className: 'mt-4',
            }}
            scroll={{ x: 'max-content' }}
            className="border border-gray-200 rounded-lg"
            bordered={false}
            rowClassName="bg-white hover:bg-indigo-50 transition-colors duration-200"
            size="middle"
          />
        </Card>
        {selectedClient && (
          <Modal
            title={<h2 className="text-lg font-semibold">{selectedClient.fullName}'s Details</h2>}
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            width={600}
            className="rounded-lg"
          >
            <Descriptions bordered column={1} size="small" className="bg-white">
              <Descriptions.Item label="Full Name">
                <span className="flex items-center">
                  <User size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.fullName || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Business Email">
                <span className="flex items-center">
                  <Mail size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.email || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <span className="flex items-center">
                  <Phone size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.phone || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Company Name">
                <span className="flex items-center">
                  <Briefcase size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.companyName || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                <span className="flex items-center">
                  <Briefcase size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.industry || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Message">
                <span className="flex items-center">
                  <MessageSquare size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.message || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Submission Date">
                <span className="flex items-center">
                  <Calendar size={16} className="text-indigo-600 mr-2" />
                  {selectedClient.createdAt
                    ? new Date(selectedClient.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default ClientList;