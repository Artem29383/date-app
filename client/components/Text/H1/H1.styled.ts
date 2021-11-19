import styled from "styled-components";
import { color, margin, position } from "styled-system";
import { FONTS } from "@types";

export const Root = styled.h1`
  ${color};
  ${margin};
  ${position};
  font-family: ${FONTS.CabinMedium};
  font-size: 46px;
`;
