import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { cn } from '@/src/lib/utils';

interface TextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  resize?: boolean;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  rows = 3,
  resize = false,
  disabled,
  register,
  required,
  errors,
  className,
}) => {
  const textareaClasses = cn(
    'textarea-bordered',
    'textarea',
    {
      'textarea-error': errors[id],
    },
    { 'resize-none': !resize },
    className,
  );

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        rows={rows}
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
