import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ChevronLeftIcon, ChevronRightIcon } from '@udir-design/icons';
import { Button } from 'src/components/button';
import { Field } from 'src/components/field';
import { Input } from 'src/components/input';
import { Label } from 'src/components/typography/label';
// eslint-disable-next-line no-restricted-imports -- react-datepicker only ships CSS in dist/
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, value, onClick, onChange, placeholder, readOnly }, ref) => (
    <Input
      ref={ref}
      id={id}
      value={value as string}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder ?? 'dd.mm.åååå'}
      readOnly={readOnly}
    />
  ),
);
CustomInput.displayName = 'CustomInput';

type DatePickerFieldProps = {
  id: string;
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  readOnly?: boolean;
  required?: boolean;
};

export const DatePickerField = ({
  id,
  label,
  selected,
  onChange,
  readOnly,
  required,
}: DatePickerFieldProps) => (
  <Field>
    <Label htmlFor={id}>{label}</Label>
    <DatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      dateFormat="dd.MM.yyyy"
      showPopperArrow={false}
      calendarClassName="uds-datepicker"
      customInput={<CustomInput />}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="uds-datepicker__header">
          <Button
            data-variant="tertiary"
            data-size="sm"
            aria-label="Forrige måned"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <ChevronLeftIcon aria-hidden />
          </Button>
          <span className="uds-datepicker__month-label">
            {date.toLocaleString('nb-NO', { month: 'long', year: 'numeric' })}
          </span>
          <Button
            data-variant="tertiary"
            data-size="sm"
            aria-label="Neste måned"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <ChevronRightIcon aria-hidden />
          </Button>
        </div>
      )}
    />
  </Field>
);
