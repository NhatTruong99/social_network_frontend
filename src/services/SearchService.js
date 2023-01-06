import rootInstance from "./utilsService/rootInstance";

const getSearchResult = async (keyword) => {
    return await rootInstance.get("/search/" + keyword);
}

const SearchService = {
    getSearchResult
};

export default SearchService;