import { useEffect, useState } from "react";

export const useClientRender = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(true);
    }
  }, []);

  return show;
};
