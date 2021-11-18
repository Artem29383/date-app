import React, { memo, useCallback, useState } from 'react';

import { BorderRadiusProps, MarginProps, MaxWidthProps } from 'styled-system';
import * as S from './Input.styled';

type Props = {
  label: string;
  register?: {
    name: string;
    onBlur: (s: any) => void;
    onChange: (s: any) => void;
    ref: (ref: any) => void;
  };
  isError?: boolean;
  type?: string;
} & MaxWidthProps &
  BorderRadiusProps &
  MarginProps;

const Input = ({ label, register, isError, type, ...rest }: Props) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
      if (register) {
        register.onChange(e);
      }
    },
    [register]
  );

  const handleFocusOn = useCallback(() => {
    setFocus(true);
  }, []);

  const handleFocusOff = useCallback(
    e => {
      setFocus(false);
      if (register) {
        register.onBlur(e);
      }
    },
    [register]
  );

  return (
    <S.Root {...rest}>
      <S.LeftBorder
        isError={isError || false}
        animation={focus || Boolean(value) || isError || false}
      />
      <S.Label animation={focus || Boolean(value)}>{label}</S.Label>
      <S.Input
        autoComplete="false"
        type={type || 'text'}
        ref={register && register.ref}
        name={register && register.name}
        onChange={handleChange}
        value={value}
        onFocus={handleFocusOn}
        onBlur={handleFocusOff}
      />
    </S.Root>
  );
};

export default memo(Input);
