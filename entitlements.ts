import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  useCallback,
} from 'react';

const PRO_ACCESS_KEY = 'dough-lab-pro-access';

interface EntitlementContextType {
  hasProAccess: boolean;
  grantProAccess: () => void;
  grantSessionProAccess: () => void;
  revokeProAccess: () => void;
}

const EntitlementContext = createContext<EntitlementContextType | undefined>(
  undefined,
);

export const EntitlementProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      return localStorage.getItem(PRO_ACCESS_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);

  const grantProAccess = useCallback(() => {
    try {
      localStorage.setItem(PRO_ACCESS_KEY, 'true');
      setIsPro(true);
    } catch (error) {
      console.error('Could not save to localStorage', error);
    }
  }, []);

  const grantSessionProAccess = useCallback(() => {
    setIsSessionPro(true);
  }, []);

  const revokeProAccess = useCallback(() => {
    try {
      localStorage.removeItem(PRO_ACCESS_KEY);
      setIsPro(false);
      setIsSessionPro(false); // Also revoke session pro for consistency
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
  }, []);

  const value = {
    hasProAccess: isPro || isSessionPro,
    grantProAccess,
    grantSessionProAccess,
    revokeProAccess,
  };

  return React.createElement(EntitlementContext.Provider, { value }, children);
};

export const useEntitlements = (): EntitlementContextType => {
  const context = useContext(EntitlementContext);
  if (context === undefined) {
    throw new Error(
      'useEntitlements must be used within an EntitlementProvider',
    );
  }
  return context;
};
