import { useSelector, useService } from '@xstate/react';
import { useContext } from 'react';
import styled from 'styled-components';
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Row } from '../atoms/Row';
import { MachineContext } from '../MachineContext';
import { shippmentMethods } from '../state';
import { getDiscountedSum } from '../state/selectors';
import { displayPrice } from '../utils/money';

const DeliveryContainer = styled.section`
  margin-top: 20px;
`;

const Delivery = () => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const shippment = current.context.shippmentMethod;
  const discountedSum = useSelector(machine, getDiscountedSum);

  return (
    <DeliveryContainer>
      <ListHeader>Dostawa</ListHeader>
      {
        shippmentMethods.map((method) => (
          <Row key={method.type}>
            <Name>
              <label>
                <input 
                  type="radio" 
                  name="shippment" 
                  value={method.type} 
                  checked={shippment?.type === method.type} 
                  onChange={() => send('CHOOSE_SHIPPMENT', {methodType: method.type})}
                />
                {method.name}
              </label>          
            </Name>
            <Cell>{ discountedSum < (method.freeFrom ?? Infinity) ? displayPrice(method.price) : 'darmowa'}</Cell>
          </Row>
        ))
      }
    </DeliveryContainer>
  );
};

export default Delivery;
