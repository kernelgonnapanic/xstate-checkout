import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getSum } from "../state/selectors";
import { displayPrice } from "../utils/money";

const SumRow = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const sum = useSelector(machine, getSum);

  return (
    <Row>
      <Name>Suma:</Name>
      <Cell>{displayPrice(sum)}</Cell>
    </Row>
  );
};

export default SumRow;
