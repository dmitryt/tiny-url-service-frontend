export type UserAction = {
  type: 'SET_USER',
  data: User | null,
};

type User = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export type State = {
  isAuthorized: boolean;
  data: User | null;
};

const userReducer = (state: State, action: UserAction): State => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuthorized: !!action.data,
        data: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;