import React, { memo } from "react";

import * as S from "./TextField.styled";

type Props = {
  placeholder: string;
  register?: {
    name: string;
    onBlur: (s: any) => void;
    onChange: (s: any) => void;
    ref: (ref: any) => void;
  };
  isArea?: boolean;
  required?: boolean;
  type?: string;
  disabled?: boolean;
};

const TextField = ({
  register,
  placeholder,
  required = false,
  isArea = false,
  type = "text",
  disabled = false
}: Props) => {
  return !isArea ? (
    <S.Root
      disabled={disabled}
      type={type}
      required={required}
      placeholder={placeholder}
      {...register}
    />
  ) : (
    <S.RootArea required={required} placeholder={placeholder} {...register} />
  );
};

export default memo(TextField);
