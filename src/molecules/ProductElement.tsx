import { useService } from "@xstate/react";
import styled from "styled-components";
import { useContext } from "react";
import { Product } from "../types/Product";
import addToCartImage from "../assets/icons/add-to-cart.png";
import removeFromCartImage from "../assets/icons/remove-from-cart.png";
import { MachineContext } from "../MachineContext";
import Image from "../atoms/Image";
import { displayPrice } from "../utils/money";

type ProductElementProps = {
  product: Product;
};

export const ProductElement = ({
  product,
}: ProductElementProps): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const { cart } = current.context;

  const addToCart = () => {
    send("ADD_PRODUCT", { productId: product.id });
  };

  const removeFromCart = () => {
    send("REMOVE_PRODUCT", { productId: product.id });
  };

  const inCart = cart.some((item) => item.id === product.id);

  return (
    <MainContainer>
      <NameContainer>
        {product.name} - {product.manufacturer}
      </NameContainer>
      <PriceContainer>{displayPrice(product.price)}</PriceContainer>
      {inCart ? (
        <Button onClick={removeFromCart}>
          <Image alt="removeFromCart" src={removeFromCartImage} />
        </Button>
      ) : (
        <Button onClick={addToCart}>
          <Image alt="addToCart" src={addToCartImage} />
        </Button>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const NameContainer = styled.div`
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin-right: 20px;
`;

const Button = styled.div``;
