'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/src/hooks/UserContext';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, Checkbox, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Cookies from 'js-cookie';
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

interface WorkAvailability {
  days: string[];
  hours: number;
}

interface CandidateFormData {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  experience: string;
  profession: string;
  workTimings: string;
  vehicleBrand: string;
  vehiclePurchaseYear: number | '';
  languages: string[];
  age: string;
  gender: string;
  maritalStatus: string;
  employmentStatus: string;
  vehicleOwnership: string;
  candidateLocation: string;
  preferredCategories: string[];
  preferredDomains: string[];
  alternativePhone: string;
  alternativeEmail: string;
  whatsappAvailable: boolean;
  workAvailability: WorkAvailability;
  companyName: string;
  industry: string;
  message: string;
  educationHistory: Education[];
  workHistory: Experience[];
  profilePicture: string;
  termsAgreed: boolean;
  newsletterOptIn: boolean;
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
  profilePicture?: string;
  termsAgreed?: string;
  newsletterOptIn?: string;
  educationHistory?: string;
  workHistory?: string;
  languages?: string; // Added to fix TypeScript error
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6 },
  }),
};

const CandidateEdit: React.FC = () => {
  const { userEmail, setUserEmail } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<CandidateFormData>({
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    website: '',
    experience: '',
    profession: '',
    workTimings: '',
    vehicleBrand: '',
    vehiclePurchaseYear: '',
    languages: [],
    age: '',
    gender: '',
    maritalStatus: '',
    employmentStatus: '',
    vehicleOwnership: '',
    candidateLocation: '',
    preferredCategories: [],
    preferredDomains: [],
    alternativePhone: '',
    alternativeEmail: '',
    whatsappAvailable: false,
    workAvailability: { days: [], hours: 0 },
    companyName: '',
    industry: '',
    message: '',
    educationHistory: [{ id: 1, degree: '', institution: '', duration: '', description: '' }],
    workHistory: [{ id: 1, title: '', company: '', duration: '', description: '' }],
    profilePicture: '',
    termsAgreed: false,
    newsletterOptIn: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Session handling
  useEffect(() => {
    const session = Cookies.get('session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (sessionData.email && sessionData.email !== userEmail) {
          setUserEmail(sessionData.email);
          console.log('Session email set:', sessionData.email);
        }
      } catch (err) {
        console.error('Error parsing session cookie:', err);
        setFormErrors({ email: 'Invalid session. Please log in again.' });
        // router.push('/login');
      }
    } else {
      console.error('No session cookie found');
      setFormErrors({ email: 'No session found. Please log in.' });
      // router.push('/login');
    }
  }, [userEmail, router, setUserEmail]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) {
        console.error('No user email found for fetching data');
        setFormErrors({ email: 'User email not found' });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/user/candidateprofile', {
          method: 'GET',
          credentials: 'include',
        });
        const userData = await res.json();
        if (!res.ok) {
          console.error('Fetch user data failed:', userData.error, 'Status:', res.status);
          throw new Error(userData.error || 'Failed to fetch user data');
        }
        console.log('Fetched user data:', {
          email: userData.user?.email,
          profilePicture: userData.user?.profilePicture ? 'Present' : 'Absent',
        });
        setFormData({
          fullName: userData.user?.fullName || '',
          jobTitle: userData.user?.jobTitle || '',
          phone: userData.user?.phone || '',
          email: userEmail || userData.user?.email || '',
          website: userData.user?.website || '',
          experience: userData.user?.experience || '',
          profession: userData.user?.profession || '',
          workTimings: userData.user?.workTimings || '',
          vehicleBrand: userData.user?.vehicleBrand || '',
          vehiclePurchaseYear: userData.user?.vehiclePurchaseYear || '',
          languages: Array.isArray(userData.user?.languages) ? userData.user.languages : [],
          age: userData.user?.age || '',
          gender: userData.user?.gender || '',
          maritalStatus: userData.user?.maritalStatus || '',
          employmentStatus: userData.user?.employmentStatus || '',
          vehicleOwnership: userData.user?.vehicleOwnership || '',
          candidateLocation: userData.user?.candidateLocation || '',
          preferredCategories: Array.isArray(userData.user?.preferredCategories)
            ? userData.user.preferredCategories
            : [],
          preferredDomains: Array.isArray(userData.user?.preferredDomains)
            ? userData.user.preferredDomains
            : [],
          alternativePhone: userData.user?.alternativePhone || '',
          alternativeEmail: userData.user?.alternativeEmail || '',
          whatsappAvailable: userData.user?.whatsappAvailable || false,
          workAvailability: {
            days: Array.isArray(userData.user?.workAvailability?.days)
              ? userData.user.workAvailability.days
              : [],
            hours: Number(userData.user?.workAvailability?.hours) || 0,
          },
          companyName: userData.user?.companyName || '',
          industry: userData.user?.industry || '',
          message: userData.user?.message || '',
          educationHistory: userData.user?.educationHistory?.length > 0
            ? userData.user.educationHistory
            : [{ id: 1, degree: '', institution: '', duration: '', description: '' }],
          workHistory: userData.user?.workHistory?.length > 0
            ? userData.user.workHistory
            : [{ id: 1, title: '', company: '', duration: '', description: '' }],
          profilePicture: userData.user?.profilePicture ?? '',
          termsAgreed: userData.user?.termsAgreed || false,
          newsletterOptIn: userData.user?.newsletterOptIn ?? false,
        });
        setImagePreview(userData.user?.profilePicture ?? null);
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
        setFormErrors({ email: error.message || 'Error fetching user data' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed:', e.target.files);
    const file = e.target.files?.[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    if (!['image/jpeg'].includes(file.type)) {
      message.error('Please upload a JPEG image.');
      console.log('Invalid file type:', file.type);
      setFormErrors({ profilePicture: 'Invalid file type. Please upload a JPEG image.' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error('Image size must be less than 2MB.');
      console.log('File too large:', file.size);
      setFormErrors({ profilePicture: 'Image size must be less than 2MB.' });
      return;
    }

    setImageUploading(true);
    setFormErrors((prev) => ({ ...prev, profilePicture: '' }));
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, profilePicture: base64String }));
      setImagePreview(base64String);
      console.log('Image base64 set:', base64String.substring(0, 50) + '...');
      setImageUploading(false);
    };
    reader.onerror = () => {
      message.error('Error reading image.');
      console.error('FileReader error');
      setFormErrors({ profilePicture: 'Error reading image. Please try again.' });
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, profilePicture: '' }));
    setImagePreview(null);
    setFormErrors((prev) => ({ ...prev, profilePicture: '' }));
    console.log('Image removed successfully');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleArrayChange = (name: string, value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
      console.log(`${name} changed to: ${checked}`);
    }
  };

  const handleWorkAvailabilityChange = (
    field: 'days' | 'hours',
    value: string[] | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      workAvailability: { ...prev.workAvailability, [field]: value },
    }));
    setFormErrors((prev) => ({ ...prev, 'workAvailability.days': '' }));
    console.log(`Work availability ${field} changed to:`, value);
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      educationHistory: prev.educationHistory.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      ),
    }));
    setFormErrors((prev) => ({ ...prev, educationHistory: '' }));
  };

  const handleWorkHistoryChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
    setFormErrors((prev) => ({ ...prev, workHistory: '' }));
  };

  const handleLocationDetect = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }
      setLocationLoading(true);
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || 'Unknown';
      setFormData((prev) => ({ ...prev, candidateLocation: city }));
      setFormErrors((prev) => ({ ...prev, candidateLocation: '' }));
      console.log('Location detected:', city);
    } catch (error: any) {
      console.error('Error fetching location:', error.message);
      setFormErrors({
        candidateLocation: error.message || 'Failed to detect location. Please enter manually.',
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    const requiredFields: {
      name: keyof CandidateFormData;
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
      { name: 'languages', label: 'Languages', type: 'array' }, // Added validation for languages
    ];

    for (const { name, label, type } of requiredFields) {
      if (type === 'array') {
        if (!Array.isArray(formData[name]) || (formData[name] as string[]).length === 0) {
          errors[name] = `${label} is required`;
        }
      } else if (type === 'boolean') {
        if (formData[name] !== true) {
          errors[name] = `${label} must be agreed to`;
        }
      } else if (!formData[name]) {
        errors[name] = `${label} is required`;
      }
    }

    if (!formData.educationHistory || formData.educationHistory.every((edu) => !edu.degree || !edu.institution)) {
      errors.educationHistory = 'At least one education entry with degree and institution is required';
    }
    if (!formData.workHistory || formData.workHistory.every((exp) => !exp.title || !exp.company)) {
      errors.workHistory = 'At least one work experience entry with title and company is required';
    }

    setFormErrors(errors);
    console.log('Form validation errors:', errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      message.error('Please fill all required fields.');
      return;
    }

    if (!executeRecaptcha) {
      message.error('reCAPTCHA not loaded. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('candidate_edit_form');
      const dataToSend = {
        ...formData,
        email: userEmail,
        vehiclePurchaseYear: formData.vehiclePurchaseYear ? Number(formData.vehiclePurchaseYear) : '',
        recaptchaToken,
      };

      console.log('PUT data to send:', {
        email: dataToSend.email,
        profilePicture: dataToSend.profilePicture ? dataToSend.profilePicture.substring(0, 50) + '...' : 'No image',
        termsAgreed: dataToSend.termsAgreed,
        newsletterOptIn: dataToSend.newsletterOptIn,
        languages: dataToSend.languages,
        recaptchaToken: recaptchaToken.substring(0, 50) + '...',
      });

      const res = await fetch('/api/user/candidateprofile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
        credentials: 'include',
      });

      const result = await res.json();
      console.log('PUT response:', {
        status: res.status,
        message: result.message,
        error: result.error,
        profilePicture: result.user?.profilePicture ? 'Present' : 'Absent',
      });
      if (!res.ok) {
        console.error('Failed to update profile:', result.error, 'Status:', res.status);
        throw new Error(result.error || `Failed to update profile (Status: ${res.status})`);
      }
      message.success('Profile updated successfully!');
      router.push('/candidate/candidatedetails');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      setFormErrors({ email: error.message || 'Failed to update profile. Please try again.' });
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='h-full w-full'>
            <div className="mt-[110px] p-4 sm:p-6 flex items-center justify-center ">
            <div className="text-sm text-gray-800">Loading...</div>
          </div>;
    </div>
  }

  return (
    <motion.section
      className="relative max-w-6xl mx-auto mt-10 px-4 py-[120px]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {imagePreview && (
        <div className="fixed top-20 right-4 z-50">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md"
            />
            <Button
              type="default"
              size="small"
              className="absolute -bottom-2 -right-2 bg-white border border-gray-300 rounded-xl"
              onClick={handleRemoveImage}
            >
              X
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div custom={0} variants={fadeInUp} className="md:col-span-2">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/jpeg"
            onChange={handleImageChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            disabled={imageUploading}
          />
          {imageUploading && <p className="text-gray-500 mt-1">Uploading image...</p>}
          {formErrors.profilePicture && (
            <p className="text-rose-800 text-sm mt-1">{formErrors.profilePicture}</p>
          )}
        </motion.div>

        {[
          { label: 'Full Name', name: 'fullName', type: 'text', required: true },
          { label: 'Job Title', name: 'jobTitle', type: 'text' },
          { label: 'Phone', name: 'phone', type: 'text' },
          { label: 'Email', name: 'email', type: 'email', disabled: true },
          { label: 'Website', name: 'website', type: 'text' },
          { label: 'Experience', name: 'experience', type: 'text' },
          { label: 'Profession', name: 'profession', type: 'text' },
          { label: 'Work Timings', name: 'workTimings', type: 'text' },
          { label: 'Vehicle Brand', name: 'vehicleBrand', type: 'text' },
          { label: 'Vehicle Purchase Year', name: 'vehiclePurchaseYear', type: 'number' },
          { label: 'Alternative Phone', name: 'alternativePhone', type: 'text' },
          { label: 'Alternative Email', name: 'alternativeEmail', type: 'email' },
          { label: 'Company Name', name: 'companyName', type: 'text' },
          { label: 'Industry', name: 'industry', type: 'text' },
          {
            label: 'Location',
            name: 'candidateLocation',
            type: 'text',
            required: true,
            extra: (
              <Button
                type="primary"
                onClick={handleLocationDetect}
                disabled={locationLoading}
                className="mt-2 w-full md:w-auto"
              >
                {locationLoading ? 'Detecting...' : 'Detect Location'}
              </Button>
            ),
          },
          { label: 'Message', name: 'message', type: 'textarea' },
        ].map((field, i) => (
          <motion.div key={field.name} custom={i + 1} variants={fadeInUp}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-rose-800">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <TextArea
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof CandidateFormData] as string}
                onChange={handleChange}
                placeholder={field.label}
                className={`w-full p-3 rounded-lg border ${formErrors[field.name] ? '!border-rose-800' : 'border-gray-300'}`}
                rows={4}
              />
            ) : (
              <Input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof CandidateFormData] as string | number}
                onChange={handleChange}
                placeholder={field.label}
                className={`w-full p-3 rounded-lg border ${formErrors[field.name] ? '!border-rose-800' : 'border-gray-300'}`}
                disabled={field.disabled}
              />
            )}
            {formErrors[field.name] && (
              <p className="text-rose-800 text-sm mt-1">{formErrors[field.name]}</p>
            )}
            {field.extra}
          </motion.div>
        ))}

        <motion.div custom={17} variants={fadeInUp}>
          <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
            Languages <span className="text-rose-800">*</span>
          </label>
          <Select
            mode="tags"
            className={`w-full ${formErrors.languages ? '!border-rose-800' : ''}`}
            placeholder="Enter and select languages"
            value={formData.languages}
            onChange={(value) => handleArrayChange('languages', value)}
          />
          {formErrors.languages && (
            <p className="text-rose-800 text-sm mt-1">{formErrors.languages}</p>
          )}
        </motion.div>

        {[
          {
            label: 'Age',
            name: 'age',
            options: ['18 - 22 Years', '23 - 27 Years', '28 - 32 Years', '33 - 37 Years', '38+ Years'],
            multiple: false,
            required: true,
          },
          {
            label: 'Gender',
            name: 'gender',
            options: ['Male', 'Female', 'Other', 'Prefer not to say'],
            multiple: false,
            required: true,
          },
          {
            label: 'Marital Status',
            name: 'maritalStatus',
            options: ['Single', 'Married without kids', 'Married with kids'],
            multiple: false,
            required: true,
          },
          {
            label: 'Employment Status',
            name: 'employmentStatus',
            options: ['Employed', 'Unemployed'],
            multiple: false,
            required: true,
          },
          {
            label: 'Vehicle Ownership',
            name: 'vehicleOwnership',
            options: ['None', '2-Wheeler', '4-Wheeler', 'Both'],
            multiple: false,
          },
          {
            label: 'Preferred Categories',
            name: 'preferredCategories',
            options: ['Tech', 'Marketing', 'Finance', 'Healthcare'],
            multiple: true,
            required: true,
          },
          {
            label: 'Preferred Domains',
            name: 'preferredDomains',
            options: ['Web Development', 'Data Science', 'Graphic Design', 'Finance Consulting'],
            multiple: true,
          },
          {
            label: 'Work Availability Days',
            name: 'workAvailability.days',
            options: ['Weekdays', 'Weekends'],
            multiple: true,
          },
        ].map((dropdown, i) => (
          <motion.div key={dropdown.name} custom={i + 18} variants={fadeInUp}>
            <label htmlFor={dropdown.name} className="block text-sm font-medium text-gray-700 mb-2">
              {dropdown.label}
              {dropdown.required && <span className="text-rose-800">*</span>}
            </label>
            <Select
              id={dropdown.name}
              value={
                dropdown.multiple
                  ? dropdown.name === 'workAvailability.days'
                    ? formData.workAvailability.days
                    : (formData[dropdown.name as keyof CandidateFormData] as string[])
                  : (formData[dropdown.name as keyof CandidateFormData] as string)
              }
              onChange={(value) => {
                if (dropdown.multiple) {
                  const values = value as string[];
                  dropdown.name === 'workAvailability.days'
                    ? handleWorkAvailabilityChange('days', values)
                    : handleArrayChange(dropdown.name, values);
                } else {
                  setFormData((prev) => ({ ...prev, [dropdown.name]: value }));
                  setFormErrors((prev) => ({ ...prev, [dropdown.name]: '' }));
                }
              }}
              mode={dropdown.multiple ? 'multiple' : undefined}
              className={`w-full ${formErrors[dropdown.name] ? '!border-rose-800' : ''}`}
            >
              {!dropdown.multiple && <Select.Option value="">Select</Select.Option>}
              {dropdown.options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
            {formErrors[dropdown.name] && (
              <p className="text-rose-800 text-sm mt-1">{formErrors[dropdown.name]}</p>
            )}
          </motion.div>
        ))}

        <motion.div custom={26} variants={fadeInUp}>
          <label
            htmlFor="workAvailability.hours"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Work Availability Hours
          </label>
          <Input
            id="workAvailability.hours"
            type="number"
            value={formData.workAvailability.hours}
            onChange={(e) => handleWorkAvailabilityChange('hours', Number(e.target.value))}
            placeholder="Hours per day"
            min={0}
            max={24}
            className={`w-full p-3 rounded-lg border ${formErrors['workAvailability.hours'] ? '!border-rose-800' : 'border-gray-300'}`}
          />
          {formErrors['workAvailability.hours'] && (
            <p className="text-rose-800 text-sm mt-1">{formErrors['workAvailability.hours']}</p>
          )}
        </motion.div>

        <motion.div custom={27} variants={fadeInUp} className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Education History</h3>
          {formData.educationHistory.map((edu, index) => (
            <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor={`education-degree-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Degree
                </label>
                <Input
                  id={`education-degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  placeholder="Degree"
                  className={`w-full p-3 rounded-lg border ${formErrors.educationHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`education-institution-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Institution
                </label>
                <Input
                  id={`education-institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  placeholder="Institution"
                  className={`w-full p-3 rounded-lg border ${formErrors.educationHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`education-duration-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Duration
                </label>
                <Input
                  id={`education-duration-${index}`}
                  value={edu.duration}
                  onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                  placeholder="Duration"
                  className={`w-full p-3 rounded-lg border ${formErrors.educationHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`education-description-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <TextArea
                  id={`education-description-${index}`}
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  className={`w-full p-3 rounded-lg border ${formErrors.educationHistory ? '!border-rose-800' : 'border-gray-300'}`}
                  rows={3}
                />
              </div>
              {formErrors.educationHistory && index === 0 && (
                <p className="text-rose-800 text-sm mt-1 col-span-2">{formErrors.educationHistory}</p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div custom={28} variants={fadeInUp} className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Work History</h3>
          {formData.workHistory.map((exp, index) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor={`work-title-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <Input
                  id={`work-title-${index}`}
                  value={exp.title}
                  onChange={(e) => handleWorkHistoryChange(index, 'title', e.target.value)}
                  placeholder="Title"
                  className={`w-full p-3 rounded-lg border ${formErrors.workHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`work-company-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company
                </label>
                <Input
                  id={`work-company-${index}`}
                  value={exp.company}
                  onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)}
                  placeholder="Company"
                  className={`w-full p-3 rounded-lg border ${formErrors.workHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`work-duration-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Duration
                </label>
                <Input
                  id={`work-duration-${index}`}
                  value={exp.duration}
                  onChange={(e) => handleWorkHistoryChange(index, 'duration', e.target.value)}
                  placeholder="Duration"
                  className={`w-full p-3 rounded-lg border ${formErrors.workHistory ? '!border-rose-800' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label
                  htmlFor={`work-description-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <TextArea
                  id={`work-description-${index}`}
                  value={exp.description}
                  onChange={(e) => handleWorkHistoryChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  className={`w-full p-3 rounded-lg border ${formErrors.workHistory ? '!border-rose-800' : 'border-gray-300'}`}
                  rows={3}
                />
              </div>
              {formErrors.workHistory && index === 0 && (
                <p className="text-rose-800 text-sm mt-1 col-span-2">{formErrors.workHistory}</p>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div custom={29} variants={fadeInUp} className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Agreements</h3>
          <div className="flex flex-col space-y-4">
            <Checkbox
              id="whatsappAvailable"
              name="whatsappAvailable"
              checked={formData.whatsappAvailable}
              onChange={handleCheckboxChange}
            >
              Is Phone Number Available on WhatsApp
            </Checkbox>
            <Checkbox
              id="termsAgreed"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleCheckboxChange}
            >
              I agree to the Terms and Conditions
            </Checkbox>
            <Checkbox
              id="newsletterOptIn"
              name="newsletterOptIn"
              checked={formData.newsletterOptIn}
              onChange={handleCheckboxChange}
            >
              I want to receive newsletters
            </Checkbox>
            {formErrors.termsAgreed && (
              <p className="text-rose-800 text-sm mt-1">{formErrors.termsAgreed}</p>
            )}
            {formErrors.newsletterOptIn && (
              <p className="text-rose-800 text-sm mt-1">{formErrors.newsletterOptIn}</p>
            )}
          </div>
        </motion.div>

        <motion.div custom={30} variants={fadeInUp} className="md:col-span-2 mt-4 flex justify-center">
          <Button type="primary" htmlType="submit" className="w-full md:w-auto" loading={loading}>
            Update Profile
          </Button>
        </motion.div>
      </form>
    </motion.section>
  );
};

// Wrap the component with GoogleReCaptchaProvider
const CandidateEditWithRecaptcha = () => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
    <CandidateEdit />
  </GoogleReCaptchaProvider>
);

export default CandidateEditWithRecaptcha;