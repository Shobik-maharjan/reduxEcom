import { useSelector } from "react-redux";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const { loading } = useSelector((state: any) => state.movieList);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="text-center bottom-0 py-4 w-full">copyright@{year}</div>
      )}
    </>
  );
};

export default Footer;
