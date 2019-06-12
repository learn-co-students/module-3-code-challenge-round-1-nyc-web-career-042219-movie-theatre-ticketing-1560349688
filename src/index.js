const theatreId = 639;
const theatreURL = 'https://evening-plateau-54365.herokuapp.com/theatres/639'

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded, Captain');

    //local state
    let movieArray = []


    //grab where you want to append your showing on the dom
    let showingContainer = document.querySelector('#movie-container')

    //fetch GET to API
    fetch(theatreURL)
    .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        movieArray = data.showings
        console.log(movieArray)
        let movieHTML = movieArray.map(function(movie) {
            return movieHTMLHelper(movie)
            }).join("");
        showingContainer.innerHTML = movieHTML
      });

      //helper method to format cards in HTML
      function movieHTMLHelper(movie) {
          return `
        <div class="card">
            <div class="content">
                <div class="header">
                    ${movie.film.title}
                </div>
                <div class="meta">
                    ${movie.film.runtime} minutes
                </div>
                <div class="description">
                    ${(movie.capacity - movie.tickets_sold)} remaining tickets
                </div>
                <span class="ui label">
                    ${movie.showtime}
                </span>
            </div>
            <div class="extra content">
                <div class="ui blue button">Buy Ticket</div>
                </div>
            </div>
          `
      }





});
