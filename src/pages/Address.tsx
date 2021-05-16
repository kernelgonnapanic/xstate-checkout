import ListHeader from "../atoms/ListHeader";
import AddressForm from "../organisms/AddressForm";
import Container from "../templates/Container";

const Address = (): JSX.Element => {
  return (
    <Container>
      <ListHeader>Twój adres:</ListHeader>
      <AddressForm />
    </Container>
  );
};

export default Address;
