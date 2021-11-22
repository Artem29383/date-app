import { useCallback, useState } from "react";

export const useToggle = (initial: boolean) => {
  const [value, setValue] = useState(initial);

  const handleToggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  const handleClose = useCallback(() => {
    setValue(false);
  }, []);

  const handleOpen = useCallback(() => {
    setValue(true);
  }, []);

  return { value, handleToggle, handleClose, handleOpen };
};
