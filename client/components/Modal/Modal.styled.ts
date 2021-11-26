import styled from "styled-components";
import { motion } from "framer-motion";
import {
  background,
  borderRadius,
  height,
  maxWidth,
  padding
} from "styled-system";
import { FONTS } from "@types";

export const Root = styled(motion.div)`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Background = styled(motion.div)<{ bgcColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ bgcColor }) => bgcColor};
  position: absolute;
  top: 0;
  left: 0;
`;

export const Content = styled(motion.div)`
  z-index: 9999;
  ${height};
  ${maxWidth};
  width: 100%;
  overflow: hidden;
  ${padding};
  ${background};
  ${borderRadius};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-family: ${FONTS.CabinBold};
  font-size: 16px;
`;

export const Cross = styled.div``;
