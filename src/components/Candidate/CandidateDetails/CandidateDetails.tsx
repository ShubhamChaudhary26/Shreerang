'use client';

import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, message, Switch, Checkbox } from 'antd';
import {
  Briefcase,
  FileText,
  MessageSquare,
  Send,
  User,
  Phone,
  Link as LinkIcon,
  Clock,
  Globe,
  Heart,
  Car,
  Calendar,
  Users,
  MapPin,
  Tag,
  Mail,
  CheckCircle,
  Dribbble,
  Facebook,
  Linkedin,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../CandidateDashboard/SideBar';
import { useUser } from '@/src/hooks/UserContext';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const { TextArea } = Input;

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

interface UserData {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  experience: string;
  profession: string;
  workTimings: string;
  vehicleBrand: string;
  vehiclePurchaseYear: string;
  languages: string[];
  age: string;
  gender: string;
  maritalStatus: string;
  employmentStatus: string;
  vehicleOwnership: string;
  description: string;
  educationHistory: Education[];
  workHistory: Experience[];
  profilePicture: string;
  candidateLocation: string;
  preferredCategories: string[];
  preferredDomains: string[];
  alternativePhone: string;
  alternativeEmail: string;
  whatsappAvailable: boolean;
  workAvailability: {
    days: string[];
    hours: number;
  };
  profileCompletion: any;
  companyName: string;
  industry: string;
  message: string;
  termsAgreed: boolean;
  newsletterOptIn: boolean;
}

interface CandidateDetail {
  label: string;
  value: string | boolean | string[];
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

interface FormErrors {
  fullName?: string;
  candidateLocation?: string;
  preferredCategories?: string;
  age?: string;
  employmentStatus?: string;
  gender?: string;
  maritalStatus?: string;
  email?: string;
  termsAgreed?: string;
  newsletterOptIn?: string;
  educationHistory?: string;
  workHistory?: string;
  description?: string;
}

const CandidateDetails: React.FC = () => {
  const [form] = Form.useForm();
  const { userEmail } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/candidateprofile?email=${encodeURIComponent(userEmail || '')}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }

        const mappedData: UserData = {
          fullName: data.user.fullName || 'Not specified',
          jobTitle: data.user.jobTitle || 'Not specified',
          phone: data.user.phone || 'Not specified',
          email: userEmail || data.user.email || 'Not specified',
          website: data.user.website || '',
          experience: data.user.experience || 'Not specified',
          profession: data.user.profession || 'Not specified',
          workTimings: data.user.workTimings || 'Not specified',
          vehicleBrand: data.user.vehicleBrand || 'Not specified',
          vehiclePurchaseYear: data.user.vehiclePurchaseYear || '',
          languages: Array.isArray(data.user.languages) ? data.user.languages : [],
          age: data.user.age || '',
          gender: data.user.gender || '',
          maritalStatus: data.user.maritalStatus || 'Not specified',
          employmentStatus: data.user.employmentStatus || 'Not specified',
          vehicleOwnership: data.user.vehicleOwnership || 'Not specified',
          description: data.user.description || 'No description provided.',
          educationHistory: data.user.educationHistory || [],
          workHistory: data.user.workHistory || [],
          profilePicture: data.user.profilePicture || '',
          candidateLocation: data.user.candidateLocation || 'Not specified',
          preferredCategories: Array.isArray(data.user.preferredCategories) ? data.user.preferredCategories : [],
          preferredDomains: Array.isArray(data.user.preferredDomains) ? data.user.preferredDomains : [],
          alternativePhone: data.user.alternativePhone || 'Not specified',
          alternativeEmail: data.user.alternativeEmail || 'Not specified',
          whatsappAvailable: data.user.whatsappAvailable || false,
          workAvailability: {
            days: Array.isArray(data.user.workAvailability?.days) ? data.user.workAvailability.days : [],
            hours: Number(data.user.workAvailability?.hours) || 0,
          },
          companyName: data.user.companyName || 'Not specified',
          industry: data.user.industry || 'Not specified',
          message: data.user.message || 'Not specified',
          termsAgreed: data.user.termsAgreed || false,
          newsletterOptIn: data.user.newsletterOptIn || false,
          profileCompletion: calculateProfileCompletion(data.user),
        };
        setUserData(mappedData);
        form.setFieldsValue(mappedData);
        console.log('Fetched user data:', {
          email: mappedData.email,
          profilePicture: mappedData.profilePicture ? 'Present' : 'Absent',
          languages: mappedData.languages,
          termsAgreed: mappedData.termsAgreed,
          newsletterOptIn: mappedData.newsletterOptIn,
        });
      } catch (err: any) {
        console.error('Error fetching user data:', err.message);
        setUserData(null);
        message.error('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      console.error('User email not found');
      message.error('User email not found');
      setLoading(false);
    }
  }, [userEmail, form]);

  const calculateProfileCompletion = (user: any): number => {
    const requiredFields = [
      'fullName',
      'jobTitle',
      'phone',
      'email',
      'experience',
      'profession',
      'workTimings',
      'vehicleBrand',
      'languages',
      'age',
      'gender',
      'maritalStatus',
      'employmentStatus',
      'vehicleOwnership',
      'candidateLocation',
      'preferredCategories',
      'preferredDomains',
      'alternativePhone',
      'alternativeEmail',
      'companyName',
      'industry',
      'message',
      'profilePicture',
      'termsAgreed',
      'newsletterOptIn',
    ];
    const filledFields = requiredFields.filter((field) => {
      if (field === 'preferredCategories' || field === 'preferredDomains' || field === 'languages') {
        return Array.isArray(user[field]) && user[field].length > 0;
      }
      if (field === 'termsAgreed' || field === 'newsletterOptIn') {
        return user[field] !== undefined && user[field] !== null;
      }
      return user[field] && user[field] !== 'Not specified' && user[field] !== '';
    });
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  const validateForm = (values: any) => {
    const errors: FormErrors = {};
    const requiredFields: {
      name: keyof UserData;
      label: string;
      type: 'string' | 'array' | 'boolean';
    }[] = [
      { name: 'fullName', label: 'Full Name', type: 'string' },
      { name: 'candidateLocation', label: 'Location', type: 'string' },
      { name: 'preferredCategories', label: 'Preferred Categories', type: 'array' },
      { name: 'age', label: 'Age', type: 'string' },
      { name: 'employmentStatus', label: 'Employment Status', type: 'string' },
      { name: 'gender', label: 'Gender', type: 'string' },
      { name: 'maritalStatus', label: 'Marital Status', type: 'string' },
      { name: 'termsAgreed', label: 'Terms Agreement', type: 'boolean' },
      { name: 'newsletterOptIn', label: 'Newsletter Opt-In', type: 'boolean' },
      { name: 'description', label: 'Description', type: 'string' },
    ];

    for (const { name, label, type } of requiredFields) {
      if (type === 'array') {
        if (!Array.isArray(values[name]) || (values[name] as string[]).length === 0) {
          errors[name] = `${label} is required`;
        }
      } else if (type === 'boolean') {
        if (values[name] !== true) {
          errors[name] = `${label} must be agreed to`;
        }
      } else if (!values[name] || values[name] === 'Not specified') {
        errors[name] = `${label} is required`;
      }
    }

    if (!values.educationHistory || values.educationHistory.every((edu: Education) => !edu.degree || !edu.institution)) {
      errors.educationHistory = 'At least one education entry with degree and institution is required';
    }
    if (!values.workHistory || values.workHistory.every((exp: Experience) => !exp.title || !exp.company)) {
      errors.workHistory = 'At least one work experience entry with title and company is required';
    }

    setFormErrors(errors);
    console.log('Form validation errors:', errors);
    return Object.keys(errors).length === 0;
  };

  const onFinish = async (values: any) => {
    if (!validateForm(values)) {
      message.error('Please fill all required fields.');
      return;
    }

    if (!executeRecaptcha) {
      message.error('reCAPTCHA not loaded. Please refresh and try again.');
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('candidate_details_form');
      const dataToSend = {
        ...values,
        email: userEmail,
        profilePicture: userData?.profilePicture || '',
        recaptchaToken,
      };
      console.log('PUT data to send:', {
        email: dataToSend.email,
        profilePicture: dataToSend.profilePicture ? dataToSend.profilePicture.substring(0, 50) + '...' : 'No image',
        termsAgreed: dataToSend.termsAgreed,
        newsletterOptIn: dataToSend.newsletterOptIn,
        recaptchaToken: recaptchaToken.substring(0, 50) + '...',
      });

      setLoading(true);
      const response = await fetch('/api/user/candidateprofile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to update profile:', data.error, 'Status:', response.status);
        throw new Error(data.error || 'Failed to update profile');
      }

      setUserData({
        ...userData!,
        ...values,
        profilePicture: userData!.profilePicture,
        profileCompletion: calculateProfileCompletion({ ...userData, ...values }),
      });
      setEditMode(false);
      message.success('Profile updated successfully');
      console.log('Profile updated:', {
        profilePicture: data.user?.profilePicture ? 'Present' : 'Absent',
      });
    } catch (err: any) {
      console.error('Error updating profile:', err.message);
      message.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = userData!.educationHistory.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setUserData({ ...userData!, educationHistory: updatedEducation });
    form.setFieldsValue({ educationHistory: updatedEducation });
    setFormErrors((prev) => ({ ...prev, educationHistory: '' }));
  };

  const handleWorkHistoryChange = (index: number, field: string, value: string) => {
    const updatedWorkHistory = userData!.workHistory.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setUserData({ ...userData!, workHistory: updatedWorkHistory });
    form.setFieldsValue({ workHistory: updatedWorkHistory });
    setFormErrors((prev) => ({ ...prev, workHistory: '' }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: userData!.educationHistory.length + 1,
      degree: '',
      institution: '',
      duration: '',
      description: '',
    };
    setUserData({
      ...userData!,
      educationHistory: [...userData!.educationHistory, newEducation],
    });
    form.setFieldsValue({
      educationHistory: [...userData!.educationHistory, newEducation],
    });
  };

  const addWorkHistory = () => {
    const newWork: Experience = {
      id: userData!.workHistory.length + 1,
      title: '',
      company: '',
      duration: '',
      description: '',
    };
    setUserData({
      ...userData!,
      workHistory: [...userData!.workHistory, newWork],
    });
    form.setFieldsValue({
      workHistory: [...userData!.workHistory, newWork],
    });
  };

  const candidateDetails: CandidateDetail[] = userData
    ? [
        { label: 'Full Name', value: userData.fullName, icon: User },
        { label: 'Job Title', value: userData.jobTitle, icon: Briefcase },
        { label: 'Phone', value: userData.phone, icon: Phone },
        { label: 'Email', value: userData.email, icon: Send },
        { label: 'Website', value: userData.website, icon: LinkIcon },
        { label: 'Experience', value: userData.experience, icon: Briefcase },
        { label: 'Profession', value: userData.profession, icon: Briefcase },
        { label: 'Work Timings', value: userData.workTimings, icon: Clock },
        { label: 'Vehicle Brand', value: userData.vehicleBrand, icon: Car },
        { label: 'Vehicle Purchase Year', value: userData.vehiclePurchaseYear, icon: Calendar },
        { label: 'Languages', value: userData.languages.join(', '), icon: Globe },
        { label: 'Age', value: userData.age, icon: Calendar },
        { label: 'Gender', value: userData.gender, icon: Users },
        { label: 'Marital Status', value: userData.maritalStatus, icon: Heart },
        { label: 'Employment Status', value: userData.employmentStatus, icon: Briefcase },
        { label: 'Vehicle Ownership', value: userData.vehicleOwnership, icon: Car },
        { label: 'Location', value: userData.candidateLocation, icon: MapPin },
        { label: 'Preferred Categories', value: userData.preferredCategories.join(', '), icon: Tag },
        { label: 'Preferred Domains', value: userData.preferredDomains.join(', '), icon: Tag },
        { label: 'Alternative Phone', value: userData.alternativePhone, icon: Phone },
        { label: 'Alternative Email', value: userData.alternativeEmail, icon: Mail },
        { label: 'WhatsApp Available', value: userData.whatsappAvailable ? 'Yes' : 'No', icon: CheckCircle },
        { label: 'Work Availability Days', value: userData.workAvailability.days.join(', '), icon: Calendar },
        { label: 'Work Availability Hours', value: userData.workAvailability.hours.toString(), icon: Clock },
        { label: 'Company Name', value: userData.companyName, icon: Briefcase },
        { label: 'Industry', value: userData.industry, icon: Briefcase },
        { label: 'Message', value: userData.message, icon: MessageSquare },
        { label: 'Terms Agreed', value: userData.termsAgreed ? 'Yes' : 'No', icon: CheckCircle },
        { label: 'Newsletter Opt-In', value: userData.newsletterOptIn ? 'Yes' : 'No', icon: CheckCircle },
        { label: 'Profile Completion', value: `${userData.profileCompletion}%`, icon: CheckCircle },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="mt-20 px-2 py-2">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-[90px] p-4 sm:p-6 ">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-gray-800">Loading...</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Candidate Profile</h1>
              <Button
                type="primary"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card
                title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">{`About ${userData?.fullName} Details`}</h2>}
                className="lg:col-span-2 bg-white shadow-md rounded-xl border border-gray-100"
                styles={{ body: { padding: '24px' } }}
              >
                <div className="mb-6 flex justify-center">
                  {userData?.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile Picture"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-2 border-gray-300 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <Form form={form} onFinish={onFinish}>
                  {editMode ? (
                    <Form.Item name="description" label="Description">
                      <TextArea rows= {4} className={formErrors.description ? 'border-rose-800' : ''} />
                      {formErrors.description && (
                        <p className="text-rose-800 text-sm mt-1">{formErrors.description}</p>
                      )}
                    </Form.Item>
                  ) : (
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {userData?.description || 'No description available.'}
                    </p>
                  )}
                </Form>
              </Card>

              <Card
                title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">{`${userData?.fullName}'s Details`}</h2>}
                className="bg-white shadow-md rounded-xl border border-gray-100"
                styles={{ body: { padding: '24px' } }}
              >
                <Form form={form} onFinish={onFinish} layout="vertical">
                  {editMode ? (
                    <>
                      {[
                        { name: 'fullName', label: 'Full Name', type: 'text' },
                        { name: 'jobTitle', label: 'Job Title', type: 'text' },
                        { name: 'phone', label: 'Phone', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email', disabled: true },
                        { name: 'website', label: 'Website', type: 'text' },
                        { name: 'experience', label: 'Experience', type: 'text' },
                        { name: 'profession', label: 'Profession', type: 'text' },
                        { name: 'workTimings', label: 'Work Timings', type: 'text' },
                        { name: 'vehicleBrand', label: 'Vehicle Brand', type: 'text' },
                        { name: 'vehiclePurchaseYear', label: 'Vehicle Purchase Year', type: 'number' },
                        { name: 'languages', label: 'Languages', type: 'select', multiple: true },
                        { name: 'companyName', label: 'Company Name', type: 'text' },
                        { name: 'industry', label: 'Industry', type: 'text' },
                        { name: 'message', label: 'Message', type: 'textarea' },
                        { name: 'alternativePhone', label: 'Alternative Phone', type: 'text' },
                        { name: 'alternativeEmail', label: 'Alternative Email', type: 'email' },
                        { name: 'candidateLocation', label: 'Location', type: 'text' },
                      ].map((field) => (
                        <Form.Item key={field.name} name={field.name} label={field.label}>
                          {field.type === 'textarea' ? (
                            <TextArea rows={4} className={formErrors[field.name] ? 'border-rose-800' : ''} />
                          ) : field.type === 'select' && field.multiple ? (
                            <Select mode="tags" placeholder="Enter languages" className={formErrors[field.name] ? 'border-rose-800' : ''} />
                          ) : (
                            <Input type={field.type} disabled={field.disabled} className={formErrors[field.name] ? 'border-rose-800' : ''} />
                          )}
                          {formErrors[field.name] && (
                            <p className="text-rose-800 text-sm mt-1">{formErrors[field.name]}</p>
                          )}
                        </Form.Item>
                      ))}
                      <Form.Item name="age" label="Age">
                        <Select className={formErrors.age ? 'border-rose-800' : ''}>
                          <Select.Option value="">Select</Select.Option>
                          {['18 - 22 Years', '23 - 27 Years', '28 - 32 Years', '33 - 37 Years', '38+ Years'].map(
                            (opt) => (
                              <Select.Option key={opt} value={opt}>
                                {opt}
                              </Select.Option>
                            )
                          )}
                        </Select>
                        {formErrors.age && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.age}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="gender" label="Gender">
                        <Select className={formErrors.gender ? 'border-rose-800' : ''}>
                          <Select.Option value="">Select</Select.Option>
                          {['Male', 'Female', 'Other', 'Prefer not to say'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                        {formErrors.gender && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.gender}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="maritalStatus" label="Marital Status">
                        <Select className={formErrors.maritalStatus ? 'border-rose-800' : ''}>
                          <Select.Option value="">Select</Select.Option>
                          {['Single', 'Married without kids', 'Married with kids'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                        {formErrors.maritalStatus && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.maritalStatus}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="employmentStatus" label="Employment Status">
                        <Select className={formErrors.employmentStatus ? 'border-rose-800' : ''}>
                          <Select.Option value="">Select</Select.Option>
                          {['Employed', 'Unemployed'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                        {formErrors.employmentStatus && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.employmentStatus}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="vehicleOwnership" label="Vehicle Ownership">
                        <Select>
                          <Select.Option value="">Select</Select.Option>
                          {['None', '2-Wheeler', '4-Wheeler', 'Both'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="preferredCategories" label="Preferred Categories">
                        <Select mode="multiple" className={formErrors.preferredCategories ? 'border-rose-800' : ''}>
                          {['Tech', 'Marketing', 'Finance', 'Healthcare'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                        {formErrors.preferredCategories && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.preferredCategories}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="preferredDomains" label="Preferred Domains">
                        <Select mode="multiple">
                          {['Web Development', 'Data Science', 'Graphic Design', 'Finance Consulting'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name={['workAvailability', 'days']} label="Work Availability Days">
                        <Select mode="multiple">
                          {['Weekdays', 'Weekends'].map((opt) => (
                            <Select.Option key={opt} value={opt}>
                              {opt}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name={['workAvailability', 'hours']} label="Work Availability Hours">
                        <Input type="number" min={0} max={24} />
                      </Form.Item>
                      <Form.Item name="whatsappAvailable" label="WhatsApp Available" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                      <Form.Item name="termsAgreed" label="Terms and Conditions" valuePropName="checked">
                        <Checkbox>I agree to the Terms and Conditions</Checkbox>
                        {formErrors.termsAgreed && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.termsAgreed}</p>
                        )}
                      </Form.Item>
                      <Form.Item name="newsletterOptIn" label="Newsletter Opt-In" valuePropName="checked">
                        <Checkbox>I want to receive newsletters</Checkbox>
                        {formErrors.newsletterOptIn && (
                          <p className="text-rose-800 text-sm mt-1">{formErrors.newsletterOptIn}</p>
                        )}
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </Form.Item>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {candidateDetails.length > 0 ? (
                        candidateDetails.map((detail) => (
                          <div key={detail.label} className="flex items-center text-gray-700">
                            <detail.icon size={20} className="text-blue-600 mr-3" />
                            <div>
                              <p className="text-xs text-gray-500">{detail.label}:</p>
                              <p className="text-sm font-medium text-gray-800">{detail.value}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm">No details available.</p>
                      )}
                    </div>
                  )}
                </Form>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card
                  title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">Education</h2>}
                  extra={
                    editMode && (
                      <Button type="primary" onClick={addEducation}>
                        Add Education
                      </Button>
                    )
                  }
                  className="bg-white shadow-md rounded-xl border border-gray-100"
                  styles={{ body: { padding: '24px' } }}
                >
                  {editMode ? (
                    <Form.List name="educationHistory">
                      {(fields) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <Form.Item name={[field.name, 'degree']} label="Degree">
                                <Input
                                  value={userData?.educationHistory[index]?.degree}
                                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                  className={formErrors.educationHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'institution']} label="Institution">
                                <Input
                                  value={userData?.educationHistory[index]?.institution}
                                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                  className={formErrors.educationHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'duration']} label="Duration">
                                <Input
                                  value={userData?.educationHistory[index]?.duration}
                                  onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                                  className={formErrors.educationHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'description']} label="Description">
                                <TextArea
                                  rows={3}
                                  value={userData?.educationHistory[index]?.description}
                                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                                  className={formErrors.educationHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              {formErrors.educationHistory && index === 0 && (
                                <p className="text-rose-800 text-sm mt-1 col-span-2">{formErrors.educationHistory}</p>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <div className="space-y-6">
                      {userData?.educationHistory.length ? (
                        userData.educationHistory.map((edu) => (
                          <div key={edu.id} className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold flex-shrink-0 mr-4">
                              {edu.institution.charAt(0)}
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">{edu.degree}</h4>
                                  <p className="text-sm text-gray-600">{edu.institution}</p>
                                </div>
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                  {edu.duration}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">{edu.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm sm:text-base">No education history available.</p>
                      )}
                    </div>
                  )}
                </Card>

                <Card
                  title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">Work & Experience</h2>}
                  extra={
                    editMode && (
                      <Button type="primary" onClick={addWorkHistory}>
                        Add Work Experience
                      </Button>
                    )
                  }
                  className="bg-white shadow-md rounded-xl border border-gray-100"
                  styles={{ body: { padding: '24px' } }}
                >
                  {editMode ? (
                    <Form.List name="workHistory">
                      {(fields) => (
                        <>
                          {fields.map((field, index) => (
                            <div key={field.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <Form.Item name={[field.name, 'title']} label="Title">
                                <Input
                                  value={userData?.workHistory[index]?.title}
                                  onChange={(e) => handleWorkHistoryChange(index, 'title', e.target.value)}
                                  className={formErrors.workHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'company']} label="Company">
                                <Input
                                  value={userData?.workHistory[index]?.company}
                                  onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)}
                                  className={formErrors.workHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'duration']} label="Duration">
                                <Input
                                  value={userData?.workHistory[index]?.duration}
                                  onChange={(e) => handleWorkHistoryChange(index, 'duration', e.target.value)}
                                  className={formErrors.workHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              <Form.Item name={[field.name, 'description']} label="Description">
                                <TextArea
                                  rows={3}
                                  value={userData?.workHistory[index]?.description}
                                  onChange={(e) => handleWorkHistoryChange(index, 'description', e.target.value)}
                                  className={formErrors.workHistory ? 'border-rose-800' : ''}
                                />
                              </Form.Item>
                              {formErrors.workHistory && index === 0 && (
                                <p className="text-rose-800 text-sm mt-1 col-span-2">{formErrors.workHistory}</p>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                  ) : (
                    <div className="space-y-6">
                      {userData?.workHistory.length ? (
                        userData.workHistory.map((exp) => (
                          <div key={exp.id} className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg font-bold flex-shrink-0 mr-4">
                              {exp.company.charAt(0)}
                            </div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">{exp.title}</h4>
                                  <p className="text-sm text-gray-600">{exp.company}</p>
                                </div>
                                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                                  {exp.duration}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">{exp.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm sm:text-base">No work history available.</p>
                      )}
                    </div>
                  )}
                </Card>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <Card
                  title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">Social Media</h2>}
                  className="bg-white shadow-md rounded-xl border border-gray-100"
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="flex space-x-4 text-gray-600">
                    <Link href="https://www.linkedin.com/showcase/mi-auto/?viewAsMember=true" className="hover:text-blue-600 transition-colors">
                      <Linkedin size={24} />
                    </Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      <Facebook size={24} />
                    </Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      <Dribbble size={24} />
                    </Link>
                  </div>
                </Card>

                <Card
                  title={<h2 className="text-lg sm:text-xl font-semibold text-gray-800">Professional Skills</h2>}
                  className="bg-white shadow-md rounded-xl border border-gray-100"
                  styles={{ body: { padding: '24px' } }}
                >
                  <div className="flex flex-wrap gap-2">
                    {userData?.profession ? (
                      <span className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                        {userData.profession}
                      </span>
                    ) : (
                      <p className="text-gray-600 text-sm sm:text-base">No profession listed.</p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Wrap the component with GoogleReCaptchaProvider
const CandidateDetailsWithRecaptcha = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
    <CandidateDetails />
  </GoogleReCaptchaProvider>
);

export default CandidateDetailsWithRecaptcha;