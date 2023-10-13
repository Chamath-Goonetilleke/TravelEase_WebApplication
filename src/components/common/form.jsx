/* 
------------------------------------------------------------------------------
 File: Form.js
 Purpose: This file contains the Form React component, which is used for
 handling form inputs and validation in the TravelEase web application.
 Author: IT20122096
 Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import Joi from "joi-browser";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // Validate the form data against a provided schema.
  validate = (schema, request) => {
    const result = Joi.validate(request, schema);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // Validate an individual input property.
  validateProperty(input) {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const result = Joi.validate(obj, schema);

    if (!result.error) return null;
    return result.error.details[0].message;
  }

  // Handle the change event for input fields.
  handleChange = (e) => {
    let target = {};
    if (e.currentTarget) {
      target = e.currentTarget;
    } else {
      target = e.target;
    }
    const { name, value } = target;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(target);
    if (errorMessage) {
      errors[name] = errorMessage;
    } else {
      delete errors[name];
    }

    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  // Handle the form submission.
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(this.schema, this.state.data);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  // Render an input field with label, name, type, style, and optional properties.
  renderInputField(label, name, type, style, isRequired, disabled = false) {
    const { data, errors } = this.state;
    return (
      <TextField
        required={isRequired}
        error={errors[name] ? true : false}
        label={label}
        name={name}
        type={type}
        onChange={this.handleChange}
        value={data[name]}
        sx={style}
        helperText={errors[name]}
        disabled={disabled}
      />
    );
  }

  // Render a button with label, variant, type, and optional properties.
  renderButton(
    label,
    variant,
    type,
    isLoading = false,
    disabled = this.validate(this.schema, this.state.data),
    onClick
  ) {
    return (
      <React.Fragment>
        <Button
          variant={variant}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="false"
            style={{ marginRight: "1rem" }}
            hidden={!isLoading}
          ></span>
          {label}
        </Button>
      </React.Fragment>
    );
  }

  // Render a dropdown/select field with label, name, options, and optional properties.
  renderDropDown(label, name, options, disabled = false, width) {
    const { data } = this.state;
    return (
      <FormControl disabled={disabled} sx={{ width: width }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          value={data[name]}
          name={name}
          onChange={this.handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default Form;
