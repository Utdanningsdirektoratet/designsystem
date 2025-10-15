import {
  Card,
  CardBlock,
  type CardBlockProps,
  type CardProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Card.displayName = 'Card';

export { Card, CardBlock, CardBlockProps, CardProps };
