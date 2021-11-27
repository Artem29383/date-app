import { ChangeEvent, useCallback, useRef, useState } from "react";

export const useFileWork = (fileType?: "image" | "pdf") => {
  const [objectFile, setObjectFile] = useState<string | null | File>(null);
  const objectFiles = useRef<File[]>([]);
  const [isDisableBtn, setDisableBtn] = useState(false);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [bounding, setBounding] = useState({
    height: 0,
    width: 0
  });
  const [compress, setCompress] = useState<File | null>(null);
  const [compressView, setCompressView] = useState<File | null>(null);

  const handleResetObjectFiles = useCallback(() => {
    objectFiles.current = [];
  }, []);

  const resetImagePreview = useCallback(() => {
    setImage(null);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const compressImage = async (img: HTMLImageElement, fileImage: File) => {
    return new Promise<(string | File)[]>(resolve => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas?.getContext("2d")?.drawImage(img, 0, 0);
      setBounding({
        width: img.width,
        height: img.height
      });
      const newImgData = canvas.toDataURL(fileImage.type, 0.5);
      fetch(newImgData)
        .then(res => res.blob())
        .then(blob => {
          const file: File = new File([blob], `low${fileImage.name}`, {
            type: fileImage.type
          });
          const newImageData = canvas.toDataURL(fileImage.type, 0.5);
          resolve([newImageData, file]);
        });
    });
  };

  const createImage = useCallback((base64: string, file: File) => {
    const img = document.createElement("IMG");
    if (img instanceof HTMLImageElement) {
      img.src = base64;
      img.onload = async () => {
        setObjectFile(file);
        const result = await compressImage(img, file);
        setCompress(result[1] as File);
        setCompressView(result[0] as File);
      };
    }
  }, []);

  const reader = useCallback((file: File): Promise<string> => {
    return new Promise<string>((resolve): void => {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
    });
  }, []);

  const createImageCopy = useCallback((base64: string, file: File): Promise<
    Array<string | File>
  > => {
    return new Promise(resolve => {
      const img = document.createElement("IMG");
      if (img instanceof HTMLImageElement) {
        img.src = base64;
        img.onload = async () => {
          setObjectFile(file);
          const result = await compressImage(img, file);
          setCompress(result[1] as File);
          setCompressView(result[0] as File);
          resolve(result);
        };
      }
    });
  }, []);

  const getCompressFiles = useCallback(
    async (file): Promise<Array<string | File>> => {
      const base64 = await reader(file);
      return createImageCopy(base64, file);
    },
    [createImageCopy, reader]
  );

  const changeHandle = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      fileList: Array<string> | null = null
    ) => {
      const files: FileList | Array<string> | null =
        e.currentTarget.files || fileList;
      setDisableBtn(true);
      // @ts-ignore
      Object.values(files).forEach(
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async (file: File): Promise<any> => {
          if (file) {
            const type = file.type.split("/");
            const size = Math.ceil(file.size / 1024);
            if (size < 2500000000) {
              if (type[0] === "image" && fileType === type[0]) {
                const base64 = await reader(file);
                createImage(base64, file);
                objectFiles.current = [...objectFiles.current, file];
              } else if (type[1] === fileType) {
                setObjectFile(file);
              }
            } else {
              setObjectFile(null);
            }
          }
        }
      );
      if (e.target) {
        e.target.value = "";
      }
    },
    [createImage, fileType, reader]
  );

  const resetCompress = useCallback(() => {
    setCompress(null);
    setCompressView(null);
  }, []);

  return {
    objectFile: objectFile as File,
    changeHandle,
    setObjectFile,
    setDisableBtn,
    isDisableBtn,
    image,
    resetImagePreview,
    objectFiles: objectFiles.current,
    resetObjectFiles: handleResetObjectFiles,
    compress,
    resetCompress,
    compressView,
    getCompressFiles,
    bounding
  };
};
