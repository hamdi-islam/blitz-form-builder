import { ReactNode } from "react";
import { FieldTypes, FieldTypesEnum, Template } from "../types";
import {
  AutocompleteField,
  CheckboxField,
  DatePickerField,
  RadioField,
  RatingField,
  SelectField,
  SwitchField,
  TextField,
} from "../components/fields";
import { FormControl, FormLabel } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

const mapConfigToField = (
  field: FieldTypes,
  methods: UseFormReturn<Record<string, unknown>>
): ReactNode => {
  switch (field.type) {
    case FieldTypesEnum.textfield:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <TextField
            name={field.name}
            type="text"
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.select:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <SelectField
            name={field.name}
            options={field.options}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.date:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <DatePickerField
            name={field.name}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.radio:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <RadioField
            name={field.name}
            options={field.options ?? []}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.autocomplete:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <AutocompleteField
            label={field?.label ?? ""}
            key={field.name}
            name={field.name}
            options={[...field.options]}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.checkbox:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <CheckboxField
            name={field.name}
            key={field.name}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.rating:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <RatingField
            name={field.name}
            key={field.name}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.switch:
      return (
        <FormControl key={field.name} {...field.formControlProps}>
          <FormLabel {...field.formLabelProps}>{field.label}</FormLabel>
          <SwitchField
            name={field.name}
            key={field.name}
            {...(field?.fieldProps && field.fieldProps(methods))}
          />
        </FormControl>
      );

    case FieldTypesEnum.render:
      return <field.RenderComponent key={field.name} {...methods} />;
    default:
      throw Error(`field type ${field.type} is unknown`);
  }
};

export const renderFields = ({
  config,
  methods,
}: Template & { methods: UseFormReturn<Record<string, unknown>> }): ReactNode =>
  config.map((field) => mapConfigToField(field, methods));
