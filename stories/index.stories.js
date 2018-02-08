import { storiesOf } from "@storybook/vue";
const appId = "300GW1X3LE";
const apiKey = "96edf734961a8ab3ce014ce65b9d01cc";
const index1 = "actors";
const index2 = "bordeaux";
// Add more stories here to live develop your components
storiesOf("HelloWorld", module)
  .add("Simple query", () => ({
    // search-index declare a new instance of helper
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-box v-model="test"></search-box>
      <search-results/>
    </search-index>
  </instant-search>`,
    data() {
      return {
        test: ""
      };
    }
  }))
  .add("Simple query2", () => ({
    // search-index declare a new instance of helper
    template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-box-autocomplete v-model="test" :options="options">
        <search-results index="${index2}" v-on:hit:selected="inputChange"></search-results>
        <search-results v-on:hit:selected="inputChange">
          <template slot-scope="props">
            {{ props.hit.name }}
          </template>
        </search-results>
      </search-box>
      <search-results/>
    </search-index>
  </instant-search>`,
    data() {
      return {
        test: "",
        options: {
          hitsPerPage: 5
        }
      };
    },
    methods: {
      inputChange($event) {
        this.test = $event.name
      }
    }
  }))
  .add("double query", () => ({
    // search-index declare a new instance of helper
    template: `
    <instant-search app-id="${appId}" api-key="${apiKey}">
      <search-index name="${index1}">
        <search-box v-model="test" :options="options" @input="inputChange"></search-box>
        <search-results/>
      </search-index>
    </instant-search>`,
    data() {
      return {
        test: "",
        options: {
          hitsPerPage: 5
        }
      };
    },
    methods: {
      inputChange() {
        // sound
      }
    }
  }));
