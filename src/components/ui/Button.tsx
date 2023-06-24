'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  full?: boolean;
  reverse?: boolean;
  color?: 'primary' | 'secondary' | 'neutral' | 'ghost' | 'error';
  circle?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  full,
  reverse,
  color = 'primary',
  circle,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn
        btn-${color}
        ${full ? 'w-full' : undefined}
        ${outline ? 'btn-outline' : undefined}
        ${small ? 'btn-sm' : undefined}
        ${circle ? 'btn-circle' : undefined}
        ${reverse ? 'flex-row-reverse' : undefined}
      `}
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default Button;
