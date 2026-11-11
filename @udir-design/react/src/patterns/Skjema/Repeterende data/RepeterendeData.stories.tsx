import { Paragraph } from '@digdir/designsystemet-react';
import { useRef } from 'react';
import { PlusIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { FormNavigation } from 'src/components/formNavigation';
import { demoParameters } from 'src/demo/demoParameters';
import { useFormNavigation } from 'src/hooks/useFormNavigation';
import { focusFormField } from 'src/utilities/form/focus';
import {
  AvdelingDialog,
  avdelingNavnId,
  AvdelingRegistrering,
  AvdelingSection,
  DynamiskeStegEksempel,
  Innsending,
  leggTilAvdelingId,
  StepLayout,
  useAvdelinger,
  useInnsending,
  validate,
} from './docs/RepeterendeDataEksempel';
import classes from './repeterendeData.stories.module.css';

const meta = preview.meta({
  title: 'patterns/Skjema/Repeterende data',
  tags: ['alpha', 'udir'],
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      margin: '0 1rem',
      // Default overflow: hidden would break the sticky navigation.
      overflow: 'visible',
    },
  },
  decorators: [withResponsiveDataSize],
});

type StepId = 'foreldre' | 'send';

const headings: Record<StepId, string> = {
  foreldre: 'Registrer foreldre',
  send: 'Send invitasjon',
};

type EgneStegId = 'avdelinger' | 'foreldre' | 'send';

const egneStegHeadings: Record<EgneStegId, string> = {
  avdelinger: 'Registrer avdelinger',
  foreldre: 'Registrer foreldre',
  send: 'Send invitasjon',
};

export const Preview = meta.story({
  render() {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const {
      getStepProps,
      getGroupProps,
      id,
      setId,
      markInvalid,
      markCompleted,
      resetStep,
      hasPrev,
      hasNext,
      prev,
      next,
    } = useFormNavigation<StepId>({
      value: 'foreldre',
      onChange: () => navDialogRef.current?.close(),
    });
    const {
      avdelinger,
      editRequest,
      setEditRequest,
      clearEditRequest,
      onCreate,
      onChange,
    } = useAvdelinger();
    const errors = validate<StepId>(
      avdelinger,
      'foreldre',
      'foreldre',
      leggTilAvdelingId,
    );
    const { submitted, sent, attempt, submit } = useInnsending({
      errors,
      steps: ['foreldre'],
      activeStep: id,
      markInvalid,
      markCompleted,
      resetStep,
    });

    const navigation = (
      <FormNavigation className={classes.navigation}>
        <FormNavigation.Group
          title="Invitasjon av foreldre"
          {...getGroupProps(['foreldre', 'send'])}
        >
          <FormNavigation.Step {...getStepProps('foreldre')}>
            Registrer foreldre
          </FormNavigation.Step>
          <FormNavigation.Step variant="submission" {...getStepProps('send')}>
            Send invitasjon
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );

    return (
      <StepLayout
        navigation={navigation}
        navDialogRef={navDialogRef}
        heading={id && headings[id]}
        hasPrev={hasPrev()}
        hasNext={hasNext()}
        prev={prev}
        next={next}
        actions={
          id === 'foreldre' ? (
            <AvdelingDialog
              title="Legg til avdeling"
              description="Gi avdelingen et navn. Du kan endre det senere."
              triggerLabel="Legg til avdeling"
              triggerVariant={avdelinger.length === 0 ? 'primary' : 'secondary'}
              triggerIcon={<PlusIcon aria-hidden />}
              submitLabel="Opprett avdeling"
              onSubmit={onCreate}
              triggerId={leggTilAvdelingId}
            />
          ) : null
        }
        onSend={id === 'send' && !sent ? submit : undefined}
      >
        {id === 'foreldre' ? (
          <div className={classes.avdelinger}>
            {avdelinger.length === 0 && (
              <Paragraph>
                Du har ikke lagt til noen avdelinger ennå. Start med å legge til
                en avdeling, så kan du registrere foresatte under den.
              </Paragraph>
            )}
            {avdelinger.map((avdeling) => (
              <AvdelingSection
                key={avdeling.id}
                avdeling={avdeling}
                onChange={onChange}
                bulkImport
                request={editRequest}
                onRequestHandled={clearEditRequest}
              />
            ))}
          </div>
        ) : (
          <Innsending
            avdelinger={avdelinger}
            errors={errors}
            attempt={attempt}
            sent={sent}
            submitted={submitted}
            onEdit={(request) => {
              setEditRequest(request);
              setId('foreldre');
            }}
            onRegister={() => setId('foreldre')}
            registerLabel="Registrer foreldre"
            onNavigateToError={(error) => {
              setId(error.step);
              requestAnimationFrame(() => focusFormField(error.focusId));
            }}
          />
        )}
      </StepLayout>
    );
  },
});

export const EgneSteg = meta.story({
  name: 'Repeterende data i egne steg',
  render() {
    const navDialogRef = useRef<HTMLDialogElement>(null);
    const {
      getStepProps,
      getGroupProps,
      id,
      setId,
      markInvalid,
      markCompleted,
      resetStep,
      hasPrev,
      hasNext,
      prev,
      next,
    } = useFormNavigation<EgneStegId>({
      value: 'avdelinger',
      onChange: () => navDialogRef.current?.close(),
    });
    const {
      avdelinger,
      editRequest,
      setEditRequest,
      clearEditRequest,
      onCreate,
      onChange,
      onRemove,
    } = useAvdelinger();
    const errors = validate<EgneStegId>(
      avdelinger,
      'avdelinger',
      'foreldre',
      avdelingNavnId,
    );
    const { submitted, sent, attempt, submit } = useInnsending({
      errors,
      steps: ['avdelinger', 'foreldre'],
      activeStep: id,
      markInvalid,
      markCompleted,
      resetStep,
    });

    const navigation = (
      <FormNavigation className={classes.navigation}>
        <FormNavigation.Group
          title="Invitasjon av foreldre"
          {...getGroupProps(['avdelinger', 'foreldre', 'send'])}
        >
          <FormNavigation.Step {...getStepProps('avdelinger')}>
            Registrer avdelinger
          </FormNavigation.Step>
          <FormNavigation.Step {...getStepProps('foreldre')}>
            Registrer foreldre
          </FormNavigation.Step>
          <FormNavigation.Step variant="submission" {...getStepProps('send')}>
            Send invitasjon
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );

    return (
      <StepLayout
        navigation={navigation}
        navDialogRef={navDialogRef}
        heading={id && egneStegHeadings[id]}
        hasPrev={hasPrev()}
        hasNext={hasNext()}
        prev={prev}
        next={next}
        onSend={id === 'send' && !sent ? submit : undefined}
      >
        {id === 'avdelinger' && (
          <AvdelingRegistrering
            avdelinger={avdelinger}
            onCreate={onCreate}
            onChange={onChange}
            onRemove={onRemove}
            request={editRequest}
            onRequestHandled={clearEditRequest}
          />
        )}
        {id === 'foreldre' && (
          <div className={classes.avdelinger}>
            {avdelinger.length === 0 ? (
              <>
                <Paragraph>
                  Du må registrere minst én avdeling før du kan registrere
                  foresatte.
                </Paragraph>
                <Button variant="secondary" onClick={() => setId('avdelinger')}>
                  Registrer avdelinger
                </Button>
              </>
            ) : (
              avdelinger.map((avdeling) => (
                <AvdelingSection
                  key={avdeling.id}
                  avdeling={avdeling}
                  onChange={onChange}
                  canEditName={false}
                  request={editRequest}
                  onRequestHandled={clearEditRequest}
                />
              ))
            )}
          </div>
        )}
        {id === 'send' && (
          <Innsending
            avdelinger={avdelinger}
            errors={errors}
            attempt={attempt}
            sent={sent}
            submitted={submitted}
            onEdit={(request) => {
              setEditRequest(request);
              setId(request.foresattId ? 'foreldre' : 'avdelinger');
            }}
            onRegister={() => setId('avdelinger')}
            registerLabel="Registrer avdelinger"
            onNavigateToError={(error) => {
              setId(error.step);
              requestAnimationFrame(() => focusFormField(error.focusId));
            }}
          />
        )}
      </StepLayout>
    );
  },
});

export const DynamiskeSteg = meta.story({
  name: 'Repeterende data i dynamiske steg',
  render: () => <DynamiskeStegEksempel />,
});

export const DynamiskeStegIGruppe = meta.story({
  name: 'Repeterende data i dynamiske steg med gruppe',
  render: () => <DynamiskeStegEksempel gruppert />,
});

export const DynamiskeStegIGruppeMedTabell = meta.story({
  name: 'Repeterende data i dynamiske steg med gruppe og tabell',
  render: () => <DynamiskeStegEksempel gruppert visning="tabell" />,
});
