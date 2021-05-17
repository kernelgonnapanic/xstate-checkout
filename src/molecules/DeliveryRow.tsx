import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getDelivery, getDiscountedSum } from "../state/selectors";
import { displayPrice } from "../utils/money";

const DeliveryRow = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const delivery = useSelector(machine, getDelivery);
  const discountedSum = useSelector(machine, getDiscountedSum);
  return (
    <>
      {delivery ? (
        <Row>
          <Name>{delivery.name}</Name>
          <Cell>
            {discountedSum < (delivery.freeFrom ?? Infinity)
              ? displayPrice(delivery.price)
              : "darmowa"}
          </Cell>
        </Row>
      ) : null}
    </>
  );
};

export default DeliveryRow;
