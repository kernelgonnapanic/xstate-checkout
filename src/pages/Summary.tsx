import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../atoms/Loader";
import Container from "../templates/Container";
import { ReactComponent as Tick } from "../assets/icons/tick.svg";

const SuccessMessage = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const Summary = (): JSX.Element => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(true);
    }, Math.random() * (3000 - 500) + 500);
  }, []);

  return (
    <Container>
      <SuccessMessage>
        {success ? (
          <>
            <Tick height={50} />
            <h2>Płatność zakończona pomyślnie.</h2>
            <h4>
              Dziękujęmy za zakupy w naszym sklepie. Numer Twojego zamówienia to
              #{Math.floor(Math.random() * (2349284 - 1049224) + 1049224)}
            </h4>
          </>
        ) : (
          <Loader />
        )}
      </SuccessMessage>
    </Container>
  );
};

export default Summary;
