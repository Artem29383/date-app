import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { BorderRadiusProps, MarginProps, MaxWidthProps } from "styled-system";
import useClickAway from "hooks/useClickAway";
import * as S from "./Select.styled";

const variants = {
  open: { height: 150 },
  closed: { height: 50, transition: { delay: 0.1 } }
};

const variantsList = {
  open: { opacity: 1, transition: { delay: 0.15 } },
  closed: { opacity: 0 }
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
  list: { name: string; id: string | number }[];
  placeholder: string;
} & MaxWidthProps &
  BorderRadiusProps &
  MarginProps;

const Select = ({
  list,
  initialValue = "",
  register,
  isError,
  placeholder,
  onCallback,
  ...rest
}: Props) => {
  const $variants = useRef(variants);
  const { ref, active: focus, setActive: setFocus } = useClickAway();
  const [value, setValue] = useState(initialValue);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const heightList = list.length * 35 + 50;
    $variants.current = {
      ...variants,
      open: {
        height: heightList > 150 ? 150 : heightList
      }
    };
  }, [list]);

  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setValue(e.target.value);
    },
    []
  );

  const filteredCountries = useMemo(
    () =>
      list.filter(country =>
        country.name.toLowerCase().includes(value.toLowerCase())
      ),
    [list, value]
  );

  const handleChooseCountry = useCallback(
    (country: { name: string }) => {
      setValue(`${country.name}`);
      setTemp(`${country.name}`);
      if (onCallback && register) {
        onCallback(register.name, `${country.name}`);
      }
    },
    [onCallback, register]
  );

  const handleFocusOn = useCallback(() => {
    setFocus(true);
    if (register) {
      setValue("");
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
      variants={$variants.current}
      animate={focus ? "open" : "closed"}
    >
      <S.LeftBorder
        isError={isError || false}
        animation={focus || Boolean(value) || isError || false}
      />
      {register && (
        <S.Input
          ref={register.ref}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          onFocus={handleFocusOn}
        />
      )}
      <S.List variants={variantsList} animate={focus ? "open" : "closed"}>
        {filteredCountries.map(elem => (
          <S.Country
            onClick={() => {
              handleChooseCountry({ name: elem.name });
              handleFocusOff(null, `${elem.name}`);
            }}
            key={elem.id}
          >
            <S.Name>{elem.name}</S.Name>
          </S.Country>
        ))}
      </S.List>
    </S.Root>
  );
};

export default memo(Select);
