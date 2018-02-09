import Vue from "vue";
import InstantSearch from "../InstantSearch";
import algoliasearch from "algoliasearch";
jest.mock("algoliasearch");

describe("InstantSearch.vue", () => {
  let Constructor;
  let vm;
  const options = {
    hasProperty: true
  }

  beforeEach(() => {
    algoliasearch.mockClear();
  });

  it("has a provide function which return an object with a _client property", () => {
    expect(typeof InstantSearch.provide).toBe("function");
    const provide = InstantSearch.provide();
    expect(typeof provide).toBe("object");
    expect(provide.hasOwnProperty('_client')).toBeTruthy();
  });

  beforeEach(() => {
    Constructor = Vue.extend(InstantSearch);
    vm = new Constructor({
      propsData: {
        appId: "appId",
        apiKey: "apiKey",
        options: options
      }
    }).$mount();
  });

  it("should call algoliasearch client with correct component props", () => {
    expect(algoliasearch).toHaveBeenCalledTimes(1);
    expect(algoliasearch).toBeCalledWith("appId", "apiKey", options);
  });

  it("should render correct contents", () => {
    expect(vm.$el.querySelector(".instant-search h1").textContent).toEqual(
      "You need to put a search-index element here :)"
    );
  });

  it("should match the snapshot", () => {
    expect(vm.$el).toMatchSnapshot();
  });
});
