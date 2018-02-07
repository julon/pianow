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

      .hit(v-if="value.length > 0" v-for="hit in hits" v-html="hit._highlightResult.name.value")
</template>

<script>

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
  inject: ["helper"],
  props: {
    value: {
      type: String
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
      hits: []
    };
  },
  methods: {
    onSubmit () {
      this.helper.search(this.value)
    },
    updateValue(value) {
      // TODO: validation support & type support

      // trigger autocomplete search
      // it doesn't change main index cache
      this.helper
        .setQuery(value)
        .searchOnce(this.options, (error, content, state) => {
          console.log(state)
          this.hits = content.hits;
        });

      this.$emit("input", value);
    }
  },
  destroyed() {
    // remove all event listeners
    events.forEach(event => this.helper.removeAllListeners(event));
  }
};
</script>
