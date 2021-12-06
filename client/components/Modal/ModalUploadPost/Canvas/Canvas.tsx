import React, { memo, useCallback, useRef, useState } from "react";
import * as S from "components/Modal/ModalUploadPost/ModalUploadPost.styled";
import { parseSettingToStyle } from "utils/filters/filters";
import FilterDefault from "assets/images/filterdefault.jpeg";
import DEFAULT_FILTERS, { FilterSetting } from "utils/filters/settings";

type Props = {
  crop: string;
  contentHeight: number;
  setCanvasImage: (p: { file: File | null; base64: string }) => void;
};

const Canvas = ({ crop, contentHeight, setCanvasImage }: Props) => {
  const [view, setView] = useState<"filters" | "settings">("filters");
  const [activeFilter, setActiveFilter] = useState<{
    name: string;
    setting: string;
  }>({ name: "original", setting: "none" });
  const $canvas = useRef<HTMLCanvasElement | null>(null);
  const $ctx = useRef<CanvasRenderingContext2D | null>(null);

  const drawCanvas = useCallback(
    ref => {
      if (ref && !$canvas.current) {
        $canvas.current = ref;
        $ctx.current = ref.getContext("2d", {
          alpha: false
        });
        $ctx.current!.canvas.height = contentHeight;
        $ctx.current!.canvas.width = contentHeight;
      }

      if (crop && $canvas.current && $ctx.current) {
        const img = new Image();
        img.onload = () => {
          $ctx.current!.filter = activeFilter.setting;

          $ctx.current!.drawImage(
            img,
            0,
            0,
            img.width,
            img.height, // source rectangle
            0,
            0,
            $ctx.current!.canvas.width,
            $ctx.current!.canvas.height
          );
        };
        img.src = crop;

        const newImgData = $canvas.current.toDataURL("image/png", 1);
        fetch(newImgData)
          .then(res => res.blob())
          .then(blob => {
            const file: File = new File([blob], `lowimage/png`, {
              type: "image/png"
            });
            const newImageData = $canvas.current!.toDataURL("image/png", 1);
            setCanvasImage({
              file,
              base64: newImageData
            });
          });
      }
    },
    [activeFilter.setting, contentHeight, crop, setCanvasImage]
  );

  return (
    <S.RootCanvas>
      <S.Canvas ref={drawCanvas} />
      <S.Filters>
        <S.Navigator>
          <S.ButtonNavigator active={view === "filters"}>
            Фильтры
          </S.ButtonNavigator>
          <S.ButtonNavigator active={view === "settings"}>
            Настройки
          </S.ButtonNavigator>
        </S.Navigator>
        {view === "filters" && (
          <S.Main>
            <S.FiltersContent>
              <S.Filter
                activeItem={activeFilter.name === "original"}
                onClick={() =>
                  setActiveFilter({
                    name: "original",
                    setting: "none"
                  })
                }
              >
                <S.Image src={FilterDefault.src} />
                <S.Paragraph activeItem={activeFilter.name === "original"}>
                  Original
                </S.Paragraph>
              </S.Filter>
              {DEFAULT_FILTERS.map(item => {
                return (
                  <S.Filter
                    activeItem={activeFilter.name === item[0]}
                    onClick={() =>
                      setActiveFilter({
                        name: item[0] as string,
                        setting: parseSettingToStyle(item[1] as FilterSetting)
                      })
                    }
                  >
                    <S.Image src={FilterDefault.src} />
                    <S.Paragraph activeItem={activeFilter.name === item[0]}>
                      {item[0]}
                    </S.Paragraph>
                  </S.Filter>
                );
              })}
            </S.FiltersContent>
          </S.Main>
        )}
      </S.Filters>
    </S.RootCanvas>
  );
};

export default memo(Canvas);
