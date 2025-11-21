
import React from 'react';
import { useUser } from '../../contexts/UserProvider';
import AuthPlaceholder from '../AuthPlaceholder';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <AuthPlaceholder />;
  }

  return <>{children}</>;
};

export default RequireAuth;
