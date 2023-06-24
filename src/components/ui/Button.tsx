'use client';

import { IconType } from 'react-icons';
import clsx from 'clsx';

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  full?: boolean;
  reverse?: boolean;
  color?: 'primary' | 'secondary' | 'neutral' | 'ghost' | 'error';
  circle?: boolean;
  icon?: IconType;
  iconSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  disabled,
  outline,
  small,
  full,
  reverse,
  color = 'primary',
  circle,
  icon: Icon,
  iconSize = 20,
}) => {
  const colorVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    neutral: 'btn-neutral',
    ghost: 'btn-ghost',
    error: 'btn-error',
  };

  const buttonClasses = clsx(
    'btn',
    colorVariants[color],
    { 'w-full': full },
    { 'btn-outline': outline },
    { 'btn-sm': small },
    { 'btn-circle': circle },
    { 'flex-row-reverse': reverse },
    className,
  );

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {Icon && <Icon size={iconSize} />}
      {label}
    </button>
  );
};

export default Button;
