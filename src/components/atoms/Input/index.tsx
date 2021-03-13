import React, { useCallback, ChangeEvent, useMemo, KeyboardEvent, HTMLProps } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

const CHANGE_TIMEOUT = 200;

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  &.invalid {
    border-color: red;
  }
`;

export type Props = {
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  className?: string;
  invalid?: boolean;
  onEnterPress?: () => void;
}

const Input = ({ onChange, onEnterPress, invalid, className, ...rest }: Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'ref' | 'as'> & Props) => {
  const debouncedChange = useMemo(() => onChange ? debounce(onChange, CHANGE_TIMEOUT) : () => {}, [onChange]);
  const onChangeCb = useCallback((e: ChangeEvent<HTMLInputElement>) => debouncedChange(e.target.value), [debouncedChange]);
  const onKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onEnterPress?.();
    }
  }, [onEnterPress]);
  const classNames = useMemo(() => `${className} ${invalid ? 'invalid' : ''}`, [className, invalid]);
  return (
    <StyledInput type="text" {...rest} className={classNames} onChange={onChangeCb} onKeyUp={onKeyUp} />
  );
};

export default React.memo(Input);
