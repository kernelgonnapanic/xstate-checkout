import * as React from "react";
import { useContext } from "react";
import { useService } from "@xstate/react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ShoppingCartImage from "../assets/icons/shopping-cart.png";
import { MachineContext } from "../MachineContext";
import Image from "../atoms/Image";

export const Header = () => {
  const history = useHistory();

  const machine = useContext(MachineContext);
  const [current] = useService(machine);
  const { cart } = current.context;
  return (
    <Container onClick={() => history.push("/cart")}>
      <CartImage src={ShoppingCartImage} />
      <span>{cart.length}</span>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const CartImage = styled(Image)`
  margin-right: 10px;
`;
