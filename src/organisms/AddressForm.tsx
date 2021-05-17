import { useService } from "@xstate/react";
import { useContext, useState } from "react";
import styled from "styled-components";
import ErrorMessage from "../atoms/ErrorMessage";
import Input from "../atoms/Input";
import NavigationButton from "../atoms/NavigationButton";
import { Name, Rest, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AddressForm = (): JSX.Element => {
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const {
    context: { address },
  } = current;
  const [firstName, setFirstName] = useState(address?.firstName ?? "");
  const [lastName, setLastName] = useState(address?.lastName ?? "");
  const [street, setStreet] = useState(address?.street ?? "");
  const [postalCode, setPostalCode] = useState(address?.postalCode ?? "");
  const [city, setCity] = useState(address?.city ?? "");
  const [error, setError] = useState<string | false>(false);

  const handlePreviousClick = () => {
    send("PREV");
  };

  const handleNextClick = () => {
    if (!isValid()) {
      setError("Proszę uzupełnić formularz adresu");
      return;
    }
    send("ADDRESS_COMPLETED", {
      address: { firstName, lastName, street, postalCode, city },
    });
  };

  const isValid = () => {
    const isFilled =
      firstName.length > 0 &&
      lastName.length > 0 &&
      street.length > 0 &&
      postalCode.length > 0 &&
      city.length > 0;

    return isFilled;
  };

  return (
    <Form>
      <Input
        value={firstName}
        placeholder="Imię"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <Input
        value={lastName}
        placeholder="Nazwisko"
        onChange={(event) => setLastName(event.target.value)}
      />
      <Input
        value={street}
        placeholder="Ulica"
        onChange={(event) => setStreet(event.target.value)}
      />
      <Input
        value={postalCode}
        placeholder="Kod pocztowy"
        onChange={(event) => setPostalCode(event.target.value)}
      />
      <Input
        value={city}
        placeholder="Miasto"
        onChange={(event) => setCity(event.target.value)}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Row>
        <Name>
          <NavigationButton to="/cart" onClick={handlePreviousClick}>
            {"<<"} Koszyk{" "}
          </NavigationButton>
        </Name>
        <Rest>
          <NavigationButton to="/payment" onClick={handleNextClick}>
            Płatność {">>"}
          </NavigationButton>
        </Rest>
      </Row>
    </Form>
  );
};

export default AddressForm;
