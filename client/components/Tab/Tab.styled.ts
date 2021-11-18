import styled from 'styled-components';

export const Tab = styled.div`
  display: flex;
  cursor: pointer;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const TitleTab = styled.h1``;

export const BottomBorder = styled.div<{ active: boolean }>`
  background-color: #1967d2;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 3px;
  opacity: ${({ active }) => (active ? 1 : 0)};
  padding: 0 3px;
`;
