import { useService } from "@xstate/react";
import { useContext } from "react";
import { MachineContext } from "../MachineContext";
import ListHeader from "../atoms/ListHeader";
import NavigationButton from "../atoms/NavigationButton";
import { Cell, Name, Row } from "../atoms/Row";
import CartList from "../organisms/CartList";
import Delivery from "../organisms/Delivery";
import Discount from "../organisms/Discount";
import Sum from "../organisms/Sum";
import Container from "../templates/Container";

const Cart = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [, send] = useService(machine);

  const handleNextNavigation = () => {
    send("CART_COMPLETED");
  };

  return (
    <Container>
      <ListHeader>Koszyk:</ListHeader>
      <CartList />
      <Discount />
      <Delivery />
      <Sum />
      <Row>
        <Name>
          <NavigationButton to="/">{"<<"} Lista produktów </NavigationButton>
        </Name>
        <Cell>
          <NavigationButton to="/address" onClick={handleNextNavigation}>
            Adres {">>"}
          </NavigationButton>
        </Cell>
      </Row>
    </Container>
  );
};

export default Cart;
