import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Address from "./pages/Address";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import Payment from "./pages/Payment";
import Summary from "./pages/Summary";

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/address">
        <Address />
      </Route>
      <Route path="/delivery">
        <Delivery />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route path="/summary">
        <Summary />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
