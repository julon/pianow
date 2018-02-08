<template lang="pug">
.search-box
  form(@submit.prevent="submit")
    div(role="search")
      label.search-label(for="search") Search
        p(id="error" role="alert")
      input#search.search-input(
        ref="input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @focus="inputFocus"
        @blur="inputBlur"
        @input="updateValue($event.target.value)"
        @keyup.enter="inputKeyEnter"
        @keydown.tab="inputKeyEnter" 
        @keydown.up="inputKeyUp" 
        @keydown.down="inputKeyDown"
        )
      input.button(type="submit" value="Search")
      button(type="button" @click="updateValue('')") reset
    .search-box__autocomplete(v-if="autocomplete" v-show="showAutocomplete" @click.stop="autocompleteFocus")
      slot
        search-results(v-on:hit:selected="updateValue($event.name)")
</template>

<script>
import algoliasearchHelper from "algoliasearch-helper";
import { setTimeout } from "timers";

export default {
  name: "SearchBox",
  inject: ["_client", "_helper", "_index"],
  props: {
    value: {
      type: String
    },
    autocomplete: {
      type: Boolean,
      default: false
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
      active: null,
      links: [],
      linkIndex: -1,
      hasInputFocus: false,
      hasAutoCompleteFocus: false,
      localHelper: null,
      hits: []
    };
  },
  created() {
    // blur when clicking outside
    document.body.addEventListener("click", this.autocompleteBlur);
  },
  destroyed() {
    // remove click outside event
    document.body.removeEventListener("click", this.autocompleteBlur);
  },
  computed: {
    showAutocomplete() {
      return this.hasFocus && this.value.length > 0;
    },
    hasFocus() {
      return this.hasInputFocus || this.hasAutoCompleteFocus;
    }
  },
  methods: {
    inputBlur() {
      // delay so hasAutoCompleteFocus has time to trigger
      setTimeout(() => (this.hasInputFocus = false), 200);
    },
    inputFocus() {
      this.autocompleteReset();
      this.hasInputFocus = true;
    },
    setActiveLink() {
      // remove existing active link
      if (this.active) {
        this.active.classList.remove("active");
        this.active = null;
      }
      // select new link
      if (this.linkIndex >= 0) {
        this.links[this.linkIndex].classList.add("active");
        this.active = this.$el.getElementsByClassName("active")[0];
      }
    },
    inputKeyUp() {
      if (this.linkIndex - 1 >= 0) {
        this.linkIndex--;
        this.setActiveLink();
      }
    },
    inputKeyDown() {
      if (this.linkIndex + 1 < this.links.length) {
        this.linkIndex++;
        this.setActiveLink();
      }
    },
    inputKeyEnter() {
      // trigger click on active element
      if (this.hasFocus && this.active) {
        this.active.click();
      }
    },
    autocompleteReset() {
      // reset link active
      this.linkIndex = -1;
      this.setActiveLink();
    },
    autocompleteBlur() {
      this.hasAutoCompleteFocus = false;
    },
    autocompleteFocus() {
      this.hasAutoCompleteFocus = true;
    },
    submit() {
      // trigger parent index search if autocomplete mode
      if (this.autocomplete) {
        this._helper.setQuery(this.value).search();
      }
    },
    updateValue(value) {
      this.$emit("input", value);
    }
  },
  watch: {
    // whenever input search value changes
    value(newValue, oldValue) {
      this.autocompleteBlur();
      this.autocompleteReset();

      // recompute links array
      this.links = this.$el.getElementsByClassName("search-results__link");

      // trigger search
      this.localHelper.setQuery(newValue).search();
    }
  },
  provide() {
    this.localHelper = this.autocomplete
      ? // create a separate helper for independant triggering
        algoliasearchHelper(this._client, this._index, this.options)
      : // No autocomplete, filter parent index directly
        this._helper;
    return {
      _helper: this.localHelper
    };
  }
};
</script>

<style scoped>
.search-box__autocomplete {
  position: absolute;
  background-color: grey;
  border: solid thin black;
}
</style>
