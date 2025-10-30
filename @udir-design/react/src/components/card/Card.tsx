import { Card, CardBlock } from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Card.displayName = 'Card';

export { Card, CardBlock };
export type { CardBlockProps, CardProps } from '@digdir/designsystemet-react';
