'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

type SelectOption = {
  label?: string;
  value?: string | number;
};

interface SelectProps {
  id: string;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  placeholder,
  options,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`
          select-bordered
          select
          ${errors[id] ? 'select-error' : undefined}
        `}
      >
        {placeholder && (
          <option disabled selected>
            {placeholder}
          </option>
        )}
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[id] && (
        <label className="label">
          <span className="label-text-alt text-error">
            {errors[id]?.message?.toString()}
          </span>
        </label>
      )}
    </div>
  );
};

export default Select;
