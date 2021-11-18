import styled from 'styled-components';
import React from 'react';
import {
  AlignSelfProps,
  LayoutProps,
  MarginProps,
  PositionProps as StyledSystemPositonProps,
  position as styledSystemPosition,
  layout,
  margin,
  alignSelf,
} from 'styled-system';
import { ANIMATION_TIMING, Colors, ColorsStrings } from '@types';
import { mapValues } from 'utils/mapValues';

import fingerPrint from 'assets/icons/fingerprint.svg';
import home from 'assets/icons/home.svg';
import signUp from 'assets/icons/signUp.svg';
import unlocker from 'assets/icons/open-padlock.svg';
import cross from 'assets/icons/cross-sign.svg';
import logo from 'assets/icons/logo.svg';
import dashboard from 'assets/icons/dashboard.svg';
import dashboardradius from 'assets//icons/dashboardradius.svg';
import adminPanel from 'assets//icons/adminPanel.svg';
import arrow from 'assets//icons/arrow.svg';

export type IconProps = LayoutProps &
  StyledSystemPositonProps &
  MarginProps &
  AlignSelfProps & { color?: ColorsStrings };


export const icons: {
  [key: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
} = mapValues(
  {
    fingerPrint,
    home,
    signUp,
    unlocker,
    cross,
    logo,
    dashboard,
    dashboardradius,
    adminPanel,
    arrow,
  },
  (icon) => styled(icon as React.FunctionComponent<React.SVGAttributes<SVGElement>>).withConfig({
    shouldForwardProp: prop =>
      !['height', 'zIndex', 'alignSelf'].includes(String(prop)),
  })`
      transition: fill ${ANIMATION_TIMING.standard} linear;
      ${layout}
      ${styledSystemPosition}
      ${margin}
      ${alignSelf}

    & .icon-fill {
        
        fill: ${p => (p.color &&
        // @ts-ignore
        Colors[p.color] ? Colors[p.color] : 'blue')};
      }
  
      & .icon-stroke {
        stroke: ${p => (p.color &&
        // @ts-ignore
        Colors[p.color] ? Colors[p.color] : 'blue')};
      }
    `
);
