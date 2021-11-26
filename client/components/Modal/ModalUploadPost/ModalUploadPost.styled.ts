import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 20px;
  align-items: center;
  height: 43px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  svg {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
`;

export const Title = styled.h2`
  align-items: center;
  display: flex;
  flex-grow: 1;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 24px;
  text-align: center;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.h2`
  font-size: 22px;
  margin: 15px 0;
  line-height: 26px;
  text-align: center;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
