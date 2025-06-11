'use client';

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

type Filters = {
  industry?: string;
  type?: string;
  expertise?: string;
};

const selectBaseStyle = 'w-48 transition-all duration-200';

const dropdownRootStyle = ' border border-gray-200 rounded shadow-md';
const itemStyle =
  '  hover:bg-light hover:bg-blur-light transition px-3 py-2 h5';
const selectedStyle = 'bg-light-500 light';

const FilterBar = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) => {
  const handleChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
    
      <Select
        placeholder="Industry"
        className={selectBaseStyle}
        classNames={{ popup: { root: dropdownRootStyle } }}
        onChange={(value) => handleChange('industry', value)}
        allowClear
        value={filters.industry}
      >
        <Option
          className={`${itemStyle} ${
            filters.industry === 'tech' ? selectedStyle : ''
          }`}
          value="tech"
        >
          Tech
        </Option>
        <Option
          className={`${itemStyle} ${
            filters.industry === 'retail' ? selectedStyle : ''
          }`}
          value="retail"
        >
          Retail
        </Option>
      </Select>

      {/* Type Select */}
      <Select
        placeholder="Type"
        className={selectBaseStyle}
        classNames={{ popup: { root: dropdownRootStyle } }}
        onChange={(value) => handleChange('type', value)}
        allowClear
        value={filters.type}
      >
        <Option
          className={`${itemStyle} ${
            filters.type === 'article' ? selectedStyle : ''
          }`}
          value="article"
        >
          Article
        </Option>
        <Option
          className={`${itemStyle} ${
            filters.type === 'webinar' ? selectedStyle : ''
          }`}
          value="webinar"
        >
          Webinar
        </Option>
      </Select>

      {/* Expertise Select */}
      <Select
        placeholder="Expertise"
        className={selectBaseStyle}
        classNames={{ popup: { root: dropdownRootStyle } }}
        onChange={(value) => handleChange('expertise', value)}
        allowClear
        value={filters.expertise}
      >
        <Option
          className={`${itemStyle} ${
            filters.expertise === 'ai' ? selectedStyle : ''
          }`}
          value="ai"
        >
          AI
        </Option>
        <Option
          className={`${itemStyle} ${
            filters.expertise === 'consumer' ? selectedStyle : ''
          }`}
          value="consumer"
        >
          Consumer Insights
        </Option>
      </Select>

      {/* Clear b1 */}
      <button
        onClick={() => setFilters({})}
        className="b1 dark px-6 py-2 h5 font-medium rounded transition-all duration-200 hover:scale-105"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterBar;
