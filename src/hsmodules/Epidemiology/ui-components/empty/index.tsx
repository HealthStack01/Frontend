import React from 'react';

const EmptyData = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/empty.gif" alt="Empty State" width={400} />
      <h5>There are no records available.</h5>
    </div>
  );
};

export default EmptyData;
