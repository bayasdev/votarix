import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';

interface DateInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  control: Control<any>;
  errors: FieldErrors;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  disabled,
  control,
  required,
  errors,
}) => {
  const inputClasses = clsx('input-bordered', 'input', 'w-full', {
    'input-error': errors[id],
  });

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={new Date()}
      render={({ field: { onChange, value } }) => (
        <div className="form-control w-full">
          <label className="label">{label}</label>
          <DatePicker
            id={id}
            selected={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            showTimeSelect
            dateFormat="dd/MM/yyyy HH:mm"
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
      )}
    />
  );
};

export default DateInput;
