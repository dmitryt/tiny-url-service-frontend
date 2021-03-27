import React, { ComponentType, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Props as InputProps } from '../../atoms/Input';
import { Data, Errors } from '../Form';

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

export type FieldProps = {
  onChange: (name: string, value: string) => void;
  touched: {[key: string]: boolean};
  errors: Errors;
  data: Data;
  setTouched: (name: string) => void;
  isSubmitting?: boolean;
}

type Props = {
  Component: ComponentType<InputProps>;
  onChange: (name: string, value: string) => void;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  errors: {[key: string]: boolean};
};

const FormField = ({ Component, required, className, label, errors, onChange, name, setTouched, touched, data, ...rest }: Omit<InputProps, 'onChange'> & Props & FieldProps) => {
  const invalid = useMemo(() => errors[name] && touched[name], [errors, touched, name]);
  const value = useMemo(() => data[name], [data, name]);
  const labelClasses = useMemo(() => {
    const obj: {[key: string]: boolean | undefined} = { required, invalid };
    return Object.keys(obj).reduce((acc, key) => [acc, obj[key] ? key : ''].filter(Boolean).join(' '), '');
  }, [required, invalid]);
  const onChangeCb = useCallback((value: string) => {
    onChange(name, value);
  }, [onChange]);
  const onBlur = useCallback(() => {
    if (!touched[name]) {
      setTouched(name);
    }
  }, [name, touched, setTouched]);
  return (
    <Container className={className}>
      {label && (
        <>
          <StyledLabel className={labelClasses}>{label}</StyledLabel>:
        </>
      )}
      <Component {...rest} onChange={onChangeCb} onBlur={onBlur} invalid={invalid} value={value} name={name} />
      <ErrorMessage>{invalid ? errors[name] : ' '}</ErrorMessage>
    </Container>
  );
};

export default React.memo(FormField);
