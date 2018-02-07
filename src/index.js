import HelloWorld from "./components/HelloWorld";
import InstantSearch from "./components/InstantSearch";
import SearchIndex from "./components/SearchIndex";
import SearchBar from "./components/SearchBar";
import AutocompleteSource from "./components/Autocomplete";
import Results from "./components/Results";

const LibraryModule = {
  HelloWorld,
  InstantSearch,

  install(Vue) {
    // Register components with vue
    Vue.component("hello-world", HelloWorld);
    Vue.component("instant-search", InstantSearch);
    Vue.component("search-index", SearchIndex);
    Vue.component("search-bar", SearchBar);
    Vue.component("autocomplete-source", AutocompleteSource);
    Vue.component("search-results", Results);
  }
};

// Export library
export default LibraryModule;

// Export components
export { HelloWorld };
