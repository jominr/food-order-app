import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  })
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState)=>({
      ...prevState, // 保留之前要搜索的选项
      searchQuery: searchFormData.searchQuery
    }))
  }
  const restSearch=()=>{
    setSearchState((prevState)=>({
      ...prevState, // 保留之前要搜索的选项
      searchQuery: "",
    }))
  };
  
  if (isLoading) {
    return <span>Loading ...</span>
  }
  
  if (!results?.data || !city) {
    return <span>No results found</span>
  }

  return (
    // large screen: two column layout, the left column is going to be fixed to 250ox, the right column is going to take up all the remaining space container
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        insert cuisines here :)
      </div>

      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={restSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant)=>(
          <SearchResultCard key={restaurant._id} restaurant={restaurant}/>
        ))}
        
        
      </div>


      

    </div>
  );
};

export default SearchPage;