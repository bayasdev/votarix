import { FieldErrors, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  disabled,
  register,
  required,
  errors,
}) => {
  const inputClasses = clsx('input-bordered', 'input', {
    'input-error': errors[id],
  });

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className={inputClasses}
      />
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

export default Input;
