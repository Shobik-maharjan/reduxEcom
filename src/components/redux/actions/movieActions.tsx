import axios from "axios";
import {
  ADD_TO_MY_LIST,
  DISCOVER_MOVIE_LIST,
  DISCOVER_TV_LIST,
  GET_MY_LIST,
  NOWPLAYING_MOVIE_LIST,
  POPULAR_MOVIE_LIST,
  RECOMMENDEDATION_LIST,
  SIMILAR_LIST,
  TRENDING_MOVIE_LIST,
  UPCOMING_MOVIE_LIST,
} from "../constants/userConstants";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/config";
import { onAuthStateChanged } from "firebase/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_URL;
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";

export const nowPlayingMovieList = () => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=1`);
    dispatch({
      type: NOWPLAYING_MOVIE_LIST,
      payload: results,
    });
  } catch (e) {
    console.log(e);
  }
};

export const trendingMovieList = () => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/trending/movie/day?api_key=${apiKey}&page=1`);
    dispatch({
      type: TRENDING_MOVIE_LIST,
      payload: results,
    });
  } catch (e) {
    console.log(e);
  }
};

export const upComingMovieList = () => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
    dispatch({
      type: UPCOMING_MOVIE_LIST,
      payload: results,
    });
  } catch (e) {
    console.log(e);
  }
};

export const popularMovieList = () => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
    dispatch({
      type: POPULAR_MOVIE_LIST,
      payload: results,
    });
  } catch (e) {
    console.log(e);
  }
};

export const discoverMovieList =
  (page = 1) =>
  async (dispatch: any) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `${url}/discover/movie?api_key=${apiKey}&page=${page}`
      );
      const arr: any = await axios.get(
        `${url}/discover/movie?api_key=${apiKey}&page=${page}}`
      );

      dispatch({
        type: DISCOVER_MOVIE_LIST,
        payload: results,
        totalPage: arr.data.total_pages,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const discoverTvList = () => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/discover/tv?api_key=${apiKey}`);
    const filterResults = results.filter(
      (item: any) => item.poster_path !== null
    );
    dispatch({
      type: DISCOVER_TV_LIST,
      payload: filterResults,
    });
  } catch (e) {
    console.log(e);
  }
};

export const recommendedList = (movieId: any) => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/${movieId}/recommendations?api_key=${apiKey}`);
    dispatch({
      type: RECOMMENDEDATION_LIST,
      payload: results,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const similarList = (movieId: any) => async (dispatch: any) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${url}/${movieId}/similar?api_key=${apiKey}`);
    dispatch({
      type: SIMILAR_LIST,
      payload: results,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const addToMyList =
  (title: any, imageUrl: any) => async (dispatch: any) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(user.uid);
          const userId = user.uid;
          await updateDoc(doc(db, "users", userId), {
            myList: arrayUnion({ title, imageUrl, userId }),
          });
          dispatch({
            type: ADD_TO_MY_LIST,
            payload: {
              title,
              imageUrl,
              userId,
            },
          });
        }
      });
      toast.success("item added to list");
    } catch (error) {
      console.log(error);
    }
  };

export const getMyList = () => async (dispatch: any) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const querySnapshot: any = await getDoc(doc(db, "users", userId));
        const data = querySnapshot.data().myList;
        dispatch({
          type: GET_MY_LIST,
          payload: data,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMyList = (index: any) => async () => {
  console.log(index);

  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        await updateDoc(doc(db, "users", userId), {});
      }
    });
  } catch (error) {
    console.log(error);
  }
};
