import React, { useCallback, useEffect } from "react";
import ModalChangeAvatar from "components/Modal/ModalChangeAvatar/ModalChangeAvatar";
import { useEvent } from "effector-react";
import { updateUser } from "src/entities/user/store";
import { uploadImageAsync } from "src/entities/user/async";
import { useFileWork } from "hooks/useFileWork";

type Props = {
  onClose: () => void;
  email: string;
  open: boolean;
};

const WrapperModalChangeAvatar = ({ onClose, email, open }: Props) => {
  const updateUserEvent = useEvent(updateUser);
  const { changeHandle, objectFile, setObjectFile } = useFileWork("image");

  const handleUploadImage = useCallback(
    (file: File | "destroy") => {
      if (!file) return;
      uploadImageAsync({ file, email }).then(resp => {
        if (resp) {
          updateUserEvent(resp);
          setObjectFile(null);
          onClose();
        }
      });
    },
    [email, onClose, setObjectFile, updateUserEvent]
  );

  useEffect(() => {
    if (objectFile) {
      handleUploadImage(objectFile);
    }
  }, [email, handleUploadImage, objectFile, updateUserEvent]);

  return (
    <ModalChangeAvatar
      open={open}
      onClose={onClose}
      onChangePhoto={changeHandle}
      onUploadImage={handleUploadImage}
    />
  );
};

export default WrapperModalChangeAvatar;
