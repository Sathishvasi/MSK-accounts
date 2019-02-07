import Vue from 'vue';

Vue.filter("initcap", str => str.charAt(0).toLocaleUpperCase() + str.slice(1));

const filter = "";
export default filter;