import {
  Card,
  type CardProps,
  CardBlock,
  type CardBlockProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Card.displayName = 'Card';

export { Card, CardProps, CardBlock, CardBlockProps };
