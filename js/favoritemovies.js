const OMDBAPIUrl = "http://www.omdbapi.com/?apikey="
const OMDBAPIKey = "86c39163";
let SearchTitle = "";
let MoviePoster = "http://img.omdbapi.com/?apikey=86c39163&i=";

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    let favMoviesStorage = localStorage.getItem("favMovies");
    console.log(favMoviesStorage);
    if (favMoviesStorage != null) {
        let favoriteMovies = JSON.parse(favMoviesStorage);
        favoriteMovies.forEach((movie) => {
            (async () => {
                const movieDetails = await getMovieDetails(movie.imdbID);
                console.log(`movie details: ${movieDetails}`);
                BuildMovieCard(movieDetails);
            })();
        });
    }
});

function BuildMovieCard(movie) {
    const { Title, Year, imdbID, Poster, Genre, Actors, Plot } = movie;
    const movieCard = document.getElementById("movieCard");
    let movieCardClone = movieCard.cloneNode(true);
    movieCardClone.querySelector("#moviePoster").src = MoviePoster + imdbID;
    let cardBody = movieCardClone.querySelector("#cardBody");
    cardBody.firstElementChild.innerText = `${Title} (${Year})`;
    let genre = cardBody.querySelector("#genre");
    genre.innerText = `Genre: ${Genre}`;
    genre.style.fontWeight = "bold";
    let plot = cardBody.querySelector("#plot");
    plot.innerText = `Plot: ${Plot}`;
    favMovieList.firstElementChild.appendChild(movieCardClone);
    movieCardClone.style.display = "block";
}


const getMovieDetails = async (imdbID) => {
    const movieDetailsURL = `${OMDBAPIUrl}${OMDBAPIKey}&i=${imdbID}`;
    const response = await fetch(movieDetailsURL);
    return await response.json();
};