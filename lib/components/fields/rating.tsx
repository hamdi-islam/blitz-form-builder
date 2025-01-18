import { useFormContext, Controller, ControllerProps } from "react-hook-form";

// @mui
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Rating, { RatingOwnProps } from "@mui/material/Rating";

// ----------------------------------------------------------------------

export default function RHFRating({
  name,
  ...other
}: Pick<ControllerProps, "name"> & RatingOwnProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Rating
            {...field}
            size="medium"
            onChange={(_event, value) => field.onChange(Number(value))}
            {...other}
          />
          {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
