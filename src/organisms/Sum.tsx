import { useSelector } from "@xstate/react";
import { useContext } from "react";
import styled from "styled-components";
import { Cell, Name } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getTotal } from "../state/selectors";
import { displayPrice } from "../utils/money";

const Summary = styled.h2`
  border-bottom: 2px solid #a0816c;
  display: flex;
`;

const Sum = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const total = useSelector(machine, getTotal);

  return (
    <Summary>
      <Name>Suma: </Name>
      <Cell>{displayPrice(total)}</Cell>
    </Summary>
  );
};

export default Sum;
