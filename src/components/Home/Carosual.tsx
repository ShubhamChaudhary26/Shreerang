'use client';
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '280px',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const Carosual: React.FC = () => {
  

  return (
    <Carousel>
      <div>
        <div style={contentStyle}>
          <h2 style={{  fontSize: '24px', marginBottom: '10px' }}>
            Unlock trusted and verified ad measurement
          </h2>
          <p style={{ fontSize: '16px', maxWidth: '600px' }}>
            Across India’s largest digital platform and beyond.
          </p>
        </div>
      </div>

      
    </Carousel>
  );
};

export default Carosual;
