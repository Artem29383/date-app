import styled from "styled-components";
import { motion } from "framer-motion";
import { FONTS } from "@types";

export const Root = styled(motion.div)`
  width: 136px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 8px;
  z-index: 3;
  position: absolute;
  bottom: 120%;
`;

export const Row = styled.button<{ active: boolean }>`
  border-bottom: 1px solid rgba(133, 133, 133, 1);
  padding: 0 4px;
  cursor: pointer;
  height: 48px;
  width: 100%;
  color: ${({ active }) => (active ? "#fff" : "#cecece")};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONTS.GeoramaMedium};

  &:last-child {
    border-bottom: 1px solid transparent;
  }
`;
