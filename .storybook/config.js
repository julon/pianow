import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';
import Vue from 'vue';
import {PoweredBy} from 'vue-instantsearch';

// Import your custom components.
import ModuleLibrary from '@/index';

// Example theme
import './styles.css';

// Option defaults:
setOptions({
  name: 'Pianow',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
});

// Install this library
Vue.use(ModuleLibrary);

// Install Vue plugins
Vue.component('ais-powered-by', PoweredBy);

// Load stories
const req = require.context("../stories", true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);