/**
 * Workspace-specific Oxlint rules, exposed as `workspace/*`.
 */

import { noRelativePackages } from './no-relative-packages.ts';

export default {
  meta: { name: 'workspace' },
  rules: { 'no-relative-packages': noRelativePackages },
};
