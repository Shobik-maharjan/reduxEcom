import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { LOGIN_USER, REGISTER_USER } from "../constants/userConstants";

const initialData = {
  userList: [],
};
// type userType = {
//   userName: string;
//   email: string;
//   password: string;
// };

// const loginUser = (email: any, password: any) => async (dispatch: any) => {
//   await signInWithEmailAndPassword(auth, email, password);
//   toast.success("user login successfully");
//   console.log("user login successfully");
//   dispatch({
//     type: "LOGIN_USER",
//     payload: {
//       email,
//       password,
//     },
//   });
// };
const userReducers = (state: any = initialData, action: any) => {
  switch (action.type) {
    case REGISTER_USER:
      //   const { userName, email, password } = action.payload;
      //   const registerUsers: any = createUserWithEmailAndPassword(
      //     auth,
      //     email,
      //     password
      //   );
      //   const user = {
      //     userName,
      //     email,
      //     password,
      //     uid: registerUsers.user.uid,
      //   };
      //   addDoc(collection(db, "users"), user);
      //   toast.success("user registered successfully");
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };

    case LOGIN_USER:
      return {
        ...state,
        userList: [action.payload],
      };
    default:
      return state;
  }
};

// export { loginUser };
export default userReducers;
