import styled from "styled-components";

export const Main = styled.div`
  position: fixed;
  max-width: 230px;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 150px;
  z-index: 4;
`;

export const Root = styled.div`
  width: 100%;
  max-height: 100%;
  //position: relative;
  z-index: 3;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
  justify-content: center;

  background: #fff;
  border-radius: 6px;
`;

export const Triangle = styled.div`
  background: #fff;
  border: 1px solid #fff;
  top: -7px;
  right: 20px;
  z-index: 3;
  -webkit-box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
  height: 14px;
  position: absolute;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 14px;
`;

export const TriangleFake = styled.div`
  background: #fff;
  border: 1px solid #fff;
  top: 0;
  right: 13px;
  z-index: 4;
  height: 14px;
  position: absolute;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(0deg);
  width: 30px;
`;
