import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { SwitchProps } from "@mui/material";

// ----------------------------------------------------------------------

export default function RHFSwitch({
  name,
  ...other
}: Pick<ControllerProps, "name"> & SwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Switch {...field} size="medium" {...other} />
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
