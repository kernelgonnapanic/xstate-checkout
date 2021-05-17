import { useService } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import ListHeader from "../atoms/ListHeader";
import NavigationButton from "../atoms/NavigationButton";
import { Cell, Name, Rest, Row } from "../atoms/Row";
import { Subtitle } from "../atoms/Subtitle";
import { MachineContext } from "../MachineContext";
import AddressDisplay from "../molecules/AddressDisplay";
import DeliveryRow from "../molecules/DeliveryRow";
import DiscountRow from "../molecules/DiscountRow";
import SumRow from "../molecules/SumRow";
import TotalRow from "../molecules/TotalRow";
import Container from "../templates/Container";
import { displayPrice } from "../utils/money";

const CartSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding-right: 20px;
`;

const Payment = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const { cart, address } = current.context;

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
          <SumRow />
          <DiscountRow />
          <DeliveryRow />
          <TotalRow />
        </CartSection>
        <AddressDisplay address={address} />
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
