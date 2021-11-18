import { css } from 'styled-components';
import { ArgumentTypes } from '@types';

export enum Viewport {
  smallMobile = 325,
  mobile = 768,
  tablet = 1023,
  miniDesktop = 1320,
  desktop = 1439,
  mediumDesktop = 1560,
  bigDesktop = 1920,
}

export type ViewportShorthands = {
  sm?: number | string;
  m?: number | string;
  t?: number | string;
  sd?: number | string;
  d?: number | string;
  md?: number | string;
  bd?: number | string;
};

export const media = {
  smallMobile: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.smallMobile}px) {
      ${css(...args)}
    }
  `,
  mobile: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.mobile}px) {
      ${css(...args)}
    }
  `,
  tablet: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.tablet}px) {
      ${css(...args)}
    }
  `,
  miniDesktop: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.miniDesktop}px) {
      ${css(...args)}
    }
  `,
  desktop: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.desktop}px) {
      ${css(...args)}
    }
  `,
  mediumDesktop: (...args: ArgumentTypes<typeof css>) => css`
    @media (max-width: ${Viewport.mediumDesktop}px) {
      ${css(...args)}
    }
  `,
  height: (maxHeight: number) => (...args: ArgumentTypes<typeof css>) => css`
    @media (max-height: ${maxHeight}px) {
      ${css(...args)}
    }
  `,
};
