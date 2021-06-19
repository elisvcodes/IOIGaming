import { Button } from '@material-ui/core';
import React from 'react';
import Inputs from '../inputs/index';
export default function Form(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        {props.fields.map((field, index) => (
          <Inputs
            key={index}
            type={field.type}
            name={field.name}
            label={field.label}
            variant="outlined"
            className={field.className}
            value={field.value}
            onChange={field.onChange}
            fullWidth={field.fullWidth}
            required={field.required}
          />
        ))}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
}
