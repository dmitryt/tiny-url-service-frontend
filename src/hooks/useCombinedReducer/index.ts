import { Dispatch, ReducerStateWithoutAction } from 'react';

import config from '../../config';

interface State {
  [key: string]: object;
}

const useCombinedReducer = <S, A>(combinedReducers: {[k: string]: [ReducerStateWithoutAction<any>, Dispatch<A>]}): [any, any] => {
  // Global State
  const state = Object.keys(combinedReducers).reduce(
    (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
    {}
  );

  // Global Dispatch Function
  const dispatch = (action: A) => {
    Object.keys(combinedReducers)
      .map(key => combinedReducers[key][1])
      .forEach(fn => fn(action));
    sessionStorage.setItem(config.storageKey, JSON.stringify(state));
  };

  return [state, dispatch];
};

export default useCombinedReducer;