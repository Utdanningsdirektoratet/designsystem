import { Paragraph } from '@digdir/designsystemet-react';
import {
  ArrowLeftIcon,
  CaretLeftCircleIcon,
  CaretLeftIcon,
} from '@udir-design/icons';
import { Do, Dont, Stack } from '.storybook/docs/components';
import { Button } from 'src/components/button/Button';
import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';

export const IconEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do
        description={
          'Bruk ikoner markert med "Ofte brukt hos Udir" dersom de dekker behovet'
        }
      >
        <Ex1Do />
      </Do>
      <Dont description="Unngå å bruke andre varianter med mindre du har et spesifikt behov som ikke er dekket av Udirs utvalg">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

const Ex1Do = () => {
  return (
    <div>
      <Button>
        <ArrowLeftIcon aria-hidden />
        Tilbake
      </Button>
    </div>
  );
};

const Ex1Dont = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button>
        <CaretLeftIcon />
        Tilbake
      </Button>
      <Button>
        <CaretLeftCircleIcon />
        Tilbake
      </Button>
    </div>
  );
};

export const SymbolEx2 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do
        description={'Bruk symboler som visuell støtte i et brukergrensesnitt.'}
      >
        <Ex2Do />
      </Do>
      <Dont description="Unngå å bruke symboler som en erstatning for ikoner i brukergrensesnitt.">
        <Ex2Dont />
      </Dont>
    </Stack>
  );
};

const Ex2Do = () => {
  return (
    <Card variant="tinted" style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper />
      <Heading level={4}>Siste nytt</Heading>
      <Paragraph>
        Ved å abbonere på siste nytt får du jevnlige e-poster med oversikt over
        hva som er oppdatert.
      </Paragraph>
      <div style={{ display: 'flex', gap: 'var(--ds-size-1)' }}>
        <Button>Abonner på siste nytt</Button>{' '}
        <Button variant="secondary">Flere saker</Button>
      </div>
    </Card>
  );
};

const Ex2Dont = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-size-3)',
      }}
    >
      <Button variant="secondary" data-size="lg">
        <Plus />
        Legg til
      </Button>
      <Button variant="secondary" data-size="lg">
        <Pencil />
        Rediger
      </Button>
    </div>
  );
};

export const SymbolEx3 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do
        description={
          'Symboler skal stå fritt på bakgrunnen og helst sammen med tekst.'
        }
      >
        <Ex3Do />
      </Do>
      <Dont description="Ikke sett symboler inn i andre figurer eller former som rammer inn symbolet.">
        <Ex3Dont />
      </Dont>
    </Stack>
  );
};

const Ex3Do = () => {
  return (
    <Card variant="tinted" data-color="accent">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-1)',
        }}
      >
        <Symbol />
        <Heading level={4} data-size="xs">
          Verktøy
        </Heading>
        <Paragraph>Vi bruker disse verktøyene i våre løsninger.</Paragraph>
      </div>
    </Card>
  );
};

const Ex3Dont = () => {
  return (
    <Card variant="tinted" data-color="accent">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-1)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--ds-color-accent-surface-active)',
            borderRadius: '100%',
            border: '1px solid var(--ds-color-accent-border-default)',
            width: 'fit-content',
          }}
        >
          <Symbol />
        </div>
        <Heading level={4} data-size="xs">
          Verktøy
        </Heading>
        <Paragraph>Vi bruker disse verktøyene i våre løsninger.</Paragraph>
      </div>
    </Card>
  );
};

/* TODO: Bytte ut med symbolbiblioket når det er ferdig */
const Symbol = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'var(--ds-size-3)' }}
    >
      <g id="Style=Fill" clip-path="url(#clip0_14_27)">
        <g id="object">
          <path
            id="Vector"
            d="M40.5831 5.52324C40.6747 5.43268 40.8314 5.47919 40.8575 5.60538C41.2292 7.4056 40.7157 9.36754 39.3168 10.7664C37.7984 12.2848 35.6992 12.776 33.8232 12.2408H33.7792L5.0192 41H4.9744L1 37.0256V36.9808L29.76 8.22163V8.17683C29.224 6.25603 29.76 4.15763 31.2336 2.68403C32.6782 1.23942 34.608 0.723872 36.407 1.13877C36.5302 1.16719 36.575 1.32013 36.4872 1.41113L33.2321 4.7857C33.1143 4.9078 33.1161 5.10174 33.236 5.2217L36.8205 8.80614C36.9415 8.92713 37.1375 8.92772 37.2592 8.80746L40.5831 5.52324Z"
            fill="#BED5E8"
            stroke="#303030"
            stroke-width="0.4"
          />
          <path
            id="Vector_2"
            d="M8.40709 6.74721L7.06789 3.48721L3.6735 2.41602L2.4231 3.71041L3.45029 7.06001L6.71029 8.44481L21.4479 23.1816L23.1447 21.4848L8.40709 6.74721Z"
            fill="#DEDEDE"
            stroke="#303030"
            stroke-width="0.4"
          />
          <path
            id="Vector_3"
            d="M39.3559 31.6663L32.0942 24.4054C31.5792 23.8905 30.9846 23.4619 30.3333 23.1361L29.7865 22.8627C28.7291 22.3338 27.7592 21.646 26.9104 20.823C26.8023 20.7181 26.6309 20.7163 26.5205 20.8188L26.2919 21.0311C26.1802 21.1347 26.0066 21.1315 25.8989 21.0238L24.2826 19.4074C24.1719 19.2968 23.9926 19.2968 23.882 19.4074L19.4594 23.8301C19.3488 23.9407 19.3488 24.12 19.4594 24.2306L21.0823 25.8535C21.1873 25.9586 21.1933 26.1269 21.0961 26.2392L20.8612 26.5103C20.764 26.6226 20.77 26.7909 20.875 26.896L20.8754 26.8964C21.6391 27.6605 22.2793 28.5387 22.7733 29.4995L23.0436 30.0255C23.4658 30.8466 24.0131 31.5971 24.666 32.25L31.7191 39.3031C33.8183 41.4463 37.3015 41.4463 39.4447 39.3031C41.4991 37.2487 41.4991 33.7655 39.3559 31.6663Z"
            fill="#76C69D"
            stroke="#303030"
            stroke-width="0.4"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_14_27">
          <rect width="41.9746" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Pencil = () => {
  return (
    <svg
      width="23"
      height="42"
      viewBox="0 0 23 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.28433 35.7508L2.48806 34.0228C2.48806 34.0228 2.4763 34.0128 2.47712 34.0094L16.1235 3.81946L20.1085 5.63296L6.30065 35.7494C6.30065 35.7494 6.29063 35.7541 6.28433 35.7508Z"
        fill="#5BA27E"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M5.08335 35.1994L3.66557 34.554C3.66557 34.554 3.66177 34.5477 3.66427 34.5447L17.3618 4.37805L18.85 5.05505L5.09171 35.1944C5.09171 35.1944 5.0867 35.2002 5.08335 35.1994Z"
        fill="#76C69D"
        stroke="#303030"
        stroke-width="0.3"
        stroke-miterlimit="10"
      />
      <path
        d="M2.47343 34.0317L1.94527 40.2487L6.2869 35.7692C6.2869 35.7692 6.28894 35.7537 6.27929 35.7496L2.49099 34.0253C2.48302 34.0216 2.4734 34.0246 2.47175 34.0313L2.47343 34.0317Z"
        fill="#E5CEAE"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M2.18539 37.5955L1.9453 40.2487L3.78894 38.3239L2.18539 37.5955Z"
        fill="#303030"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M20.0159 2.18556C20.7761 2.53165 21.114 3.43072 20.7672 4.19257L20.113 5.62989L20.1084 5.6316L16.131 3.82109L16.1293 3.81651L16.785 2.37606C17.1304 1.61734 18.0265 1.28187 18.7852 1.62724L20.0159 2.18556Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
    </svg>
  );
};

const Plus = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1447_18" fill="white">
        <path d="M25 17H41V25H25V41H17V25H1V17H17V1H25V17Z" />
      </mask>
      <path d="M25 17H41V25H25V41H17V25H1V17H17V1H25V17Z" fill="#9BD8B9" />
      <path
        d="M25 17H24.6V17.4H25V17ZM41 17H41.4V16.6H41V17ZM41 25V25.4H41.4V25H41ZM25 25V24.6H24.6V25H25ZM25 41V41.4H25.4V41H25ZM17 41H16.6V41.4H17V41ZM17 25H17.4V24.6H17V25ZM1 25H0.6V25.4H1V25ZM1 17V16.6H0.6V17H1ZM17 17V17.4H17.4V17H17ZM17 1V0.6H16.6V1H17ZM25 1H25.4V0.6H25V1ZM25 17V17.4H41V17V16.6H25V17ZM41 17H40.6V25H41H41.4V17H41ZM41 25V24.6H25V25V25.4H41V25ZM25 25H24.6V41H25H25.4V25H25ZM25 41V40.6H17V41V41.4H25V41ZM17 41H17.4V25H17H16.6V41H17ZM17 25V24.6H1V25V25.4H17V25ZM1 25H1.4V17H1H0.6V25H1ZM1 17V17.4H17V17V16.6H1V17ZM17 17H17.4V1H17H16.6V17H17ZM17 1V1.4H25V1V0.6H17V1ZM25 1H24.6V17H25H25.4V1H25Z"
        fill="#303030"
        mask="url(#path-1-inside-1_1447_18)"
      />
    </svg>
  );
};

const Paper = () => {
  return (
    <svg
      width="42"
      height="39"
      viewBox="0 0 42 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'var(--ds-size-3)' }}
    >
      <path
        d="M32.5081 33.7904V4.56848H38.6191V33.7904H32.5081Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
      />
      <path
        d="M41 33.7801C41 36.0741 38.7806 37.1044 37.2723 37.1044C33.6076 37.1044 32.7842 35.665 32.7842 33.7801H36.0208V6.47721C36.0208 5.73035 36.6847 4.56848 38.6764 4.56848C40.2697 4.56848 40.8893 5.84097 41 6.47721V33.7801Z"
        fill="#D3E6F6"
        stroke="#303030"
        stroke-width="0.4"
      />
      <path
        d="M32.7012 1H1V33.2822C1 36.4025 3.39179 37.0841 4.58127 37.0564H36.4485C33.6601 36.99 32.7012 34.6988 32.7012 33.2822V1Z"
        fill="#EFF7FE"
        stroke="#303030"
        stroke-width="0.4"
      />
      <rect
        x="5.29784"
        y="12.6559"
        width="11.5432"
        height="10.5245"
        rx="0.318229"
        fill="#9BD8B9"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="8.66577"
        y1="6.11554"
        x2="25.4841"
        y2="6.11554"
        stroke="#303030"
      />
      <line
        x1="8.66577"
        y1="8.90692"
        x2="25.4841"
        y2="8.90692"
        stroke="#303030"
      />
      <line
        x1="6.86603"
        y1="26.4606"
        x2="15.2728"
        y2="26.4606"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="14.1533"
        x2="28.2629"
        y2="14.1533"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="26.4606"
        x2="28.2629"
        y2="26.4606"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="6.86603"
        y1="33.5904"
        x2="15.2728"
        y2="33.5904"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="21.283"
        x2="28.2629"
        y2="21.283"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="33.5903"
        x2="28.2629"
        y2="33.5903"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="23.9143"
        x2="28.2629"
        y2="23.9143"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="6.86603"
        y1="28.8372"
        x2="15.2728"
        y2="28.8372"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="16.5298"
        x2="28.2629"
        y2="16.5298"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="28.8372"
        x2="28.2629"
        y2="28.8372"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="6.86603"
        y1="31.2138"
        x2="15.2728"
        y2="31.2138"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="18.9064"
        x2="28.2629"
        y2="18.9064"
        stroke="#303030"
        stroke-width="0.4"
      />
      <line
        x1="19.8561"
        y1="31.2138"
        x2="28.2629"
        y2="31.2138"
        stroke="#303030"
        stroke-width="0.4"
      />
    </svg>
  );
};
