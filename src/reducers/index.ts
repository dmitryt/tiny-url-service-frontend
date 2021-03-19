import { State as LinksState, LinkAction } from './linksReducer';

export type Action = LinkAction;

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