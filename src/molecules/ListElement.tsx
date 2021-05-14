import { Product } from "../state";
import styled from 'styled-components';
import { displayPrice } from "../utils/money";
import { Cell, Name, Row } from "../atoms/Row";

interface ListElementProps {
  product: Product;
  onRemove: () => void;
  onAdd: () => void;
}

const Button = styled.button`
  border-radius: 50%;
  border: 1px solid rgb(74, 42, 28);
  color: rgb(74, 42, 28);
  width: 25px;
  height: 25px;
  background-color: transparent;
  margin: 0 10px;

  &:disabled {
    color: gray;
    border-color: gray;
  }
`

const ListElement = ({product, onRemove, onAdd}: ListElementProps) => {
  return (
    <Row>
      <Name>{product.name}</Name>
      <Cell>{displayPrice(product.price)}</Cell>
      <Cell>
        <Button disabled={product.quantity < 1} onClick={onRemove}>-1</Button>
        {product.quantity}
        <Button onClick={onAdd}>+1</Button>
      </Cell>
      <Cell>{displayPrice(product.price * product.quantity)}</Cell>
    </Row>
  )
};

export default ListElement;