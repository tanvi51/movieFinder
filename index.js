let input = document.querySelector("input")
let searchMovies = document.querySelector("button")
let movieContainer = document.getElementById("movie-container")
let notFound = document.querySelector(".not-found")

let watchlistMovies = JSON.parse(localStorage.getItem("data")) || []

searchMovies.addEventListener("click", (e) => {
  e.preventDefault()
  notFound.innerHTML = ""
  if (input.value === "") return
  movieContainer.innerHTML = ""
  let movieName = input.value
  fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=3be41dea`)
    .then((response) => response.json())
    .then((data) => {
      input.value = ""
      if (data.Response !== "False") {
        for (let movie of data.Search) {
          fetch(`https://www.omdbapi.com/?t=${movie.Title}&apikey=3be41dea`)
            .then((res) => res.json())
            .then((movies) => {
              let { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID} =
                movies
              movieContainer.innerHTML += `
                <div class="movie">
                    <img width="100" src=${Poster} alt="img" />
                   
                    <div class="movie-details">
                        <h3>${Title} <span>⭐${imdbRating}</span></h3>
                        <p>
                            <span class="runtime">${Runtime} </span> 
                            <span class="genre">${Genre}</span> 
                            <span onclick=watchlist("${imdbID}") class="icon-watchlist"> <i class="bi bi-plus-circle-fill">Watchlist</i>  </span>
                        </p>
                        <p class="plot">${Plot}</p>
                    </div>
                </div>
            
            
            `
            })
        }
      } else {
        movieContainer.innerHTML = ""
        notFound.innerHTML = `
        <p>Unable to find what you’re looking for. Please try another search.</p>
        `
      }
    })
})

function watchlist(imdbID) {
  let search = watchlistMovies.find((x) => x.imdbID === imdbID) || []
  alert("Movie added");
  if (search.imdbID === imdbID) {
  } 
  else {
    watchlistMovies.push({
    imdbID: imdbID,
    })
  }

  localStorage.setItem("data", JSON.stringify(watchlistMovies))
}