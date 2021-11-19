import styled from "styled-components";
import { borderRadius, height, margin, width } from "styled-system";
import { Colors, FONTS } from "@types";

export const button = styled.button`
  ${height};
  ${width};
  ${borderRadius};
  ${margin};
`;

export const Root = styled(button)`
  background-color: #5e81f4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};
  box-shadow: 0 2px 10px 0 rgb(9 198 249);
  font-size: 23px;
  cursor: pointer;
  padding: 10px;
  position: relative;
  font-family: ${FONTS.CabinBold};
`;

export const GhostBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.2s ease;
`;

export const GhostText = styled.p`
  font-size: 16px;
  font-family: ${FONTS.CabinBold};
`;

export const Link = styled.a`
  height: 100%;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RootGhost = styled(button)`
  display: flex;
  overflow: hidden;
  position: relative;
  justify-content: center;
  align-items: center;
  color: ${Colors.bluebutton};
  cursor: pointer;

  &:hover ${GhostBack} {
    background-color: #e5eaf0;
  }
`;

export const GoogleRoot = styled(button)<{ pick?: boolean }>`
  background-color: ${({ pick }) => (pick ? Colors.green : Colors.bluebutton)};
  transition: background-color 0.2s ease;
  padding: 12px 16px;
  min-width: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};
  font-family: ${FONTS.CabinMedium};

  &:hover {
    background-color: ${({ pick }) => (pick ? Colors.red : "#1765cc")};
  }
`;
