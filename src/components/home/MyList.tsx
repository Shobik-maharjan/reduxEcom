import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyList, getMyList } from "../redux/actions/movieActions";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const MyList = () => {
  const dispatch: any = useDispatch();

  const { myLists, loading } = useSelector((state: any) => state.movieList);
  // console.log(myLists);
  useEffect(() => {
    dispatch(getMyList());
  }, []);

  return (
    <>
      <div className={loading ? "display-loading" : ""}>
        <div className="p-4">
          {!loading ? (
            <>
              <h2 className="text-2xl font-bold mb-6">My List</h2>
              {myLists && (
                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-2 mt-4">
                  {myLists.map((item: any, index: any) => (
                    <div key={index}>
                      <Link to={`/${item.category}/${item.itemId}`}>
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="cursor-pointer rounded-md"
                        />
                      </Link>
                      <div className="flex justify-between py-2 ">
                        <p>{item.title.slice(0, 10)}</p>
                        <button
                          onClick={() => {
                            dispatch(deleteMyList(item));
                          }}
                          key={item.userId}
                        >
                          <RiDeleteBin5Line className="text-red-500 text-3xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default MyList;
