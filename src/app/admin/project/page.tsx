'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button, message, Table, Modal } from 'antd';
import Link from 'next/link';

interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  candidateLocation: string;
  educationHistory: Array<{
    id: number;
    degree: string;
    institution: string;
    duration: string;
    description: string;
  }>;
  workHistory: Array<{
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  status: string;
  startDate: string;
  applicants: Applicant[];
}

export default function AdminProjectDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects', {
          credentials: 'include',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch projects (Status: ${response.status})`);
        }
        const data = await response.json();
        const formattedProjects: Project[] = data.map((project: any) => ({
          _id: project._id,
          title: project.title,
          description: project.description,
          author: project.author || 'N/A',
          category: project.category || 'General',
          status: project.status || 'Draft',
          startDate: project.startDate
            ? new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'N/A',
          applicants: project.applicants || [],
        }));
        setProjects(formattedProjects);
      } catch (error: any) {
        console.error('Fetch error:', error.message);
        setError(error.message || 'An error occurred while fetching projects');
      } finally {
        setLoading(false);
      }
    };

    const session = Cookies.get('session');
    if (session) {
      fetchProjects();
    } else {
      message.error('No session found, please log in');
      router.push('/login');
    }
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }
      setProjects(projects.filter((project) => project._id !== id));
      message.success('Project deleted successfully!');
    } catch (error: any) {
      message.error(error.message || 'Failed to delete project');
    }
  };

  const fetchApplicants = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch applicants (Status: ${response.status})`);
      }
      const data = await response.json();
      const updatedProject: Project = {
        _id: data.project._id,
        title: data.project.title,
        description: data.project.description,
        author: data.project.author || 'N/A',
        category: data.project.category || 'General',
        status: data.project.status || 'Draft',
        startDate: data.project.startDate
          ? new Date(data.project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : 'N/A',
        applicants: data.project.applicants || [],
      };
      setProjects(projects.map((p) => (p._id === projectId ? updatedProject : p)));
      setSelectedProject(updatedProject);
      setIsModalOpen(true);
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch applicants');
    }
  };

  const applicantColumns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Location',
      dataIndex: 'candidateLocation',
      key: 'candidateLocation',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Education',
      key: 'educationHistory',
      render: (_: any, record: Applicant) => (
        <div className="max-h-32 overflow-y-auto">
          {record.educationHistory.length > 0 ? (
            <Table
              columns={[
                { title: 'Degree', dataIndex: 'degree', key: 'degree', render: (text: string) => text || 'N/A' },
                { title: 'Institution', dataIndex: 'institution', key: 'institution', render: (text: string) => text || 'N/A' },
                { title: 'Duration', dataIndex: 'duration', key: 'duration', render: (text: string) => text || 'N/A' },
                { title: 'Description', dataIndex: 'description', key: 'description', render: (text: string) => text || 'N/A' },
              ]}
              dataSource={record.educationHistory}
              pagination={false}
              rowKey="id"
              size="small"
              bordered
            />
          ) : (
            <span className="text-gray-500">No education history</span>
          )}
        </div>
      ),
    },
    {
      title: 'Work History',
      key: 'workHistory',
      render: (_: any, record: Applicant) => (
        <div className="max-h-32 overflow-y-auto">
          {record.workHistory.length > 0 ? (
            <Table
              columns={[
                { title: 'Title', dataIndex: 'title', key: 'title', render: (text: string) => text || 'N/A' },
                { title: 'Company', dataIndex: 'company', key: 'company', render: (text: string) => text || 'N/A' },
                { title: 'Duration', dataIndex: 'duration', key: 'duration', render: (text: string) => text || 'N/A' },
                { title: 'Description', dataIndex: 'description', key: 'description', render: (text: string) => text || 'N/A' },
              ]}
              dataSource={record.workHistory}
              pagination={false}
              rowKey="id"
              size="small"
              bordered
            />
          ) : (
            <span className="text-gray-500">No work history</span>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Project Dashboard</h1>
        <Link href="/admin/project/add">
          <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
            Add New Project
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
            <div className="text-sm text-gray-500 space-y-2">
              <p><strong>Author:</strong> {project.author}</p>
              <p><strong>Category:</strong> {project.category}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Start Date:</strong> {project.startDate}</p>
              <p><strong>Applicants:</strong> {project.applicants.length}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/admin/project/add?id=${project._id}`}>
                <Button
                  type="default"
                  className="border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  Edit
                </Button>
              </Link>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                type="default"
                onClick={() => fetchApplicants(project._id)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                View Applicants
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={<span className="text-xl font-semibold">{selectedProject?.title} Applicants</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={1200}
        className="modal-custom"
      >
        {selectedProject?.applicants.length > 0 ? (
          <Table
            columns={applicantColumns}
            dataSource={selectedProject.applicants}
            pagination={{ pageSize: 5 }}
            rowKey="_id"
            className="applicant-table"
            scroll={{ x: true }}
          />
        ) : (
          <p className="text-gray-500 text-center py-4">No applicants for this project</p>
        )}
      </Modal>
      <style jsx>{`
        .modal-custom :global(.ant-modal-body) {
          padding: 24px;
        }
        .applicant-table :global(.ant-table) {
          background: #ffffff;
          border-radius: 8px;
        }
        .applicant-table :global(.ant-table-thead > tr > th) {
          background: #f1f5f9;
          font-weight: 600;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
        }
        .applicant-table :global(.ant-table-tbody > tr > td) {
          border-bottom: 1px solid #e5e7eb;
        }
        .applicant-table :global(.ant-table-tbody > tr:hover > td) {
          background: #f8fafc;
        }
      `}</style>
    </div>
  );
}