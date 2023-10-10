import React from 'react';
const TabPanel = ({ value, index, children }) => {
    return (
      <div style={{ display: value === index ? 'block' : 'none' }}>
        {value === index && children}
      </div>
    );
  };
  export default TabPanel;