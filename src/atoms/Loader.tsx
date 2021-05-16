import styled from "styled-components";
import { ReactComponent as Loading } from "../assets/icons/loading.svg";

const AnimationContainer = styled.div`
  animation: spin 1s linear infinite;
  height: 50px;
  width: 50px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return (
    <AnimationContainer>
      <Loading height={50} width={50} />
    </AnimationContainer>
  );
};

export default Loader;
