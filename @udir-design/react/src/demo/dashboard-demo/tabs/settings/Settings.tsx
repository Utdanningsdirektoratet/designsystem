import {
  Card,
  Fieldset,
  Heading,
  Radio,
  Switch,
  ValidationMessage,
} from '@udir-design/react/alpha';
import cl from 'clsx/lite';
import classes from './Settings.module.css';
import { TabStructure } from '../../components/tab-structure/TabStructure';

export const Settings = ({
  setColorMode,
}: {
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}) => {
  return (
    <TabStructure tab="settings">
      <div className={classes.settings}>
        <Card
          className={cl(classes.card1, classes.card)}
          variant="tinted"
          data-color="support1"
        >
          <Heading>Generelle innstillinger</Heading>
          <Switch
            id="dark-mode"
            description="Et mørkere grensesnitt for å spare øynene."
            label="Mørk modus"
            onChange={(e) => {
              setColorMode(e.target.checked ? 'dark' : 'light');
            }}
          />

          <Switch
            id="auto-updates"
            description="Bruk automatisk oppdateringer for å holde systemet oppdatert."
            label="Automatiske oppdateringer"
            value="auto-updates"
            checked
          />
        </Card>
        <Card className={classes.card} variant="tinted" data-color="support1">
          <Heading>Personvern</Heading>
          <Fieldset>
            <Fieldset.Legend>Hvem kan se profilen din?</Fieldset.Legend>
            <Fieldset.Description>
              Velg hvem som har tilgang til å se profilen din.
            </Fieldset.Description>
            <Radio
              id="privacy-public"
              label="Alle"
              name="privacy"
              value="public"
              defaultChecked
            />
            <Radio
              id="privacy-friends"
              label="Kun venner"
              name="privacy"
              value="friends"
              description="Bare personer du har lagt til kan se profilen din."
            />
            <Radio
              id="privacy-private"
              label="Kun meg"
              name="privacy"
              value="private"
            />
            <ValidationMessage hidden id="validation-privacy" />
          </Fieldset>
        </Card>
        <Card className={classes.card} variant="tinted" data-color="support1">
          <Heading>Varsler</Heading>
          <Switch
            id="sound-notifications"
            description="Spill av lyd når et varsel mottas."
            label="Lydvarsler"
            value="sound-notifications"
          />
          <Switch
            id="popup-notifications"
            description="Vis popup-varsler på skjermen."
            label="Popup-varsler"
            value="popup-notifications"
          />
          <Switch
            id="email-notifications"
            description="Tillat e-postvarsler for viktige oppdateringer."
            label="E-postvarsler"
            value="email-notifications"
          />
        </Card>
      </div>
    </TabStructure>
  );
};
