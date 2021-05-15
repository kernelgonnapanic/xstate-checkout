import React from "react";
import styled from "styled-components";

const MainContainer = styled.main`
  max-width: 800px;
  margin: 100px auto;
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 20px;
`;

const Container = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <MainContainer>{children}</MainContainer>;

export default Container;
