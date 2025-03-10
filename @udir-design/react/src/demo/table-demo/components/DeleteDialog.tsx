import { TrashFillIcon } from '@navikt/aksel-icons';
import { Button, Dialog, Heading, Tooltip } from '../../../alpha';
import { Student } from '../data/students';
import cl from 'clsx/lite';
import classes from '../TableDemo.module.css';
import { useRef } from 'react';

type DeleteDialogProps = {
  student: Student;
  handleDelete: (id: number) => void;
};

export const DeleteDialog = ({ student, handleDelete }: DeleteDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <Dialog.TriggerContext>
      <Tooltip content="Slett">
        <Dialog.Trigger
          data-color="danger"
          icon
          variant="tertiary"
          aria-label="Slett"
        >
          <TrashFillIcon />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog ref={dialogRef}>
        <Dialog.Block>
          <Heading data-size="xs">
            Er du sikker på at du vil slette {student.name}?
          </Heading>
        </Dialog.Block>
        <Dialog.Block className={cl(classes.dialogActions, classes.justifyEnd)}>
          <Button data-color="danger" onClick={() => handleDelete(student.id)}>
            Slett
          </Button>
          <Button
            variant="secondary"
            onClick={() => dialogRef.current?.close()}
          >
            Avbryt
          </Button>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  );
};
