/**
 * Fix icons being displayed as "React.ForwardRef" in Storybook code examples.
 *
 * This is a side-effect-only module — import it for its side effects.
 * It lives in an untraced directory so that changes to @udir-design/icons
 * don't cause TurboSnap to re-snapshot every story.
 */
import * as icons from '@udir-design/icons';

for (const iconName of Object.keys(icons) as (keyof typeof icons)[]) {
  icons[iconName].displayName = iconName;
}
