"use client";
import React, { useState, useEffect } from 'react';
import { Table, Spin, Card, message, Modal, Descriptions, Tag } from 'antd';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Clock, Car } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  candidateLocation: string;
  age: string;
  gender: string;
  maritalStatus: string;
  employmentStatus: string;
  jobTitle: string;
  profession: string;
  experience: string;
  educationLevel: string;
  languages: string[];
  workTimings: string;
  vehicleBrand: string;
  vehicleOwnership: string;
  vehiclePurchaseYear: number;
  companyName: string;
  industry: string;
  preferredCategories: string[];
  preferredDomains: string[];
  alternativePhone: string;
  alternativeEmail: string;
  whatsappAvailable: boolean;
  workAvailability: {
    days: string[];
    hours: number;
  };
  educationHistory: Education[];
  workHistory: Experience[];
  createdAt: string;
  role: string;
}

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/all-candidates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }

        const data = await response.json();
        if (data.candidates) {
          setCandidates(data.candidates);
        } else {
          setError('No candidates found');
        }
      } catch (err: any) {
        console.error('Error fetching candidates:', err);
        setError(err.message || 'Failed to fetch candidates');
        message.error(err.message || 'Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const showCandidateDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCandidate(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      render: (text: string, record: Candidate) => (
        <span
          className="flex items-center text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => showCandidateDetails(record)}
        >
          <User size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <Mail size={14} className="text-blue-600 mr-1" />
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
        <span className="flex items-center text-sm">
          <Phone size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'candidateLocation',
      key: 'candidateLocation',
      width: 120,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <MapPin size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <Calendar size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      width: 130,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <Briefcase size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Education',
      dataIndex: 'educationLevel',
      key: 'educationLevel',
      width: 120,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <GraduationCap size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Work Availability',
      dataIndex: 'workAvailability',
      key: 'workAvailability',
      width: 150,
      render: (availability: { days: string[]; hours: number }) => (
        <span className="flex items-center text-sm">
          <Clock size={14} className="text-blue-600 mr-1" />
          {availability?.days?.length ? `${availability.days.join(', ')} (${availability.hours} hrs)` : 'N/A'}
        </span>
      ),
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicleOwnership',
      key: 'vehicleOwnership',
      width: 110,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <Car size={14} className="text-blue-600 mr-1" />
          {text || 'N/A'}
        </span>
      ),
    },
    {
      title: 'Reg. Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (text: string) => (
        <span className="flex items-center text-sm">
          <Calendar size={14} className="text-blue-600 mr-1" />
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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="bg-white shadow-md rounded-xl border border-gray-100 p-4">
          <p className="text-red-500 text-center text-base">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <main className="w-full max-w-5xl p-4">
        <Card
          title={<h2 className="text-xl font-semibold text-gray-800">Registered Candidates</h2>}
          className="bg-white shadow-md rounded-xl border border-gray-100"
          bodyStyle={{ padding: '16px' }}
        >
          <Table
            columns={columns}
            dataSource={candidates.filter(candidate => candidate.role === 'candidate')}
            rowKey="_id"
            pagination={{ pageSize: 10, position: ['bottomRight'], size: 'small' }}
            scroll={{ x: 'max-content' }}
            className="overflow-x-auto"
            bordered
            rowClassName="hover:bg-gray-50"
            size="small"
            style={{ borderRadius: '8px' }}
          />
        </Card>
        {selectedCandidate && (
          <Modal
            title={<h2 className="text-lg font-semibold">{selectedCandidate.fullName}'s Details</h2>}
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            className="rounded-lg"
          >
            <Descriptions bordered column={1} size="small" className="bg-white">
              <Descriptions.Item label="Full Name">
                <span className="flex items-center">
                  <User size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.fullName || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <span className="flex items-center">
                  <Mail size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.email || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Alternative Email">
                {selectedCandidate.alternativeEmail || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <span className="flex items-center">
                  <Phone size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.phone || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Alternative Phone">
                {selectedCandidate.alternativePhone || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="WhatsApp Available">
                {selectedCandidate.whatsappAvailable ? 'Yes' : 'No'}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                <span className="flex items-center">
                  <MapPin size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.candidateLocation || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Age">
                <span className="flex items-center">
                  <Calendar size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.age || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {selectedCandidate.gender || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Marital Status">
                {selectedCandidate.maritalStatus || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Employment Status">
                {selectedCandidate.employmentStatus || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">
                <span className="flex items-center">
                  <Briefcase size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.jobTitle || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Profession">
                {selectedCandidate.profession || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Experience">
                {selectedCandidate.experience || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Education Level">
                <span className="flex items-center">
                  <GraduationCap size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.educationLevel || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Languages">
                {selectedCandidate.languages?.length ? selectedCandidate.languages.map((lang, index) => (
                  <Tag key={index} color="blue">{lang}</Tag>
                )) : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Work Timings">
                {selectedCandidate.workTimings || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Work Availability">
                <span className="flex items-center">
                  <Clock size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.workAvailability?.days?.length
                    ? `${selectedCandidate.workAvailability.days.join(', ')} (${selectedCandidate.workAvailability.hours} hrs)`
                    : 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Ownership">
                <span className="flex items-center">
                  <Car size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.vehicleOwnership || 'N/A'}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Brand">
                {selectedCandidate.vehicleBrand || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Purchase Year">
                {selectedCandidate.vehiclePurchaseYear || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Company Name">
                {selectedCandidate.companyName || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                {selectedCandidate.industry || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Categories">
                {selectedCandidate.preferredCategories?.length ? selectedCandidate.preferredCategories.map((cat, index) => (
                  <Tag key={index} color="green">{cat}</Tag>
                )) : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Domains">
                {selectedCandidate.preferredDomains?.length ? selectedCandidate.preferredDomains.map((domain, index) => (
                  <Tag key={index} color="purple">{domain}</Tag>
                )) : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Education History">
                {selectedCandidate.educationHistory?.length ? (
                  <div>
                    {selectedCandidate.educationHistory.map((edu, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>{edu.degree}</strong> at {edu.institution}</p>
                        <p>{edu.duration}</p>
                        <p>{edu.description}</p>
                      </div>
                    ))}
                  </div>
                ) : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Work History">
                {selectedCandidate.workHistory?.length ? (
                  <div>
                    {selectedCandidate.workHistory.map((exp, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>{exp.title}</strong> at {exp.company}</p>
                        <p>{exp.duration}</p>
                        <p>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Registration Date">
                <span className="flex items-center">
                  <Calendar size={14} className="text-blue-600 mr-1" />
                  {selectedCandidate.createdAt
                    ? new Date(selectedCandidate.createdAt).toLocaleDateString('en-IN', {
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

export default CandidateList;