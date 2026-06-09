import { Header } from 'src/components/header';
import { List } from 'src/components/list';
import { Heading } from 'src/components/typography/heading';

type Props = {
  applicationName: string;
};

export const HeaderDemo = ({ ...props }: Props) => {
  return (
    <Header {...props}>
      <Header.MenuButton />
      <Header.Menu>
        <nav
          aria-labelledby="header-menu-navigation"
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: 'var(--ds-size-10) var(--ds-size-5)',
          }}
        >
          <h2 id="header-menu-navigation" className="ds-sr-only">
            Menynavigasjon
          </h2>
          <div>
            <Heading
              data-size="xs"
              level={3}
              style={{
                marginBottom: 'var(--ds-size-3)',
              }}
            >
              Navigasjon
            </Heading>
            <List.Unordered>
              <Header.Menu.Link href="#">Navigasjonslenke 1</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 2</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 3</Header.Menu.Link>
              <Header.Menu.Link href="#">Navigasjonslenke 4</Header.Menu.Link>
            </List.Unordered>
          </div>
        </nav>
      </Header.Menu>
    </Header>
  );
};
