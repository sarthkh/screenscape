'use strict';

import { api, fetchDataFromServer } from "./api.js";

export function sidebar() {

    // fetching all genres and then changing genre formats
    const genreList = {};
    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api}`, function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }
        genreLink();
    });

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");
    sidebarInner.innerHTML = `
    <div class="sidebar-inner">
        <div class="sidebar-list">
            <p class="title">Genre</p>
        </div>
        <div class="sidebar-list">
            <p class="title">Language</p>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=zh", "Mandarin")'>Mandarin</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=fr", "French")'>French</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ja", "Japanese")'>Japanese</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=es", "Spanish")'>Spanish</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ko", "Korean")'>Korean</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=de", "German")'>German</a>
            <a href="movielist.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
        </div>
        <div class="sidebar-footer">
            <p class="copyright">© Copyright 2023</p>
            <a href="https://github.com/sarthakz25">All rights reserved.</a>
            <img src="images/tmdb.png" width="150" alt="tmdb logo" class="tmdb">
        </div>
    </div>`;

    const genreLink = function () {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movielist.html");
            link.setAttribute("menu-close", "");
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
            link.textContent = genreName;

            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }
        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    }

    const toggleSidebar = function (sidebar) {
        // toggling sidebar on mobile screen
        const sidebarButton = document.querySelector("[menu-button]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");
        addEventOnElements(sidebarTogglers, "click", function () {
            sidebar.classList.toggle("active");
            sidebarButton.classList.toggle("active");
            overlay.classList.toggle("active");
        });
        addEventOnElements(sidebarClose, "click", function () {
            sidebar.classList.remove("active");
            sidebarButton.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}