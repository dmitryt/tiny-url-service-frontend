import { createContext, Dispatch } from 'react';

import { State, InitialState, Action } from '../reducers';

export default createContext<[State, Dispatch<Action>]>([InitialState, () => {}]);