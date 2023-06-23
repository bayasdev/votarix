'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  full?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  full,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-primary
        btn
        ${full ? 'w-full' : undefined}
        ${outline ? 'btn-outline' : undefined}
        ${small ? 'btn-sm' : undefined}
      `}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
