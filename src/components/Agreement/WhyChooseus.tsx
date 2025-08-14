'use client';

import React from 'react';
import { Shield, Clock, FileText, MapPin, Phone, CheckCircle } from 'lucide-react';

const WhyChooseShreerang = () => {
  const benefits = [
    { Icon: Shield, title: 'Legally Compliant', desc: 'E-stamp and verified documentation.' },
    { Icon: Clock, title: 'Fast Turnaround', desc: '24–48h processing with express options.' },
    { Icon: FileText, title: 'Paperless & Simple', desc: 'Upload from your phone or laptop.' },
    { Icon: MapPin, title: 'Citywide Coverage', desc: 'Service across major localities.' },
    { Icon: Phone, title: 'Human Support', desc: 'Friendly help when you need it.' },
    { Icon: CheckCircle, title: 'Trusted by Tenants & Owners', desc: 'Thousands of successful agreements.' },
  ];

  const processSteps = [
    { step: 1, title: 'Enter Details', desc: 'Fill your name and phone number.' },
    { step: 2, title: 'Upload Docs', desc: 'Aadhaar, PAN, and agreement PDF.' },
    { step: 3, title: 'KYC & E-Stamp', desc: 'Verification and legal stamping.' },
    { step: 4, title: 'Download & Sign', desc: 'Receive your ready agreement.' },
  ];

  return (
    <div className="space-y-20">
      {/* Why Choose Shreerang */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Shreerang</h2>
          <p className="text-lg text-gray-600 mb-12">Reliable, professional, and fast rent agreement services.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map(({ Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
                <p className="text-gray-600 text-center">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {processSteps.map(({ step, title, desc }) => (
      <div
        key={step}
        className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition 
                   border border-blue-300 hover:border-blue-500"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-blue-600 font-bold text-lg">
          {step}
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    ))}
  </div>
</div>

      </section>
    </div>
  );
};

export default WhyChooseShreerang;
