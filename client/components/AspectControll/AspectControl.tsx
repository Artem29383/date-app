import React, { memo, useState } from "react";

import * as S from "./AspectControl.styled";

type Props = {
  open: boolean;
  onChange: (p: string) => void;
};

const variants = {
  open: {
    y: -20,
    opacity: 1,
    transition: { duration: 0.1 }
  },
  closed: {
    opacity: 0,
    y: 0
  }
};

const params = [
  {
    text: "1:1"
  },
  {
    text: "4:5"
  },
  {
    text: "16:9"
  }
];

const AspectControl = ({ open, onChange }: Props) => {
  const [aspect, setAspect] = useState(params[0].text);

  const handleChangeAspect = (text: string) => {
    setAspect(text);
    onChange(text);
  };

  return (
    <S.Root variants={variants} animate={open ? "open" : "closed"}>
      {params.map((item, index) => (
        <S.Row
          active={aspect === item.text}
          key={item.text}
          onClick={() => handleChangeAspect(params[index].text)}
        >
          {item.text}
        </S.Row>
      ))}
    </S.Root>
  );
};

export default memo(AspectControl);
