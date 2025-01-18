import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import TextField, { TextFieldProps } from "@mui/material/TextField";

// ----------------------------------------------------------------------

export default function RHFTextField({
  name,
  helperText,
  type,
  ...other
}: Pick<ControllerProps, "name"> & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          size="small"
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
