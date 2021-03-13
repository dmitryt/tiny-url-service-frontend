import React, { ComponentType, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Props as InputProps } from '../../atoms/Input';

const StyledLabel = styled.span`
  margin-bottom: 10px;
  display: inline-block;
  &.required:after {
    content: '*';
    color: red;
  }
  &.invalid {
    color: red;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-style: italic;
  font-size: 0.8rem;
`;

const Container = styled.label`
  display: block;
`;

type Data = {[key: string]: unknown};
type Errors = {[key: string]: boolean};

export type FieldProps = {
  onChange: (name: string, value: string) => void;
  touched: {[key: string]: boolean};
  errors: Errors;
  data: Data;
  setTouched: (name: string) => void;
}

type Props = {
  Component: ComponentType<InputProps>;
  onChange: (name: string, value: string) => void;
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  errors: {[key: string]: boolean};
};

const FormField = ({ Component, required, className, label, errors, onChange, name, setTouched, touched, ...rest }: Omit<InputProps, 'onChange'> & Props & FieldProps) => {
  const invalid = useMemo(() => errors[name] && touched[name], [errors, touched, name]);
  const labelClasses = useMemo(() => {
    const obj: {[key: string]: boolean | undefined} = { required, invalid };
    return Object.keys(obj).reduce((acc, key) => [acc, obj[key] ? key : ''].filter(Boolean).join(' '), '');
  }, [required, invalid]);
  const onChangeCb = useCallback((value: string) => {
    onChange(name, value);
  }, [name, onChange]);
  const onBlur = useCallback(() => {
    if (!touched[name]) {
      setTouched(name);
    }
  }, [name, touched, setTouched]);
  return (
    <Container className={className}>
      <StyledLabel className={labelClasses}>{label}</StyledLabel>:
      <Component {...rest} onChange={onChangeCb} onBlur={onBlur} invalid={invalid} />
      <ErrorMessage>{invalid ? errors[name] : ' '}</ErrorMessage>
    </Container>
  );
};

export default React.memo(FormField);
