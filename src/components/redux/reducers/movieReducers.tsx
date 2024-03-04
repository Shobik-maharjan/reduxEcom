import {
  NOWPLAYING_MOVIE_LIST,
  POPULAR_MOVIE_LIST,
  UPCOMING_MOVIE_LIST,
} from "../constants/userConstants";

// const initialData: {
//   movielist: [];
// };

const movieReducers = (state: any = [], action: any) => {
  switch (action.type) {
    case NOWPLAYING_MOVIE_LIST:
      //   console.log(action);
      return {
        ...state,
        nowPlayingmMovieList: action.payload,
      };
    case UPCOMING_MOVIE_LIST:
      return {
        ...state,
        upcomingMovieList: action.payload,
      };
    case POPULAR_MOVIE_LIST:
      return {
        ...state,
        popularMovieList: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducers;
