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

const Login = () => {
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <>
      <Centered>
        <h2>Login Form</h2>
      </Centered>
      <Form requiredFields={['email', 'password']} onSubmit={onSubmit}>
        {(props) => (
          <>
            <StyledFormField label="Email" name="email" required Component={Input} {...props} />
            <StyledFormField label="Password" name="password" type="password" required Component={Input} {...props} />
            <StyledSubmitButton type="submit" value="Login" disabled={Object.keys(props.errors).length !== 0} />
            <p>
              Don't have an account? Please, <Link to="/register">sign up</Link>
            </p>
          </>
        )}
      </Form>
    </>
  );
};

export default React.memo(Login);
