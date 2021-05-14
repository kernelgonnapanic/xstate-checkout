import { useMachine, useSelector } from "@xstate/react"
import styled from 'styled-components';
import { Cell, Name, Row } from "../atoms/Row";
import ListElement from "../molecules/ListElement";
import checkoutMachine, { Product } from "../state"
import { displayPrice } from "../utils/money";

const List = styled.section`
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(74, 42, 28);
`;

const getSum = (state: typeof checkoutMachine) => 
  state.context.cart.reduce((sum, elem) => sum + elem.price * elem.quantity, 0) 

const CartList = () => {
  const [current, send, service] = useMachine(checkoutMachine);
  const sum = useSelector(service, getSum);
  const cart = current.context.cart;
  return (
    <>
    <List>
    {cart.map((elem: Product) => 
      <ListElement
        key={elem.id} 
        product={elem} 
        onRemove={() => send('REMOVE_PRODUCT', {productId: elem.id})} 
        onAdd={()=> send('ADD_PRODUCT', {productId: elem.id})}
      />)}
    </List>
    <Row>
      <Name>Suma:</Name>
      <Cell>{displayPrice(sum)}</Cell>
    </Row>
    </>
  )
};

export default CartList;