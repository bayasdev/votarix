'use client';

import * as React from 'react';

import MobileMenuContext from '@/contexts/mobile-menu';

interface MobileMenuProviderProps {
  children: React.ReactNode;
}

const MobileMenuProvider: React.FC<MobileMenuProviderProps> = ({
  children,
}) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <MobileMenuContext.Provider value={{ showMobileMenu, setShowMobileMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuProvider;
