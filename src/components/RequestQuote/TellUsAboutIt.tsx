'use client';

import React, { useState } from 'react';
import { Input, Select, message, Checkbox } from 'antd';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import countryCodes from './CountryCodes'; // Adjust path as needed

const { Option } = Select;

const industryList = [
  'Academic Research', 'Aerospace & Defense', 'Automotive', 'Banking & Financial Services',
  'Biomedical Research', 'Biotechnology', 'Chemicals', 'Clinical Research', 'Construction',
  'Consulting', 'Consumer Goods', 'Data Analytics', 'Education', 'Energy & Utilities',
  'Engineering', 'Environmental Research', 'Environmental Services', 'Food & Beverage',
  'Government', 'Healthcare', 'Hospitality', 'Human Resources', 'Information Technology',
  'Insurance', 'Legal', 'Logistics & Supply Chain', 'Manufacturing', 'Market Research',
  'Media & Entertainment', 'Mining & Metals', 'Non-profit', 'Pharmaceuticals', 'Real Estate',
  'Retail', 'Scientific Research', 'Social Research', 'Telecommunications', 'Transportation',
  'UX Research',
];

// Function to check if email is a business email
const isBusinessEmail = (email: string): boolean => {
  const personalEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? !personalEmailDomains.includes(domain) : false;
};

const TellUsAboutIt: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
    termsAgreed: false,
    newsletterOptIn: false,
  });
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
    termsAgreed: '',
    newsletterOptIn: '',
    general: '',
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value || '' }));
    setErrors((prev) => ({ ...prev, industry: '' }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      industry: '',
      message: '',
      termsAgreed: '',
      newsletterOptIn: '',
      general: '',
    };
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }
    if (!formData.companyName) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Business email is required';
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid business email';
      isValid = false;
    } else if (!isBusinessEmail(formData.email)) {
      newErrors.email = 'Please provide a valid business email (not Gmail, Yahoo, etc.)';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
      isValid = false;
    }
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the terms and confirm you’ve read the privacy notice';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, general: '' }));
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      message.error('Please correct the errors in the form and try again.');
      return;
    }

    try {
      const payload = {
        ...formData,
        phone: `${selectedCountry}${formData.phone}`,
        role: 'client',
      };
      const response = await fetch('/api/requestquote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Your Form is Submitted Successfully We Will Contact You Soon!');
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          industry: '',
          message: '',
          termsAgreed: false,
          newsletterOptIn: false,
        });
        setSelectedCountry('+91');
        setErrors({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          industry: '',
          message: '',
          termsAgreed: '',
          newsletterOptIn: '',
          general: '',
        });
      } else {
        setErrors((prev) => ({ ...prev, general: result.error || result.details || 'Failed to submit form' }));
        message.error(result.error || result.details || 'Failed to submit form');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrors((prev) => ({ ...prev, general: 'An error occurred: ' + error.message }));
      message.error('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl p-4 md:p-8 bg-light shadow-lg rounded-lg animate-fadeInUp">
        <h1 className="h2 mb-6 text-center">Book a Free Consultation</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Name</label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="First Name"
              className={`border-gray w-full ${errors.fullName ? 'border-rose-800' : ''}`}
              disabled={loading}
            />
            {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Company Name</label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className={`border-gray w-full ${errors.companyName ? 'border-rose-800' : ''}`}
              disabled={loading}
            />
            {errors.companyName && <p className="text-red-600 text-xs mt-1">{errors.companyName}</p>}
          </div>

          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Business Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Business Email"
              className={`border-gray w-full ${errors.email ? 'border-rose-800' : ''}`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Phone</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={selectedCountry}
                showSearch
                onChange={handleCountryChange}
                filterOption={(input, option) => {
                  const optionCode = option?.value as string;
                  const optionName = (option?.children && Array.isArray(option.children) ? option.children[1] : '') as string;
                  const searchableText = `${optionCode} ${optionName}`.toLowerCase();
                  return searchableText.includes(input.toLowerCase());
                }}
                className={`w-full sm:w-auto md:w-40 lg:w-48 ${errors.phone ? 'border-rose-800' : ''}`}
                disabled={loading}
              >
                {countryCodes.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.code} ({country.name})
                  </Option>
                ))}
              </Select>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className={`border-gray w-full flex-1 ${errors.phone ? 'border-rose-800' : ''}`}
                prefix={selectedCountry}
                disabled={loading}
              />
            </div>
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Industry</label>
            <Select
              allowClear
              value={formData.industry || undefined}
              onChange={handleIndustryChange}
              placeholder="Select an industry"
              className={`border-gray w-full ${errors.industry ? 'border-rose-800' : ''}`}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
              disabled={loading}
            >
              {industryList.map((industry) => (
                <Option key={industry} value={industry}>
                  {industry}
                </Option>
              ))}
            </Select>
            {errors.industry && <p className="text-red-600 text-xs mt-1">{errors.industry}</p>}
          </div>

          <div className="mb-4">
            <label className="p2 font-bold mb-1 block">Message</label>
            <Input.TextArea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter your message here..."
              className={`border-gray w-full ${errors.message ? 'border-rose-800' : ''}`}
              disabled={loading}
            />
            {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <Checkbox
              checked={formData.newsletterOptIn}
              onChange={(e) => handleCheckboxChange('newsletterOptIn', e.target.checked)}
              disabled={loading}
              className="text-xs"
            >
              I’d like to receive MintSurvey’s weekly newsletter
            </Checkbox>
            {errors.newsletterOptIn && <p className="text-red-600 text-xs mt-1">{errors.newsletterOptIn}</p>}
            <Checkbox
              checked={formData.termsAgreed}
              onChange={(e) => handleCheckboxChange('termsAgreed', e.target.checked)}
              disabled={loading}
              className="text-xs"
            >
              I agree to MintSurvey’s{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms
              </a>{' '}
              & confirm I’ve read the{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Notice
              </a>.
            </Checkbox>
            {errors.termsAgreed && <p className="text-red-600 text-xs mt-1">{errors.termsAgreed}</p>}
          </div>

          {errors.general && <p className="text-red-600 mb-4">{errors.general}</p>}

          <div className="mt-6 text-center">
            <button type="submit" className="b1" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TellUsAboutIt;