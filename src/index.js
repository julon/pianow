import InstantSearch from "./components/InstantSearch";
import SearchIndex from "./components/SearchIndex";
import SearchBox from "./components/SearchBox";
import SearchBoxAutocomplete from "./components/SearchBoxAutocomplete";
import SearchResults from "./components/SearchResults";

const LibraryModule = {
  InstantSearch,
  SearchIndex,
  SearchBox,
  SearchBoxAutocomplete,
  SearchResults,

  install(Vue) {
    // Register components with vue
    Vue.component("instant-search", InstantSearch);
    Vue.component("search-index", SearchIndex);
    Vue.component("search-box", SearchBox);
    Vue.component("search-box-autocomplete", SearchBoxAutocomplete);
    Vue.component("search-results", SearchResults);
  }
};

// Export library
export default LibraryModule;

// Export components
export {
  InstantSearch,
  SearchIndex,
  SearchBox,
  SearchBoxAutocomplete,
  SearchResults
};
