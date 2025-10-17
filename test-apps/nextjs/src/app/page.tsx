'use client';

import { Paragraph } from '@udir-design/react/beta';
import styles from './page.module.scss';

import {
  AnalyseFillSymbol,
  AnalyseSymbol,
  HoygaffelFillSymbol,
  KornaksSymbol,
} from '@udir-design/symbols';
import { DogHarnessIcon } from '@navikt/aksel-icons';

export default function Index() {
  return (
    <div className={styles.page}>
      <h1>Test app for Next.js setup with @udir-design/react</h1>

      <AnalyseFillSymbol />

      <Paragraph>
        <AnalyseSymbol />
        <DogHarnessIcon />
        AnalyseSymbol
      </Paragraph>
      <DogHarnessIcon />

      <KornaksSymbol size={'10rem'} />
      <KornaksSymbol width={'10rem'} />
      <KornaksSymbol height={'10rem'} />
      <AnalyseFillSymbol />
      <AnalyseFillSymbol size={'10rem'} />
      <HoygaffelFillSymbol />
    </div>
  );
}
