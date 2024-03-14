import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyList, getMyList } from "../redux/actions/movieActions";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
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
      <div className={loading ? "display-loading" : ""}></div>
      <div>
        {myLists && (
          <div className="flex gap-2 px-4 mt-4 flex-wrap justify-between">
            {myLists.map((item: any, index: any) => (
              <div className="w-28 md:w-48" key={index}>
                <Link to={`/${item.category}/${item.itemId}`}>
                  <img src={item.imageUrl} alt="" className="cursor-pointer" />
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
      </div>
      <ToastContainer />
    </>
  );
};

export default MyList;
