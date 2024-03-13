type loginType = {
  email: string;
  password: string;
  loading: any;
};
type userType = loginType & {
  userName: string;
};

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig/config";
import { addDoc, collection } from "firebase/firestore";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_USER,
} from "../constants/userConstants";
import { toast } from "react-toastify";

export const registerUser =
  ({ userName, email, password }: Omit<userType, "loading">) =>
  async (dispatch: any) => {
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(users.user, {
        displayName: userName,
      });
      const user = {
        userName,
        email: users.user.email,
        password,
        uid: users.user.uid,
      };
      addDoc(collection(db, "users"), { user });

      dispatch({
        type: REGISTER_USER,
        payload: {
          userName,
          email,
          password,
          uid: users.user.uid,
        },
      });
      toast.success("user registered successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };

export const loginUser =
  ({ email, password, loading }: loginType) =>
  async (dispatch: any) => {
    try {
      if (loading === true) {
        return;
      }
      dispatch({
        type: LOGIN_REQUEST,
      });

      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
      toast.success("user login successfully");
      localStorage.setItem("user", user.user.uid);
      localStorage.setItem("userName", user.user.displayName || "");
      setTimeout(() => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: {
            email,
            uid: user.user.uid,
          },
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
      console.log(error);
    }
  };

export const logoutUser = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT_USER,
  });
  localStorage.clear();
};
