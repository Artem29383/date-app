import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import * as S from "./Crop.styled";
import { useToggle } from "hooks/useToggle";
import { icons } from "styles/icons";
import Portal from "components/Portal/Portal";
import WrapperModalChangeAvatar from "components/Modal/ModalChangeAvatar/WrapperModalChangeAvatar";
import { useClientRender } from "hooks/useClientRender";
import AspectControl from "components/AspectControll";

const IconResize = icons.resize;

type Props = {
  source: string;
  bounding: {
    height: number;
    width: number;
  };
  contentHeight: number;
  onGetCropImage: (p: string) => void;
  y: number;
  setY: (p: number) => void;
};

export const ASPECT_MODE = {
  original: "Оригинал",
  oneToOne: "1:1",
  fourToFive: "4:5",
  sixteenToNine: "16:9"
};

const Crop = ({
  source,
  bounding,
  contentHeight,
  onGetCropImage,
  y,
  setY
}: Props) => {
  const {
    value: open,
    handleOpen: openResizeMenu,
    handleClose: closeResizeMenu,
    handleToggle: toggleResizeMenu
  } = useToggle(false);
  const $image = useRef<null | HTMLImageElement>(null);
  const $container = useRef<null | HTMLDivElement>(null);
  const {
    handleOpen: setDragStart,
    handleClose: setDragEnd,
    value: drag
  } = useToggle(false);
  const startDragPosition = useRef(0);
  const oldDragPosition = useRef(0);
  const $y = useRef(y);
  const $sy = useRef(0);
  const $sh = useRef(790);
  const $sw = useRef(790);
  const [cropAspect, setCropAspect] = useState<Array<string | number>>([
    "100%",
    contentHeight
  ]);
  const [aspect, setAspect] = useState(0);
  const limit = useRef({
    top: 0,
    bottom: 0
  });

  const handleChangeAspect = (mode: string) => {
    switch (mode) {
      case ASPECT_MODE.fourToFive: {
        setCropAspect([`625px`, contentHeight]);
        break;
      }
      case ASPECT_MODE.oneToOne: {
        setCropAspect([`100%`, contentHeight]);
        break;
      }
      case ASPECT_MODE.sixteenToNine: {
        setCropAspect([`100%`, 444]);
        break;
      }
      default: {
        break;
      }
    }
  };

  const cropImage = (img: HTMLImageElement) => {
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const pixelRatio = window.devicePixelRatio;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = $sw.current * pixelRatio * scaleX;
    canvas.height = $sh.current * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    canvas?.getContext("2d")?.drawImage(
      img,
      0,
      $sy.current * scaleY, // Start at 70/20 pixels from the left and the top of the image (crop),
      $sw.current * scaleX,
      $sh.current * scaleY, // "Get" a `50 * 50` (w * h) area from the source image (crop),
      0,
      0, // Place the result at 0, 0 in the canvas,
      $sw.current * scaleX,
      $sh.current * scaleY
    );

    onGetCropImage(canvas.toDataURL("image/png", 1));
  };

  useEffect(() => {
    if (
      $image.current &&
      $container.current &&
      source &&
      drag &&
      !limit.current.top &&
      !limit.current.bottom
    ) {
      limit.current = {
        bottom:
          $image.current?.getBoundingClientRect().bottom -
          $container.current?.getBoundingClientRect().bottom,
        top:
          Math.abs($image.current?.getBoundingClientRect().top) +
          $container.current?.getBoundingClientRect().top
      };
    }
    // if ($image.current) {
    //   cropImage($image.current);
    // }
  }, [source, drag]);

  const handleMove = useCallback(
    (e: { clientY: React.SetStateAction<number> }) => {
      const shift =
        oldDragPosition.current +
        (Number(e.clientY) - startDragPosition.current);
      $y.current =
        shift > limit.current.top || shift < -limit.current.bottom
          ? $y.current
          : shift;
      setY($y.current);
    },
    []
  );

  const handleDragOff = useCallback(() => {
    setDragEnd();
    oldDragPosition.current = $y.current;

    $sy.current =
      $y.current <= 0
        ? limit.current.top + Math.abs($y.current)
        : limit.current.top - Math.abs($y.current);

    document?.removeEventListener("mousemove", handleMove);
    if ($image.current) cropImage($image.current);
  }, [handleMove, setDragEnd]);

  const handleDragOn = useCallback(
    (e: { clientY: number }) => {
      startDragPosition.current = e.clientY;
      setDragStart();
      document?.addEventListener("mousemove", handleMove);
      document?.addEventListener("mouseup", handleDragOff);
    },
    [handleDragOff, handleMove, setDragStart]
  );

  return (
    <>
      <S.Root>
        <S.Presentation>
          <S.CropperZone
            ref={$container}
            width={cropAspect[0] as string}
            contentHeight={(cropAspect[1] as number) || contentHeight}
          >
            {source && (
              <S.Image
                posY={y}
                src={source}
                drag={drag}
                onMouseDown={handleDragOn}
                ref={$image}
                height={bounding.height}
              />
            )}
            {drag && (
              <S.Squares>
                {new Array(9).fill(0).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key,@typescript-eslint/restrict-template-expressions
                  <S.Square key={`${index}+${_}`} />
                ))}
              </S.Squares>
            )}
          </S.CropperZone>
          {contentHeight && (
            <S.Aspect>
              <S.Button onClick={toggleResizeMenu} active={open}>
                <IconResize fill="#fff" />
              </S.Button>
              <AspectControl open={open} onChange={handleChangeAspect} />
            </S.Aspect>
          )}
        </S.Presentation>
      </S.Root>
    </>
  );
};

export default memo(Crop);
