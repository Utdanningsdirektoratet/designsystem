import { type ReactNode, forwardRef } from 'react';
import DatePicker, {
  type ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { ChevronLeftIcon, ChevronRightIcon } from '@udir-design/icons';
import { Button } from 'src/components/button';
import { Field } from 'src/components/field';
import { Input, type InputProps } from 'src/components/input';
import { Label } from 'src/components/typography/label';
// eslint-disable-next-line no-restricted-imports -- react-datepicker only ships CSS in dist/
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...rest }, ref) => (
    <Input ref={ref} placeholder={placeholder ?? 'dd.mm.åååå'} {...rest} />
  ),
);
CustomInput.displayName = 'CustomInput';

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div className="uds-datepicker__header">
    <Button
      data-variant="tertiary"
      data-size="sm"
      aria-label="Forrige måned"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
    >
      <ChevronLeftIcon aria-hidden={true} />
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
      <ChevronRightIcon aria-hidden={true} />
    </Button>
  </div>
);

type DatePickerFieldProps = {
  id: string;
  label: ReactNode;
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
      renderCustomHeader={CustomHeader}
    />
  </Field>
);
