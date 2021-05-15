import { createContext } from "react";
import { Interpreter } from "xstate";
import { CheckoutEvents, CheckoutState } from "./state";

export const MachineContext = createContext<
  Interpreter<
    CheckoutState,
    any,
    CheckoutEvents,
    {
      value: any;
      context: CheckoutState;
    }
  >
>(null!);
