import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';

const ENTITLEMENT_KEY = 'doughlabpro_entitlements';

interface EntitlementState {
  isPro: boolean;
}

interface EntitlementContextType extends EntitlementState {
  grantProAccess: () => void;
  hasProAccess: () => boolean;
}

const EntitlementContext = createContext<EntitlementContextType | null>(null);

const getInitialState = (): EntitlementState => {
  try {
    const storedState = localStorage.getItem(ENTITLEMENT_KEY);
    if (storedState) {
      const parsed = JSON.parse(storedState);
      return { isPro: !!parsed.isPro };
    }
  } catch (error) {
    console.error('Could not parse entitlements from localStorage', error);
  }
  return { isPro: false };
};

export const EntitlementProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entitlements, setEntitlements] =
    useState<EntitlementState>(getInitialState);

  const grantProAccess = useCallback(() => {
    const newState = { isPro: true };
    try {
      localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify(newState));
      setEntitlements(newState);
      // Attempt to find and hide any existing ad elements
      const adElements = document.querySelectorAll('.adsbygoogle');
      adElements.forEach((ad) => {
        (ad as HTMLElement).innerHTML = '';
        (ad as HTMLElement).setAttribute('style', 'display: none;');
      });
    } catch (error) {
      console.error('Could not save entitlements to localStorage', error);
    }
  }, []);

  const hasProAccess = useCallback(() => {
    return entitlements.isPro;
  }, [entitlements.isPro]);

  // FIX: Replace JSX with `React.createElement` to prevent parsing errors in a .ts file.
  return React.createElement(
    EntitlementContext.Provider,
    { value: { ...entitlements, grantProAccess, hasProAccess } },
    children,
  );
};

export const useEntitlements = (): EntitlementContextType => {
  const context = useContext(EntitlementContext);
  if (!context) {
    throw new Error('useEntitlements must be used within an EntitlementProvider');
  }
  return context;
};
