import ModuleLibrary from "../index";

describe("Index.js", () => {
  it("should register all components when installed", () => {
    const component = jest.fn();
    const Vue = { component };

    ModuleLibrary.install(Vue);

    // Test if a particular component was registered
    expect(component).toBeCalledWith("instant-search", expect.any(Object));
    expect(component).toBeCalledWith("search-index", expect.any(Object));
    expect(component).toBeCalledWith("search-results", expect.any(Object));
    expect(component).toBeCalledWith("search-box", expect.any(Object));
    expect(component).toBeCalledWith(
      "search-box-autocomplete",
      expect.any(Object)
    );

    // Test how many times component got registered
    const totalOfComponents = 5;
    expect(component).toHaveBeenCalledTimes(totalOfComponents);
  });
});
