import ListHeader from "../atoms/ListHeader";
import CartList from "../organisms/CartList";
import Container from "../templates/Container";

const Cart = () => (
  <Container>
    <ListHeader>Koszyk:</ListHeader>
    <CartList />
  </Container>
)

export default Cart;