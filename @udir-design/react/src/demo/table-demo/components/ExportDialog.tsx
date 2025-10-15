import { useRef, useState } from 'react';
import { FileCsvFillIcon, FilePdfFillIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';
import { Dialog } from 'src/components/dialog/Dialog';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import classes from '../TableDemo.module.css';

type ExportDialogProps = {
  handleExport: (
    dialogExportRef: React.RefObject<HTMLDialogElement | null>,
  ) => void;
};

export const ExportDialog = ({ handleExport }: ExportDialogProps) => {
  const dialogExportRef = useRef<HTMLDialogElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [csvLoading, setCsvLoading] = useState(false);

  const handlePdfExport = () => {
    setPdfLoading(true);
    setTimeout(() => {
      setPdfLoading(false);
    }, 2000);
  };

  const handleCsvExport = () => {
    setCsvLoading(true);
    setTimeout(() => {
      setCsvLoading(false);
    }, 2000);
  };

  return (
    <Dialog.TriggerContext>
      <Dialog.Trigger
        onClick={() => handleExport(dialogExportRef)}
        className={classes.exportButton}
      >
        Eksporter liste
      </Dialog.Trigger>
      <Dialog ref={dialogExportRef}>
        <Dialog.Block className={classes.exportDialog}>
          <Heading data-size="xs">Eksporter liste</Heading>
          <Paragraph>I hvilket format ønsker du å eksportere listen?</Paragraph>
          <div className={classes.dialogActions}>
            <Button
              variant="secondary"
              onClick={handlePdfExport}
              loading={pdfLoading}
            >
              {!pdfLoading && <FilePdfFillIcon aria-hidden />}
              PDF
            </Button>
            <Button
              variant="secondary"
              onClick={handleCsvExport}
              loading={csvLoading}
            >
              {!csvLoading && <FileCsvFillIcon aria-hidden />}
              CSV
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  );
};
