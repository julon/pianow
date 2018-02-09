<template lang="pug">
.search-box
  form(@submit.prevent="submit")
    .search-box__container(role="search")
      label.search-box__label(for="search") {{ searchLabel }}
      input#search.search-box__input(
        ref="input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue($event.target.value)"
        )
      input.search-box__submit-button.button(type="submit" :value="searchButtonLabel")
      input.search-box__reset-button.button(type="reset" :value="resetButtonLabel" @click.prevent.stop="updateValue('')")
</template>

<script>
export default {
  name: "SearchBox",
  inject: ["_helper", "_index"],
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: "Search"
    },
    searchButtonLabel: {
      type: String,
      default: "Search"
    },
    resetButtonLabel: {
      type: String,
      default: "Reset"
    }
  },
  data() {
    return {
      localHelper: this._helper,
      hits: []
    };
  },
  methods: {
    submit() {
      // trigger parent index search
      this._helper.setQuery(this.value).search();
    },
    updateValue(value) {
      this.$emit("input", value);
    }
  },
  watch: {
    // whenever input search value changes
    value(newValue, oldValue) {
      // trigger search
      this.localHelper.setQuery(newValue).search();
    }
  }
};</script>
