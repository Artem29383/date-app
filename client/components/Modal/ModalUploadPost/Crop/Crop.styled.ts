import styled from "styled-components";

export const Root = styled.div`
  height: 100%;
  width: 100%;
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

export const Image = styled.div.attrs<{ posY: number }>(({ posY }) => ({
  style: {
    transform: `translate(0, ${posY}px)`
  }
}))<{ url: string; height: number; posY: number; drag: boolean }>`
  background-image: ${({ url }) => `url(${url})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  flex-shrink: 0;
  cursor: ${({ drag }) => (drag ? "grabbing" : "grab")};
  height: ${({ height }) => `${height}px`};
  overflow: hidden;
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
  border-right: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
`;
