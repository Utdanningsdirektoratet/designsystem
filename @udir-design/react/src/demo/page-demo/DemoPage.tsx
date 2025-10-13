import { FrequentQuestions } from './frequent-questions/FrequentQuestions';
import { Login } from './login/Login';
import { Shoppinglist } from '../page-demo/shoppinglist/Shoppinglist';
import { UserTable } from './user-table/UserTable';
import { BreadcrumbsDemo } from './breadcrumbs/BreadcrumbsDemo';
import styles from './DemoPage.module.scss';
import { DemoProps } from '../demoProps';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

type Props = Omit<DemoProps, 'data-size'>;

export function DemoPage(props: Props) {
  return (
    <div className={styles.page} {...props} data-size="">
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
