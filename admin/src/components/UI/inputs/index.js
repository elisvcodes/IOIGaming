import { TextField, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {},
  alignments: {
    margin: '10px 0',
  },
});

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
}) {
  const classes = useStyles();
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
        className={className ? className : classes.alignments}
        required={required}
        multiline={multiline}
        rows={rows}
      />
    </>
  );
}
