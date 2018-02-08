<template lang="pug">
  .search-results
    slot(name="header" :hits="hits")
      h2.search-results__title {{ index }} ({{ hits.length }})
    .search-results__noresults(v-if="!hits.length && noResultsMessage") {{ noResultsMessage }}
    ul.search-results__list(v-if="hits.length")
      li.search-results__item(v-for="hit in hits")
        a.search-results__link(href="#" @click.prevent="selectHit(hit)")
          slot(:hit="hit")
            div(v-html="hit._highlightResult.name.value")
    slot(name="footer" :hits="hits")
</template>

<script>
export default {
  inject: ["_helper", "_index"],
  props: {
    index: {
      type: String,
      default() {
        // use parent injected index by default
        return this._index;
      }
    },
    noResultsMessage: {
      type: String,
      default: "No results found."
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localHelper: null,
      hits: []
    };
  },
  created() {
    this.localHelper = this._helper.derive(searchParams => {
      return searchParams.setIndex(this.index);
    });
    this.localHelper.on("result", content => {
      this.hits = content.hits;
    });
  },
  methods: {
    selectHit(hit) {
      // customize search results item click behavior
      this.$emit("hit:selected", hit);
    }
  }
};
</script>

<style scoped>
.search-results {
  padding: 10px;
}
.search-results__list {
  padding-left: 0;
}
.search-results__item {
  list-style: none;
}
.active {
  background-color: darkgreen;
  color: white;
  list-style: none;
}
</style>
