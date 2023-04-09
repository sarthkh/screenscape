'use strict';

import { api, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./moviecard.js";
import { search } from "./search.js";

//to collect genre name and url param from localStorage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");

const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPages = 0

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=
${api}&sort_by=popularity.desc&include_adult=false&page=
${currentPage}&${urlParam}`,
    function ({ results: movieList, total_pages }) {
        totalPages = total_pages;
        document.title = `${genreName} Movies - ScreenScape`;

        const movieListEle = document.createElement("section");
        movieListEle.classList.add("movie-list", "genre-list");
        movieListEle.ariaLabel = `${genreName} Movies`;
        movieListEle.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${genreName} Movies</h1>
        </div>
        <div class="grid-list"></div>
        <button class="button load-more" load-more>Load More</button>
        `;

        //adding movie cards based on fetched item
        for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            movieListEle.querySelector(".grid-list").append(movieCard);
        }

        pageContent.appendChild(movieListEle);

        //to add load more button functionality
        document.querySelector("[load-more]").addEventListener("click", function () {
            if (currentPage >= totalPages) {
                //this = loading button
                this.style.display = "none";
                return;
            }
            currentPage++;
            //this = loading button
            this.classList.add("loading");

            fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
                ({ results: movieList }) => {
                    this.classList.remove("loading");

                    for (const movie of movieList) {
                        const movieCard = createMovieCard(movie);
                        movieListEle.querySelector(".grid-list").appendChild(movieCard);
                    }
                });
        });
    });

search();