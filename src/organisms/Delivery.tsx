import styled from 'styled-components';
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Row } from '../atoms/Row';
import { shippmentMethods } from '../state';
import { displayPrice } from '../utils/money';

const DeliveryContainer = styled.section`
  margin-top: 40px;
`;

const Delivery = () => {
  return (
    <DeliveryContainer>
      <ListHeader>Dostawa</ListHeader>
      {
        shippmentMethods.map(method => (
        <Row>
          <Name>{method.name}</Name>
          <Cell>{displayPrice(method.price)}</Cell>
        </Row>
        ))
      }
    </DeliveryContainer>
  );
}

export default Delivery;