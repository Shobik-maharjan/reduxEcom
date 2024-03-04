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
import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../constants/userConstants";
import { toast } from "react-toastify";

export const registerUser =
  ({ userName, email, password }: userType) =>
  async (dispatch: any) => {
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("user registered successfully");
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
      toast.success("user login successfully");
      localStorage.setItem("user", user.user.uid);
      const userDetail = await getDocs(collection(db, "users"));
      userDetail.docs.map((doc: any) => {
        const userId = doc.data().user.uid;
        if (user.user.uid === userId) {
          localStorage.setItem("userName", doc.data().user.userName);
          // console.log(userId);
          const username = doc.data().user.userName;
          setTimeout(() => {
            dispatch({
              type: LOGIN_USER,
              payload: {
                email,
                username,
                uid: user.user.uid,
              },
            });
          }, 1000);
        }
      });
      // console.log(user.user);
    } catch (error) {
      console.log(error);
    }
  };

export const logoutUser = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT_USER,
  });
  localStorage.clear();
};
