import { useService } from "@xstate/react";
import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import { MachineContext } from "../App";
import {availableDiscounts} from '../state';

const DiscountSection = styled.div`
  margin-top: 30px;
`;

const Input = styled.input`
  margin-right: 10px; 
`;

const Button = styled.button`

`;

const ErrorMessage = styled.div`
  color: #B22222;
  padding: 5px 10px;
  border: 1px solid #B22222;
  margin: 10px 0;
  border-radius: 3px;
  background-color: #fce8e8;
`

const Discount = () => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const [error, setError] = useState<string|null>(null);

  const [code, setCode] = useState('');

  const handleAddDiscount = () => {
    if (code !== '' && !availableDiscounts.map(discount => discount.code).includes(code)) {
      setError('Kod rabatowy jest nieprawidłowy');
    }
    send('ADD_DISCOUNT', {code})
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCode(event.target.value);
  }

  return (
    <DiscountSection>
      <Input placeholder="Dodaj kod rabatowy" value={code} onChange={handleInputChange} />
      <Button onClick={handleAddDiscount}>Dodaj kod</Button>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </DiscountSection>
  )
};

export default Discount;