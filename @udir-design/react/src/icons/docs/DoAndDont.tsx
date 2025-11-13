import { Paragraph } from '@digdir/designsystemet-react';
import {
  ArrowLeftIcon,
  CaretLeftCircleIcon,
  CaretLeftIcon,
} from '@udir-design/icons';
import { Do, Dont, Stack } from '.storybook/docs/components';
import { Button } from 'src/components/button/Button';
import { Card } from 'src/components/card/Card';
import { Tag } from 'src/components/tag/Tag';
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
    <Card
      style={{
        display: 'grid',
        gridTemplateColumns: '5fr 2fr',
        gap: 'var(--ds-size-2)',
        maxWidth: '400px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-size-2)',
        }}
      >
        <Tag data-color="success">Godkjent</Tag>
        <Heading level={4}>
          <a href="/">Tilskudd</a>
        </Heading>
        <Paragraph>Statlige midler Udir fordeler til tiltak</Paragraph>
      </div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Money />
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

const Money = () => {
  return (
    <svg
      viewBox="0 0 42 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: 'auto', width: '80%' }}
    >
      <path
        d="M17.9911 11.2988C17.9911 12.188 16.2021 12.909 13.9955 12.909C11.789 12.909 10 12.188 10 11.2988C10 10.8565 10 10.4895 10 10.4895H17.9911C17.9911 10.4895 17.9911 10.7824 17.9911 11.2988Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 10.5095C17.9911 11.3987 16.2021 12.1198 13.9955 12.1198C11.789 12.1198 10 11.3987 10 10.5095C10 10.0673 10 9.70032 10 9.70032H17.9911C17.9911 9.70032 17.9911 9.99319 17.9911 10.5095Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 9.71915C17.9911 10.6084 16.2021 11.3294 13.9955 11.3294C11.789 11.3294 10 10.6084 10 9.71915C10 9.2769 10 8.90993 10 8.90993H17.9911C17.9911 8.90993 17.9911 9.2028 17.9911 9.71915Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 8.93697C17.9911 9.82617 16.2021 10.5472 13.9955 10.5472C11.789 10.5472 10 9.82617 10 8.93697C10 8.49472 10 8.12775 10 8.12775H17.9911C17.9911 8.12775 17.9911 8.42062 17.9911 8.93697Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 8.14892C17.9911 9.03812 16.2021 9.75912 13.9955 9.75912C11.789 9.75912 10 9.03812 10 8.14892C10 7.70667 10 7.33969 10 7.33969H17.9911C17.9911 7.33969 17.9911 7.63257 17.9911 8.14892Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 7.35851C17.9911 8.24771 16.2021 8.96872 13.9955 8.96872C11.789 8.96872 10 8.24771 10 7.35851C10 6.91626 10 6.54929 10 6.54929H17.9911C17.9911 6.54929 17.9911 6.84216 17.9911 7.35851Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 6.56928C17.9911 7.45848 16.2021 8.17949 13.9955 8.17949C11.789 8.17949 10 7.45848 10 6.56928C10 6.12703 10 5.76006 10 5.76006H17.9911C17.9911 5.76006 17.9911 6.05293 17.9911 6.56928Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 5.78711C17.9911 6.67631 16.2021 7.39732 13.9955 7.39732C11.789 7.39732 10 6.67631 10 5.78711C10 5.34486 10 4.97789 10 4.97789H17.9911C17.9911 4.97789 17.9911 5.27076 17.9911 5.78711Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 4.99906C17.9911 5.88826 16.2021 6.60927 13.9955 6.60927C11.789 6.60927 10 5.88826 10 4.99906C10 4.55681 10 4.18984 10 4.18984H17.9911C17.9911 4.18984 17.9911 4.48271 17.9911 4.99906Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 4.20867C17.9911 5.09787 16.2021 5.81888 13.9955 5.81888C11.789 5.81888 10 5.09787 10 4.20867C10 3.76642 10 3.39944 10 3.39944H17.9911C17.9911 3.39944 17.9911 3.69232 17.9911 4.20867Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M17.9911 3.41943C17.9911 4.30863 16.2021 5.02964 13.9955 5.02964C11.789 5.02964 10 4.30863 10 3.41943C10 2.97718 10 2.61021 10 2.61021H17.9911C17.9911 2.61021 17.9911 2.90308 17.9911 3.41943Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M13.9955 4.22042C16.2022 4.22042 17.9911 3.4995 17.9911 2.61021C17.9911 1.72092 16.2022 1 13.9955 1C11.7889 1 10 1.72092 10 2.61021C10 3.4995 11.7889 4.22042 13.9955 4.22042Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M13.9873 3.56764C15.6762 3.56764 17.0454 3.12003 17.0454 2.56787C17.0454 2.01572 15.6762 1.56811 13.9873 1.56811C12.2984 1.56811 10.9292 2.01572 10.9292 2.56787C10.9292 3.12003 12.2984 3.56764 13.9873 3.56764Z"
        fill="#D6B689"
      />
      <path
        d="M8.99106 15.9369C8.99106 16.8262 7.20207 17.5472 4.99553 17.5472C2.78899 17.5472 1 16.8262 1 15.9369C1 15.4947 1 15.1277 1 15.1277H8.99106C8.99106 15.1277 8.99106 15.4206 8.99106 15.9369Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 15.1489C8.99106 16.0381 7.20207 16.7591 4.99553 16.7591C2.78899 16.7591 1 16.0381 1 15.1489C1 14.7067 1 14.3397 1 14.3397H8.99106C8.99106 14.3397 8.99106 14.6326 8.99106 15.1489Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 14.3585C8.99106 15.2477 7.20207 15.9687 4.99553 15.9687C2.78899 15.9687 1 15.2477 1 14.3585C1 13.9163 1 13.5493 1 13.5493H8.99106C8.99106 13.5493 8.99106 13.8422 8.99106 14.3585Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 13.5693C8.99106 14.4585 7.20207 15.1795 4.99553 15.1795C2.78899 15.1795 1 14.4585 1 13.5693C1 13.127 1 12.76 1 12.76H8.99106C8.99106 12.76 8.99106 13.0529 8.99106 13.5693Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 12.7871C8.99106 13.6763 7.20207 14.3973 4.99553 14.3973C2.78899 14.3973 1 13.6763 1 12.7871C1 12.3449 1 11.9779 1 11.9779H8.99106C8.99106 11.9779 8.99106 12.2708 8.99106 12.7871Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 11.9991C8.99106 12.8883 7.20207 13.6093 4.99553 13.6093C2.78899 13.6093 1 12.8883 1 11.9991C1 11.5568 1 11.1898 1 11.1898H8.99106C8.99106 11.1898 8.99106 11.4827 8.99106 11.9991Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 11.2087C8.99106 12.0979 7.20207 12.8189 4.99553 12.8189C2.78899 12.8189 1 12.0979 1 11.2087C1 10.7664 1 10.3994 1 10.3994H8.99106C8.99106 10.3994 8.99106 10.6923 8.99106 11.2087Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M8.99106 10.4194C8.99106 11.3086 7.20207 12.0296 4.99553 12.0296C2.78899 12.0296 1 11.3086 1 10.4194C1 9.97718 1 9.61021 1 9.61021H8.99106C8.99106 9.61021 8.99106 9.90308 8.99106 10.4194Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M4.99553 11.2204C7.2022 11.2204 8.99106 10.4995 8.99106 9.61021C8.99106 8.72092 7.2022 8 4.99553 8C2.78886 8 1 8.72092 1 9.61021C1 10.4995 2.78886 11.2204 4.99553 11.2204Z"
        fill="#BED5E8"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M4.98965 10.5253C6.6786 10.5253 8.04776 10.0777 8.04776 9.52552C8.04776 8.97336 6.6786 8.52575 4.98965 8.52575C3.30071 8.52575 1.93155 8.97336 1.93155 9.52552C1.93155 10.0777 3.30071 10.5253 4.98965 10.5253Z"
        fill="#BED5E8"
      />
      <path
        d="M1 21.1402L41 15.458V20.1687L19.4709 33.2868L1 27.1164V21.1402Z"
        fill="#A9DBC2"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 26.4754L19.4498 32.5669L41 19.6923" fill="#A9DBC2" />
      <path
        d="M1 26.4754L19.4498 32.5669L41 19.6923"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 25.7768L19.4498 31.8424L41 19.2171" fill="#A9DBC2" />
      <path
        d="M1 25.7768L19.4498 31.8424L41 19.2171"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 25.0781L19.4498 31.1096L41 18.6749" fill="#A9DBC2" />
      <path
        d="M1 25.0781L19.4498 31.1096L41 18.6749"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 24.4077L19.4498 30.4086L41 18.1256" fill="#A9DBC2" />
      <path
        d="M1 24.4077L19.4498 30.4086L41 18.1256"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 23.7572L19.4498 29.7146L41 17.5893" fill="#A9DBC2" />
      <path
        d="M1 23.7572L19.4498 29.7146L41 17.5893"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 23.1139L19.4498 29.0019L41 17.0071" fill="#A9DBC2" />
      <path
        d="M1 23.1139L19.4498 29.0019L41 17.0071"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 22.4375L19.4498 28.2232L41 16.4554" fill="#A9DBC2" />
      <path
        d="M1 22.4375L19.4498 28.2232L41 16.4554"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path d="M1 21.8212L19.4498 27.5057L41 15.9355" fill="#A9DBC2" />
      <path
        d="M1 21.8212L19.4498 27.5057L41 15.9355"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M40.9721 15.3228C40.9813 15.3246 40.9832 15.3371 40.9748 15.3415L19.4533 26.6836L1.02738 21.1484C1.01832 21.1457 1.01775 21.1331 1.02653 21.1296L23.804 12L40.9721 15.3228Z"
        fill="#A9DBC2"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M26.5856 22.8108L22.7243 24.8459L4.8688 19.6965L8.84438 18.1027L26.5856 22.8108Z"
        fill="#76C69D"
        stroke="#303030"
        stroke-width="0.2"
        stroke-miterlimit="10"
      />
      <path
        d="M18.9627 21.5409L19.5695 21.6184L17.9007 22.6661"
        stroke="#303030"
        stroke-width="0.215326"
        stroke-miterlimit="10"
      />
      <path
        d="M22.2272 22.4215C21.822 22.2873 21.321 22.5688 21.0446 22.7967C20.7863 23.0082 20.5058 23.4946 20.8826 23.5929C21.3104 23.7044 21.6666 23.4309 22.026 23.1813C22.3854 22.9316 22.5877 22.5427 22.2271 22.4237L22.2272 22.4215Z"
        stroke="#303030"
        stroke-width="0.215326"
        stroke-miterlimit="10"
      />
      <path
        d="M20.6942 21.9059C20.289 21.7717 19.788 22.0532 19.5116 22.2811C19.2533 22.4926 18.9728 22.979 19.3496 23.0773C19.7774 23.1889 20.1336 22.9153 20.493 22.6657C20.8524 22.416 21.0547 22.0271 20.6941 21.9081L20.6942 21.9059Z"
        stroke="#303030"
        stroke-width="0.215326"
        stroke-miterlimit="10"
      />
      <path
        d="M23.7812 22.8666C23.376 22.7324 22.8749 23.0139 22.5986 23.2417C22.3402 23.4532 22.0598 23.9396 22.4365 24.0379C22.8644 24.1495 23.2206 23.876 23.58 23.6263C23.9393 23.3766 24.1417 22.9878 23.7811 22.8687L23.7812 22.8666Z"
        stroke="#303030"
        stroke-width="0.215326"
        stroke-miterlimit="10"
      />
      <path
        d="M29.2616 27.3211L33.4547 24.7652L33.6182 19.3042L16.3376 14.9922L11.6493 16.8718L29.291 21.5577L29.2616 27.3211Z"
        fill="#7F99AE"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 9.93695C32.9911 10.8262 31.2021 11.5472 28.9955 11.5472C26.789 11.5472 25 10.8262 25 9.93695C25 9.4947 25 9.12773 25 9.12773H32.9911C32.9911 9.12773 32.9911 9.4206 32.9911 9.93695Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 9.1489C32.9911 10.0381 31.2021 10.7591 28.9955 10.7591C26.789 10.7591 25 10.0381 25 9.1489C25 8.70665 25 8.33968 25 8.33968H32.9911C32.9911 8.33968 32.9911 8.63255 32.9911 9.1489Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 8.3585C32.9911 9.2477 31.2021 9.9687 28.9955 9.9687C26.789 9.9687 25 9.2477 25 8.3585C25 7.91625 25 7.54927 25 7.54927H32.9911C32.9911 7.54927 32.9911 7.84215 32.9911 8.3585Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 7.56927C32.9911 8.45847 31.2021 9.17948 28.9955 9.17948C26.789 9.17948 25 8.45847 25 7.56927C25 7.12702 25 6.76004 25 6.76004H32.9911C32.9911 6.76004 32.9911 7.05292 32.9911 7.56927Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 6.7871C32.9911 7.6763 31.2021 8.39731 28.9955 8.39731C26.789 8.39731 25 7.6763 25 6.7871C25 6.34485 25 5.97788 25 5.97788H32.9911C32.9911 5.97788 32.9911 6.27075 32.9911 6.7871Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 5.99905C32.9911 6.88826 31.2021 7.60926 28.9955 7.60926C26.789 7.60926 25 6.88826 25 5.99905C25 5.55681 25 5.18983 25 5.18983H32.9911C32.9911 5.18983 32.9911 5.48271 32.9911 5.99905Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 5.20865C32.9911 6.09785 31.2021 6.81886 28.9955 6.81886C26.789 6.81886 25 6.09785 25 5.20865C25 4.7664 25 4.39943 25 4.39943H32.9911C32.9911 4.39943 32.9911 4.6923 32.9911 5.20865Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M32.9911 4.41943C32.9911 5.30863 31.2021 6.02964 28.9955 6.02964C26.789 6.02964 25 5.30863 25 4.41943C25 3.97718 25 3.61021 25 3.61021H32.9911C32.9911 3.61021 32.9911 3.90308 32.9911 4.41943Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M28.9955 5.22042C31.2022 5.22042 32.9911 4.4995 32.9911 3.61021C32.9911 2.72092 31.2022 2 28.9955 2C26.7889 2 25 2.72092 25 3.61021C25 4.4995 26.7889 5.22042 28.9955 5.22042Z"
        fill="#D6B689"
        stroke="#303030"
        stroke-width="0.4"
        stroke-miterlimit="10"
      />
      <path
        d="M28.9897 4.52528C30.6786 4.52528 32.0478 4.07767 32.0478 3.52552C32.0478 2.97336 30.6786 2.52575 28.9897 2.52575C27.3007 2.52575 25.9316 2.97336 25.9316 3.52552C25.9316 4.07767 27.3007 4.52528 28.9897 4.52528Z"
        fill="#D6B689"
      />
    </svg>
  );
};
