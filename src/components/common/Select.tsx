import { FieldErrors, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

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
  const selectClasses = clsx('select-bordered', 'select', {
    'select-error': errors[id],
  });

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <select
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={selectClasses}
      >
        {placeholder && (
          <option disabled value="">
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
