import React, { useState } from 'react';
import { Button } from 'src/components/button/Button';
import { ProgressBar } from 'src/components/progressBar/ProgressBar';
import { Heading } from 'src/components/typography/heading/Heading';
import styles from './Progress.module.scss';

export function Progress() {
  const [page, setPage] = useState<number>(1);
  const maxPage = 8;

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className={styles.wrapper}>
      <Heading>Naviger frem og tilbake</Heading>
      <ProgressBar
        value={page}
        max={maxPage}
        progressText={({ value, max }) => `Side ${value} av ${max}`}
      />
      <div className={styles.buttons}>
        {page !== 1 && (
          <Button onClick={prevPage} variant="secondary">
            Forrige
          </Button>
        )}
        {page !== maxPage && (
          <Button onClick={nextPage} variant="secondary">
            Neste
          </Button>
        )}
      </div>
    </div>
  );
}
