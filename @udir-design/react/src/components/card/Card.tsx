import { Card as CardRoot, CardBlock } from '@digdir/designsystemet-react';

type Card = typeof CardRoot & {
  Block: typeof CardBlock;
};

const Card: Card = Object.assign(CardRoot, {
  Block: CardBlock,
});

Card.displayName = 'Card';

export { Card, CardBlock };
export type { CardBlockProps, CardProps } from '@digdir/designsystemet-react';
