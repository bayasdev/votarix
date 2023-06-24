'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  prose?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  prose,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`
          textarea-bordered
          textarea
          ${errors[id] ? 'textarea-error' : undefined}
        `}
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

export default Textarea;
