'use client';

import * as React from 'react';

interface MobileMenuContextValue {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuContext = React.createContext<MobileMenuContextValue>({
  showMobileMenu: false,
  setShowMobileMenu: () => {},
});

export default MobileMenuContext;
