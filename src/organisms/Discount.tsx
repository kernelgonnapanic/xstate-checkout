import { useService } from "@xstate/react";
import React, { ChangeEvent, useContext, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../atoms/ErrorMessage";
import { MachineContext } from "../MachineContext";
import { availableDiscounts } from "../types/Discount";

const DiscountSection = styled.div`
  margin-top: 30px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button``;

const Discount = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [, send] = useService(machine);
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState("");

  const handleAddDiscount = () => {
    const formattedCode = code.toUpperCase();
    if (
      code !== "" &&
      !availableDiscounts
        .map((discount) => discount.code)
        .includes(formattedCode)
    ) {
      setError("Kod rabatowy jest nieprawidłowy");
    }
    send("ADD_DISCOUNT", { code: formattedCode });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCode(event.target.value);
  };

  return (
    <DiscountSection>
      <Input
        placeholder="Dodaj kod rabatowy"
        value={code}
        onChange={handleInputChange}
      />
      <Button onClick={handleAddDiscount}>Dodaj kod</Button>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </DiscountSection>
  );
};

export default Discount;
