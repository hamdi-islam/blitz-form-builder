import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

// ----------------------------------------------------------------------

export default function RHFAutocomplete<T>({
  name,
  options,
  label,
  ...other
}: Pick<ControllerProps, "name"> & {
  options: readonly T[];
  label: string;
}) {
  const { control } = useFormContext();

  React.useEffect(() => {}, [options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Autocomplete
            {...field}
            multiple={false}
            disablePortal
            options={options}
            sx={{ width: 300 }}
            size="small"
            value={field.value}
            defaultValue={null}
            onChange={(_event, value) => field.onChange(value)}
            {...other}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
