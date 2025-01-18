import { Dispatch } from "react";

export enum ActionEnums {
  CHANGE_STEP = "CHANGE_STEP",
  AOTHER_TYPE = "AOTHER_TYPE",
}

type ChangeStep = { type: ActionEnums.CHANGE_STEP; payload: number };
type AnotherType = { type: ActionEnums.AOTHER_TYPE; payload: string };

export type ReducerAction = ChangeStep | AnotherType;

export interface StateProps {
  step: number;
}

export type FormBuilderContextType = {
  state: StateProps;
  dispatch: Dispatch<ReducerAction>;
};
