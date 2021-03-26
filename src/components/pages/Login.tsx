import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Form from '../molecules/Form';
import axios from '../../services/axios';
import { errorToast } from '../../services/toast';
import DispatchContext from '../../contexts/dispatchContext';

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
  const [isAuthorized, setAuthorized] = useState(false);
  const [, dispatch] = useContext(DispatchContext);
  const onSubmit = useCallback(async (payload) => {
    try {
      const { data } = await axios.post('/auth/login', payload);
      dispatch({ type: 'SET_USER', data: data.uid });
      setAuthorized(true);
    } catch (e) {
      errorToast('Username or password is invalid');
    }
  }, []);
  if (isAuthorized) {
    return (
      <Redirect to="/" />
    )
  }
  return (
    <>
      <Centered>
        <h2>Login Form</h2>
      </Centered>
      <Form requiredFields={['username', 'password']} onSubmit={onSubmit}>
        {(props) => (
          <>
            <StyledFormField label="Username" name="username" required Component={Input} {...props} />
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
