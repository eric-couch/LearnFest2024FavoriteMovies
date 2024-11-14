const OMDBAPIUrl = "http://www.omdbapi.com/?apikey="
const OMDBAPIKey = "86c39163";
let SearchTitle = "";
let MoviePoster = "http://img.omdbapi.com/?apikey=86c39163&i=";

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const searchGo = document.getElementById("searchTerm");
    searchGo.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            console.log("Enter key pressed");

            // async await work together
            (async () => {
                const movies = await getMovieData();
                console.log(movies);
                const favMovieList = document.getElementById("favMovieList");
                favMovieList.firstElementChild.innerHTML = "";
                movies.Search.forEach(movie => {
                    console.log(`Movie Title Returned from Search: ${movie.Title}`);
                    BuildMovieCard(movie);
                });
            })();
        }
    });
  });


function BuildMovieCard(movie) {
    const { Title, Year, imdbID, Poster } = movie;
    const movieCard = document.getElementById("movieCard");
    let movieCardClone = movieCard.cloneNode(true);
    movieCardClone.querySelector("#moviePoster").src = MoviePoster + imdbID;
    let cardBody = movieCardClone.querySelector("#cardBody");
    cardBody.firstElementChild.innerText = `${Title} (${Year})`;
    let favButton = movieCardClone.querySelector("#favBtn");
    if (favButton != null) {
        favButton.addEventListener('click', () => {
            console.log(`Favoriting ${Title}`);
            AddToFavorites(movie);
        });
    }

    favMovieList.firstElementChild.appendChild(movieCardClone);
    movieCardClone.style.display = "block";
}

function AddToFavorites(movie) {
    let favMoviesStorage = localStorage.getItem("favMovies");
    if (favMoviesStorage === null) {
        favMoviesStorage = '[]';
    }
    let favMovies = JSON.parse(favMoviesStorage);
    favMovies.push(movie);
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
}

const getMovieData = async () => {
    SearchTitle = document.getElementById("searchTerm").value;
    console.log(`Search term: ${SearchTitle}`);
    const searchURL = `${OMDBAPIUrl}${OMDBAPIKey}&s=${SearchTitle}`;
    console.log(`Search URL: ${searchURL}`);
    // fetch returns data from some URL (api call)
    const response = await fetch(searchURL);
    return await response.json();
}