import React, { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconProps } from "styles/icons";
import { MarginProps } from "styled-system";
import * as S from "./ActiveLink.styled";

type Props = {
  href: string;
  IconDefault: React.FunctionComponent<
    React.SVGAttributes<SVGElement> & IconProps
  >;
  IconActive: React.FunctionComponent<
    React.SVGAttributes<SVGElement> & IconProps
  >;
} & MarginProps;

const ActiveLink = ({ href, IconDefault, IconActive, ...rest }: Props) => {
  const { asPath } = useRouter();

  return (
    <S.Root {...rest}>
      <Link href={href}>
        <a href={href}>{asPath === href ? <IconActive /> : <IconDefault />}</a>
      </Link>
    </S.Root>
  );
};

export default memo(ActiveLink);
