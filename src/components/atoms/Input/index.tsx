import React, { useCallback, ChangeEvent, useMemo, KeyboardEvent, HTMLProps } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 8px;
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
  value?: string;
  className?: string;
  invalid?: boolean;
}

const Input = ({ onChange, invalid, className, value = '', ...rest }: Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'ref' | 'as'> & Props) => {
  const onChangeCb = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), []);
  const classNames = useMemo(() => `${className} ${invalid ? 'invalid' : ''}`, [className, invalid]);
  return (
    <StyledInput type="text" {...rest} className={classNames} onChange={onChangeCb} value={value} />
  );
};

export default React.memo(Input);
