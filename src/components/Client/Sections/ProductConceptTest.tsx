'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const interestData = [
  { label: 'Very Interested', value: 320 },
  { label: 'Somewhat Interested', value: 450 },
  { label: 'Not Interested', value: 230 },
];

const featureRatings = [
  { feature: 'Design', rating: 4.2 },
  { feature: 'Performance', rating: 3.8 },
  { feature: 'Affordability', rating: 3.4 },
  { feature: 'Eco-friendliness', rating: 4.0 },
];

const COLORS = ['#2563eb', '#3b82f6', '#d1d5db'];

export default function ProductConceptTest() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="h2 mb-2">Product Concept Feedback</h2>
        <p className="text-sm text-gray-600">
          Overview of user interest levels and feature ratings.
        </p>
      </div>

      {/* Interest Pie Chart */}
      <div>
        <h3 className="h3 mb-2">User Interest Levels</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={interestData}
              dataKey="value"
              nameKey="label"
              outerRadius={80}
              label
            >
              {interestData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Rating Bar Chart */}
      <div>
        <h3 className="h3 mb-2">Feature Ratings (Out of 5)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={featureRatings}>
            <XAxis dataKey="feature" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="rating" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6">
        <h3 className="h3 mb-2">Key Insights</h3>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>Young adults (18–30) showed highest interest.</li>
          <li>Design was rated the most attractive feature.</li>
          <li>Concerns raised around pricing competitiveness.</li>
          <li>Respondents appreciated the eco-friendly angle.</li>
        </ul>
      </div>
    </div>
  );
}
