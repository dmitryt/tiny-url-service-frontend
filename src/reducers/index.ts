import { State as LinksState, LinkAction } from './linksReducer';
import { State as UserState, UserAction } from './userReducer';

export type Action = LinkAction | UserAction;

export type Link = {
  _id: string;
  value: string;
};

export type State = {
  links: LinksState;
  user: UserState;
};

export const InitialState: State = {
  links: {
    items: [],
  },
  user: {
    isAuthorized: false,
    data: null,
  },
};