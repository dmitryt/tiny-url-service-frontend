import React, { useContext } from 'react';
import {
  Redirect
} from "react-router-dom";

import DispatchContext from '../../contexts/dispatchContext';

const withProtect = (Component: React.ComponentType) => (props: any) => {
  const [{ user: { isAuthorized } }] = useContext(DispatchContext);
  if (!isAuthorized) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <Component {...props} />
  );
};

export default withProtect;
