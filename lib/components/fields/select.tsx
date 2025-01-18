import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { OptionsType } from "../../types";

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  options = [],
  ...other
}: Pick<ControllerProps, "name"> &
  SelectProps & {
    options: OptionsType;
  }) {
  const { control } = useFormContext();

  const renderOptions =
    options &&
    options?.map((option, index) => {
      if (
        typeof option === "object" &&
        "label" in option &&
        "value" in option
      ) {
        return (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        );
      }
      return (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      );
    });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id="test-select-label">{other?.label}</InputLabel>
          <Select
            {...field}
            size="small"
            fullWidth
            error={!!error}
            value={field.value ? field.value : []}
            {...other}
          >
            {renderOptions}
          </Select>
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
