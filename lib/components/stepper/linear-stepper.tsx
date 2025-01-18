import React from "react";
import { useFormBuilderContext } from "../../context";
import { Button, Stack, Step, StepButton, Stepper } from "@mui/material";
import { ActionEnums, StepperType } from "../../types";

function LinearStepper({ titles, totalSteps }: StepperType) {
  const { state, dispatch } = useFormBuilderContext();

  const currentStep = state.step;

  console.log(titles);

  const steps = React.useMemo(() => {
    if (titles && titles?.length) {
      return titles;
    }
    return Array.from(Array(totalSteps)).map(() => "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(steps);

  const isCompleted = React.useMemo(
    () => currentStep === totalSteps - 1,
    [currentStep, totalSteps]
  );

  const handleStepChange = React.useCallback(
    (index: number) =>
      dispatch({ type: ActionEnums.CHANGE_STEP, payload: index }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Stack direction="row" gap={2} justifyContent="flex-end" mb={5}>
      <Stepper nonLinear activeStep={currentStep}>
        {steps.map((label, index) => (
          <Step key={`${label}-${index}`} completed={isCompleted}>
            <StepButton color="inherit" onClick={() => handleStepChange(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Button
        disabled={isCompleted}
        onClick={() => handleStepChange(currentStep + 1)}
      >
        Next
      </Button>
      <Button
        disabled={currentStep <= 0}
        onClick={() => handleStepChange(currentStep - 1)}
      >
        Previous
      </Button>
    </Stack>
  );
}

export default LinearStepper;
