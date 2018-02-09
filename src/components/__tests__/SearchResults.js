import Vue from "vue";
import SearchResults from "../SearchResults";

function createVm(helper, index, noResultsMessage, options) {
  return new Vue({
    components: {
      SearchResults
    },
    data() {
      return {
        index,
        noResultsMessage,
        options
      };
    },
    provide: {
      _helper: helper,
      _index: "index"
    },
    template: `<search-results :index="index" :no-results-message="noResultsMessage" :options="options"/>`
  }).$mount();
}

describe("SearchResults.vue", () => {
  const helperOn = jest.fn();
  const helper = {
    derive: jest.fn(() => ({
      on: () => helperOn()
    }))
  };

  beforeEach(() => {
    helperOn.mockClear();
    helper.derive.mockClear();
  });

  it("should derive the parent helper only once on created", () => {
    createVm(helper, "testIndex", "Custom message", {});
    expect(helper.derive).toHaveBeenCalledTimes(1);
  });

  it("should register the helper event on result", () => {
    createVm(helper, "testIndex", "Custom message", {});
    expect(helperOn).toHaveBeenCalledTimes(1);
  });

  it("should show custom no results message if there is no hits", () => {
    const vm = createVm(helper, "testIndex", "Custom message", {});
    expect(
      vm.$el.querySelector(".search-results__noresults").textContent
    ).toEqual("Custom message");
  });

  it("should show default no results message if noResultsMessage is not set", () => {
    const vm = createVm(helper, "testIndex", undefined, {});
    expect(vm.$el.querySelector(".search-results__noresults").textContent).toBe(
      "No results found."
    );
  });

  it("should not show no results message if noResultsMessage is empty", () => {
    const vm = createVm(helper, "testIndex", "", {});
    expect(vm.$el.querySelector(".search-results__noresults")).toBeNull();
  });

  it("should match the snapshot", () => {
    const vm = createVm(helper, "testIndex", undefined, {});
    expect(vm.$el).toMatchSnapshot();
  });

  describe("mergeOptions", () => {
    const options = {
      random: "test"
    };
    const vm = createVm(helper, "testIndex", "", options);
    it("should return an object with correct merged properties from data scope", () => {
      const searchParameters = {
        test: "random"
      };
      const result = vm.$children[0].mergeOptions(searchParameters);
      expect(result).toEqual(Object.assign(searchParameters, options));
    });
  });
});
