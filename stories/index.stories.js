import { storiesOf } from "@storybook/vue";
const appId = "300GW1X3LE"
const apiKey = "96edf734961a8ab3ce014ce65b9d01cc"
const index1 = "actors"
const index2 = "bordeaux"
// Add more stories here to live develop your components
storiesOf("HelloWorld", module)
.add("Simple query", () => ({ // search-index declare a new instance of helper
  template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-bar v-model="test"></search-bar>
      <search-results/>
    </search-index>
  </instant-search>`,
  data () {
    return {
      test: ''
    }
  }
}))
.add("Simple query2", () => ({ // search-index declare a new instance of helper
  template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-index name="${index1}">
      <search-bar v-model="test" :options="options"></search-bar>
    </search-index>
  </instant-search>`,
  data () {
    return {
      test: '',
      options: {
        hitsPerPage: 5
      }
    }
  }
}))
.add("double query", () => ({ // search-index declare a new instance of helper
  template: `
  <instant-search app-id="${appId}" api-key="${apiKey}">
    <search-bar index="getstarted_actors"></search-bar>
  </instant-search>`
}));