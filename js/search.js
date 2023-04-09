'use strict';

import { api, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./moviecard.js";

export function search() {
    const searchWrapper = document.querySelector("[search-wrapper]");
    const searchField = document.querySelector("[search-field]");

    const searchResultModal = document.createElement("div");
    searchResultModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchResultModal);

    let searchTimeout;

    searchField.addEventListener("input", function () {
        if (!searchField.value.trim()) {
            searchResultModal.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }

        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function () {
            fetchDataFromServer(` https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${searchField.value}&page=1&include_adult=false`,
                function ({ results: movieList }) {
                    searchWrapper.classList.remove("searching");
                    searchResultModal.classList.add("active");

                    //to remove old results
                    searchResultModal.innerHTML = "";

                    searchResultModal.innerHTML = `
                    <p class="label">Results For</p>
                    <h1 class="heading">${searchField.value}</h1>
                    <div class="movie-list">
                        <div class="grid-list"></div>
                    </div>
                    `;

                    for (const movie of movieList) {
                        const movieCard = createMovieCard(movie);
                        searchResultModal.querySelector(".grid-list").appendChild(movieCard);
                    }
                });
        }, 500);
    });
}