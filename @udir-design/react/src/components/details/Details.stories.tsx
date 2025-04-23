import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Details, List } from '@udir-design/react/alpha';
import { expect, userEvent, within } from '@storybook/test';

export default {
  component: Details,
  tags: ['alpha'],
} as Meta<typeof Details>;

type Story = StoryObj<typeof Details>;

const previewSummary = 'Kva er nasjonale prøver?';
const previewContent =
  'Føremålet med nasjonale prøver er å gi skolane kunnskap om elevane sine grunnleggjande ferdigheiter i lesing, rekning og engelsk. Informasjonen frå prøvene skal danne grunnlag for undervegsvurdering og kvalitetsutvikling på alle nivå i skolesystemet.';

export const Preview: Story = {
  args: {
    children: [
      <Details.Summary>{previewSummary}</Details.Summary>,
      <Details.Content data-testid="details-content">
        {previewContent}
      </Details.Content>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const details = canvasElement.querySelector('u-details');
    const summary = canvas.getByRole('button');
    const content = canvas.getByTestId('details-content');

    await step('Check that details are rendered', async () => {
      expect(details).toBeTruthy();
    });

    await step('Summary text is correct', async () => {
      expect(summary).toHaveTextContent(previewSummary);
    });

    await step('Content text is correct', async () => {
      expect(content).toHaveTextContent(previewContent);
    });

    await step('Initial state: details is closed', async () => {
      expect(details).not.toHaveAttribute('open');
    });

    await step('Click summary to open details', async () => {
      await userEvent.click(summary);
      expect(details).toHaveAttribute('open');
    });

    await step('Click summary to close details', async () => {
      await userEvent.click(summary);
      expect(details).not.toHaveAttribute('open');
    });

    await step('Keyboard interaction toggles details', async () => {
      summary.focus();
      await userEvent.keyboard('{Enter}');
      expect(details).toHaveAttribute('open');

      await userEvent.keyboard('{Enter}');
      expect(details).not.toHaveAttribute('open');
    });
    await userEvent.keyboard('{Tab}');
  },
};

export const InCard: Story = {
  render: (args) => {
    return (
      <Card data-color="neutral">
        <Details {...args}>
          <Details.Summary>Vedlegg</Details.Summary>
          <Details.Content>Vedlegg 1, vedlegg 2, vedlegg 3</Details.Content>
        </Details>
      </Card>
    );
  },
};

export const InCardWithColor: Story = {
  render: (args) => {
    return (
      <Card data-color="support2" variant="tinted">
        <Details {...args}>
          <Details.Summary>{previewSummary}</Details.Summary>
          <Details.Content>{previewContent}</Details.Content>
        </Details>
        <Details>
          <Details.Summary>
            Korleis skal nasjonale prøver brukast?
          </Details.Summary>
          <Details.Content>
            <List.Unordered>
              <List.Item>
                Lærarane skal bruke resultata for å følgje opp elevane sine og i
                arbeidet med undervegsvurdering og tilpassa opplæring.
              </List.Item>
              <List.Item>
                Kommunar og skolar skal bruke resultata som grunnlag for
                kvalitetsutvikling i opplæringa.
              </List.Item>
              <List.Item>
                Forskarar kan søkje om å få utlevert resultat frå nasjonale
                prøver til bruk i forsking.
              </List.Item>
            </List.Unordered>
          </Details.Content>
        </Details>
      </Card>
    );
  },
};

export const Controlled: Story = {
  render() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const toggleOpen = () => {
      const isOpen = [open1, open2, open3].every(Boolean);
      setOpen1(!isOpen);
      setOpen2(!isOpen);
      setOpen3(!isOpen);
    };
    return (
      <>
        <Button onClick={toggleOpen}>Toggle Details</Button>
        <br />
        <Details open={open1} onToggle={() => setOpen1(!open1)}>
          <Details.Summary>Feide</Details.Summary>
          <Details.Content>
            Feide er en nasjonal fellesløsning for sikker identifisering i
            utdanningssektoren.
          </Details.Content>
        </Details>
        <Details open={open2} onToggle={() => setOpen2(!open2)}>
          <Details.Summary>UIDP</Details.Summary>
          <Details.Content>
            UIDP er Udirs nye løsning for identitets- og tilgangskontroll.
          </Details.Content>
        </Details>
        <Details open={open3} onToggle={() => setOpen3(!open3)}>
          <Details.Summary>UBAS</Details.Summary>
          <Details.Content>
            UBAS styrer brukertilgang til flere av våre nettjenester. UBAS vil
            gradvis bli faset ut og erstattet av nyere påloggingsløsninger.
          </Details.Content>
        </Details>
      </>
    );
  },
};
