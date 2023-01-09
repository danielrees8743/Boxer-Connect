import React from 'react';

const ReloadButton: React.FC = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div>
      <button onClick={reload}>Opp's, Try Again</button>
    </div>
  );
};

export default ReloadButton;
