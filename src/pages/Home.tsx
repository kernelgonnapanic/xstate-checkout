import * as React from "react";
import { Products } from "../organisms/Products";
import Container from "../templates/Container";
import ListHeader from "../atoms/ListHeader";
import { Header } from "../organisms/Header";

export const Home = (): JSX.Element => {
  return (
    <Container>
      <Header />
      <ListHeader>Produkty:</ListHeader>
      <Products />
    </Container>
  );
};
