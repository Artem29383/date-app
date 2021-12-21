import styled from "styled-components";

export const Main = styled.div<{
  minHeightArea: number;
  left: number | string;
  top: number | string;
}>`
  position: absolute;
  max-width: 230px;
  width: 230px;
  left: ${({ left }) => (typeof left === "number" ? `${left}px` : left)};
  top: ${({ top }) => (typeof top === "number" ? `${top}px` : top)};
  transform: translate(-50%, -50%);
  min-height: ${({ minHeightArea }) => `${minHeightArea}px`};
  z-index: 4;
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
`;

export const Root = styled.div`
  width: 100%;
  max-height: 100%;
  z-index: 4;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  border-radius: 6px;
`;

export const Triangle = styled.div<{ triangleCenter: boolean }>`
  background: #fff;
  border: 1px solid #fff;
  top: -7px;
  right: ${({ triangleCenter }) => (triangleCenter ? "50%" : "20px")};
  z-index: 3;
  transform: ${({ triangleCenter }) =>
    triangleCenter ? "translateX(50%) rotate(45deg)" : "rotate(45deg)"};
  -webkit-box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
  height: 14px;
  position: absolute;
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
