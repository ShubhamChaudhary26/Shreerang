'use client';
import React from 'react';
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import your ScrollFadeIn component

// Solutions data from slides 12 and 13
const solutions = [
  {
    category: 'MiCorrelate (Quantitative Research & Analytics)',
    items: [
      { name: 'Face-to-face Surveys', desc: 'Direct, in-person data collection for detailed insights' },
      { name: 'Telephonic Surveys', desc: 'Phone-based surveys for broader reach and convenience' },
      { name: 'Online Surveys', desc: 'Digital surveys for quick, scalable responses' },
      { name: 'Panel Research', desc: 'Longitudinal studies with pre-recruited participants' },
      { name: 'Statistical Analysis', desc: 'Robust analysis to uncover patterns and trends' },
      { name: 'Data Modelling & Analytics', desc: 'Advanced modeling for predictive and actionable insights' },
    ],
  },
  {
    category: 'MiConnect (Qualitative Research)',
    items: [
      { name: 'In-Depth Interviews (IDIs)', desc: 'One-on-one discussions for deep understanding' },
      { name: 'Focus Group Discussions (FGDs)', desc: 'Group interactions to explore perceptions' },
      { name: 'Ethnographic & Immersive Research', desc: 'Observational studies in real-world settings' },
      { name: 'Online Communities & Netnography', desc: 'Digital platforms for community insights' },
      { name: 'Neuroscience & Behavioural Research', desc: 'Studies of subconscious and behavioral responses' },
      { name: 'Expert Panels & Delphi Technique', desc: 'Consensus-building with industry experts' },
    ],
  },
  {
    category: 'MiCompliance',
    items: [
      { name: 'Mystery Shopping / Retail Audits', desc: 'Covert evaluations of service and operations' },
      { name: 'Customer Experience Benchmarking', desc: 'Measuring CX against industry standards' },
      { name: 'Compliance & SOP Audits', desc: 'Ensuring adherence to standard operating procedures' },
      { name: 'Omnichannel Mystery Shopping', desc: 'Evaluating experiences across multiple channels' },
      { name: 'Sales & Staff Evaluation', desc: 'Assessing performance of sales teams and staff' },
      { name: 'Promotional & Campaign Effectiveness Tracking', desc: 'Measuring impact of marketing efforts' },
      { name: 'Franchise & Dealership Audits', desc: 'Ensuring consistency across locations' },
    ],
  },
  {
    category: 'MiClick',
    items: [
      { name: 'Social Media Listening', desc: 'Monitoring online conversations and trends' },
      { name: 'Campaign Performance & Content Optimization', desc: 'Analyzing and improving campaign results' },
      { name: 'Customer Sentiment & Feedback Analysis', desc: 'Gauging consumer opinions and emotions' },
      { name: 'Competitor & Market Analysis', desc: 'Benchmarking against rivals and market trends' },
      { name: 'Trend Identification & Consumer Insights', desc: 'Spotting emerging patterns and preferences' },
      { name: 'Crisis Management & Risk Mitigation', desc: 'Strategies to handle and prevent crises' },
    ],
  },
  {
    category: 'MI Compilation (Secondary / Desk Research)',
    items: [
      { name: 'Uses Official, Verified Sources Only', desc: 'Reliable data from trusted origins' },
      { name: 'Combines AI with Human Review', desc: 'Blending tech and expertise for accuracy' },
      { name: 'Avoids AI-Only Inaccuracies', desc: 'Human oversight to ensure precision' },
      { name: 'Covers Latest, Up-to-Date Data', desc: 'Current information for relevance' },
      { name: 'Includes Local Language Sources', desc: 'Region-specific data for localization' },
      { name: 'Structured, Summarized Output', desc: 'Clear, concise deliverables' },
      { name: 'Tailored to Client Objectives', desc: 'Customized to meet specific goals' },
    ],
  },
  {
    category: 'MI Concept (Concept Testing)',
    items: [
      { name: 'Tests Product or Idea Concepts', desc: 'Evaluates new products or ideas' },
      { name: 'Online or Offline Methodologies', desc: 'Flexible approaches for testing' },
      { name: 'Uses Quant or Qual Techniques', desc: 'Combines numerical and narrative insights' },
      { name: 'Real Consumer Feedback Gathered', desc: 'Authentic responses from target audiences' },
      { name: 'Suitable for Pack, Ad, Product', desc: 'Applicable to packaging, ads, and products' },
      { name: 'Custom Sampling as Per Brief', desc: 'Tailored participant selection' },
    ],
  },
  {
    category: 'MI Clinic (Product Experience Feedback)',
    items: [
      { name: 'Real Product Usage by Respondents', desc: 'Hands-on testing by users' },
      { name: 'Offline Setup for Actual Touch', desc: 'Physical interaction with products' },
      { name: 'Online for Digital Product Trials', desc: 'Virtual testing for digital offerings' },
      { name: 'Qualitative and Quantitative Insights', desc: 'Mixed methods for comprehensive feedback' },
      { name: 'Real-Time Reactions and Reviews', desc: 'Immediate user responses' },
      { name: 'Detailed Diagnostic Output', desc: 'In-depth analysis of product performance' },
    ],
  },
  {
    category: 'MI Collection (Field & Data Collection)',
    items: [
      { name: 'Questionnaire Execution Support', desc: 'Assistance in survey implementation' },
      { name: 'Large Multilingual Field Network', desc: 'Diverse, global field teams' },
      { name: 'Coverage Across Major Geographies', desc: 'Wide-reaching data collection' },
      { name: 'In-House MIGFT Team Deployed', desc: 'Specialized internal team for execution' },
      { name: 'Multi-Layered Quality Checks', desc: 'Rigorous validation processes' },
      { name: 'Fraud Detection and Validation', desc: 'Ensuring data integrity' },
    ],
  },
];

const SolutionsSection = () => {
  return (
    <section className="flex justify-center mt-10 py-12 bg-gray-50">
      <div className="max-w-7xl w-full px-4">
        {/* Header */}
        <ScrollFadeIn delay={0.2}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Solutions
            </h2>
            <p className="p2 text-gray-600 mt-2">
              Explore MintSurvey’s innovative offerings to unlock your brand’s potential
            </p>
          </div>
        </ScrollFadeIn>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((category, index) => (
            <ScrollFadeIn key={index} delay={0.4 + index * 0.1}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700">
                      <span className="font-semibold text-gray-900">{item.name}</span>
                      <span className="text-sm block text-gray-600 mt-1">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;