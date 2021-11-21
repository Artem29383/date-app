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

const sizeElementInsideSelect = 35;

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
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);
  const $list = useRef<HTMLDivElement | null>(null);
  const oldShiftPos = useRef(0);
  const { ref, active: focus, setActive: setFocus } = useClickAway();
  const [value, setValue] = useState(initialValue);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const heightList = list.length * sizeElementInsideSelect + 50;
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

  const handleChangeSelectedItem = useCallback(
    e => {
      const currentScroll = $list.current?.scrollTop || 0;
      const elemInsideOverflow =
        selectedRef.current - 1 < 0 ? 0 : selectedRef.current - 1;
      // when we click on down arrow
      if (e.keyCode === 40 && selected + 1 < list.length) {
        setSelected(selected + 1);
        selectedRef.current = selected + 1;
        $list.current?.scroll({
          top:
            currentScroll <
            Math.abs(elemInsideOverflow * sizeElementInsideSelect)
              ? selectedRef.current * sizeElementInsideSelect
              : oldShiftPos.current
        });
      }
      // when we click on up arrow
      if (e.keyCode === 38 && selected - 1 >= 0) {
        setSelected(selected - 1);
        selectedRef.current = selected - 1;
        $list.current?.scroll({
          top:
            currentScroll >
            Math.abs(elemInsideOverflow * sizeElementInsideSelect)
              ? (selectedRef.current - 2) * sizeElementInsideSelect
              : oldShiftPos.current
        });
      }
      // save old position for shifting
      oldShiftPos.current = $list.current?.scrollTop || 0;

      if (e.key === "Enter") {
        handleChooseCountry({ name: list[selectedRef.current].name });
        handleFocusOff(null, `${list[selectedRef.current].name}`);
      }
    },
    [handleChooseCountry, handleFocusOff, list, selected]
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
          onKeyDown={handleChangeSelectedItem}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          onFocus={handleFocusOn}
        />
      )}
      <S.List
        onKeyDown={handleChangeSelectedItem}
        variants={variantsList}
        ref={$list}
        animate={focus ? "open" : "closed"}
      >
        {filteredCountries.map((elem, index) => (
          <S.Country
            heightElem={sizeElementInsideSelect}
            isFocused={index === selected}
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
