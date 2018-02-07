<template lang="pug">
  .Results
    .hit(v-for="hit in hits" :key="hit.objectID") {{ hit.name }}
</template>

<script>
export default {
  inject: ['helper'],
  data () {
    return {
      hits: []
    }
  },
  created () {
    this.helper.on('result', (content) => {
      this.hits = content.hits
    })
  },
  destroyed () {
    // remove listener
  }
}
</script>

<style>
.Results {
  margin-top: 40px;
  background-color: chocolate;
  padding: 10px;
}
</style>
