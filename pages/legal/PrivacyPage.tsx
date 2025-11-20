
import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    // Redirect to the unified legal page
    window.location.hash = '#/legal#privacy';
  }, []);

  return (
    <div className="flex h-96 items-center justify-center text-slate-500">
      Redirecting to Master Legal Document...
    </div>
  );
};

export default PrivacyPage;
