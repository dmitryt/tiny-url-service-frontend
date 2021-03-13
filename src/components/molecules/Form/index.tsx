import React, { ReactNode, useCallback, useEffect, useState, FormEventHandler } from 'react';

import { FieldProps } from '../FormField';

type Data = {[key: string]: unknown};
type Errors = {[key: string]: boolean};

type Props = {
  children: (props: FieldProps) => ReactNode;
  initialValues?: Data;
  onSubmit?: (d: Data) => void;
  validate?: (d: Data) => Errors;
};

const Form = ({ validate, children, onSubmit, initialValues }: Props) => {
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
    if (Object.keys(errors).length === 0) {
      onSubmit?.(data);
    }
  }, [data, errors]);
  useEffect(() => {
    if (typeof validate === 'function') {
      setErrors(validate({ data }));
    }
  }, [data, touched]);
  return (
    <form onSubmit={onSubmitCb}>
      {children({ onChange, data, errors, touched, setTouched })}
    </form>
  );
};

export default React.memo(Form);
