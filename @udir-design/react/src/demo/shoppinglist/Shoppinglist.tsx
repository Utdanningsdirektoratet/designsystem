import React from 'react';
import { Fieldset, Checkbox, Divider } from '../../index';

export function Shoppinglist() {
  return (
    <div>
      <Fieldset>
        <Fieldset.Legend>Handleliste</Fieldset.Legend>
        <Checkbox label="En kilo poteter" value="epost" />
        <Checkbox label="To liter Farris" value="telefon" />
        <Checkbox label="Blomkål" value="sms" defaultChecked />
        <Checkbox label="Pizza" value="sms" defaultChecked />
        <Checkbox label="Tre liter lettmelk" value="sms" defaultChecked />
        <Divider />
        <Checkbox label="2kg smågodt" value="sms" />
        <Checkbox label="10 poser med Smash" value="sms" />
      </Fieldset>
    </div>
  );
}
