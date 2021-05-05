import { Product } from "../state";
import styled from 'styled-components';

interface ListElementProps {
  product: Product;
  onRemove: () => void;
  onAdd: () => void;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`

const Name = styled.div`
  flex: 1;
`

const Cell = styled.div`
  flex-basis: 60px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Button = styled.button`
  border-radius: 50%;
  border: 1px solid rgb(74, 42, 28);
  color: rgb(74, 42, 28);
  width: 25px;
  height: 25px;
  background-color: transparent;
  margin: 0 10px;
`

const displayPrice = (price: number) => {
  return `${price / 100}zł`;
}

const ListElement = ({product, onRemove, onAdd}: ListElementProps) => {
  return (
    <Row>
      <Name>{product.name}</Name>
      <Cell>{displayPrice(product.price)}</Cell>
      <Cell>
        <Button onClick={onRemove}>-1</Button>
        {product.quantity}
        <Button onClick={onAdd}>+1</Button>
      </Cell>
      <Cell>{displayPrice(product.price * product.quantity)}</Cell>
    </Row>
  )
};

export default ListElement;