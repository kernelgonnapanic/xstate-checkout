import { useMachine } from "@xstate/react"
import styled from 'styled-components';
import ListElement from "../molecules/ListElement";
import checkoutMachine, { Product } from "../state"

const List = styled.section`
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(74, 42, 28);
`;

const CartList = () => {
  const [current, send] = useMachine(checkoutMachine);
  const cart = current.context.cart;
  return (
    <List>
    {cart.map((elem: Product) => 
      <ListElement 
        product={elem} 
        onRemove={() => send('REMOVE_PRODUCT', {productId: elem.id})} 
        onAdd={()=> send('ADD_PRODUCT', {productId: elem.id})}
      />)}
    </List>
  )
};

export default CartList;