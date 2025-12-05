import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import { beforeAll } from 'vitest';
import projectAnnotations from './preview';

// This file should no longer be needed after migrating all our stories to CSF Factories
const project = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations.composed,
]);

beforeAll(project.beforeAll);
