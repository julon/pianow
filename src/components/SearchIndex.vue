<template lang="pug">
  .SearchIndex
    slot
</template>

<script>
import algoliasearchHelper from "algoliasearch-helper";

export default {
  inject: ["client"],
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
  provide() {
    this.helper = algoliasearchHelper(this.client, this.name, this.options);
    return {
      mainIndex: this.name,
      helper: this.helper
    };
  },
  created () {
    this.helper.search()
  }
};
</script>
