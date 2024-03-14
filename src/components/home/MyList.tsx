import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyList, getMyList } from "../redux/actions/movieActions";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

const MyList = () => {
  const dispatch: any = useDispatch();
  // const data = useSelector((state: any) => state.movieList);
  // console.log(data);

  const { myLists } = useSelector((state: any) => state.movieList);
  // console.log(myLists);
  useEffect(() => {
    dispatch(getMyList());
  }, [myLists]);
  return (
    <>
      <div>
        {myLists && (
          <div className="flex gap-2 px-4">
            {myLists.map((item: any, index: any) => (
              <div className="w-40" key={index}>
                <img src={item.imageUrl} alt="" className="cursor-pointer" />
                <div className="flex justify-between py-2">
                  <p>{item.title}</p>
                  <button
                    onClick={() => dispatch(deleteMyList(item))}
                    key={item.userId}
                  >
                    <RiDeleteBin5Line className="text-red-500 text-2xl" />
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
