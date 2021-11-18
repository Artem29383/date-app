import styled from 'styled-components';
import { borderRadius, margin, maxWidth } from 'styled-system';
import { ANIMATION_TIMING, Colors, FONTS } from '@types';
import { motion } from 'framer-motion';

export const Root = styled(motion.div)`
  width: 100%;
  height: 50px;
  position: relative;
  ${maxWidth};
  ${borderRadius};
  background-color: #fff;
  overflow: hidden;
  ${margin};
  border: 1px solid darkgray;
`;

export const LeftBorder = styled.div<{ animation: boolean; isError: boolean }>`
  height: 50px;
  width: 3px;
  position: absolute;
  left: 0;
  background-color: ${({ animation, isError }) =>
    isError ? Colors.red : animation ? Colors.blue : 'transparent'};
  transition: background-color ${ANIMATION_TIMING.standard} linear;
`;

export const Input = styled.input`
  height: 50px;
  padding: 10px 25px;
  width: 100%;
  font-size: 16px;
  font-family: ${FONTS.GeoramaMedium};
  box-shadow: 0 4px 2px -2px gray;

  &::placeholder {
    font-family: ${FONTS.GeoramaRegular};
    color: ${Colors.gray};
  }
`;

export const List = styled(motion.div)`
  height: 100px;
  overflow-y: auto;
  width: 100%;
`;

export const Country = styled.div`
  width: 100%;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 200ms linear;

  &:hover {
    background-color: ${Colors.gray};
  }
`;

export const Flag = styled.div`
  margin: 0 10px;
`;

export const Name = styled.div``;
