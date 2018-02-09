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
        @focus="inputFocus"
        @blur="inputBlur"
        @input="updateValue($event.target.value)"
        @keydown.enter="inputKeyEnter"
        @keydown.up="inputKeyUp"
        @keydown.down="inputKeyDown"
        )
      input.search-box__submit-button.button(type="submit" :value="searchButtonLabel")
      input.search-box__reset-button.button(type="reset" :value="resetButtonLabel" @click.prevent.stop="updateValue('')")
    .search-box__autocomplete(v-show="isAutocompleteVisible" @click.stop="autocompleteFocus")
      slot
        search-results(v-on:hit:selected="updateValue($event.name)")
</template>
<script>
import algoliasearchHelper from "algoliasearch-helper";
import { setTimeout } from "timers";
import SearchBox from "./SearchBox";

export default {
  name: "SearchBoxAutocomplete",
  extends: SearchBox,
  inject: ["_client"],
  props: {
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
      hasAutocompleteFocus: false,
      // provide a separate helper for independant triggering of children derived helpers
      localHelper: algoliasearchHelper(
        this._client,
        this._index,
        Object.assign({}, this.options)
      ),
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
    isAutocompleteVisible() {
      return this.hasFocus && this.value.length > 0;
    },
    hasFocus() {
      return this.hasInputFocus || this.hasAutocompleteFocus;
    }
  },
  methods: {
    inputBlur() {
      // delay so hasAutocompleteFocus has time to trigger
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
    inputKeyEnter(event) {
      // trigger click on active element
      if (this.hasFocus && this.active) {
        event.preventDefault(); // don't trigger submit
        this.active.click();
      }
    },
    autocompleteReset() {
      // reset link active
      this.linkIndex = -1;
      this.setActiveLink();
    },
    autocompleteBlur() {
      this.hasAutocompleteFocus = false;
    },
    autocompleteFocus() {
      this.hasAutocompleteFocus = true;
    }
  },
  watch: {
    // whenever input search value changes
    value(newValue, oldValue) {
      // hide autocomplete pane
      this.autocompleteBlur();
      this.autocompleteReset();

      // recompute links array
      this.links = this.$el.getElementsByClassName("search-results__link");

      // trigger search
      this.localHelper.setQuery(newValue).search();
    }
  },
  provide() {
    return {
      _helper: this.localHelper
    };
  }
};</script>
