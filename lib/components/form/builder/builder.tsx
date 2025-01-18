import { ReactNode } from "react";
import { Template } from "../../../types";

import { renderFields } from "../../../utils";
import { useFormBuilderContext } from "../../../context";
import { UseFormReturn } from "react-hook-form";

function Builder({
  template,
  methods,
}: {
  template: Template[];
  methods: UseFormReturn<Record<string, unknown>>;
}): ReactNode {
  const {
    state: { step },
  } = useFormBuilderContext();

  const fields = renderFields({
    config: template[step].config,
    methods: methods,
  });

  return <>{fields}</>;
}

export default Builder;
