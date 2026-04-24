import { Header } from 'src/components/header';
import { List } from 'src/components/list/List';
import { Heading } from 'src/components/typography/heading/Heading';

type Props = {
  applicationName: string;
};

export const HeaderDemo = ({ ...props }: Props) => {
  return (
    <Header {...props}>
      <Header.MenuButton />
      <Header.Menu style={{ padding: 'var(--udsc-header-padding)' }}>
        <nav aria-labelledby="header-menu-navigation">
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
