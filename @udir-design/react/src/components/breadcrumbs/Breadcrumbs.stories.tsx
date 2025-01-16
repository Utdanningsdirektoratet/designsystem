import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
} from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Preview: Story = {
  args: {
    'aria-label': 'Du er her:',
    children: (
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Nivå 1</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Nivå 2</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="#">Nivå 3</BreadcrumbsLink>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    ),
  },
};
