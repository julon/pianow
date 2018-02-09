import Vue from "vue";
import SearchBox from "../SearchBox";

function createVm(
  helper,
  index,
  value = undefined,
  placeholder,
  searchLabel = undefined,
  searchButtonLabel = undefined,
  resetButtonLabel = undefined
) {
  return new Vue({
    components: {
      SearchBox
    },
    data() {
      return {
        value: value || "",
        index,
        placeholder,
        searchLabel,
        searchButtonLabel,
        resetButtonLabel
      };
    },
    provide: {
      _helper: helper,
      _index: "parentIndex"
    },
    template: `
    <search-box 
      v-model="value"
      :index="index"
      :placeholder="placeholder"
      :search-label="searchLabel"
      :search-button-label="searchButtonLabel"
      :reset-button-label="resetButtonLabel"
      />`
  }).$mount();
}

describe("SearchBox.vue", () => {
  const search = jest.fn();
  const helper = {
    setQuery: jest.fn(() => ({
      search: () => search()
    }))
  };

  beforeEach(() => {
    search.mockClear();
    helper.setQuery.mockClear();
  });

  it("should call parent helper setQuery and search when submitting the form", () => {
    const vm = createVm(helper, "testIndex", "test");
    const child = vm.$children[0];
    child.submit();
    expect(helper.setQuery).toHaveBeenCalledTimes(1);
    expect(helper.setQuery).toBeCalledWith("test");
  });

  it("should call parent helper setQuery and search on value changes", next => {
    const vm = createVm(helper, "testIndex");
    vm.value = "test";
    vm.$nextTick(() => {
      expect(helper.setQuery).toHaveBeenCalledTimes(1);
      expect(helper.setQuery).toBeCalledWith("test");
      next();
    });
  });

  it("should show correct content with default value", () => {
    const vm = createVm(helper, "testIndex");
    expect(vm.$el.querySelector(".search-box__input").placeholder).toEqual("");
    expect(vm.$el.querySelector(".search-box__label").textContent).toEqual(
      "Search"
    );
    expect(vm.$el.querySelector(".search-box__submit-button").value).toEqual(
      "Search"
    );
    expect(vm.$el.querySelector(".search-box__reset-button").value).toEqual(
      "Reset"
    );
  });

  it("should show correct content with custom value", () => {
    const vm = createVm(
      helper,
      "testIndex",
      "",
      "custom placeholder",
      "Custom search 1",
      "Custom search 2",
      "Custom reset"
    );
    expect(vm.$el.querySelector(".search-box__input").placeholder).toEqual(
      "custom placeholder"
    );
    expect(vm.$el.querySelector(".search-box__label").textContent).toEqual(
      "Custom search 1"
    );
    expect(vm.$el.querySelector(".search-box__submit-button").value).toEqual(
      "Custom search 2"
    );
    expect(vm.$el.querySelector(".search-box__reset-button").value).toEqual(
      "Custom reset"
    );
  });

  it("should match the snapshot", () => {
    const vm = createVm(helper, "testIndex");
    expect(vm.$el).toMatchSnapshot();
  });
});
