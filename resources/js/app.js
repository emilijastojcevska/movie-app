import './bootstrap';

import.meta.glob([
    "../images/**"
  ]);

import { callOnLoad, clickSearch, getMovies} from "./getMovies";
window.callOnLoad = callOnLoad;
window.getMovies = getMovies;
window.clickSearch = clickSearch;
callOnLoad();

window.addEventListener('hashchange', function() {
  callOnLoad();
});




import { showModal } from "./getSingleMovie";
window.showModal = showModal;

import { closeModal } from "./getSingleMovie";
window.closeModal = closeModal;

import { showHideSortOptions } from "./getMovies";
window.showHideSortOptions = showHideSortOptions;
//   import { callAjax } from "./getMovies";

// window.callAjax = callAjax;
