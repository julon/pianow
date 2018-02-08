import { storiesOf } from "@storybook/vue";
const appId = "300GW1X3LE";
const apiKey = "96edf734961a8ab3ce014ce65b9d01cc";
const index1 = "actors";
const index2 = "bordeaux";
const data = () => {
  return {
    input: "",
    options: {
      hitsPerPage: 7
    }
  };
};
// Add more stories here to live develop your components
storiesOf("SearchBox", module)
  .add("with simple query on default index", () => ({
    // search-index declare a new instance of helper
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-box v-model="input"></search-box>
      <search-results/>
    </search-index>
  </instant-search>`,
    data
  }))
  .add("with simple multi-indexes query and default index", () => ({
    // search-index declare a new instance of helper
    template: `
    <instant-search app-id="${appId}" api-key="${apiKey}">
      <search-index name="${index1}">
        <search-box v-model="input" :options="options"></search-box>
        <search-results/>
        <search-results index="${index2}"/>
      </search-index>
    </instant-search>`,
    data
  }));

storiesOf("SearchBoxAutocomplete", module)
  .add("with mono-index query and custom templates", () => ({
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-box-autocomplete v-model="input">
        <search-results v-on:hit:selected="inputChange">
          <template slot-scope="props">
            {{ props.hit.name }}
          </template>
        </search-results>
      </search-box-autocomplete>
      <search-results/>
    </search-index>
  </instant-search>`,
    data,
    methods: {
      inputChange($event) {
        this.input = $event.name;
      }
    }
  }))
  .add("with multi-indexes query", () => ({
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-box-autocomplete v-model="input" :options="options">
        <div class="column">
          <search-results index="${index2}" v-on:hit:selected="inputChange">
            <template slot-scope="props">
              <strong v-html="props.hit._highlightResult.name.value"></strong><br>
              {{ props.hit.year }} {{ props.hit.type }} {{ props.hit.domain }}
            </template>
          </search-results>
        </div>
        <div class="column">
          <search-results v-on:hit:selected="inputChange">
            <template slot-scope="props">
              {{ props.hit.name }}
            </template>
          </search-results>
        </div>
      </search-box-autocomplete>
      <search-results/>
    </search-index>
  </instant-search>`,
    data,
    methods: {
      inputChange($event) {
        this.input = $event.name;
      }
    }
  }));

storiesOf("SearchResults", module)
  .add("with simple index query", () => ({
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-results></search-results>
    </search-index>
  </instant-search>`
  }))
  .add("with multi-indexes query", () => ({
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-results></search-results>
      <search-results index="${index2}"></search-results>
    </search-index>
  </instant-search>`
  }))
  .add("with custom header, template, footer and options", () => ({
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}" :options="options">
      <search-results>
        <template slot="header" slot-scope="props">
          Custom title > {{ props.hits.length }} actors found.
        </template>
        <template slot-scope="props">
          <h2>{{ props.hit.name }}</h2>
          <div>Rating: {{ props.hit.rating }}</div><br>
        </template>
        <template slot="footer">
          Custom footer
        </template>
      </search-results>
    </search-index>
  </instant-search>`,
    data
  }));
