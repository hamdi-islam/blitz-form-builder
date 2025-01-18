import moment, { Moment } from "moment";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";
// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// --------------------------------------------------------------------

export default function RHFDatePicker({
  name,
  helperText,
  ...other
}: Pick<ControllerProps, "name"> &
  Pick<TextFieldProps, "helperText"> &
  DatePickerProps<Moment>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl error={!!error} fullWidth>
            <DatePicker
              value={field.value ? moment(field.value) : null}
              onChange={(value) =>
                field.onChange(value ? moment(value).toISOString() : null)
              }
              slots={{
                textField: (props) => (
                  <TextField
                    {...props}
                    size="small"
                    fullWidth
                    name={field.name}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                    inputRef={field.ref}
                  />
                ),
              }}
              {...other}
            />
            {error?.message && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        </LocalizationProvider>
      )}
    />
  );
}
