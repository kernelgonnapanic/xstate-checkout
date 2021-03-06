import { useSelector, useService } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getDiscountedSum } from "../state/selectors";
import { shipmentMethods } from "../types/ShipmentMethod";
import { displayPrice } from "../utils/money";

const DeliveryContainer = styled.section`
  margin-top: 20px;
`;

const Delivery = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const shipment = current.context.shipmentMethod;
  const discountedSum = useSelector(machine, getDiscountedSum);

  return (
    <DeliveryContainer>
      <ListHeader>Dostawa</ListHeader>
      {shipmentMethods.map((method) => (
        <Row key={method.type}>
          <Name>
            <label htmlFor={method.type}>
              <input
                type="radio"
                name="shipment"
                id={method.type}
                value={method.type}
                checked={shipment?.type === method.type}
                onChange={() =>
                  send("CHOOSE_SHIPMENT", { methodType: method.type })
                }
              />
              {method.name}
            </label>
          </Name>
          <Cell>
            {discountedSum < (method.freeFrom ?? Infinity)
              ? displayPrice(method.price)
              : "darmowa"}
          </Cell>
        </Row>
      ))}
    </DeliveryContainer>
  );
};

export default Delivery;
