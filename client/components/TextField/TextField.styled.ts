import styled from "styled-components";

export const Root = styled.input`
  width: 100%;
  background: 0 0;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 355px;
  -ms-flex: 0 1 355px;
  flex: 0 1 355px;
  font-size: 16px;
  height: 32px;
  padding: 0 10px;
  -webkit-appearance: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;

  &:focus-visible {
    outline: 2px solid #8383e2;
  }

  &::placeholder {
    color: #a7a5a5;
  }

  &:disabled {
    cursor: not-allowed;
    color: #7d7878;
  }
`;

export const RootArea = styled.textarea`
  background: 0 0;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #262626;
  resize: none;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 355px;
  -ms-flex: 0 1 355px;
  flex: 0 1 355px;
  font-size: 16px;
  height: 120px;
  padding: 6px 10px;

  &:focus-visible {
    outline: 2px solid #8383e2;
  }

  &::placeholder {
    color: #a7a5a5;
  }
`;
