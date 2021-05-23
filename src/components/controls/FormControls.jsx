import React from "react";
import SelectSearch from "react-select";
import { Checkbox, FormControl, FormControlLabel, Select, TextField, InputLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { Controller } from 'react-hook-form'

export const TextInput = ({ name, label, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <TextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          label={label}
          variant="outlined"
          fullWidth={true}
          {...props}
        />
      )}
    />
  );
};

export const CheckboxInput = ({ name, label, control }) => {
  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          name={name}
          render={({ onChange, value }) => (
            <Checkbox
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
            />
          )}
        />
      }
      label={label}
    />
  );
};

export const SelectInput = ({ name, label, control, children, ...props }) => {
  const labelId = `${name}-label`;
  return (
    <FormControl fullWidth variant="outlined" {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Select
            labelId={labelId}
            label={label}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          >
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};

export const RadioGroupInput = ({ name, label, control, options }) => {
  const labelId = `${name}-label`;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => (
          <RadioGroup
            labelId={labelId}
            // label={label}
            onChange={onChange}
            value={value}
          >
            {options.map(({ label, value }) => (
              <FormControlLabel
                control={<Radio />}
                value={value}
                label={label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export const SearcheableSelect = ({
  name,
  label,
  control,
  children,
  options,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl fullWidth variant="OutlinedInput">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={<SelectSearch placeholder="Select ....." options={options}
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
        />}
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <SelectSearch
            labelId={labelId}
            label={label}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            options={options}
            variant="OutlinedInput"
          >
            {children}
          </SelectSearch>
        )}
      />
    </FormControl>
  );
};


export const TextAutoComplete = ({ name, label, control, options, ...props }) => {

  return (
    <Controller
      control={control}
      name={name}
      onChange={([, data]) => data}
      render={({ onChange, onBlur, value }) => (
        <Autocomplete
          id="country-select-demo"
          options={options}
          autoHighlight
          onChange={(e, data) => onChange(data)}
          getOptionLabel={(option) => option.label}

          renderOption={(option) => (
            <React.Fragment>
              {option.label} ({option.code}) +{option.phone}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    />
  )
};

export const ControlledAutocomplete = ({ options = [], label, getOptionLabel, onChange: ignored, control, name, renderOption }) => {
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={(params) => <TextField {...params} label={label} margin="normal" variant="outlined" />}
          onChange={(e, data) => onChange(data)}

          {...props}
        />
      )}
      onChange={([, data]) => data}
      name={name}
      control={control}
    />
  );
}
