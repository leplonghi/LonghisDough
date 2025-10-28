import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from 'react';

const ENTITLEMENTS_KEY = 'dough-lab-entitlements';

interface Entitlements {
  isPro: boolean;
  passUntil: number | null;
  lastPassGrantedAt: number | null;
}

interface EntitlementContextType {
  hasProAccess: boolean;
  grantProAccess: () => void;
  grantSessionProAccess: () => void;
  grant24hPass: () => void;
  isPassOnCooldown: boolean;
  cooldownHoursRemaining: number;
}

const EntitlementContext = createContext<EntitlementContextType | undefined>(
  undefined,
);

export const EntitlementProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [entitlements, setEntitlements] = useState<Entitlements>({
    isPro: false,
    passUntil: null,
    lastPassGrantedAt: null,
  });
  const [isSessionPro, setIsSessionPro] = useState<boolean>(false);
  const [cooldownHours, setCooldownHours] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENTITLEMENTS_KEY);
      if (stored) {
        setEntitlements(JSON.parse(stored));
      }
    } catch {
      // Ignore errors, default state will be used
    }
  }, []);
  
  // Effect to periodically check pass expiration and cooldown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Check if pass has expired
      if (entitlements.passUntil && now > entitlements.passUntil) {
         setEntitlements(prev => {
            const newEntitlements = { ...prev, passUntil: null };
            try {
              localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(newEntitlements));
            } catch {}
            return newEntitlements;
         });
      }
      
      // Check cooldown status
      if (entitlements.lastPassGrantedAt) {
          const hoursSinceLastPass = (now - entitlements.lastPassGrantedAt) / (1000 * 60 * 60);
          if (hoursSinceLastPass < 24) {
              setCooldownHours(24 - hoursSinceLastPass);
          } else if (cooldownHours > 0) { // Cooldown just finished
              setCooldownHours(0);
          }
      } else if (cooldownHours > 0) {
          setCooldownHours(0);
      }

    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [entitlements, cooldownHours]);

  const saveEntitlements = (newEntitlements: Entitlements) => {
    try {
      localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(newEntitlements));
      setEntitlements(newEntitlements);
    } catch (error) {
      console.error('Could not save to localStorage', error);
    }
  };

  const grantProAccess = useCallback(() => {
    saveEntitlements({ ...entitlements, isPro: true, passUntil: null });
  }, [entitlements]);

  const grantSessionProAccess = useCallback(() => {
    setIsSessionPro(true);
  }, []);
  
  const grant24hPass = useCallback(() => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
     if (entitlements.lastPassGrantedAt && now - entitlements.lastPassGrantedAt < twentyFourHours) {
        console.warn("24h pass is on cooldown.");
        return;
    }
    saveEntitlements({
        ...entitlements,
        passUntil: now + twentyFourHours,
        lastPassGrantedAt: now,
    });
  }, [entitlements]);

  const hasProAccess = entitlements.isPro || isSessionPro || (entitlements.passUntil !== null && Date.now() < entitlements.passUntil);
  const isPassOnCooldown = entitlements.lastPassGrantedAt !== null && (Date.now() - entitlements.lastPassGrantedAt) < (24 * 60 * 60 * 1000);

  const value = {
    hasProAccess,
    grantProAccess,
    grantSessionProAccess,
    grant24hPass,
    isPassOnCooldown,
    cooldownHoursRemaining: Math.ceil(cooldownHours),
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
