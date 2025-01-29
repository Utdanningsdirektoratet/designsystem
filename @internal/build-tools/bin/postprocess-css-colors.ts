#!/usr/bin/env -S pnpm tsx
import { postprocessCssColors } from '../src/postprocess-css-colors';

const filename = process.argv[2];

await postprocessCssColors(filename);
