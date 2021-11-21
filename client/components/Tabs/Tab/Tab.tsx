import React, { memo } from "react";
import Link from "next/link";

import { HeightProps, PositionProps, WidthProps } from "styled-system";
import * as S from "./Tab.styled";
import { IconProps } from "styles/icons";

type Props = {
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement> & IconProps>;
  color: string;
  svgW: number;
  svgH: number;
  svgF: string;
  link: string;
} & HeightProps &
  WidthProps &
  PositionProps;

const Tab = ({ Icon, color, svgF, svgH, svgW, link, ...rest }: Props) => {
  return (
    <Link href={link}>
      <S.Root href={link} {...rest} color={color}>
        <Icon height={svgH} width={svgW} fill={svgF} />
      </S.Root>
    </Link>
  );
};

export default memo(Tab);
