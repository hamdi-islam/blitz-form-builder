import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormBuilderProps } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormBuilderProvider } from "../context";
import { FormHTMLAttributes } from "react";
import { Builder, LinearStepper } from "../components";

// ----------------------------------------------------------------------

function FormBuilder({
  template,
  validationSchema,
  formProps,
  formProviderProps,
  onSubmit,
  stepperProps,
  ...rest
}: FormBuilderProps & FormHTMLAttributes<HTMLFormElement>) {
  const methods = useForm({
    mode: "all",
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    ...formProps,
  });

  type FormData = Record<string, unknown>;

  const handleSubmit: SubmitHandler<FormData> = (data) => onSubmit(data);

  const style = { display: "flex", gap: 10 };

  return (
    <FormProvider {...methods} {...formProviderProps}>
      <FormBuilderProvider>
        {template?.length - 1 > 0 && (
          <LinearStepper {...stepperProps} totalSteps={template?.length} />
        )}
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          style={style}
          {...rest}
        >
          <Builder template={template} methods={methods} />
        </form>
      </FormBuilderProvider>
    </FormProvider>
  );
}

export default FormBuilder;
