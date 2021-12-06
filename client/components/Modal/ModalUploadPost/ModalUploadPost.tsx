import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "components/Modal/Modal";

import * as S from "./ModalUploadPost.styled";
import { icons } from "styles/icons";
import Button from "components/Button";
import FileInput from "components/FileInput";
import { useFileWork } from "hooks/useFileWork";
import Crop from "components/Modal/ModalUploadPost/Crop";
import Canvas from "components/Modal/ModalUploadPost/Canvas";
import SubmitPost from "components/Modal/ModalUploadPost/SubmitPost";
import { createPostAsync } from "src/entities/post/async";

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
  },
  3: {
    height: 833,
    width: 1130,
    title: "Создание публикации"
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
  const [description, setDescription] = useState("");
  const [disableComments, setDisableComments] = useState(false);
  const [canvasImage, setCanvasImage] = useState<{
    file: File | null;
    base64: string;
  }>({
    file: null,
    base64: ""
  });
  const { changeHandle, image, resetImagePreview, bounding } = useFileWork(
    "image"
  );

  useEffect(() => {
    if (!$content.current && !image) return;
    setContentHeight($content.current!.getBoundingClientRect().height);
  }, [image]);

  const handleBack = useCallback(() => {
    setStep(prevState => prevState - 1);
    if (step - 1 === 0) {
      resetImagePreview();
    }
  }, [resetImagePreview, step]);

  const handleNext = useCallback(() => {
    if (!crop) return;
    setStep(prevState => prevState + 1);
  }, [crop]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeHandle(e);
      setStep(1);
    },
    [changeHandle]
  );

  const handleReset = useCallback(() => {
    setStep(0);
    setCanvasImage({
      file: null,
      base64: ""
    });
    $content.current = null;
    setDescription("");
    setCrop("");
    setContentHeight(0);
    setY(0);
    resetImagePreview();
    handleClose();
  }, [handleClose, resetImagePreview]);

  const handleSubmit = useCallback((): void => {
    createPostAsync({
      base64: canvasImage.base64,
      description,
      disableComments
    }).then(() => handleReset());
  }, [canvasImage.base64, description, disableComments, handleReset]);

  return (
    <Modal
      bgcColor="rgba(0, 0, 0, 0.8)"
      borderRadius={12}
      maxWidth={STEPS_VARIABLES[step].width}
      height={STEPS_VARIABLES[step].height}
      open={open}
      onClose={handleReset}
      isFullWidth={false}
    >
      <S.Root>
        <S.Header>
          {step !== 0 && <BackArrow onClick={handleBack} />}
          <S.Title>{STEPS_VARIABLES[step].title}</S.Title>
          {(step === 1 || step === 2) && (
            <S.Next onClick={handleNext}>Далее</S.Next>
          )}
          {step === 3 && <S.Next onClick={handleSubmit}>Поделиться</S.Next>}
        </S.Header>
        <S.Content
          variants={variants}
          animate={[2, 3].includes(step) ? "open" : "closed"}
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
            {step === 2 && (
              <Canvas
                setCanvasImage={setCanvasImage}
                contentHeight={contentHeight}
                crop={crop}
              />
            )}
            {step === 3 && (
              <SubmitPost
                contentHeight={contentHeight}
                base64={canvasImage.base64}
                description={description}
                setDescription={setDescription}
                disableComments={disableComments}
                setDisableComments={setDisableComments}
              />
            )}
          </S.Box>
        </S.Content>
      </S.Root>
    </Modal>
  );
};

export default ModalUploadPost;
