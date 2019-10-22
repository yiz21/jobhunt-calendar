import React from 'react';
import ChipInput from 'material-ui-chip-input'

export default function ChipInputHelper(props) {

  return (
    <ChipInput
      defaultValue={props.chipSet}
      onChange={(chips) => props.onChange(chips)}
      label="会社の特徴"
    />
  );
}