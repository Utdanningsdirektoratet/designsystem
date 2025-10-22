import { List } from 'src/components/list/List';
import { Header } from '../..';
import { Link } from 'src/components/link/Link';
import { ArrowRightIcon } from '@udir-design/icons';
import styles from './styles.module.css';

export const WithNavigationLinksExample = () => (
  <Header applicationName="Tjenestenavn">
    <Header.Navigation data-show="sm">
      <Header.Navigation.Item href="#">Navlink 1</Header.Navigation.Item>
      <Header.Navigation.Item href="#" active>
        Navlink 2
      </Header.Navigation.Item>
      <Header.Navigation.Item href="#">Navlink 3</Header.Navigation.Item>
    </Header.Navigation>
    <Header.MenuButton data-hide="sm" />
    <Header.Menu>
      <nav aria-label="header-menu-navigation" className={styles.menuNav}>
        <List.Unordered>
          <List.Item>
            <Link href="#">
              <ArrowRightIcon aria-hidden />
              <span>Navlink 1</span>
            </Link>
          </List.Item>
          <List.Item>
            <Link href="#">
              <ArrowRightIcon aria-hidden />
              <span>Navlink 2</span>
            </Link>
          </List.Item>
          <List.Item>
            <Link href="#">
              <ArrowRightIcon aria-hidden />
              <span>Navlink 3</span>
            </Link>
          </List.Item>
        </List.Unordered>
      </nav>
    </Header.Menu>
  </Header>
);
