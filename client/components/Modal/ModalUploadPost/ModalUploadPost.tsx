import React, { useCallback, useEffect, useRef, useState } from "react";
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
    width: 833,
    title: "Создание публикации"
  },
  1: {
    height: 833,
    width: 790,
    title: "Обрезать"
  },
  2: {
    height: 833,
    width: 790,
    title: "Редактировать"
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
  const $canvas = useRef<HTMLCanvasElement | null>(null);
  const [crop, setCrop] = useState("");
  const { changeHandle, image, resetImagePreview, bounding } = useFileWork(
    "image"
  );

  const handleContentHeightSet = useCallback(
    (ref: HTMLDivElement) => {
      if (!ref) return;
      console.info("das");
      setContentHeight(ref.getBoundingClientRect().height);
    },
    [step]
  );

  const handleBack = () => {
    setStep(prevState => prevState - 1);
    if (step - 1 === 0) {
      resetImagePreview();
    }
  };

  const handleNext = () => {
    if (!crop) return;
    const ctx = $canvas.current!.getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = contentHeight;
    ctx.canvas.height = contentHeight;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height, // source rectangle
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      setStep(prevState => prevState + 1);
    };
    img.src = crop;
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
          {step === 1 && <S.Next onClick={handleNext}>Далее</S.Next>}
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
                onGetCropImage={setCrop}
              />
            )}
            <S.Canvas ref={$canvas} />
          </S.Box>
        </S.Content>
      </S.Root>
    </Modal>
  );
};

export default ModalUploadPost;
