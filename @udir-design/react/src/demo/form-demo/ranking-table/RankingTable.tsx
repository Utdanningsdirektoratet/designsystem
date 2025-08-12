import { useFormContext } from 'react-hook-form';
import {
  Heading,
  Table,
  Radio,
  ValidationMessage,
  Fieldset,
} from '@udir-design/react/alpha';
import {
  focusableFieldsetProps,
  type FormValues,
  type PageProps,
} from '../FormDemo';
import classes from './RankingTable.module.css';

type RankingTableProps = {
  title?: string;
  assertions: string[];
  rankings: string[];
} & PageProps;

export const RankingTable = ({
  title,
  assertions,
  rankings,
  showErrors,
}: RankingTableProps) => {
  const errorId = 'rankings-error';
  const assertionRules = { required: 'Du må besvare alle påstandene' };
  const { register, formState, getFieldState } = useFormContext<FormValues>();

  const rawRankingErrors = formState.errors.rankings;
  const rankingError = rawRankingErrors
    ? Object.values(rawRankingErrors)[0]
    : undefined;
  const error = showErrors ? rankingError : undefined;

  return (
    <Fieldset
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      id="rankings"
      {...focusableFieldsetProps}
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
          {assertions.map((assertion, rowIndex) => {
            const fieldName = `rankings.${assertion}` as const;
            const isInvalid = getFieldState(fieldName).invalid;

            return (
              <Table.Row key={rowIndex}>
                <Table.Cell>{assertion}</Table.Cell>

                {rankings.map((ranking, colIndex) => (
                  <Table.Cell key={colIndex} className={classes.cell}>
                    <Radio
                      aria-label={`${ranking} i påstand ${assertion}`}
                      value={ranking}
                      aria-invalid={error && isInvalid}
                      aria-describedby={
                        error && isInvalid
                          ? `${errorId}-${rowIndex}`
                          : undefined
                      }
                      {...register(fieldName, assertionRules)}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {error && (
        <ValidationMessage id={errorId}>{error.message}</ValidationMessage>
      )}
    </Fieldset>
  );
};
