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
  width: auto;
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

export const Facebook = styled(button)<{ isRemove: boolean }>`
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  position: relative;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
  background-color: ${({ isRemove }) => (isRemove ? "#e34d33" : "#0095f6")};
  border-radius: 4px;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 18px;

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ isRemove }) => (isRemove ? "#bb230a" : "#65a8ee")};
  }
`;

export const FacebookLink = styled(button)`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  border-radius: 4px;
  position: relative;
  -webkit-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  width: auto;
`;
