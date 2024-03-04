import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../constants/userConstants";

const initialData = {
  userList: [],
};
// type userType = {
//   userName: string;
//   email: string;
//   password: string;
// };

const userReducers = (state: any = initialData, action: any) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };

    case LOGIN_USER:
      return {
        ...state,
        userList: [action.payload],
      };
    case LOGOUT_USER:
      return {
        ...state,
        userList: [],
      };
    default:
      return state;
  }
};

// export { loginUser };
export default userReducers;
