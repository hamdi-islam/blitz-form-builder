import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { CheckboxType } from "../../types";

// ----------------------------------------------------------------------

export default function RHFCheckbox({
  name,
  ...other
}: Pick<ControllerProps, "name"> &
  Pick<CheckboxType, "label"> &
  CheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id="test-checkbox-label">{other?.label}</InputLabel>
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                onChange={(_event, checked) => field.onChange(checked)}
                {...other}
              />
            }
            label={field.name}
          />

          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
