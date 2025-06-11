'use client';

import { useState } from 'react';
import Sidebar from './SideBar'; // Sidebar ka correct path set karo

import SurveyDashboard from './Sections/CustomerSurvey';
import ProductConceptTest from './Sections/ProductConceptTest';
import BrandTrackingStudy from './Sections/BrandTrackingStudy';
import MarketAnalysis from './Sections/MarketAnalysis';
import ClientKickoff from './Sections/ClientKickoff';
import GanttChart from './Sections/GanttChart';

export default function ClientDashboard() {
  const [selectedSection, setSelectedSection] = useState('Customer Survey');

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'Customer Survey':
        return <SurveyDashboard />;
      case 'Product Concept Test':
        return <ProductConceptTest />;
         case 'Gantt Chart':
        return <GanttChart />;
      case 'Brand Tracking Study':
        return <BrandTrackingStudy />;
      case 'Market Analysis':
        return <MarketAnalysis />;
      case 'Client Kickoff':
        return <ClientKickoff />;
      default:
        return <p>Select a section to view details.</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-light text-[var(--text-color)] p-4 gap-4">
      <Sidebar selected={selectedSection} setSelected={setSelectedSection} />

      <div className="w-full bg-white rounded-xl shadow-md p-6">
        <h2 className="h2 mb-4">Automotive Research - {selectedSection}</h2>
        {renderSectionContent()}
      </div>
    </div>
  );
}
