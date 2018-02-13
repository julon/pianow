# pianow

![Rollup badge](https://img.shields.io/badge/Rollup-^0.53.3-ff69b4.svg)
![Jest](https://img.shields.io/badge/Jest-^22.0.4-blue.svg)
![Vue](https://img.shields.io/badge/Vue-^2.5.13-brightgreen.svg)
![Storybook](https://img.shields.io/badge/Storybook-^3.3.3-ff70a3.svg)
![Commitizen](https://img.shields.io/badge/Commitizen-enabled-brightgreen.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Npm badge](https://img.shields.io/npm/v/pianow.svg)
[![Build Status](https://travis-ci.org/julon/pianow.svg?branch=master)](https://travis-ci.org/julon/pianow)

> A VueJS Search Components with autocomplete and AlgoliaSearch :)

> A simple demo with a simple design and simple examples can be found [Here](https://julon.github.io/pianow/).

> This module was not published to NPM but can be publish if needed.

> Generated using [vue-cli-template-library](https://github.com/julon/vue-cli-template-library).

## Installation
```
npm install pianow
```
pianow can be used as a module in both CommonJS and ES modular environments.

When in non-modular environment, pianow will register all the components to vue by itself.</p>

### ES6
```js
//
// You can register a component manually
//
import { InstantSearch } from 'pianow';

export default {
  ...
  components: {
    InstantSearch
  },
  ...
};

//
// or register the whole module with vue
//
import VuePianow from 'pianow';

// Install this library
Vue.use(VuePianow);
```

### CommonJS
```js
//
// You can register a component manually
//
var Vue = require('vue');
var VuePianow = require('pianow');

var YourComponent = Vue.extend({
  ...
  components: {
    'instant-search': VuePianow.InstantSearch
  },
  ...
});

//
// or register the whole module with vue
//
var Vue = require('vue');
var VuePianow = require('pianow');

// Install this library
Vue.use(VuePianow);
```

### Browser

```html
<script src="path/to/vue/vue.min.js"></script>
<script src="path/to/algoliasearch/algoliasearch.min.js"></script>
<script src="path/to/algoliasearch-helper/algoliasearch-helper.min.js"></script>
<script src="path/to/pianow/dist/pianow.min.js"></script>
<!-- Components are registered globally -->
```

### After that, you can use it in your templates:

```html
<instant-search></instant-search>
```

## Components

### InstantSearch

> This component is a wrapper responsible to init the algolia client and provide it to all children elements which can retrieve the client by setting appropriate inject values.

#### Usage

```html
<instant-search app-id="YOUR_APP_ID" api-key="YOUR_API_KEY">
  <!-- Your custom template -->
</instant-search>
```

#### Properties

| Property | Type | Description | Required |
| ---: | :--- | :--- | :--- |
| `appId` | `String` | The appId from your algolia account. | `true` |
| `apiKey` | `String` | The apiKey from your algolia account. | `true` |

#### Provide
| Name | Description |
| ---: | :--- |
| `_client` | The Algolia client instanciated with the properties above to be used in children components. |

### SearchIndex

> This component is another wrapper which will instanciate an algoliasearch helper linked to an index. You can put as many SearchIndex components inside an InstantSearch or SearchIndex components. Children will inject the closest providers.

#### Usage

```html
<instant-search app-id="YOUR_APP_ID" api-key="YOUR_API_KEY">
  <search-index :name="indexName" :options="indexOptions">
    <!-- Your custom template -->
  </search-index>
</instant-search>
```

#### Injected Properties (Required)

| Property | Type | Description |
| ---: | :--- | :--- |
| `_client` | `Object` | The Algolia Client provided by a parent component such as the InstantSearch component. |

#### Properties

| Property | Type | Description | Required |
| ---: | :--- | :--- | :--- |
| `name` | `String` | The name of the default index. | `true` |
| `options` | `String` | The default SearchParameters for this index. | `false` |

#### Provide

| Name | Description |
| ---: | :--- |
| `_index` | This index name to be used as default index to query in childrens. |
| `_helper` | The Algoliasearch helper instanciated with the properties above to be used in children components. |

### SearchResults

> This component is used to show a parent index results. It's configurable, customizable and lovable. You can put your own markup around and inside it

#### Usage

```html
<instant-search app-id="YOUR_APP_ID" api-key="YOUR_API_KEY">
  <search-index :name="indexName" :options="indexOptions">
    <!-- Default search results view -->
    <search-results/>
    <!-- Search results view with different index from parent index -->
    <search-results index="anotherIndex"></search-results>
    <!-- Search results view with different index from parent index with options -->
    <search-results index="anotherIndex" :options="options"></search-results>
    <!-- Search results with item clicked listener -->
    <search-results v-on:hit:selected="updateSearchBoxValueForExampleOrGoSomewhere"></search-results>
    <!-- Search results view with different index with custom template -->
    <search-results index="anotherIndex">
      <!-- Default slot for item templating -->
      <template slot-scope="props">
        <h2>{{ props.hit.name }}</h2>
      </template>
      <!-- Header slot -->
      <template slot="header" slot-scope="props">
        Header {{ props.hits.length }} item found.
      </template>
      <!-- Footer slot -->
      <template slot="footer" slot-scope="props">
        Footer {{ props.hits.length }} item found.
      </template>
    </search-results>
  </search-index>
</instant-search>
```

#### Injected Properties (Required)

| Property | Type | Description |
| ---: | :--- | :--- |
| `_helper` | `Object` | The Algoliasearch helper provided by a parent component such as the SearchIndex component or the SearchBoxAutocomplete. |
| `_index` | `String` | The index name which will be used by default if none is set in properties. |

#### Properties

| Property | Type | Description | Required |
| ---: | :--- | :--- | :--- |
| `index` | `String` | The name of the index to use. | `false` |
| `options` | `Object` | The SearchParameters for this SearchResults view. | `false` |

#### Events

| EventName | EventArg | Description |
| ---: | :--- | :--- |
| `hit:selected` | `hit` | Trigger when a result item is clicked. You can listen to it and compute an action with the algolia `hit` object. |

### SearchBox

> This component is used to set a custom query and trigger a search in a parent index which will update all child search-results. A search form as it should be.

#### Usage

```html
<instant-search app-id="YOUR_APP_ID" api-key="YOUR_API_KEY">
  <search-index :name="indexName" :options="indexOptions">
    <!-- Our search-box, since it is a custom input, you need to link it to a component data var -->
    <search-box v-model="yourDataVar"/>

    <!-- The following search results will update their content with the result from the new query -->
    <search-results/>
    <!-- Update as well but against anotherIndex -->
    <search-results index="anotherIndex"></search-results>
    <!-- Update as well but against anotherIndex and options-->
    <search-results index="anotherIndex" :options="options"></search-results>
  </search-index>
</instant-search>
```

#### Injected Properties (Required)

| Property | Type | Description |
| ---: | :--- | :--- |
| `_helper` | `Object` | The Algoliasearch helper provided by a parent component such as the SearchIndex component. |

#### Properties

| Property | Type | Description | Required |
| ---: | :--- | :--- | :--- |
| `value` | `String` | The value of the current input. | `false` |
| `placeholder` | `String` | A custom input placeholder. [default: ""] | `false` |
| `searchLabel` | `String` | A custom input search label. [default: "Search"] | `false` |
| `searchButtonLabel` | `String` | A custom input search button label. [default: "Search"] | `false` |
| `resetButtonLabel` | `String` | A custom input reset label. [default: "Reset"] | `false` |

### SearchBoxAutocomplete

> This component is the previous component with extra supercharge autocomplete support. Hardcore!
> It can trigger parent index search and also query by itself as much sub search-results components as you want.
> By default, a click on a autocomplete result item will update the search-box value. You may customize this by override the default slot template and add a listener to the search-results child components.

#### Usage

```html
<instant-search app-id="YOUR_APP_ID" api-key="YOUR_API_KEY">
  <search-index :name="indexName" :options="indexOptions">
    <!-- default autocomplete search-box -->
    <search-box-autocomplete/>

    <!-- custom templated autocomplete search-box -->
    <search-box-autocomplete>
      <!-- You can use all the api of search-results in this autocomplete template as well (multi-indexes, separate options with same-index, etc) -->
      <search-results/>
    </search-box-autocomplete>

    <!-- Independant result from search-index -->
    <search-results/>
  </search-index>
</instant-search>
```
#### Injected Properties (Required)

| Property | Type | Description |
| ---: | :--- | :--- |
| `_client` | `Object` | The Algolia Client provided by a parent component such as the InstantSearch component. It will be used to create a new algoliasearch helper with independant triggering flow. |
| `_helper` | `Object` | The Algoliasearch helper provided by a parent component such as the SearchIndex component. |
| `_index` | `String` | The index name which will be used by default if none is set in properties. |

#### Properties

| Property | Type | Description | Required |
| ---: | :--- | :--- | :--- |
| `options` | `Object` | The default SearchParameters for the child components. | `false` |

#### Provide

| Name | Description |
| ---: | :--- |
| `_helper` | The Algoliasearch helper instanciated with the properties above to be used in children components. |

## Choices & Architecture

The aim of this POC is to implemented an architecture which would allow you to compose your view really easily and with as much options and customizations as you want.

Leveraging the power of inject/provide in VueJS, it allows us to think of indexes as bags which can hold other bags and so on.
All SearchIndex rely on a single parent InstantSearch's client instance. Easier to manage connections as it is centralized.

Every SearchIndex and SearchBoxComponent which conceptually has at least one child SearchResults to handle, instanciate a new instance of helper to be pass to children.

Every SearchResults instanciate a DerivedHelper from the immediate parent's helper to allow it to hold a default behavior as such as a customized behavior.

Flexibility, strong default, easy life.

## Todo

- [ ] Add Algoliasearch and Algoliasearch-helper error management
- [ ] Add SearchBoxAutocomplete unit-test file
- [ ] Add support for custom css framework theming
- [ ] Add stalled hints on search input
- [ ] Add multi-facets reactive update
- [ ] Write Documentation for custom CSS markup
- [ ] Separate this README into several md files because it's way too long

## Changelog

See the GitHub [release history](https://github.com/julon/pianow/releases).

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).
