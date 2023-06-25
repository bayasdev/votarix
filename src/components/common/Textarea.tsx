import { FieldErrors, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';

interface TextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  disabled,
  register,
  required,
  errors,
}) => {
  const textareaClasses = clsx('textarea-bordered', 'textarea', {
    'textarea-error': errors[id],
  });

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={textareaClasses}
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
