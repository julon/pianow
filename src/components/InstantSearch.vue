<template lang="pug">
  .instant-search
    slot
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
      _client: algoliasearch(this.appId, this.apiKey, this.options)
    };
  }
};
</script>
