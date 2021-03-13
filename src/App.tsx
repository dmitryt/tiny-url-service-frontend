import { useReducer } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import theme from './theme';
import './App.css';
import Home from './components/pages/Home';
import useCombinedReducer from './hooks/useCombinedReducer';
import linksReducer, { State as LinksState } from './reducers/linksReducer';
import DispatchContext from './contexts/dispatchContext';
import { Action } from './types';
import Header from './components/organisms/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import NotFound from './components/pages/NotFound';

const Container = styled.div`
  margin: 2rem auto 0;
  width: 600px;
`;

type State = {
  links: LinksState;
};

function App() {
  const [state, dispatch] = useCombinedReducer<State, Action>({
    links: useReducer(linksReducer, {items: []}),
  });
  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/">
                <Home links={state.links.items} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </Router>
      </DispatchContext.Provider>
    </ThemeProvider>
  );
}

export default App;