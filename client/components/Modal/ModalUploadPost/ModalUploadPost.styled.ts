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
  position: relative;
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

export const Next = styled.button`
  border: 0;
  color: #0095f6;
  display: inline;
  padding: 0;
  position: absolute;
  right: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
`;

export const Canvas = styled.canvas``;
