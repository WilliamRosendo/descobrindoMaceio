import React from 'react';

const PageTitle = ({ 
  title, 
  icon: Icon, 
  gradient = "linear-gradient(to right, #2563eb, #3b82f6, #06b6d4)" 
}) => {
  return (
    <div 
      style={{
        background: gradient,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
        marginBottom: '2rem'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        {Icon && (
          <Icon 
            size={40} 
            style={{
              color: 'white',
              filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3))'
            }}
          />
        )}
        <h1 
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.025em',
            filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3))',
            margin: 0
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;