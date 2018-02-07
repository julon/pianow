<template lang="pug">
  .InstantSearch
    slot
</template>

<script>
import algoliasearch from 'algoliasearch'

export default {
  provide () {
    this.algoliasearch = algoliasearch(this.appId, this.apiKey, this.options)
    return {
      client: this.algoliasearch
    }
  },
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
  data () {
    return {
      algoliasearch: null
    }
  },
  destroyed () {
    // close connections
    // this.algoliasearch.destroy()
  }
}
</script>
