import React from "react";
import { useMachine } from "@xstate/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MachineContext } from "./MachineContext";

import Address from "./pages/Address";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";
import { Home } from "./pages/Home";
import checkoutMachine from "./state";

function App(): JSX.Element {
  const [, , service] = useMachine(checkoutMachine);
  return (
    <MachineContext.Provider value={service}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
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
