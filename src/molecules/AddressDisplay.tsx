import styled from "styled-components";
import { Subtitle } from "../atoms/Subtitle";
import { Address } from "../types/Address";

interface AddressDisplayProps {
  address: Address | null;
}

const AddressSection = styled.div`
  display: flex;
  flex: 1;
`;

const AddressBox = styled.div`
  border: 3px solid #a0816c;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;

const AddressDisplay = ({ address }: AddressDisplayProps): JSX.Element => {
  return (
    <AddressSection>
      <AddressBox>
        <Subtitle>Adres dostawy:</Subtitle>
        <div>
          {address?.firstName} {address?.lastName}
        </div>
        <div>{address?.street}</div>
        <div>
          {address?.postalCode} {address?.city}
        </div>
      </AddressBox>
    </AddressSection>
  );
};

export default AddressDisplay;
