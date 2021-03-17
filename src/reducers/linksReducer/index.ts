import {Link} from '../../types';

export type LinksAction = {
  type: 'SET_LINKS',
  data: Link[],
};

type LinkAction = LinksAction;

export type State = {
  items: Link[];
};

const linksReducer = (state: State, action: LinkAction): State => {
  switch(action.type) {
    case 'SET_LINKS':
      return {
        ...state,
        items: action.data,
      };
    default:
      return state;
  }
};

export default linksReducer;