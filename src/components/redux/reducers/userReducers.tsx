import {
  LOADING,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_USER,
} from "../constants/userConstants";

const initialData = {
  userList: [],
  loading: [],
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
        userList: [action.payload],
      };
    case LOGIN_REQUEST:
      return {
        loading: true,
        fail: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userList: [action.payload],
        loading: false,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        loading: false,
        fail: true,
        message: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userList: [],
      };
    case LOADING:
      return {
        userList: [action.payload],
      };
    case LOGIN_FAIL:
      return {
        userList: [action.payload],
      };
    default:
      return state;
  }
};

// export { loginUser };
export default userReducers;
