'use client';

import { useState, useMemo } from 'react';

type BrandData = {
  brandName: string;
  awareness: number;
  preference: number;
  nps: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  competitorMentions: string;
  comments: string;
};

export default function BrandTrackingStudy() {
  const [formData, setFormData] = useState<BrandData>({
    brandName: '',
    awareness: 0,
    preference: 0,
    nps: 0,
    sentiment: 'Neutral',
    competitorMentions: '',
    comments: '',
  });

  const [submittedData, setSubmittedData] = useState<BrandData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'awareness' || name === 'preference' || name === 'nps'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(prev => [...prev, formData]);
    setFormData({
      brandName: '',
      awareness: 0,
      preference: 0,
      nps: 0,
      sentiment: 'Neutral',
      competitorMentions: '',
      comments: '',
    });
  };

  // Summary statistics
  const summary = useMemo(() => {
    if (submittedData.length === 0) return null;
    const total = submittedData.length;
    const avg = (key: keyof BrandData) =>
      (
        submittedData.reduce((acc, cur) => acc + Number(cur[key] || 0), 0) / total
      ).toFixed(1);
    return {
      averageAwareness: avg('awareness'),
      averagePreference: avg('preference'),
      averageNPS: avg('nps'),
    };
  }, [submittedData]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Intro */}
      <section>
        <h1 className="text-3xl font-bold mb-2">Brand Tracking Study</h1>
        <p className="text-gray-700 mb-4">
          Understanding how your automotive brand is perceived over time is crucial for strategic marketing.
          Brand tracking studies monitor key metrics like awareness, preference, and Net Promoter Score (NPS),
          along with customer sentiment and competitor presence in the market.
        </p>
      </section>

      {/* Form */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Add Brand Metrics</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded shadow"
        >
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="Brand Name"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="awareness"
            value={formData.awareness}
            onChange={handleChange}
            min={0}
            max={100}
            placeholder="Brand Awareness (%)"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            min={0}
            max={100}
            placeholder="Brand Preference (%)"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="nps"
            value={formData.nps}
            onChange={handleChange}
            min={-100}
            max={100}
            placeholder="Net Promoter Score"
            required
            className="p-2 border rounded"
          />
          <select
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="Positive">Positive Sentiment</option>
            <option value="Neutral">Neutral Sentiment</option>
            <option value="Negative">Negative Sentiment</option>
          </select>
          <input
            type="text"
            name="competitorMentions"
            value={formData.competitorMentions}
            onChange={handleChange}
            placeholder="Competitor Brand Mentions"
            className="p-2 border rounded"
          />
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Additional Comments"
            rows={3}
            className="p-2 border rounded md:col-span-2"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Brand Data
          </button>
        </form>
      </section>

      {/* Summary */}
      {summary && (
        <section className="bg-blue-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Overall Summary</h2>
          <p>From {submittedData.length} entries:</p>
          <ul className="list-disc list-inside">
            <li>Average Brand Awareness: <strong>{summary.averageAwareness}%</strong></li>
            <li>Average Brand Preference: <strong>{summary.averagePreference}%</strong></li>
            <li>Average NPS Score: <strong>{summary.averageNPS}</strong></li>
          </ul>
          <p className="mt-2 text-sm italic text-gray-700">
            Higher awareness with low preference may indicate opportunity to improve brand perception.  
            Monitor NPS carefully for customer loyalty insights.
          </p>
        </section>
      )}

      {/* Submitted Data Table */}
      {submittedData.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Brand Metrics Data</h2>
          <div className="overflow-x-auto border rounded shadow">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Brand</th>
                  <th className="p-2 border">Awareness</th>
                  <th className="p-2 border">Preference</th>
                  <th className="p-2 border">NPS</th>
                  <th className="p-2 border">Sentiment</th>
                  <th className="p-2 border">Competitor Mentions</th>
                  <th className="p-2 border">Comments</th>
                  <th className="p-2 border">Visual</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((d, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{d.brandName}</td>
                    <td className="p-2 border">{d.awareness}%</td>
                    <td className="p-2 border">{d.preference}%</td>
                    <td className="p-2 border">{d.nps}</td>
                    <td className="p-2 border">{d.sentiment}</td>
                    <td className="p-2 border">{d.competitorMentions || '-'}</td>
                    <td className="p-2 border">{d.comments || '-'}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-1 w-24">
                        <div
                          style={{ width: `${d.awareness}%` }}
                          className="bg-blue-600 h-3 rounded"
                          title={`Awareness: ${d.awareness}%`}
                        />
                        <div
                          style={{ width: `${d.preference}%` }}
                          className="bg-green-600 h-3 rounded"
                          title={`Preference: ${d.preference}%`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Guidance Section */}
      <section className="mt-8 bg-yellow-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Guidance for Brand Tracking</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Use awareness metrics to gauge the reach of your advertising campaigns.</li>
          <li>Preference percentages indicate how many customers favor your brand over competitors.</li>
          <li>NPS helps identify promoters who will recommend your brand and detractors who may harm reputation.</li>
          <li>Monitor competitor mentions to stay informed about market shifts and new threats.</li>
          <li>Customer sentiment adds qualitative depth to numeric scores.</li>
        </ul>
      </section>
    </div>
  );
}
