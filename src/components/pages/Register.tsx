import React, { useCallback } from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Form from '../molecules/Form';
import { Link } from 'react-router-dom';

const Centered = styled.div`
  text-align: center;
`;

const StyledFormField= styled(FormField)`
  margin-bottom: 15px;
`;

const StyledSubmitButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  & > * {
    width: 49%;
  }
`;

const Register = () => {
  const validate = useCallback(({ data }) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const requiredFields = ['email', 'password'];
    let errors = requiredFields.reduce((acc, key) => ({
      ...acc,
      ...(!data[key] ? {[key]: 'Required field'} : {}),
    }), {});
    if (data.email && !emailRegexp.test(data.email)) {
      errors = {...errors, email: 'Email is invalid'};
    }
    if (data.password && data.password !== data.passwordConfirmation) {
      errors = {...errors, passwordConfirmation: 'Password should be equal with confirmation'};
    }
    return errors;
  }, []);
  const onSubmit = useCallback(({ passwordConfirmation, ...data}) => {
    console.log(data);
  }, []);
  return (
    <>
      <Centered>
        <h2>Registration Form</h2>
      </Centered>
      <Form validate={validate} onSubmit={onSubmit}>
        {(props) => (
          <>
            <StyledFormField label="Email" name="email" required Component={Input} {...props} />
            <StyledFormField label="Password" name="password" type="password" required Component={Input} {...props} />
            <StyledFormField label="Password Confirmation" name="passwordConfirmation" type="password" required Component={Input} {...props} />
            <Row>
              <StyledFormField label="First Name" name="firstName" Component={Input} {...props} />
              <StyledFormField label="Last Name" name="lastName" Component={Input} {...props} />
            </Row>
            <StyledSubmitButton type="submit" value="Register" disabled={Object.keys(props.errors).length !== 0} />
            <p>
              Already have an account? Please, <Link to="/login">log in</Link>
            </p>
          </>
        )}
      </Form>
    </>
  );
};

export default React.memo(Register);
