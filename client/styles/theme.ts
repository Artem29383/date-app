import { Viewport, ViewportShorthands } from './media';

const breakpoints = Object.values(Viewport)
  .filter(item => typeof item === 'number')
  .map(item => `${Number(item) + 1}px`);

const theme: {
  space: string[];
  breakpoints: Array<string> & ViewportShorthands;
} = {
  space: [],
  breakpoints,
};

const [mobile] = breakpoints;

theme.breakpoints.sm = '325px';
theme.breakpoints.m = mobile;
theme.breakpoints.t = `${Viewport.tablet}px`;
theme.breakpoints.sd = `${Viewport.miniDesktop}px`;
theme.breakpoints.d = `${Viewport.desktop}px`;
theme.breakpoints.md = `${Viewport.mediumDesktop}px`;
theme.breakpoints.bd = `${Viewport.bigDesktop}px`;

export default theme;
