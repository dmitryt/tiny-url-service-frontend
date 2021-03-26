import { useMemo, useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import theme from './theme';
import './App.css';
import Home from './components/pages/Home';
import useCombinedReducer from './hooks/useCombinedReducer';
import withProtect from './hocs/withProtect';
import linksReducer from './reducers/linksReducer';
import DispatchContext from './contexts/dispatchContext';
import { Action, State, InitialState } from './reducers';
import Header from './components/organisms/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import NotFound from './components/pages/NotFound';
import userReducer from './reducers/userReducer';
import config from './config';

const Container = styled.div`
  margin: 2rem auto 0;
  width: 600px;
`;

const ProtectedHome = withProtect(Home);

function App() {
  const initialState = useMemo<State>(() => {
    const result = sessionStorage.getItem(config.storageKey);
    try {
      if (result) {
        return JSON.parse(result);
      }
    } catch (e) {
    }
    return InitialState;
  }, [sessionStorage]);
  const [state, dispatch] = useCombinedReducer<State, any>({
    links: useReducer(linksReducer, initialState.links || {items: []}),
    user: useReducer(userReducer, initialState.user),
  });
  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={[state, dispatch]}>
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/">
                <ProtectedHome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </Router>
      </DispatchContext.Provider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
