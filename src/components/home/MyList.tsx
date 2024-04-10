import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyList, getMyList } from "../redux/actions/movieActions";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const MyList = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const { myLists, loading } = useSelector((state: any) => state.movieList);
  console.log("🚀 ~ MyList ~ myLists:", myLists);
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
              {myLists && myLists.length !== 0 ? (
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
              ) : (
                <>
                  <div className="flex flex-col gap-4 items-center mb-10">
                    <h2 className="font-bold text-2xl">Your List is empty</h2>
                    <button
                      className="border px-4 py-2 w-fit rounded-md bg-green-600 text-white"
                      onClick={() => navigate("/")}
                    >
                      Continue search movie
                    </button>
                  </div>
                </>
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
