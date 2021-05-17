import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

export const Name = styled.div`
  flex: 1;
  display: flex;
`;

export const Cell = styled.div`
  flex-basis: 90px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Rest = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
`;
