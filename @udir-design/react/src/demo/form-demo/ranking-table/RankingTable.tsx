import { Controller, Control, FieldError } from 'react-hook-form';
import {
  Heading,
  Table,
  Radio,
  ValidationMessage,
  Fieldset,
} from '@udir-design/react/alpha';
import { FormValues } from '../FormDemo';
import classes from './RankingTable.module.css';

type RankingTableProps = {
  title?: string;
  assertions: string[];
  rankings: string[];
  control: Control<FormValues>;
  error?: FieldError;
};

export const RankingTable = ({
  title,
  assertions,
  rankings,
  control,
  error,
}: RankingTableProps) => {
  const errorId = 'rankings-error';
  return (
    <Fieldset
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      {title && (
        <Fieldset.Legend>
          <Heading level={2}>{title}</Heading>
        </Fieldset.Legend>
      )}
      <Table style={{ tableLayout: 'fixed' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell className={classes.assertions}>
              Påstander
            </Table.HeaderCell>
            {rankings.map((ranking, index) => (
              <Table.HeaderCell key={index} className={classes.cell}>
                {ranking}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {assertions.map((assertion, rowIndex) => (
            <Table.Row key={rowIndex}>
              <Table.Cell>{assertion}</Table.Cell>
              <Controller
                name={`rankings.${assertion}`}
                control={control}
                rules={{ required: 'Du må besvare alle påstandene' }}
                render={({ field }) => {
                  const isInvalid = !field.value;
                  return (
                    <>
                      {rankings.map((ranking, colIndex) => (
                        <Table.Cell key={colIndex} className={classes.cell}>
                          <Radio
                            {...field}
                            value={ranking}
                            checked={field.value === ranking}
                            aria-invalid={error && isInvalid}
                            aria-describedby={
                              error && isInvalid
                                ? `${errorId}-${rowIndex}`
                                : undefined
                            }
                          />
                        </Table.Cell>
                      ))}
                    </>
                  );
                }}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {error && (
        <ValidationMessage id={errorId}>{error.message}</ValidationMessage>
      )}
    </Fieldset>
  );
};
