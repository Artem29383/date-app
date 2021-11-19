import styled from "styled-components";
import { borderRadius, margin, maxWidth } from "styled-system";
import { ANIMATION_TIMING, Colors, FONTS } from "@types";

export const Root = styled.div`
  width: 100%;
  height: 75px;
  position: relative;
  ${maxWidth};
  ${borderRadius};
  overflow: hidden;
  ${margin};
  border: 1px solid darkgray;
`;

export const LeftBorder = styled.div<{ animation: boolean; isError: boolean }>`
  height: 100%;
  width: 3px;
  position: absolute;
  left: 0;
  background-color: ${({ animation, isError }) =>
    // eslint-disable-next-line no-nested-ternary
    isError ? Colors.red : animation ? Colors.blue : "transparent"};
  transition: background-color ${ANIMATION_TIMING.standard} linear;
`;

export const Input = styled.input`
  height: 100%;
  background-color: #fff;
  padding: 30px 25px 15px 25px;
  width: 100%;
  font-size: 16px;
  font-family: ${FONTS.GeoramaMedium};
`;

export const Label = styled.label<{ animation: boolean }>`
  color: darkgray;
  pointer-events: none;
  position: absolute;
  font-family: ${FONTS.GeoramaBold};
  font-weight: bold;
  top: ${({ animation }) => (animation ? "40%" : "50%")};
  font-size: ${({ animation }) => (animation ? "14px" : "21px")};
  left: 25px;
  transition: transform ${ANIMATION_TIMING.standard} linear,
    font-size ${ANIMATION_TIMING.standard} linear;
  transform: ${({ animation }) =>
    animation ? "translateY(-130%)" : "translateY(-50%)"};
`;
