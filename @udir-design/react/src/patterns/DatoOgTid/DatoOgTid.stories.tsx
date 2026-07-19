import { forwardRef, useRef, useState } from 'react';
import DatePicker, {
  type ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { expect, userEvent, within } from 'storybook/test';
import { ChevronLeftIcon, ChevronRightIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
// eslint-disable-next-line no-restricted-imports -- react-datepicker only ships CSS in dist/
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { Button } from '../../components/button';
import { Field } from '../../components/field';
import { Input, type InputProps } from '../../components/input';
import { Label } from '../../components/typography/label';

const meta = preview.meta({
  title: 'Patterns/Dato og tid',
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: { originator: 'self' },
  },
});

export const Preview = meta.story({
  parameters: {
    docs: { ...advancedCodeDocs, story: { height: '475px' } },
  },

  render() {
    const CustomInput = useRef(
      // eslint-disable-next-line react/display-name
      forwardRef<HTMLInputElement, InputProps>(
        ({ placeholder, ...rest }, ref) => (
          <Input
            ref={ref}
            placeholder={placeholder ?? 'dd.mm.åååå'}
            {...rest}
          />
        ),
      ),
    ).current;
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

    const [selected, setSelected] = useState<Date | null>(new Date());

    return (
      <>
        <style>
          {`
        .example-main {
            display: flex;
            justify-content: center;
        }`}
        </style>
        <div className="example-main">
          <Field>
            <Label htmlFor="date-picker-field">Dato for prosjektstart</Label>
            <DatePicker
              id="date-picker-field"
              selected={selected}
              onChange={setSelected}
              readOnly={false}
              required={true}
              dateFormat="dd.MM.yyyy"
              showPopperArrow={false}
              calendarClassName="uds-datepicker"
              customInput={<CustomInput />}
              renderCustomHeader={CustomHeader}
            />
          </Field>
        </div>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const popup = within(canvasElement.ownerDocument.body);
    const input = canvas.getByLabelText('Dato for prosjektstart');

    await step(
      'Calendar opens when the user clicks the date field',
      async () => {
        await userEvent.click(input);
        expect(
          popup.getByRole('button', { name: 'Forrige måned' }),
        ).toBeInTheDocument();
        expect(
          popup.getByRole('button', { name: 'Neste måned' }),
        ).toBeInTheDocument();
      },
    );

    await step('Month navigation changes the displayed month', async () => {
      const monthLabel = canvasElement.ownerDocument.querySelector(
        '.uds-datepicker__month-label',
      );
      expect(monthLabel).toBeTruthy();
      const currentMonth = monthLabel?.textContent;

      await userEvent.click(popup.getByRole('button', { name: 'Neste måned' }));
      const nextMonth = canvasElement.ownerDocument.querySelector(
        '.uds-datepicker__month-label',
      )?.textContent;
      expect(nextMonth).not.toBe(currentMonth);

      await userEvent.click(
        popup.getByRole('button', { name: 'Forrige måned' }),
      );
      const previousMonth = canvasElement.ownerDocument.querySelector(
        '.uds-datepicker__month-label',
      )?.textContent;
      expect(previousMonth).toBe(currentMonth);
    });

    await step(
      'Selecting day 15 updates the input value in dd.MM.yyyy format',
      async () => {
        const day15 = canvasElement.ownerDocument.querySelector(
          '.react-datepicker__day--015:not(.react-datepicker__day--outside-month)',
        ) as HTMLElement | null;

        expect(day15).toBeTruthy();
        await userEvent.click(day15 as HTMLElement);
        expect((input as HTMLInputElement).value).toMatch(/^15\.\d{2}\.\d{4}$/);
      },
    );
  },
});
