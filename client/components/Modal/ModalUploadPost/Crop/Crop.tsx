import React, { memo, useCallback, useRef, useState } from "react";

import * as S from "./Crop.styled";
import { useToggle } from "hooks/useToggle";

type Props = {
  source: string;
  bounding: {
    height: number;
    width: number;
  };
  contentHeight: number;
};

const Crop = ({ source, bounding, contentHeight }: Props) => {
  const $image = useRef<null | HTMLDivElement>(null);
  const {
    handleOpen: setDragStart,
    handleClose: setDragEnd,
    value: drag
  } = useToggle(false);
  const startDragPosition = useRef(0);
  const oldDragPosition = useRef(0);
  const $y = useRef(0);
  const [y, setY] = useState(0);

  const handleMove = useCallback(
    (e: { clientY: React.SetStateAction<number> }) => {
      const limit = Math.abs(contentHeight - bounding.height);
      const shift =
        oldDragPosition.current +
        (Number(e.clientY) - startDragPosition.current);

      $y.current = shift > limit || shift < -limit ? $y.current : shift;
      setY($y.current);
    },
    [bounding.height, contentHeight]
  );

  const handleDragOff = useCallback(() => {
    setDragEnd();
    oldDragPosition.current = $y.current;
    document?.removeEventListener("mousemove", handleMove);
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
    <S.Root>
      <S.Presentation>
        <S.CropperZone contentHeight={contentHeight}>
          <S.Image
            posY={y}
            drag={drag}
            onMouseDown={handleDragOn}
            ref={$image}
            height={bounding.height}
            url={source}
          />
          {drag && (
            <S.Squares>
              {new Array(9).fill(0).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <S.Square key={`${index}+${_}`} />
              ))}
            </S.Squares>
          )}
        </S.CropperZone>
      </S.Presentation>
    </S.Root>
  );
};

export default memo(Crop);
