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

const initialData = {
  movielist: [],
  addToMyLists: [],
};

const movieReducers = (state: any = initialData, action: any) => {
  switch (action.type) {
    case NOWPLAYING_MOVIE_LIST:
      //   console.log(action);
      return {
        ...state,
        nowPlayingMovieLists: action.payload,
      };
    case TRENDING_MOVIE_LIST:
      return {
        ...state,
        trendingMovieLists: action.payload,
      };
    case UPCOMING_MOVIE_LIST:
      return {
        ...state,
        upcomingMovieLists: action.payload,
      };
    case POPULAR_MOVIE_LIST:
      return {
        ...state,
        popularMovieLists: action.payload,
      };
    case DISCOVER_MOVIE_LIST:
      return {
        ...state,
        discoverMovieLists: action.payload,
        totalPage: action.totalPage,
      };
    case DISCOVER_TV_LIST:
      return {
        ...state,
        discoverTvLists: action.payload,
      };
    case RECOMMENDEDATION_LIST:
      return {
        ...state,
        recommendedLists: action.payload,
      };
    case SIMILAR_LIST:
      return {
        ...state,
        similarLists: action.payload,
      };
    case ADD_TO_MY_LIST:
      return {
        ...state,
        addToMyLists: [...state.addToMyLists, action.payload],
      };
    case GET_MY_LIST:
      return {
        ...state,
        myLists: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducers;
