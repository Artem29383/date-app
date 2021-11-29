import styled from "styled-components";

export const Root = styled.div`
  height: 100%;
  width: 100%;

  & * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

export const Presentation = styled.div`
  width: 100%;
  height: 100%;
`;

export const CropperZone = styled.div<{ contentHeight: number }>`
  overflow: hidden;
  height: ${({ contentHeight }) => `${contentHeight}px`};
  width: 100%;
  flex-direction: column;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img.attrs<{ posY: number }>(({ posY }) => ({
  style: {
    transform: `translate(0, ${posY}px)`
  }
}))<{ height: number; posY: number; drag: boolean }>`
  width: 100%;
  flex-shrink: 0;
  cursor: ${({ drag }) => (drag ? "grabbing" : "grab")};
  height: ${({ height }) => `${height}px`};
  overflow: hidden;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const Squares = styled.div`
  display: grid;
  position: absolute;
  top: -5px;
  bottom: -5px;
  right: -3px;
  left: -3px;
  pointer-events: none;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

export const Square = styled.div`
  pointer-events: none;
  border-right: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
`;
