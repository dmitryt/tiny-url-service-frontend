import {Link} from '../../types';

type LinksAction = {
  type: 'SET_LINKS',
  data: Link[],
};

type DeleteLinkAction = {
  type: 'DELETE_LINK',
  data: string,
};

type AddLinkAction = {
  type: 'ADD_LINK',
  data: Link,
};

export type LinkAction = LinksAction | DeleteLinkAction | AddLinkAction;

export type State = {
  items: Link[];
};

const linksReducer = (state: State, action: LinkAction): State => {
  switch(action.type) {
    case 'SET_LINKS':
      return {
        ...state,
        items: Array.isArray(action.data) ? action.data : [],
      };
    case 'ADD_LINK':
      return {
        ...state,
        items: [...state.items, action.data],
      };
    case 'DELETE_LINK':
      return {
        ...state,
        items: state.items.filter(({ _id }) => action.data !== _id),
      };
    default:
      return state;
  }
};

export default linksReducer;