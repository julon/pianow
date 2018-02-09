<template lang="pug">
  .instant-search
    slot
      h1 You need to put a search-index element here :)
</template>

<script>
import algoliasearch from "algoliasearch";

export default {
  name: "InstantSearch",
  props: {
    appId: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  provide() {
    return {
      _client: algoliasearch(this.appId, this.apiKey, Object.assign({}, this.options))
    };
  }
};
</script>
