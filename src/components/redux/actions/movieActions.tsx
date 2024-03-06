import axios from "axios";
import {
  NOWPLAYING_MOVIE_LIST,
  POPULAR_MOVIE_LIST,
  UPCOMING_MOVIE_LIST,
} from "../constants/userConstants";

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
