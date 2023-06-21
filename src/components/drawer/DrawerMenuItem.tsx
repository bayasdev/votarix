'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

interface DrawerMenuItemProps {
  icon: IconType;
  label: string;
  path: string;
}

const DrawerMenuItem: React.FC<DrawerMenuItemProps> = ({
  icon: Icon,
  label,
  path,
}) => {
  const currentPath = usePathname();
  return (
    <li>
      <Link href={path} className={currentPath === path ? 'active' : undefined}>
        <Icon size={20} />
        {label}
      </Link>
    </li>
  );
};

export default DrawerMenuItem;
