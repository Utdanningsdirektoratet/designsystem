import {
  Card,
  Fieldset,
  Heading,
  Radio,
  Switch,
  Tabs,
  ValidationMessage,
} from '../../../alpha';
import cl from 'clsx/lite';
import classes from './Settings.module.css';
import {
  BellDotFillIcon,
  CogFillIcon,
  PadlockLockedFillIcon,
} from '@navikt/aksel-icons';

export const Settings = () => {
  return (
    <Tabs.Panel value="tab2" className={classes.settings}>
      <Card className={classes.card} variant="tinted" data-color="support1">
        <span className={classes.flex}>
          <CogFillIcon fontSize="1.5rem" />
          <Heading>Generelle innstillinger</Heading>
        </span>
        <Switch
          description="Et mørkere grensesnitt for å spare øynene."
          label="Mørk modus"
          value="dark-mode"
        />
        <Switch
          description="Bruk automatisk oppdateringer for å holde systemet oppdatert."
          label="Automatiske oppdateringer"
          value="auto-updates"
          checked
        />
      </Card>
      <Card className={classes.card} variant="tinted" data-color="support1">
        <span className={classes.flex}>
          <PadlockLockedFillIcon fontSize="1.5rem" />
          <Heading>Personvern</Heading>
        </span>
        <Fieldset>
          <Fieldset.Legend>Hvem kan se profilen din?</Fieldset.Legend>
          <Fieldset.Description>
            Velg hvem som har tilgang til å se profilen din.
          </Fieldset.Description>
          <Radio label="Alle" name="privacy" value="public" defaultChecked />
          <Radio
            label="Kun venner"
            name="privacy"
            value="friends"
            description="Bare personer du har lagt til kan se profilen din."
          />
          <Radio label="Kun meg" name="privacy" value="private" />
          <ValidationMessage hidden id="validation-privacy" />
        </Fieldset>
      </Card>
      <Card
        className={cl(classes.card3, classes.card)}
        variant="tinted"
        data-color="support1"
      >
        <span className={classes.flex}>
          <BellDotFillIcon fontSize="1.5rem" />
          <Heading>Varsler</Heading>
        </span>
        <Switch
          description="Spill av lyd når et varsel mottas."
          label="Lydvarsler"
          value="sound-notifications"
        />
        <Switch
          description="Vis popup-varsler på skjermen."
          label="Popup-varsler"
          value="popup-notifications"
        />
        <Switch
          description="Tillat e-postvarsler for viktige oppdateringer."
          label="E-postvarsler"
          value="email-notifications"
        />
      </Card>
    </Tabs.Panel>
  );
};
