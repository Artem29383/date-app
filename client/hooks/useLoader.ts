import { useState } from "react";

export const useLoader = (value: boolean) => {
  const [load, setLoad] = useState(value);

  const setLoadOn = () => {
    setLoad(true);
  };

  const setLoadOff = () => {
    setLoad(false);
  };

  return { load, setLoadOn, setLoadOff };
};
