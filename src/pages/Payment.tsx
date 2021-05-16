import { useService } from "@xstate/react";
import * as React from "react";
import NavigationButton from "../atoms/NavigationButton";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import Container from "../templates/Container";
import { displayPrice } from "../utils/money";

const Payment = (): JSX.Element => {
  const machine = React.useContext(MachineContext);
  const [current, send] = useService(machine);
  const { cart, address, appliedDiscount } = current.context;

  return (
    <Container>
      Adres:
      {address?.firstName}
      {address?.lastName}
      {address?.street}
      {address?.postalCode}
      {address?.city}
      Koszyk:
      {cart.map((product) => (
        <Row>
          <Name>{product.name}</Name>
          <Cell>{product.quantity}</Cell>
          <Cell>{displayPrice(product.price)}</Cell>
          <Cell>{displayPrice(product.price * product.quantity)}</Cell>
        </Row>
      ))}
      Suma:
      {appliedDiscount ? (
        <Row>
          <Name>Rabat: {appliedDiscount.code}</Name>
          <Cell>-{}</Cell>
        </Row>
      ) : null}
      <NavigationButton to="/summary" onClick={() => send("SUCCESS")}>
        Zapłać kartą **0349{" "}
      </NavigationButton>
    </Container>
  );
};

export default Payment;
