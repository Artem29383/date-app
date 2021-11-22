import React, { memo, Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconProps } from "styles/icons";
import { MarginProps } from "styled-system";
import * as S from "./ActiveLink.styled";

type Props = {
  href: string;
  IconDefault?: React.FunctionComponent<
    React.SVGAttributes<SVGElement> & IconProps
  >;
  IconActive?: React.FunctionComponent<
    React.SVGAttributes<SVGElement> & IconProps
  >;
  children?: React.ReactNode;
  activeClassName?: string;
} & MarginProps;

const ActiveLink = ({
  href,
  IconDefault,
  IconActive,
  children,
  activeClassName,
  ...rest
}: Props) => {
  const { asPath } = useRouter();
  const child: any = children && Children.only(children);
  const childClassName = children && (child.props.className || "");

  const className = asPath === href ? activeClassName : childClassName;

  return (
    <S.Root {...rest}>
      {IconDefault && IconActive && (
        <Link href={href}>
          <a href={href}>
            {asPath === href ? <IconActive /> : <IconDefault />}
          </a>
        </Link>
      )}
      {children && (
        <Link href={href}>
          <a href={href}>
            {React.cloneElement(child, {
              className: className || null
            })}
          </a>
        </Link>
      )}
    </S.Root>
  );
};

export default memo(ActiveLink);
