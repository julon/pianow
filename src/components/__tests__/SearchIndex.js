import Vue from "vue";
import SearchIndex from "../SearchIndex";
import algoliasearchHelper from "algoliasearch-helper";

jest.mock("algoliasearch-helper");
algoliasearchHelper.mockImplementation(() => ({
  search: jest.fn()
}))

describe("SearchIndex.vue", () => {
  let vm;
  const client = "client"
  const options = {
    hasProperty: true
  };

  beforeEach(() => {
    algoliasearchHelper.mockClear();
  });

  it("has a mounted hook", () => {
    expect(typeof SearchIndex.mounted).toBe("function");
  });

  it("has a provide function which return an object with a _index and _helper properties", () => {
    expect(typeof SearchIndex.provide).toBe("function");
    const provide = SearchIndex.provide();
    expect(typeof provide).toBe("object");
    expect(provide.hasOwnProperty("_index")).toBeTruthy();
    expect(provide.hasOwnProperty("_helper")).toBeTruthy();
  });
  // function for creating Vue vm
  beforeEach(() => {
    vm = new Vue({
      template: `<search-index name="testName" :options="options"/>`,
      provide: {
        _client: client
      },
      data() {
        return {
          options
        };
      },
      components: {
        SearchIndex
      }
    }).$mount();
  });
  
  it("should create algoliasearch helper with correct component props", () => {
    expect(algoliasearchHelper).toHaveBeenCalledTimes(1);
    expect(algoliasearchHelper).toBeCalledWith(client, "testName", options);
  });

  it("should render correct contents", () => {
    expect(vm.$el.querySelector(".search-index h1").textContent).toEqual(
      "You can now put a search-results or/and a search-box"
    );
  });

  it("should match the snapshot", () => {
    expect(vm.$el).toMatchSnapshot();
  });
});
