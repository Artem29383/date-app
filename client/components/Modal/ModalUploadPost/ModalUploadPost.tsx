import React, { useEffect, useRef, useState } from "react";
import Modal from "components/Modal/Modal";

import * as S from "./ModalUploadPost.styled";
import { icons } from "styles/icons";
import Button from "components/Button";
import FileInput from "components/FileInput";
import { useFileWork } from "hooks/useFileWork";
import Crop from "components/Modal/ModalUploadPost/Crop";

const STEPS_VARIABLES: {
  [key: number]: {
    height: number;
    width: number;
    title: string;
  };
} = {
  0: {
    height: 898,
    width: 855,
    title: "Создание публикации"
  },
  1: {
    height: 898,
    width: 855,
    title: "Обрезать"
  }
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Icon = icons.imagesvideo;
const BackArrow = icons.backarrow;

const ModalUploadPost = ({ open, handleClose }: Props) => {
  const [step, setStep] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { changeHandle, image, resetImagePreview, bounding } = useFileWork(
    "image"
  );

  const handleContentHeightSet = (ref: HTMLDivElement) => {
    if (!ref) return;
    setContentHeight(ref.getBoundingClientRect().height);
  };

  const handleBack = () => {
    setStep(prevState => prevState - 1);
    if (step - 1 === 0) {
      resetImagePreview();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandle(e);
    setStep(1);
  };

  return (
    <Modal
      bgcColor="rgba(0, 0, 0, 0.8)"
      borderRadius={12}
      maxWidth={STEPS_VARIABLES[step].width}
      height={STEPS_VARIABLES[step].height}
      open={open}
      onClose={handleClose}
    >
      <S.Root>
        <S.Header>
          {step !== 0 && <BackArrow onClick={handleBack} />}
          <S.Title>{STEPS_VARIABLES[step].title}</S.Title>
        </S.Header>
        <S.Content ref={handleContentHeightSet}>
          <S.Box>
            {step === 0 && (
              <>
                <Icon />
                <S.Text>Перетащите сюда фото и видео</S.Text>
                <Button typeButton="facebook">
                  Выбрать с компьютера
                  <FileInput onChange={handleChange} />
                </Button>
              </>
            )}
            {step === 1 && (
              <Crop
                contentHeight={contentHeight}
                source={image as string}
                bounding={bounding}
              />
            )}
          </S.Box>
        </S.Content>
      </S.Root>
    </Modal>
  );
};

export default ModalUploadPost;
