import { useSelector, useService } from "@xstate/react";
import React, { useContext } from "react";
import styled from "styled-components";
import { Cell, Name, Row } from "../atoms/Row";
import ListElement from "../molecules/ListElement";
import { displayPrice } from "../utils/money";

import { getDiscounts, getSum } from "../state/selectors";
import { MachineContext } from "../MachineContext";
import { CartItem } from "../state";

const List = styled.section`
  padding-bottom: 10px;
  border-bottom: 2px solid #a0816c;
  height: 200px;
  overflow: scroll;
`;

const Info = styled.section`
  display: flex;
  height: 200px;
  justify-content: center;
`;

const CartList = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const sum = useSelector(machine, getSum);
  const discountValue = useSelector(machine, getDiscounts);
  const discount = useSelector(
    machine,
    (state) => state.context.appliedDiscount
  );
  const { cart } = current.context;

  if (cart.length === 0) {
    return <Info>Twój koszyk jest pusty</Info>;
  }

  return (
    <>
      <List>
        {cart.map((elem: CartItem) => (
          <ListElement
            key={elem.id}
            product={elem}
            onRemove={() => send("REDUCE_QUANTITY", { productId: elem.id })}
            onAdd={() => send("INCREASE_QUANTITY", { productId: elem.id })}
          />
        ))}
      </List>
      <Row>
        <Name>Suma:</Name>
        <Cell>{displayPrice(sum)}</Cell>
      </Row>
      {discount ? (
        <Row>
          <Name>
            Rabat: {discount?.code} (-{discount?.percentage}%)
          </Name>
          <Cell>-{displayPrice(discountValue)}</Cell>
        </Row>
      ) : null}
      <Row>
        <Name>Do zapłaty:</Name>
        <Cell>{displayPrice(sum - discountValue)}</Cell>
      </Row>
    </>
  );
};

export default CartList;
