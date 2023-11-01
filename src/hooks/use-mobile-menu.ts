import * as React from 'react';

import MobileMenuContext from '@/contexts/mobile-menu';

export const useMobileMenu = () => {
  const context = React.useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};
