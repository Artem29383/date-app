import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "components/Modal/Modal";

import * as S from "./ModalUploadPost.styled";
import { icons } from "styles/icons";
import Button from "components/Button";
import FileInput from "components/FileInput";
import { useFileWork } from "hooks/useFileWork";
import Crop from "components/Modal/ModalUploadPost/Crop";
import Canvas from "components/Modal/ModalUploadPost/Canvas";

const STEPS_VARIABLES: {
  [key: number]: {
    height: number;
    width: number;
    title: string;
  };
} = {
  0: {
    height: 898,
    width: 833,
    title: "Создание публикации"
  },
  1: {
    height: 833,
    width: 1130,
    title: "Обрезать"
  },
  2: {
    height: 833,
    width: 1130,
    title: "Редактировать"
  }
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Icon = icons.imagesvideo;
const BackArrow = icons.backarrow;

const variants = {
  closed: { width: 790 },
  open: { width: 1130, transition: { delay: 0.1 } }
};

const ModalUploadPost = ({ open, handleClose }: Props) => {
  const [step, setStep] = useState(0);
  const [y, setY] = useState(0);
  const $content = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [crop, setCrop] = useState("");
  const { changeHandle, image, resetImagePreview, bounding } = useFileWork(
    "image"
  );

  useEffect(() => {
    if (!$content.current && !image) return;
    setContentHeight($content.current!.getBoundingClientRect().height);
  }, [image]);

  const handleBack = () => {
    setStep(prevState => prevState - 1);
    if (step - 1 === 0) {
      resetImagePreview();
    }
  };

  const handleNext = () => {
    if (!crop) return;
    setStep(prevState => prevState + 1);
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
      isFullWidth={false}
    >
      <S.Root>
        <S.Header>
          {step !== 0 && <BackArrow onClick={handleBack} />}
          <S.Title>{STEPS_VARIABLES[step].title}</S.Title>
          {step === 1 && <S.Next onClick={handleNext}>Далее</S.Next>}
        </S.Header>
        <S.Content
          variants={variants}
          animate={step === 2 ? "open" : "closed"}
          ref={$content}
        >
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
                y={y}
                setY={setY}
                contentHeight={contentHeight}
                source={image as string}
                bounding={bounding}
                onGetCropImage={setCrop}
              />
            )}
            {step === 2 && <Canvas contentHeight={contentHeight} crop={crop} />}
          </S.Box>
        </S.Content>
      </S.Root>
    </Modal>
  );
};

export default ModalUploadPost;
