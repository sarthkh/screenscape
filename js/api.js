'use strict';

const api = "a931731976a07c91bf2dc1208ed4ac3d";

const imageBaseURL = "https://image.tmdb.org/t/p/";

// fetching data from server using url and passes
// result in JSON data to a `callback` function
// along with an optional parameter if has `optionalParam` 

const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export {
    imageBaseURL,
    api,
    fetchDataFromServer
};