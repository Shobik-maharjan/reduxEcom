import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discoverTvList } from "../redux/actions/movieActions";
import { Link } from "react-router-dom";

const TvShow = () => {
  const imgUrl = import.meta.env.VITE_IMAGE_URL;

  const dispatch = useDispatch<any>();
  const { discoverTvLists } = useSelector((state: any) => state.movieList);

  useEffect(() => {
    dispatch(discoverTvList());
  }, []);

  return (
    <>
      <div className="p-4">
        {/* <h2 className="text-2xl font-bold mb-6">TV SHOWS</h2> */}
        {discoverTvLists && (
          <div className="flex gap-2.5 flex-wrap justify-between">
            {discoverTvLists.map((item: any, i: any) => (
              <Link to={`/tv/${discoverTvLists[i].id}`} key={item.id}>
                <div className="mb-2 w-56">
                  <img
                    className=" flex rounded-md cursor-pointer hover:opacity-80"
                    src={`${imgUrl}/${item.poster_path}`}
                    alt={item.original_name}
                  />
                  <p>{item.original_name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TvShow;
