
import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    // Redirect to the unified legal page
    window.location.hash = '#/legal#terms';
  }, []);

  return (
    <div className="flex h-96 items-center justify-center text-slate-500">
      Redirecting to Master Legal Document...
    </div>
  );
};

export default TermsPage;
