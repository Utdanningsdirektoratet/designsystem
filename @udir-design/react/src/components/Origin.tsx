import { Paragraph } from './typography';

export function OriginText(children: React.ReactNode) {
  return <Paragraph>{children?.toString}</Paragraph>;
}
