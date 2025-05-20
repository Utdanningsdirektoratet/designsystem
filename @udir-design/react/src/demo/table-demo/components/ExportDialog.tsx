import { FileCsvFillIcon, FilePdfFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, Heading, Paragraph } from '@udir-design/react/alpha';
import classes from '../TableDemo.module.css';
import { useRef, useState } from 'react';

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
      <Dialog.Trigger onClick={() => handleExport(dialogExportRef)}>
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
