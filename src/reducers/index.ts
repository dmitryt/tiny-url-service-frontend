import { State as LinksState, LinksAction } from './linksReducer';

export type Action = LinksAction;

export type Link = {
  _id: string;
  value: string;
};

export type State = {
  links: LinksState;
};

export const InitialState: State = {
  links: {
    items: [],
  },
};