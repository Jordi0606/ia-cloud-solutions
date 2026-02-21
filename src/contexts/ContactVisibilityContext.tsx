import { createContext, useContext, useState, useCallback } from 'react';

interface ContactVisibilityContextType {
  showContact: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ContactVisibilityContext = createContext<ContactVisibilityContextType | undefined>(undefined);

export const ContactVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showContact, setShowContact] = useState(false);
  const openContact = useCallback(() => setShowContact(true), []);
  const closeContact = useCallback(() => setShowContact(false), []);

  return (
    <ContactVisibilityContext.Provider value={{ showContact, openContact, closeContact }}>
      {children}
    </ContactVisibilityContext.Provider>
  );
};

export const useContactVisibility = () => {
  const ctx = useContext(ContactVisibilityContext);
  if (!ctx) throw new Error('useContactVisibility must be used within ContactVisibilityProvider');
  return ctx;
};
