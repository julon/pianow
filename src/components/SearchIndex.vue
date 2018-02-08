<template lang="pug">
  .search-index
    slot
</template>

<script>
import algoliasearchHelper from "algoliasearch-helper";

export default {
  name: "SearchIndex",
  inject: ["_client"],
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localHelper: algoliasearchHelper(this._client, this.name, this.options)
    };
  },
  mounted() {
    // trigger initial search
    this.localHelper.search();
  },
  provide() {
    return {
      _index: this.name,
      _helper: this.localHelper
    };
  }
};
</script>
