export type UserAction = {
  type: 'SET_USER',
  data: string | null,
};

export type State = {
  uid: string | null;
  isAuthorized: boolean;
};

const userReducer = (state: State, action: UserAction): State => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuthorized: !!action.data,
        uid: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;