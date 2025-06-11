'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Form, Input, Select, message } from 'antd';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Cookies from 'js-cookie';

const { TextArea } = Input;
const { Option } = Select;

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  status: 'Published' | 'Draft';
  startDate?: string;
  preferredAge?: number;
  preferredGender?: 'Male' | 'Female' | 'Other';
  preferredEducation?: string;
  preferredOccupation?: string;
  preferredLanguages?: string[];
  preferredLocation?: string;
  preferredCountry?: string;
  youtubeLink?: string;
}

export default function AddProject() {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const fetchProject = async () => {
        try {
          const res = await fetch(`/api/projects/${id}`, { credentials: 'include' });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch project');
          }
          const data = await res.json();
          const project = data.project;
          form.setFieldsValue({
            title: project.title || '',
            description: project.description || '',
            category: project.category || '',
            status: project.status || 'Draft',
            startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : undefined,
            preferredAge: project.preferredAge || undefined,
            preferredGender: project.preferredGender || undefined,
            preferredEducation: project.preferredEducation || '',
            preferredOccupation: project.preferredOccupation || '',
            preferredLanguages: project.preferredLanguages || [],
            preferredLocation: project.preferredLocation || '',
            preferredCountry: project.preferredCountry || '',
            youtubeLink: project.youtubeLink || '',
          });
        } catch (error: any) {
          message.error(error.message || 'Error fetching project');
        }
      };
      fetchProject();
    }
  }, [searchParams, form]);

  const onFinish = async (values: ProjectFormData) => {
    setLoading(true);
    setError('');

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded.');
      setLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('project_submit');
      const data = {
        title: values.title || '',
        description: values.description || '',
        category: values.category || '',
        status: values.status || 'Draft',
        startDate: values.startDate || undefined,
        preferredAge: values.preferredAge ? Number(values.preferredAge) : undefined,
        preferredGender: values.preferredGender || undefined,
        preferredEducation: values.preferredEducation || '',
        preferredOccupation: values.preferredOccupation || '',
        preferredLanguages: values.preferredLanguages || [],
        preferredLocation: values.preferredLocation || '',
        preferredCountry: values.preferredCountry || '',
        youtubeLink: values.youtubeLink || '',
        recaptchaToken,
      };

      console.log('Submitting data:', data);

      const id = searchParams.get('id');
      const url = id ? `/api/projects/${id}` : '/api/projects';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          message.error('Unauthorized: Please log in again');
          return;
        }
        if (result.errors) {
          form.setFields(
            Object.keys(result.errors).map((field) => ({
              name: field,
              errors: [result.errors[field]],
            }))
          );
        }
        throw new Error(result.message || 'Failed to save project');
      }
      message.success(id ? 'Project updated successfully!' : 'Project added successfully!');
      router.push('/admin/project');
    } catch (error: any) {
      console.error('Form submission error:', error);
      setError(error.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{searchParams.get('id') ? 'Edit Project' : 'Add Project'}</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the project title' }]}>
          <Input placeholder="Project Title" disabled={loading} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the project description' }]}
        >
          <TextArea rows={4} placeholder="Project Description" disabled={loading} />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select placeholder="Select Category" disabled={loading}>
            <Option value="Tech">Tech</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Healthcare">Healthcare</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select a status' }]}>
          <Select placeholder="Select Status" disabled={loading}>
            <Option value="Published">Published</Option>
            <Option value="Draft">Draft</Option>
          </Select>
        </Form.Item>
        <Form.Item name="startDate" label="Start Date">
          <Input type="date" disabled={loading} />
        </Form.Item>
        <Form.Item name="preferredAge" label="Preferred Age">
          <Input type="number" placeholder="Preferred Age" disabled={loading} />
        </Form.Item>
        <Form.Item name="preferredGender" label="Preferred Gender">
          <Select placeholder="Select Gender" allowClear disabled={loading}>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="preferredEducation" label="Preferred Education">
          <Input placeholder="Preferred Education (e.g., Bachelor's)" disabled={loading} />
        </Form.Item>
        <Form.Item name="preferredOccupation" label="Preferred Occupation">
          <Input placeholder="Preferred Occupation (e.g., Software Engineer)" disabled={loading} />
        </Form.Item>
        <Form.Item name="preferredLanguages" label="Preferred Languages">
          <Select mode="multiple" placeholder="Select Languages" disabled={loading}>
            <Option value="English">English</Option>
            <Option value="Hindi">Hindi</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="French">French</Option>
          </Select>
        </Form.Item>
        <Form.Item name="preferredLocation" label="Preferred Location">
          <Input placeholder="Preferred Location (e.g., Mumbai)" disabled={loading} />
        </Form.Item>
        <Form.Item name="preferredCountry" label="Preferred Country">
          <Input placeholder="Preferred Country (e.g., India)" disabled={loading} />
        </Form.Item>
        <Form.Item name="youtubeLink" label="YouTube Link">
          <Input placeholder="YouTube Link (e.g., https://youtube.com/...)" disabled={loading} />
        </Form.Item>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {searchParams.get('id') ? 'Update Project' : 'Add Project'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}