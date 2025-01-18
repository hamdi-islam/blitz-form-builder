import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import { OptionsType } from "../../types";

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  ...other
}: Pick<ControllerProps, "name"> &
  RadioGroupProps & {
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
          <FormControlLabel
            key={`radio-item-${index}`}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        );
      }
      return (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={option}
        />
      );
    });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <RadioGroup row {...field} {...other}>
            {renderOptions}
          </RadioGroup>
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
