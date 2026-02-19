'use client';

import { Footer } from '@udir-design/react/alpha';

type Props = {
  className?: string;
};

export function TestFooter({ className }: Props) {
  return (
    <Footer className={className}>
      <Footer.List>
        <Footer.Item href="https://www.udir.no/om-udir/personvernerklaring-udir/">
          Om Udir
        </Footer.Item>
        <Footer.Item href="https://www.udir.no/">Kontakt oss</Footer.Item>
      </Footer.List>
      <Footer.List>
        <Footer.Item href="https://www.udir.no/om-udir/personvernerklaring-udir/">
          Personvern
        </Footer.Item>
        <Footer.Item href="https://uustatus.no/nb/erklaringer/publisert/ce43e104-3893-45ac-90c8-45deb6f17624">
          Tilgjengelighetserklæring
        </Footer.Item>
      </Footer.List>
    </Footer>
  );
}
