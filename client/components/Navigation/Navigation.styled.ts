import styled from "styled-components";

export const Root = styled.div`
  display: flex;
`;

export const RootAvatar = styled.div<{ open: boolean }>`
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  position: relative;
  border: ${({ open }) => (open ? "1px solid black" : "1px solid transparent")};
`;

export const List = styled.ul`
  width: 100%;
  height: 100%;
`;

export const Item = styled.li`
  padding: 8px 16px;
  display: flex;
  z-index: 5;
  cursor: pointer;
  justify-content: flex-start;

  a {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;
