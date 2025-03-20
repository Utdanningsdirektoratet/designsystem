import React from 'react';
import { Fieldset, Checkbox, Divider } from '../../../alpha';

export function Shoppinglist() {
  return (
    <div>
      <Fieldset>
        <Fieldset.Legend>Handleliste</Fieldset.Legend>
        <Checkbox label="En kilo poteter" value="potet" id="potet" />
        <Checkbox label="To liter Farris" value="farris" id="farris" />
        <Checkbox label="Blomkål" value="blomkol" id="blomkol" defaultChecked />
        <Checkbox label="Pizza" value="pizza" id="pizza" defaultChecked />
        <Checkbox
          label="Tre liter lettmelk"
          value="melk"
          id="melk"
          defaultChecked
        />
        <Divider />
        <Checkbox label="2kg smågodt" value="smagodt" id="smagodt" />
        <Checkbox label="10 poser med Smash" value="smash" id="smash" />
      </Fieldset>
    </div>
  );
}
