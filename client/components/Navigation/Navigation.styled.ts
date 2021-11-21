import styled from "styled-components";

export const Root = styled.div`
  display: flex;
`;

export const RootAvatar = styled.div<{ open: boolean }>`
  border-radius: 50%;
  padding: 2px;
  border: ${({ open }) => (open ? "1px solid black" : "1px solid transparent")};
`;
