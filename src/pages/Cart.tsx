import React from "react";
import ListHeader from "../atoms/ListHeader";
import CartList from "../organisms/CartList";
import Delivery from "../organisms/Delivery";
import Discount from "../organisms/Discount";
import Sum from "../organisms/Sum";
import Container from "../templates/Container";

const Cart = () => (
  <Container>
    <ListHeader>Koszyk:</ListHeader>
    <CartList />
    <Discount />
    <Delivery />
    <Sum />
  </Container>
);

export default Cart;
