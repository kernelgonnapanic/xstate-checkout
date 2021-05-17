import { useService } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import ListHeader from "../atoms/ListHeader";
import NavigationButton from "../atoms/NavigationButton";
import { Cell, Name, Rest, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import Container from "../templates/Container";
import { displayPrice } from "../utils/money";

const CartSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;

const AddressSection = styled.div`
  display: flex;
  flex: 1;
`;

const AddressBox = styled.div`
  border: 3px solid #a0816c;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;

const Subtitle = styled.h2`
  margin: 0;
  color: #a0816c;
  font-size: 16px;
`;

const Payment = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const { cart, address, appliedDiscount } = current.context;

  return (
    <Container>
      <ListHeader>Podsumowanie</ListHeader>
      <Row>
        <CartSection>
          <Subtitle>Koszyk:</Subtitle>
          {cart.map((product) => (
            <Row key={product.id}>
              <Name>{product.name}</Name>
              <Cell>{product.quantity}</Cell>
              <Cell>{displayPrice(product.price)}</Cell>
              <Cell>{displayPrice(product.price * product.quantity)}</Cell>
            </Row>
          ))}
          <Subtitle>Suma:</Subtitle>
          {appliedDiscount ? (
            <Row>
              <Name>Rabat: {appliedDiscount.code} </Name>
              <Cell>-{}</Cell>
            </Row>
          ) : null}
        </CartSection>
        <AddressSection>
          <AddressBox>
            <Subtitle>Adres dostawy:</Subtitle>
            <div>
              {address?.firstName} {address?.lastName}
            </div>
            <div>{address?.street}</div>
            <div>
              {address?.postalCode} {address?.city}
            </div>
          </AddressBox>
        </AddressSection>
      </Row>
      <Row>
        <Rest>
          <NavigationButton to="/summary" onClick={() => send("SUCCESS")}>
            Zapłać kartą **0349{" "}
          </NavigationButton>
        </Rest>
      </Row>
    </Container>
  );
};

export default Payment;
