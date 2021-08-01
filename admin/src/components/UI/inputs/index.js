import { TextField, makeStyles, MenuItem, Input } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '48.5%',
  },
}));

export default function Inputs({
  name,
  type,
  variant,
  onChange,
  value,
  label,
  fullWidth,
  className,
  required,
  multiline,
  rows,
  width,
  select,
  SelectProps,
}) {
  const classes = useStyles();
  console.log(SelectProps);
  return (
    <>
      <TextField
        name={name}
        type={type}
        variant={variant}
        label={label}
        value={value}
        fullWidth={fullWidth}
        onChange={onChange}
        className={width && classes.textField}
        required={required}
        multiline={multiline}
        rows={rows}
        select={select}
        SelectProps={SelectProps}
      >
        {select &&
          select.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
}
