import {
  AutocompleteProps,
  CheckboxProps,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  RatingOwnProps,
  SelectProps,
  StepperProps,
  SwitchProps,
  TextFieldProps,
} from "@mui/material";
import { DateFieldProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ReactNode } from "react";
import {
  FormProviderProps,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import * as Yup from "yup";

export enum FieldTypesEnum {
  "textfield" = "textfield",
  "date" = "date",
  "select" = "select",
  "radio" = "radio",
  "checkbox" = "checkbox",
  "autocomplete" = "autocomplete",
  "rating" = "rating",
  "switch" = "switch",
  "render" = "render",
}

interface Standard {
  label?: string;
  name: string;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
}

export interface TextFieldType extends Standard {
  type: "textfield";
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => TextFieldProps | void;
}

export interface DateType extends Standard {
  type: "date";
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => DateFieldProps<Moment, boolean> | void;
}

export type OptionsType = Array<
  string | number | { label: string; value: string | number }
>;

export interface SelectType extends Standard {
  type: "select";
  options: OptionsType;
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => SelectProps | void;
}

export interface RadioType extends Standard {
  type: "radio";
  options: OptionsType;
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => RadioGroupProps | void;
}

export interface CheckboxType extends Standard {
  type: "checkbox";
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => CheckboxProps | void;
}

export interface AutocompleteType extends Standard {
  type: "autocomplete";
  options: Array<string | number | { label: string; value: string | number }>;
  fieldProps?: <T>(
    props: UseFormReturn<Record<string, unknown>>
  ) => AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  > | void;
}

export interface RatingType extends Standard {
  type: "rating";
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => RatingOwnProps | void;
}

export interface SwitchType extends Standard {
  type: "switch";
  fieldProps?: (
    props: UseFormReturn<Record<string, unknown>>
  ) => SwitchProps | void;
}

export interface RenderType extends Pick<Standard, "name"> {
  type: "render";
  RenderComponent: (props: UseFormReturn<Record<string, unknown>>) => ReactNode;
}

export type FieldTypes =
  | TextFieldType
  | DateType
  | SelectType
  | RadioType
  | CheckboxType
  | AutocompleteType
  | RatingType
  | SwitchType
  | RenderType;

export interface Template {
  config: Array<FieldTypes>;
}

type FormData = Record<string, unknown>;

export interface FormBuilderProps {
  template: Template[];
  validationSchema?: Yup.ObjectSchema<Yup.AnyObject>;
  formProps?: UseFormProps;
  formProviderProps?: Partial<FormProviderProps>;
  onSubmit: SubmitHandler<FormData>;
  stepperProps?: Pick<StepperType, "titles">;
}

export interface StepperType extends StepperProps {
  titles?: string[];
  totalSteps: number;
}
