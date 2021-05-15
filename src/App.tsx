import { useMachine } from "@xstate/react";
import { createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Interpreter } from "xstate";
import Address from "./pages/Address";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";
import checkoutMachine, { CheckoutState, CheckoutEvents } from "./state";

export const MachineContext = createContext<Interpreter<CheckoutState, any, CheckoutEvents, {
  value: any;
  context: CheckoutState;
}>>(null!);

function App() {
  const [state, send, service] = useMachine(checkoutMachine);

  return (
    <MachineContext.Provider value={service}>
      <Router>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/address">
            <Address />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/summary">
            <Summary />
          </Route>
        </Switch>
      </Router>
    </MachineContext.Provider>
   
  );
}

export default App;
