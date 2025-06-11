'use client';

import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart: React.FC = () => {
  const data: any[][] = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'string', label: 'Resource' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ['CS', 'Customer Survey', 'Survey', new Date(2025, 4, 1), new Date(2025, 4, 7), null, 100, null],
    ['PCT', 'Product Concept Test', 'Research', new Date(2025, 4, 8), new Date(2025, 4, 15), null, 75, 'CS'],
    ['BTS', 'Brand Tracking Study', 'Marketing', new Date(2025, 4, 16), new Date(2025, 4, 25), null, 50, 'PCT'],
    ['MA', 'Market Analysis', 'Research', new Date(2025, 4, 26), new Date(2025, 5, 5), null, 40, 'BTS'],
    ['CK', 'Client Kickoff', 'Meetings', new Date(2025, 5, 6), new Date(2025, 5, 7), null, 100, 'MA'],
    ['PF', 'Proposal Finalization', 'Documentation', new Date(2025, 5, 8), new Date(2025, 5, 12), null, 80, 'CK'],
    ['RTD', 'Research Tool Design', 'Development', new Date(2025, 5, 13), new Date(2025, 5, 20), null, 60, 'PF'],
    ['FTB', 'Field Team Briefing', 'Training', new Date(2025, 5, 21), new Date(2025, 5, 22), null, 100, 'RTD'],
    ['DC', 'Data Collection', 'Fieldwork', new Date(2025, 5, 23), new Date(2025, 6, 5), null, 30, 'FTB'],
    ['QC', 'Quality Check', 'Quality', new Date(2025, 6, 6), new Date(2025, 6, 10), null, 20, 'DC'],
    ['DA', 'Data Analysis', 'Analysis', new Date(2025, 6, 11), new Date(2025, 6, 20), null, 15, 'QC'],
    ['RD', 'Report Drafting', 'Documentation', new Date(2025, 6, 21), new Date(2025, 6, 28), null, 10, 'DA'],
    ['CP', 'Client Presentation', 'Meetings', new Date(2025, 6, 29), new Date(2025, 6, 30), null, 5, 'RD'],
    ['CR', 'Client Revisions', 'Documentation', new Date(2025, 7, 1), new Date(2025, 7, 5), null, 0, 'CP'],
    ['PC', 'Project Closure', 'Meetings', new Date(2025, 7, 6), new Date(2025, 7, 7), null, 0, 'CR'],
  ];

  const options = {
    height: 450, // Reduced height for a smaller chart
    gantt: {
      trackHeight: 28, // Slightly smaller track height for compact look
      labelStyle: {
        fontName: 'Arial',
        fontSize: 12, // Reduced font size for better fit
        color: '#333',
      },
      barCornerRadius: 4,
      criticalPathEnabled: true,
      criticalPathStyle: {
        stroke: '#e53935',
        strokeWidth: 2,
      },
      arrow: {
        angle: 45,
        width: 2,
        color: '#555',
        radius: 0,
      },
      palette: [
        { color: '#4caf50', dark: '#388e3c', light: '#81c784' }, // Green for Survey
        { color: '#2196f3', dark: '#1976d2', light: '#64b5f6' }, // Blue for Research
        { color: '#ff9800', dark: '#f57c00', light: '#ffb74d' }, // Orange for Marketing
        { color: '#9c27b0', dark: '#7b1fa2', light: '#ba68c8' }, // Purple for Meetings
        { color: '#607d8b', dark: '#455a64', light: '#90a4ae' }, // Blue-grey for Documentation
        { color: '#ffeb3b', dark: '#fbc02d', light: '#fff176' }, // Yellow for Development
        { color: '#009688', dark: '#00796b', light: '#4db6ac' }, // Teal for Training
        { color: '#f44336', dark: '#d32f2f', light: '#ef5350' }, // Red for Fieldwork
        { color: '#3f51b5', dark: '#303f9f', light: '#7986cb' }, // Indigo for Quality
        { color: '#795548', dark: '#5d4037', light: '#a1887f' }, // Brown for Analysis
      ],
    },
  };

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px" // Matched with options height
      data={data}
      options={options}
    />
  );
};

export default GanttChart;