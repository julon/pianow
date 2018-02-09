import { storiesOf } from "@storybook/vue";
import { withKnobs, text, object } from "@storybook/addon-knobs/vue";

const appId = "300GW1X3LE";
const apiKey = "96edf734961a8ab3ce014ce65b9d01cc";
const defaultIndex = "actors";
const secondIndex = "bordeaux";
const defaultOptions = {
  hitsPerPage: 3
};
const options1 = {
  hitsPerPage: 4
};
const options2 = {
  hitsPerPage: 5
};

// Add more stories here to live develop your components
storiesOf("SearchBox", module)
  .addDecorator(withKnobs)
  .add("with simple query on default index", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex">
      <search-box v-model="input"></search-box>
      <search-results/>
    </search-index>
  </instant-search>`,
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        input: ""
      };
    }
  }))
  .add("with simple multi-indexes query and default index", () => ({
    template: `
    <instant-search :app-id="appId" :api-key="apiKey">
      <search-index :name="defaultIndex">
        <search-box v-model="input"></search-box>
        <search-results/>
        <search-results :index="secondIndex"/>
      </search-index>
    </instant-search>`,
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        secondIndex: text("Second index", secondIndex),
        input: ""
      };
    }
  }));

storiesOf("SearchBoxAutocomplete", module)
  .addDecorator(withKnobs)
  .add("with mono-index query and custom templates", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex">
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
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        input: ""
      };
    },
    methods: {
      inputChange($event) {
        this.input = $event.name;
      }
    }
  }))
  .add("with multi-indexes query and options", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex">
      <search-box-autocomplete v-model="input" :options="defaultOptions">
        <div class="column">
          <search-results :index="secondIndex" v-on:hit:selected="inputChange">
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
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        secondIndex: text("Second index", secondIndex),
        defaultOptions: object("Default options", defaultOptions),
        input: ""
      };
    },
    methods: {
      inputChange($event) {
        this.input = $event.name;
      }
    }
  }));

storiesOf("SearchResults", module)
  .addDecorator(withKnobs)
  .add("with simple index query", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex">
      <search-results></search-results>
    </search-index>
  </instant-search>`,
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex)
      };
    }
  }))
  .add("with multi-indexes query", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex">
      <search-results></search-results>
      <search-results :index="secondIndex"></search-results>
    </search-index>
  </instant-search>`,
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        secondIndex: text("Second index", secondIndex)
      };
    }
  }))
  .add("with custom header, template, footer and options", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex" :options="defaultOptions">
      <search-results>
        <template slot="header" slot-scope="props">
          Custom header > {{ props.hits.length }} actors found.
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
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        defaultOptions: object("Default options", defaultOptions)
      };
    }
  }))
  .add("with multi-indexes and different options for each", () => ({
    template: `
  <instant-search :app-id="appId" :api-key="apiKey">
    <search-index :name="defaultIndex" :options="defaultOptions">
      <search-results></search-results>
      <search-results :options="options1"></search-results>
      <search-results :index="secondIndex" :options="options2"></search-results>
    </search-index>
  </instant-search>`,
    data() {
      return {
        appId: text("appId", appId),
        apiKey: text("apiKey", apiKey),
        defaultIndex: text("Default index", defaultIndex),
        defaultOptions: object("Default options", defaultOptions),
        secondIndex: text("Second results index", secondIndex),
        options1: object("Second results options", options1),
        options2: object("Third results options", options2)
      };
    }
  }));
