import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getDiscounts } from "../state/selectors";
import { displayPrice } from "../utils/money";

const DiscountRow = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const discountValue = useSelector(machine, getDiscounts);
  const discount = useSelector(
    machine,
    (state) => state.context.appliedDiscount
  );
  return (
    <>
      {discount ? (
        <Row>
          <Name>
            Rabat: {discount?.code} (-{discount?.percentage}%)
          </Name>
          <Cell>-{displayPrice(discountValue)}</Cell>
        </Row>
      ) : null}
    </>
  );
};

export default DiscountRow;
