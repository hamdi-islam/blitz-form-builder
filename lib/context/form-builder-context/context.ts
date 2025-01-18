import React from "react";
import { FormBuilderContextType } from "../../types";

export const FormBuilderContext =
  React.createContext<FormBuilderContextType | null>(null);

export const useFormBuilderContext = () => {
  const context = React.useContext(
    FormBuilderContext
  ) as FormBuilderContextType;
  if (!context) {
    throw new Error(
      "useFormBuilderContext must be used within a FormBuilderProvider"
    );
  }
  return context;
};
