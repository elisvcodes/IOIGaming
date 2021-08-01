import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import Inputs from '../inputs/index';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1.1),
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  return (
    <>
      <form onSubmit={props.onSubmit} className={classes.root}>
        {props.fields &&
          props.fields.map((field, index) => (
            <Inputs
              key={index}
              type={field.type}
              name={field.name}
              label={field.label}
              variant={field.variant}
              // className={field.className}
              value={field.value}
              onChange={field.onChange}
              fullWidth={field.fullWidth}
              required={field.required}
              multiline={field.multiline}
              rows={field.rows}
              width={field.width}
              select={field.select}
              SelectProps={field.SelectProps}
            />
          ))}
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </>
  );
}
