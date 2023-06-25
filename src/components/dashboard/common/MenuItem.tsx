import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import clsx from 'clsx';

interface MenuItemProps {
  icon: IconType;
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, path }) => {
  const currentPath = usePathname();

  const linkClasses = clsx({ active: currentPath === path });

  return (
    <li>
      <Link href={path} className={linkClasses}>
        <Icon size={24} />
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
