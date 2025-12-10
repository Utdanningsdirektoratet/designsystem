import type { Meta, StoryObj } from '@storybook/react-vite';
import { PencilIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { Link } from '../link/Link';
import { Heading } from '../typography/heading/Heading';
import { FormSummary } from '.';

const meta: Meta<typeof FormSummary> = {
  component: FormSummary,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'centered',
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof FormSummary>;

export const Preview: Story = {
  render: (args) => (
    <FormSummary {...args}>
      <FormSummary.Section>
        <Heading>Preview</Heading>
      </FormSummary.Section>

      <FormSummary.Section>
        <Heading level={2}>Første seksjon</Heading>
        <FormSummary.Fields>
          <FormSummary.Field>
            <FormSummary.Field.Label>Første label</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Første svar</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Andre label</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Andre svar</FormSummary.Field.Answer>
          </FormSummary.Field>
          <FormSummary.Field>
            <FormSummary.Field.Label>Tredje label</FormSummary.Field.Label>
            <FormSummary.Field.Answer>Tredje svar</FormSummary.Field.Answer>
          </FormSummary.Field>
        </FormSummary.Fields>
      </FormSummary.Section>

      <FormSummary.Section>
        <Heading level={2}>Andre seksjon</Heading>

        <FormSummary.Section>
          <Heading level={3}>Innestilt seksjon</Heading>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Innestilt label</FormSummary.Field.Label>
              <FormSummary.Field.Answer>
                Innestilt svar
              </FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Innestilt label</FormSummary.Field.Label>
              <FormSummary.Field.Answer>
                Innestilt svar
              </FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>

        <FormSummary.Section>
          <Heading level={3}>Innestilt seksjon</Heading>
          <FormSummary.Fields>
            <FormSummary.Field>
              <FormSummary.Field.Label>Innestilt label</FormSummary.Field.Label>
              <FormSummary.Field.Answer>
                Innestilt svar
              </FormSummary.Field.Answer>
            </FormSummary.Field>
            <FormSummary.Field>
              <FormSummary.Field.Label>Innestilt label</FormSummary.Field.Label>
              <FormSummary.Field.Answer>
                Innestilt svar
              </FormSummary.Field.Answer>
            </FormSummary.Field>
          </FormSummary.Fields>
        </FormSummary.Section>
      </FormSummary.Section>

      <FormSummary.Section>
        <Link href="#">
          <PencilIcon aria-hidden />
          <span>Rediger</span>
        </Link>
      </FormSummary.Section>
    </FormSummary>
  ),
};
