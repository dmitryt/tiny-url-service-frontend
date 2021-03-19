import React, { ReactNode, useCallback, useEffect, useState, FormEventHandler } from 'react';

import { FieldProps } from '../FormField';

export type Data = {[key: string]: string};
export type Errors = {[key: string]: boolean};

type Props = {
  children: (props: FieldProps) => ReactNode;
  requiredFields?: string[];
  initialValues?: Data;
  isSubmitting?: boolean;
  resetOnSubmit?: boolean;
  onSubmit?: (d: Data) => void;
  validate?: (d: { data: Data }) => Errors;
};

const validateRequiredFields = (data: Data, requiredFields?: string[]) => {
  let errors = requiredFields?.reduce((acc, key) => ({
    ...acc,
    ...(!data[key] ? {[key]: 'Required field'} : {}),
  }), {});
  return errors || {};
};

const Form = ({ validate, children, onSubmit, initialValues, requiredFields, isSubmitting, resetOnSubmit }: Props) => {
  const [touched, setTouchedHandler] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initialValues || {});
  const setTouched = useCallback((name: string) => {
    setTouchedHandler({ ...touched, [name]: true });
  }, [touched, setTouchedHandler]);
  const onChange = useCallback((name: string, value: string) => {
    setData({...data, [name]: value });
  }, [data, setData]);
  const onSubmitCb: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && !isSubmitting) {
      onSubmit?.(data);
    }
    if (resetOnSubmit) {
      setData(initialValues || {});
    }
  }, [data, errors, setData]);
  useEffect(() => {
    const requiredErrors = validateRequiredFields(data, requiredFields);
    if (typeof validate === 'function') {
      setErrors({...requiredErrors, ...validate({ data })});
    } else {
      setErrors(requiredErrors);
    }
  }, [data, touched, requiredFields]);
  return (
    <form onSubmit={onSubmitCb}>
      {children({ onChange, data, errors, touched, setTouched, isSubmitting })}
    </form>
  );
};

export default React.memo(Form);
