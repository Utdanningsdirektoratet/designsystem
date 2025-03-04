import {
  ArrowRightIcon,
  Chat2Icon,
  PersonIcon,
  PersonPlusIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { Do, Dont, Stack } from '../../../../.storybook/docs-components';
import { Button } from '../../alpha';

/*
 * Dos and donts
 */

export const ButtonEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="En knapp skal kun gjøre én handling">
        <Ex1Do />
      </Do>
      <Dont description="Unngå flere handlinger på samme knapp">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

export const ButtonEx2 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Det skal kun være én primærknapp per side">
        <Ex2Do />
      </Do>
      <Dont description="Vi skal ikke ha flere primærknapper på samme side">
        <Ex2Dont />
      </Dont>
    </Stack>
  );
};

export const ButtonEx3 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Knappene i en gruppe skal ha samme farge">
        <Ex3Do />
      </Do>
      <Dont description="Ulike farger i en gruppe kan være forvirrende">
        <Ex3Dont />
      </Dont>
    </Stack>
  );
};

export const ButtonEx4 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk kun ett ikon">
        <Ex4Do />
      </Do>
      <Dont description="Ikke bruk flere ikoner på samme knapp">
        <Ex4Dont />
      </Dont>
    </Stack>
  );
};

export const ButtonEx5 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Bruk stor forbokstav og små bokstaver på resten av ordene">
        <Ex5Do />
      </Do>
      <Dont description="Ikke bland skrivemåter">
        <Ex5Dont />
      </Dont>
    </Stack>
  );
};

/*
 * Examples
 */

const Ex1Do = () => {
  return (
    <Stack>
      <Button>Fortsett senere</Button>
      <Button variant="tertiary">Avbryt</Button>
    </Stack>
  );
};

const Ex1Dont = () => {
  return <Button>Avbryt og fortsett senere senere</Button>;
};

const Ex2Do = () => {
  return (
    <Stack>
      <Button variant="primary">Send inn</Button>
      <Button variant="secondary">Lagre utkast</Button>
      <Button data-color="danger" variant="tertiary">
        Forkast
      </Button>
    </Stack>
  );
};

const Ex2Dont = () => {
  return (
    <Stack>
      <Button variant="primary">Send inn</Button>
      <Button variant="primary">Lagre utkast</Button>
      <Button variant="primary">Forkast</Button>
    </Stack>
  );
};

const Ex3Do = () => {
  return (
    <Stack>
      <Button variant="primary" data-color="accent">
        Publiser
      </Button>
      <Button variant="secondary" data-color="accent">
        Lagre
      </Button>
    </Stack>
  );
};

const Ex3Dont = () => {
  return (
    <Stack>
      <Button variant="primary" data-color="accent">
        Publiser
      </Button>
      <Button variant="secondary" data-color="support1">
        Lagre
      </Button>
    </Stack>
  );
};

const Ex4Do = () => {
  return (
    <Stack>
      <Button>
        Start chat <ArrowRightIcon />
      </Button>
      <Button variant="secondary">
        <PersonPlusIcon /> Legg til
      </Button>
    </Stack>
  );
};

const Ex4Dont = () => {
  return (
    <Stack>
      <Button>
        <Chat2Icon /> Start chat <ArrowRightIcon />
      </Button>
      <Button variant="secondary">
        <PlusIcon /> Legg til <PersonIcon />
      </Button>
    </Stack>
  );
};

const Ex5Do = () => {
  return (
    <Stack>
      <Button>Forrige</Button>
      <Button variant="secondary">Neste</Button>
    </Stack>
  );
};

const Ex5Dont = () => {
  return (
    <Stack>
      <Button>forrige</Button>
      <Button variant="secondary">NESTE</Button>
    </Stack>
  );
};
