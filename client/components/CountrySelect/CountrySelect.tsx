import React, { memo, useCallback, useMemo, useState } from 'react';

import { COUNTRIES } from 'components/CountrySelect/data';
import { BorderRadiusProps, MarginProps, MaxWidthProps } from 'styled-system';
import useClickAway from 'hooks/useClickAway';
import * as S from './CountrySelect.styled';

const variants = {
  open: { height: 150 },
  closed: { height: 50, transition: { delay: 0.1 } },
};

const variantsList = {
  open: { opacity: 1, transition: { delay: 0.15 } },
  closed: { opacity: 0 },
};

type Props = {
  initialValue?: string;
  register?: {
    name: string;
    onBlur: (s: any) => void;
    onChange: (s: any) => void;
    ref: (ref: any) => void;
  };
  onCallback?: <T, R>(p1?: T, p2?: R) => void;
  isError?: boolean;
} & MaxWidthProps &
  BorderRadiusProps &
  MarginProps;

const CountrySelect = ({
  initialValue = '',
  register,
  isError,
  onCallback,
  ...rest
}: Props) => {
  const { ref, active: focus, setActive: setFocus } = useClickAway();
  const [value, setValue] = useState(initialValue);
  const [temp, setTemp] = useState('');

  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    []
  );

  const filteredCountries = useMemo(
    () =>
      COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(value.toLowerCase())
      ),
    [value]
  );

  const handleChooseCountry = useCallback(
    country => {
      setValue(`${country.flag} ${country.name}`);
      setTemp(`${country.flag} ${country.name}`);
      if (onCallback && register) {
        onCallback(register.name, `${country.flag} ${country.name}`);
      }
    },
    [onCallback, register]
  );

  const handleFocusOn = useCallback(() => {
    setFocus(true);
    if (register) {
      setValue('');
    }
  }, [register, setFocus]);

  const handleFocusOff = useCallback(
    (e, val?: string) => {
      setFocus(false);
      if (!val && !focus) {
        setValue(temp);
      }
    },
    [focus, setFocus, temp]
  );

  return (
    <S.Root
      {...rest}
      ref={ref}
      onBlur={handleFocusOff}
      variants={variants}
      animate={focus ? 'open' : 'closed'}
    >
      <S.LeftBorder
        isError={isError || false}
        animation={focus || Boolean(value) || isError || false}
      />
      {register && <S.Input
        ref={register.ref}
        placeholder="Enter your country"
        onChange={handleChange}
        value={value}
        onFocus={handleFocusOn}
      />}
      <S.List variants={variantsList} animate={focus ? 'open' : 'closed'}>
        {filteredCountries.map(elem => (
          <S.Country
            onClick={() => {
              handleChooseCountry({ name: elem.name, flag: elem.flag });
              handleFocusOff(null, `${elem.flag} ${elem.name}`);
            }}
            key={elem.id}
          >
            <S.Flag>{elem.flag}</S.Flag>
            <S.Name>{elem.name}</S.Name>
          </S.Country>
        ))}
      </S.List>
    </S.Root>
  );
};

export default memo(CountrySelect);
