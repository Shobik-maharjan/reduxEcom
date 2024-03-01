type loginType = {
  email: string;
  password: string;
};
type userType = loginType & {
  userName: string;
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig/config";
import { addDoc, collection } from "firebase/firestore";
import { LOGIN_USER, REGISTER_USER } from "../constants/userConstants";
import { Navigate, useNavigate } from "react-router-dom";

export const registerUser =
  ({ userName, email, password }: userType) =>
  async (dispatch: any) => {
    try {
      console.log(userName, email, password);
      const users = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({
        type: REGISTER_USER,
        payload: {
          userName,
          email,
          password,
          uid: users.user.uid,
        },
      });
      const user = {
        userName,
        email: users.user.email,
        password,
        uid: users.user.uid,
      };
      addDoc(collection(db, "users"), { user });
    } catch (e) {
      console.log(e);
    }
  };

export const loginUser =
  ({ email, password }: loginType) =>
  async (dispatch: any) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: LOGIN_USER,
        payload: {
          email,
          uid: user.user.uid,
        },
      });
      localStorage.setItem("user", user.user.uid);
    } catch (error) {
      console.log(error);
    }
  };
