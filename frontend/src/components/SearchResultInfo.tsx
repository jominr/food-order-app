import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
}

const SearchResultInfo = ({total, city} : Props) => {
  return (
    <span className="text-xl font-bold ">
      {total} Restaurants found in {city}
      <Link to="/" className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
    </span>
  );
};

export default SearchResultInfo;