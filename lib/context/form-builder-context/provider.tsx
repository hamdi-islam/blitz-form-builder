import React from "react";
import { FormBuilderContext } from "./context";
import { ActionEnums, ReducerAction, StateProps } from "../../types";

const defaultState: StateProps = {
  step: 0,
};

const reducer = (state: StateProps, action: ReducerAction): StateProps => {
  switch (action.type) {
    case ActionEnums.CHANGE_STEP:
      return { ...state, step: action.payload as number };

    default:
      return state;
  }
};

function FormBuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  const values = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <FormBuilderContext.Provider value={values}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export default FormBuilderProvider;
