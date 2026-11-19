import { useState } from 'react';
import { Do, Dont, Stack } from '.storybook/docs/components';
import { Fieldset } from 'src/components/fieldset';
import { Radio } from 'src/components/radio';
import { Textfield } from 'src/components/textfield';

const question =
  'Har skolen fått tilskudd fra Utdanningsdirektoratet tidligere?';

const styles = `
.hide-dont-disable-question {
  display: grid;
  gap: var(--ds-size-6);
}
`;

const PreviousGrantQuestion = ({
  name,
  hideFollowUp,
}: {
  name: string;
  hideFollowUp: boolean;
}) => {
  const [answer, setAnswer] = useState('no');
  const isRelevant = answer === 'yes';

  return (
    <div className="hide-dont-disable-question">
      <style>{styles}</style>
      <Fieldset>
        <Fieldset.Legend>{question}</Fieldset.Legend>
        <Radio
          name={name}
          label="Ja"
          value="yes"
          checked={answer === 'yes'}
          onChange={() => setAnswer('yes')}
        />
        <Radio
          name={name}
          label="Nei"
          value="no"
          checked={answer === 'no'}
          onChange={() => setAnswer('no')}
        />
      </Fieldset>
      {hideFollowUp ? (
        isRelevant && <Textfield label="Saksnummer for forrige tilskudd" />
      ) : (
        <Textfield
          label="Saksnummer for forrige tilskudd"
          disabled={!isRelevant}
        />
      )}
    </div>
  );
};

export const HideDontDisable = () => (
  <Stack>
    <Do description="Vis oppfølgingsspørsmålet bare når det er relevant for brukeren.">
      <PreviousGrantQuestion name="hide-do" hideFollowUp />
    </Do>
    <Dont description="Ikke vis et deaktivert felt som brukeren ikke skal fylle ut.">
      <PreviousGrantQuestion name="hide-dont" hideFollowUp={false} />
    </Dont>
  </Stack>
);
