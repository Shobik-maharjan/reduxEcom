import {
  ADD_TO_CART,
  DISCOVER_MOVIE_LIST,
  DISCOVER_TV_LIST,
  NOWPLAYING_MOVIE_LIST,
  POPULAR_MOVIE_LIST,
  TRENDING_MOVIE_LIST,
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
        nowPlayingMovieList: action.payload,
      };
    case TRENDING_MOVIE_LIST:
      return {
        ...state,
        trendingMovieList: action.payload,
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
    case DISCOVER_MOVIE_LIST:
      return {
        ...state,
        discoverMovieList: action.payload,
      };
    case DISCOVER_TV_LIST:
      return {
        ...state,
        discoverTvList: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducers;
