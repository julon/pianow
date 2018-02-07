<template lang="pug">
  .AutoComplete
    slot
      .hit(v-for="hit in hits") {{ index }} {{ hit.name }}
</template>

<script>
export default {
  inject: ["searchBarHelper", "mainIndex"],
  props: {
      index: {
        type: String,
        default () {
          return this.mainIndex
        }
      },
      options: {
        type: Object,
        default: null
      }
  },
  data() {
    return {
      microHelper: null,
      hits: []
    };
  },
  created() {
    this.microHelper = this.searchBarHelper.derive(searchParams => {
      return searchParams.setIndex(this.index)
    });
    this.microHelper.on("result", content => {
      this.hits = content.hits
    });
  }
};
</script>
