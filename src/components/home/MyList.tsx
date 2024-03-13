import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyList, getMyList } from "../redux/actions/movieActions";
import { RiDeleteBin5Line } from "react-icons/ri";

const MyList = () => {
  const dispatch: any = useDispatch();
  // const data = useSelector((state: any) => state.movieList);
  // console.log(data);

  const { myLists } = useSelector((state: any) => state.movieList);
  // console.log(myLists);
  useEffect(() => {
    dispatch(getMyList());
  }, []);
  return (
    <>
      <div>
        {myLists && (
          <div className="flex gap-2 px-4">
            {myLists.map((item: any, index: any) => (
              <div className="w-40" key={index}>
                <img src={item.imageUrl} alt="" />
                <div className="flex justify-between p-2">
                  <p>{item.title}</p>
                  <button
                    onClick={() => dispatch(deleteMyList(index))}
                    key={item.userId}
                  >
                    <RiDeleteBin5Line className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyList;
