import styled from "styled-components";
import { motion } from "framer-motion";
import { Colors } from "@types";

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

export const Content = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

export const Canvas = styled.canvas`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
`;

export const Filters = styled.div`
  flex-shrink: 0;
  width: 340px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const Navigator = styled.div`
  width: 100%;
  display: flex;
`;

export const ButtonNavigator = styled.button<{ active: boolean }>`
  font-size: 16px;
  line-height: 24px;
  padding: 14px 0;
  text-transform: capitalize;
  color: ${({ active }) => (active ? "#000" : "#b8b7b7")};
  border-bottom: ${({ active }) =>
    active ? "solid 1px #262626" : "solid 1px transparent"};
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-weight: bold;
`;

export const Main = styled.div`
  padding: 15px;
`;

export const FiltersContent = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr;
  overflow-y: auto;
  max-height: 524px;
`;

export const Filter = styled.div<{ activeItem: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 88px;
  opacity: ${({ activeItem }) => (activeItem ? 1 : 0.8)};
`;

export const Image = styled.img`
  height: 88px;
  width: 88px;
`;
export const Paragraph = styled.p<{ activeItem: boolean }>`
  margin-top: 5px;
  color: ${({ activeItem }) => (activeItem ? Colors.bluebutton : "#7d7c7c")};
  font-weight: ${({ activeItem }) => (activeItem ? "bold" : 400)};
`;
