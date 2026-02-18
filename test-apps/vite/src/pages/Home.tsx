import { Heading, Paragraph, Prose } from '@udir-design/react/alpha';

export function Home() {
  return (
    <Prose>
      <Heading level={1} data-size="xl">
        Testapplikasjon med Vite
      </Heading>
      <Paragraph>
        Denne applikasjonen inneholder en rekke demosider for Udirs designsystem
        i et oppsett som bruker Vite. Du kan navigere mellom disse i menyen i
        toppfeltet.
      </Paragraph>
    </Prose>
  );
}

export default Home;
