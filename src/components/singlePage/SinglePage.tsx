import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";

const SinglePage = () => {
  const movieId = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = import.meta.env.VITE_URL;
  const imgUrl = import.meta.env.VITE_IMAGE_URL;
  const [video, setVideo] = useState<any>();

  const [singleMovieData, setSingleMovieData] = useState<any>("");
  const fetchData = async () => {
    const singleMovieData = await axios.get(
      `${url}/${movieId.movieId}?api_key=${apiKey}`
    );
    setSingleMovieData(singleMovieData.data);
    // console.log(`${imgUrl}/${singleMovieData.sdata.poster_path}`);
  };

  const fetchVideo = async () => {
    const videoUrl = await axios.get(
      `${url}/${movieId.movieId}/videos?api_key=${apiKey}`
    );
    const keys = videoUrl.data.results.map(
      (item: any) => `https://www.youtube.com/watch?v=${item.key}`
    );
    setVideo(keys);
    // console.log(videoUrl);
  };
  console.log(video);

  useEffect(() => {
    fetchVideo();
    fetchData();
  }, []);

  return (
    <>
      <div>
        <ReactPlayer url={video} controls={true} width="100%" height="680px" />
      </div>
      <div>
        {singleMovieData && (
          <div className="movie-details flex justify-start mt-4 p-4">
            <div className="movie_image w-3/12">
              <img
                src={`${imgUrl}/${singleMovieData.poster_path}`}
                alt=""
                className="w-full"
              />
            </div>

            <div className="movie_detail pl-4">
              <div className="movie_title font-bold text-3xl">
                <p>{singleMovieData.original_title}</p>
              </div>
              <div>
                <p>{singleMovieData.runtime} min</p>
              </div>
              <div className="movie_description text-sm py-3">
                <p>{singleMovieData.overview}</p>
              </div>
              <div className="country flex">
                <h2 className="font-bold pr-2">Country:</h2>
                <p>
                  {singleMovieData.production_countries.map(
                    (item: any) => item.name + ", "
                  )}
                </p>
              </div>
              <div className="genres flex">
                <h2 className="font-bold pr-2">Genres:</h2>
                <p>
                  {singleMovieData.genres.map((item: any) => item.name + ",  ")}
                </p>
              </div>
              <div className="genres flex">
                <h2 className="font-bold pr-2">Release Date:</h2>
                <p>{singleMovieData.release_date}</p>
              </div>
              <div className="genres flex">
                <h2 className="font-bold pr-2">Duration:</h2>
                <p>{singleMovieData.runtime} min</p>
              </div>
              <div className="production flex">
                <h2 className="font-bold pr-2">Production:</h2>
                <p>
                  {singleMovieData.production_companies.map(
                    (item: any) => item.name + ", "
                  )}
                </p>
              </div>
              <div className="tags flex">
                <h2 className="font-bold pr-2">Tags:</h2>
                <p>{singleMovieData.tagline}</p>
              </div>
              <div className="vote flex">
                <h2 className="font-bold pr-2">Vote:</h2>
                <p>{singleMovieData.vote_count}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePage;
