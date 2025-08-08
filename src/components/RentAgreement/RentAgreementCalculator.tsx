// components/RentAgreementCalculator.tsx
'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const RentAgreementCalculator: React.FC = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>(null);
  const [duration, setDuration] = useState<number>(null); // default to 11 months

  const calculateStampDuty = () => {
    if (monthlyRent <= 0 || duration <= 0) return 0;
    const totalRent = monthlyRent * duration;
    return Math.round(totalRent * 0.0025); // 0.25%
  };

  const calculateRegistrationFees = () => 1000; // fixed for demo

  const stampDuty = calculateStampDuty();
  const registrationFee = calculateRegistrationFees();
  const total = stampDuty + registrationFee;

  return (
    <div className="w-full max-w-md bg-[#FAFAFA] shadow-lg rounded-lg p-6 ">
      <h3 className="text-xl font-semibold mb-4 text-primary">Rent Agreement Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Monthly Rent (₹)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            placeholder="Enter monthly rent"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Duration (months)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Enter duration in months"
          />
        </div>

        <div className="mt-4 border-t pt-4">
          <p><strong>Stamp Duty:</strong> ₹{stampDuty}</p>
          <p><strong>Registration Fee:</strong> ₹{registrationFee}</p>
          <p className="text-lg mt-2"><strong>Total Payable:</strong> ₹{total}</p>
        </div>
        <Link href="/requestquote">
                      <button className="mt-4 b1 items-center text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                        Book Now
                      </button>
                    </Link>
      </div>
    </div>
  );
};

export default RentAgreementCalculator;
