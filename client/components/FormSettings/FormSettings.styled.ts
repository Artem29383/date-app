import styled from "styled-components";

export const Root = styled.form`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Row = styled.div<{ flex: string }>`
  display: flex;
  align-items: ${({ flex }) => flex};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.div`
  box-sizing: border-box;
  color: #262626;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 194px;
  -ms-flex: 0 0 194px;
  flex: 0 0 194px;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
  padding-left: 32px;
  padding-right: 32px;
  text-align: right;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 355px;
`;
