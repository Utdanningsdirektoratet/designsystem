import { FrequentQuestions } from './frequent-questions/FrequentQuestions';
import { Login } from './login/Login';
import { Shoppinglist } from '../page-demo/shoppinglist/Shoppinglist';
import { UserTable } from './user-table/UserTable';
import { Heading, Paragraph } from '../../components/alpha';
import { BreadcrumbsDemo } from './breadcrumbs/BreadcrumbsDemo';
import styles from './DemoPage.module.scss';
import { Size } from '@digdir/designsystemet-react';

export type Props = {
  'data-color-scheme': 'auto' | 'dark' | 'light'; // TODO: type should come from @digdir, must be added there
  'data-size': Size;
};

export function DemoPage(props: Props) {
  return (
    <div className={styles.page} {...props}>
      <Heading>Velkommen! </Heading>
      <Paragraph>
        På denne demosiden hvor vi har laget noen eksempler på komponentene i
        biblioteket, sånn at man kan se hvordan de samspiller i en litt større
        kontekst. På sikt vil alle komponentene være representert her, men så
        langt er det kun de vi har ansett som viktigst i første omgang. Lengre
        ned på siden kan du prøve å endre på størrelse og farge-modus for å se
        hvordan det påvirker komponentene.
      </Paragraph>
      <BreadcrumbsDemo />
      <div className={styles.examples}>
        <Shoppinglist />
        <Login />
        <FrequentQuestions />
        <UserTable />
      </div>
    </div>
  );
}
