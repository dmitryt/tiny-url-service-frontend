import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Form from '../molecules/Form';
import { Redirect, Link } from 'react-router-dom';

import axios from '../../services/axios';
import { errorToast, successToast } from '../../services/toast';

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
  const [isRegistered, setRegistered] = useState(false);
  const validate = useCallback(({ data }) => {
    let errors = {};
    if (data.password && data.password !== data.passwordConfirmation) {
      errors = {...errors, passwordConfirmation: 'Password should be equal with confirmation'};
    }
    return errors;
  }, []);
  const onSubmit = useCallback(async ({ passwordConfirmation, ...data}) => {
    try {
      await axios.post('/auth/register', data);
      successToast('User was registered successfully. Please sign in');
      setRegistered(true);
    } catch (e) {
      errorToast('Authorization failed');
    }
  }, [setRegistered]);
  if (isRegistered) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <>
      <Centered>
        <h2>Registration Form</h2>
      </Centered>
      <Form validate={validate} requiredFields={['username', 'password']} onSubmit={onSubmit}>
        {(props) => (
          <>
            <StyledFormField label="Username" name="username" required Component={Input} {...props} />
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
