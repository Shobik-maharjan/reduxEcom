import axios from "axios";
import {
  ADD_TO_MY_LIST,
  DISCOVER_MOVIE_LIST,
  DISCOVER_TV_LIST,
  GET_MY_LIST,
  MOVIE_REQUEST,
  MOVIE_REQUEST_SUCCESS,
  NOWPLAYING_MOVIE_LIST,
  POPULAR_MOVIE_LIST,
  RECOMMENDEDATION_LIST,
  RESET_SEARCH,
  SEARCH_MOVIE,
  SIMILAR_LIST,
  TRENDING_MOVIE_LIST,
  UPCOMING_MOVIE_LIST,
} from "../constants/userConstants";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/config";
import { onAuthStateChanged } from "firebase/auth";

const apiKey = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_URL;
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";

export const nowPlayingMovieList = () => async (dispatch: any) => {
  try {
    dispatch({
      type: MOVIE_REQUEST,
    });
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
    dispatch({
      type: MOVIE_REQUEST,
    });
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
    dispatch({
      type: MOVIE_REQUEST,
    });
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
    dispatch({
      type: MOVIE_REQUEST,
    });
    const {
      data: { results },
    } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
    dispatch({
      type: POPULAR_MOVIE_LIST,
      payload: results,
    });
    dispatch({
      type: MOVIE_REQUEST_SUCCESS,
    });
  } catch (e) {
    console.log(e);
  }
};

export const discoverMovieList =
  (page = 1) =>
  async (dispatch: any) => {
    dispatch({
      type: MOVIE_REQUEST,
    });
    try {
      const data = await axios.get(
        `${url}/discover/movie?api_key=${apiKey}&page=${page}`
      );
      const results = data.data.results;
      const totalMoviePage = data.data.total_pages;
      dispatch({
        type: DISCOVER_MOVIE_LIST,
        payload: results,
        totalMoviePage,
      });
      setTimeout(() => {
        dispatch({
          type: MOVIE_REQUEST_SUCCESS,
        });
      }, 1000);
      dispatch({
        type: RESET_SEARCH,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const discoverTvList =
  (page = 1) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: MOVIE_REQUEST,
      });
      const data = await axios.get(
        `${url}/discover/tv?api_key=${apiKey}&page=${page}`
      );
      const results = data.data.results;
      const totalTvPage = data.data.total_pages;
      // console.log(totalTvPages);
      const filterResults = results.filter(
        (item: any) => item.poster_path !== null
      );
      dispatch({
        type: DISCOVER_TV_LIST,
        payload: filterResults,
        totalTvPage,
      });
      setTimeout(() => {
        dispatch({
          type: MOVIE_REQUEST_SUCCESS,
        });
      }, 1000);
      dispatch({
        type: RESET_SEARCH,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const recommendedList = (movieId: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: MOVIE_REQUEST,
    });
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
    dispatch({
      type: MOVIE_REQUEST,
    });
    const {
      data: { results },
    } = await axios.get(`${url}/${movieId}/similar?api_key=${apiKey}`);
    dispatch({
      type: SIMILAR_LIST,
      payload: results,
    });
    setTimeout(() => {
      dispatch({
        type: MOVIE_REQUEST_SUCCESS,
      });
    }, 1000);
  } catch (error: any) {
    console.log(error);
  }
};

export const addToMyList =
  ({
    title,
    imageUrl,
    itemId,
    category,
  }: {
    title: any;
    imageUrl: any;
    itemId: any;
    category: any;
  }) =>
  async (dispatch: any) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = user.uid;
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          const myList = docSnap?.data()?.myList;

          const isDuplicateData = myList.some(
            (item: any) =>
              item.title === title &&
              item.imageUrl === imageUrl &&
              item.itemId === itemId
          );
          if (!isDuplicateData) {
            await updateDoc(docRef, {
              myList: arrayUnion({ title, imageUrl, userId, itemId, category }),
            });
            dispatch({
              type: ADD_TO_MY_LIST,
              payload: {
                title,
                imageUrl,
                itemId,
                userId,
                category,
              },
            });
            toast.success("item added to list");
          } else {
            toast.error("already added to my list");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getMyList = () => async (dispatch: any) => {
  try {
    dispatch({
      type: MOVIE_REQUEST,
    });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const querySnapshot: any = await getDoc(doc(db, "users", userId));
        const data = querySnapshot.data().myList;
        dispatch({
          type: GET_MY_LIST,
          payload: data,
        });
        dispatch({
          type: MOVIE_REQUEST_SUCCESS,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMyList = (index: any) => async (dispatch: any) => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        await updateDoc(doc(db, "users", userId), {
          myList: arrayRemove(index),
        });
        toast.success("removed from my list");
        dispatch(getMyList());
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchMovieList =
  ({ searchQuery }: { searchQuery: any }) =>
  async (dispatch: any) => {
    try {
      const { query, category } = searchQuery;
      console.log(searchQuery);
      // console.log(category);

      const {
        data: { results },
      } = await axios.get(
        `${url}/search/${category}?api_key=${apiKey}&query=${query}`
      );

      dispatch({
        type: SEARCH_MOVIE,
        payload: results,
      });
    } catch (error) {
      console.log(error);
    }
  };
