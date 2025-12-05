import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { Card } from '../card/Card';
import { Checkbox } from '../checkbox/Checkbox';
import { Fieldset } from '../fieldset/Fieldset';
import { Heading } from '../typography/heading/Heading';
import { Switch } from './Switch';

const meta = preview.meta({
  component: Switch,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
  argTypes: {
    /**
     * Digdir has mistakenly set the label description as "Radio label". Remove when fixed.
     */
    label: {
      description: 'Switch label',
      control: 'text',
    },
  },
});

export const Preview = meta.story({
  args: {
    label: 'En bryter',
    onChange: fn(),
  },
  render: (args, context) => <Switch {...args} id={context.id} />,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const toggleSwitch = canvas.getByRole('switch');

    await step('Switch is rendered and initially off', async () => {
      expect(toggleSwitch).toBeInTheDocument();
      expect(toggleSwitch).not.toBeChecked();
    });

    await step('User can toggle the switch on and off', async () => {
      await userEvent.click(toggleSwitch);
      expect(toggleSwitch).toBeChecked();
      await userEvent.click(toggleSwitch);
      expect(toggleSwitch).not.toBeChecked();
    });

    await step('Check keyboard toggle', async () => {
      toggleSwitch.focus();
      await userEvent.keyboard(' ');
      expect(toggleSwitch).toBeChecked();
      await userEvent.keyboard(' ');
      expect(toggleSwitch).not.toBeChecked();
    });

    await step(
      'onChange callback is called when switch is toggled',
      async () => {
        await userEvent.click(toggleSwitch);
        expect(args.onChange).toHaveBeenCalled();
      },
    );
  },
});

export const Checked = meta.story({
  ...Preview.input,
  args: { ...Preview.input.args, defaultChecked: true },
  play: () => {
    // Do nothing
  },
});

export const Description = meta.story({
  args: {
    label: 'Åpen prøve',
    description: 'Prøven er åpen for alle som ønsker å delta.',
    defaultChecked: true,
    id: 'switch-with-description',
  },
  render: (args, context) => <Switch {...args} id={context.id} />,
});

export const Group = meta.story({
  render: ({ ...args }, context) => (
    <Fieldset>
      <Fieldset.Legend>Varsler</Fieldset.Legend>
      <Switch
        label="Lydvarsler"
        description="Spill av lyd når et varsel mottas."
        value="lydvarsler"
        defaultChecked
        {...args}
        id={context.id + 'lydvarsler'}
      />
      <Switch
        label="Popup-varsler"
        description="Vis popup-varsler på skjermen."
        value="popup-varsler"
        {...args}
        id={context.id + 'popup-varsler'}
      />
      <Switch
        label="E-postvarsler"
        description="Tillat e-postvarsler for viktige oppdateringer."
        value="email-varsler"
        {...args}
        id={context.id + 'email-varsler'}
      />
    </Fieldset>
  ),
});

export const GroupEnd = meta.story({
  args: {
    position: 'end',
  },
  render: (args, context) => (
    <Fieldset>
      <Fieldset.Legend>
        <Heading level={2}>Innstillinger</Heading>
      </Fieldset.Legend>
      <Fieldset.Description>
        Innstillinger som gjelder hele systemet.
      </Fieldset.Description>
      <Switch
        label="Mørk modus"
        value="mork-modus"
        defaultChecked
        {...args}
        id={context.id + 'mork-modus'}
      />
      <Switch
        label="Automatiske oppdateringer"
        value="automatiske-oppdateringer"
        {...args}
        id={context.id + 'automatiske-oppdateringer'}
      />
    </Fieldset>
  ),
});

export const Controlled = meta.story({
  render: (args, context) => {
    const [lydvarsler, setLydvarsler] = useState(false);
    const [epostvarsler, setEpostvarsler] = useState(true);
    const [popupvarsler, setPopupvarsler] = useState(false);
    const anyChecked = lydvarsler || epostvarsler || popupvarsler;
    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setLydvarsler(checked);
      setEpostvarsler(checked);
      setPopupvarsler(checked);
    };
    return (
      <Fieldset>
        <Fieldset.Legend>
          <Heading level={2}>Innstillinger</Heading>
        </Fieldset.Legend>
        <Switch
          {...args}
          id={context.id}
          checked={anyChecked}
          onChange={handleSwitchChange}
        />
        <Fieldset.Description>
          Velg hvilke typer varsler du ønsker å motta.
        </Fieldset.Description>
        <Checkbox
          id={context.id + 'lydvarsler'}
          label="Lydvarsler"
          checked={lydvarsler}
          onChange={(e) => setLydvarsler(e.target.checked)}
        />
        <Checkbox
          id={context.id + 'epostvarsler'}
          label="Epostvarsler"
          checked={epostvarsler}
          onChange={(e) => setEpostvarsler(e.target.checked)}
        />
        <Checkbox
          id={context.id + 'popupvarsler'}
          label="Popup-varsler"
          checked={popupvarsler}
          onChange={(e) => setPopupvarsler(e.target.checked)}
        />
      </Fieldset>
    );
  },
  args: {
    label: 'Varsler',
    id: 'controlled-switch',
  },
  parameters: {
    docs: { source: { type: 'code', transform: formatReactSource } },
  },
});

export const Disabled = meta.story({
  args: { label: 'Disabled switch', disabled: true, id: 'disabled-switch' },
});

export const ReadOnly = meta.story({
  args: { label: 'Read-only switch', readOnly: true, id: 'readonly-switch' },
});

export const Focused = Preview.extend({
  args: { id: 'focused-switch' },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
  play: undefined,
});

export const SwitchInColorContext = meta.story({
  args: {
    label: 'Radio',
    description: 'Description',
    defaultChecked: true,
    id: 'switch-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Switch {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const element = within(canvasElement).getByRole('switch');
        const expectedColor = getComputedStyle(element).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        await expect(element).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
});
