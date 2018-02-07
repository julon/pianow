<template lang="pug">
  form(@submit.prevent="onSubmit")
    div(role="search")
      label.search-label(for="search") Search
        p(id="error" role="alert")
      input#search.search-input(
        ref="input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue($event.target.value)")
      input.button(type="submit" value="Search")
    .test(v-if="autocomplete" v-show="value.length > 0")
      slot
        autocomplete-source
</template>

<script>
import algoliasearchHelper from "algoliasearch-helper";

const events = [
  "change",
  "search",
  "result",
  "error",
  "searchQueueEmpty",
  "searchForFacetValues",
  "searchOnce"
];

export default {
  inject: ["client", "helper", "mainIndex"],
  provide() {
    this.searchBarHelper = this.autocomplete
      ? // create a separate helper for independant triggering
        algoliasearchHelper(this.client, this.mainIndex, this.options)
      : // No autocomplete, filter parent index directly
        this.helper;
    return {
      searchBarHelper: this.searchBarHelper
    };
  },
  props: {
    value: {
      type: String
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      searchBarHelper: null,
      hits: []
    };
  },
  created() {},
  methods: {
    onSubmit() {
      // trigger parent index search if no autocomplete mode
      if (this.autocomplete) {
        this.helper.setQuery(this.value).search();
      }
    },
    updateValue(value) {
      // trigger search
      this.searchBarHelper.setQuery(value).search();

      // update model
      this.$emit("input", value);
    }
  },
  destroyed() {
    // remove all event listeners
    events.forEach(event => this.helper.removeAllListeners(event));
  }
};
</script>

<style scoped>
.test {
  position: absolute;
  background-color: white;
}
</style>

