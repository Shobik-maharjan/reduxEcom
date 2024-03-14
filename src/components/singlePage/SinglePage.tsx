import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  addToMyList,
  recommendedList,
  similarList,
} from "../redux/actions/movieActions";
import { useDraggable } from "react-use-draggable-scroll";
import { ToastContainer } from "react-toastify";

const SinglePage = () => {
  const movieId = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_URL;
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const [video, setVideo] = useState<any>();
  const dispatch: any = useDispatch();

  const { "*": value }: any = movieId;
  const itemId = movieId.movieId;

  const values = value.split("/");
  const category = values[0];
  // console.log(category);

  const { recommendedLists, similarLists, loading } = useSelector(
    (state: any) => state.movieList
  );

  const [singleMovieData, setSingleMovieData] = useState<any>("");
  const fetchData = async () => {
    const singleMovieData = await axios.get(
      `${url}/${value}?api_key=${apiKey}`
    );

    setSingleMovieData(singleMovieData.data);
  };

  const fetchVideo = async () => {
    const videoUrl = await axios.get(
      `${url}/${value}/videos?api_key=${apiKey}`
    );
    const keys = videoUrl.data.results.map(
      (item: any) => `https://www.youtube.com/watch?v=${item.key}`
    );
    setVideo(keys);
  };

  useEffect(() => {
    fetchVideo();
    fetchData();
  }, [value]);

  const recommendedListRef: any = useRef(null);
  const similarListRef: any = useRef(null);

  // Use the useDraggableScroll hook for each list
  const { events: recommendedListEvents } = useDraggable(recommendedListRef);
  const { events: similarListEvents } = useDraggable(similarListRef);

  useEffect(() => {
    if (value) {
      dispatch(recommendedList(value));
      dispatch(recommendedList);
      dispatch(similarList(value));
    }
  }, [value]);

  const {
    original_title,
    runtime,
    release_date,
    overview,
    production_countries,
    genres,
    production_companies,
    tagline,
    vote_count,
    poster_path,
    original_name,
  } = singleMovieData;

  const imageUrl = `${imgUrl}/${poster_path}`;

  return (
    <>
      {loading ? (
        <div
          id="show-loading"
          className={loading ? "display-loading + mt-[20%]" : ""}
        ></div>
      ) : (
        <div>
          {/* video */}
          <div className="md:flex">
            <div className="w-full md:w-6/12 mt-4 md:h-fit">
              <ReactPlayer
                url={video}
                controls={true}
                playing={false}
                width="100%"
                className="md:pl-4 md:h-fit"
              />
            </div>

            {/* Descriptopn */}
            <div className="w-full md:w-6/12 px-4 mt-4">
              {singleMovieData && (
                <div className="movie-details flex justify-start ">
                  {/* <div className="movie_image w-6/12">
                <img
                  src={`${imgUrl}/${singleMovieData.poster_path}`}
                  alt=""
                  className="w-full rounded-md"
                />
              </div> */}
                  <div className="movie_detail">
                    <div className="movie_title font-bold text-3xl">
                      <p>{original_title ? original_title : original_name}</p>
                    </div>
                    <div>
                      <p>{runtime ? runtime + " min" : ""}</p>
                    </div>
                    <div className="w-full movie_description text-sm py-2">
                      <p className="text-justify">{overview}</p>
                    </div>
                    <div className="country flex">
                      <h2 className="font-bold pr-2">Country:</h2>
                      <p>
                        {production_countries.map(
                          (item: any) => item.name + ", "
                        )}
                      </p>
                    </div>
                    <div className="genres flex">
                      <h2 className="font-bold pr-2">Genres:</h2>
                      <p>{genres.map((item: any) => item.name + ",  ")}</p>
                    </div>
                    <div className="genres flex">
                      <h2 className="font-bold pr-2">Release Date:</h2>
                      <p>{release_date}</p>
                    </div>
                    <div className="genres flex">
                      <h2 className="font-bold pr-2">Duration:</h2>
                      <p>{runtime} min</p>
                    </div>
                    <div className="production flex">
                      <h2 className="font-bold pr-2">Production:</h2>
                      <p>
                        {production_companies.map(
                          (item: any) => item.name + ", "
                        )}
                      </p>
                    </div>
                    <div className="tags flex">
                      <h2 className="font-bold pr-2">Tags:</h2>
                      <p>{tagline}</p>
                    </div>
                    <div className="vote flex">
                      <h2 className="font-bold pr-2">Vote:</h2>
                      <p>{vote_count}</p>
                    </div>

                    <div className="my-list">
                      <button
                        className="bg-gray-400/80 px-4 py-2 rounded-md hover:bg-gray-400/100 mt-2"
                        onClick={() =>
                          dispatch(
                            addToMyList({
                              title: original_title
                                ? original_title
                                : original_name,
                              imageUrl: imageUrl,
                              itemId: itemId,
                              category: category,
                            })
                          )
                        }
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ToastContainer />

          {/* recommendation list */}
          <div
            className="recommendation-list mt-6"
            ref={recommendedListRef}
            {...recommendedListEvents}
          >
            {recommendedLists && recommendedLists.length !== 0 ? (
              <div>
                <h2 className="pl-4 font-bold text-2xl">Recommended</h2>
                {recommendedLists && (
                  <div
                    className="px-4 w-full flex gap-2 overflow-x-scroll scrollbar-none"
                    ref={recommendedListRef}
                    {...recommendedListEvents}
                  >
                    {recommendedLists.map((item: any) => (
                      <Link to={`/${category}/${item.id}`}>
                        <div className="min-w-52" key={item.id}>
                          <img
                            className="flex rounded-md cursor-pointer hover:opacity-80"
                            src={`${imgUrl}/${item.poster_path}`}
                            alt=""
                          />
                          <p>
                            {item.original_title
                              ? item.original_title
                              : item.original_name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* suggestion list */}
          <div
            className="suggestion-list"
            ref={similarListRef}
            {...similarListEvents}
          >
            {similarLists && similarLists.length !== 0 ? (
              <div>
                <h2 className="pl-4 font-bold text-2xl">Similar</h2>
                {similarLists && (
                  <div
                    className="w-full flex gap-2 overflow-x-scroll scrollbar-none px-4"
                    ref={similarListRef}
                    {...similarListEvents}
                  >
                    {similarLists.map((item: any) => (
                      <Link to={`/${category}/${item.id}`}>
                        <div className="min-w-52" key={item.id}>
                          <img
                            className="flex rounded-xl cursor-pointer hover:opacity-80"
                            src={`${imgUrl}/${item.poster_path}`}
                            alt=""
                          />
                          <p>
                            {item.original_title
                              ? item.original_title
                              : item.original_name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePage;
