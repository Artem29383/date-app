import React, { memo } from "react";
import { createPortal } from "react-dom";

import usePortal from "hooks/usePortal";

type Props = {
  id: string;
  children?: React.ReactNode;
};

const Portal = ({ id, children }: Props) => {
  const target = usePortal(id) as React.ReactNode;
  return createPortal(children, target as Element);
};

const PortalWrapper = (props: Props) => {
  if (typeof window === "undefined") {
    return null;
  }

  return <Portal {...props} />;
};

export default memo(PortalWrapper);
