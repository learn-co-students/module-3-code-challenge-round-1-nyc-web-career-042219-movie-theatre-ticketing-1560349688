const theatreId = 639;
const theatreURL = 'https://evening-plateau-54365.herokuapp.com/theatres/639'

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded, Captain');

    //local state
    let movieArray = [];
    let selectedMovieId = null;
    let selectedMovie = null;

    //grab where you want to append your showing on the dom
    let showingContainer = document.querySelector('#movie-container')

    //fetch GET to API
    fetch(theatreURL)
    .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        movieArray = data.showings
        // console.log(movieArray)
        let movieHTML = movieArray.map(function(movie) {
            return movieHTMLHelper(movie)
            }).join("");
        showingContainer.innerHTML = movieHTML
      });

      //helper method to format cards in HTML
      function movieHTMLHelper(movie) {
          return `
        <div id="${movie.id}" class="card">
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
                <div id="buy-ticket" data-id="${movie.id}" class="ui blue button">Buy Ticket</div>
                </div>
            </div>
          `
      }

    //add event listener to movie Container
    showingContainer.addEventListener('click', function(event) {
        console.log(event.target)
        if (event.target.id === 'buy-ticket') {
            selectedMovieId = event.target.dataset.id
            selectedMovie = findMovieById(event.target.dataset.id)
            // console.log(selectedMovie.tickets_sold)
            
            //decrement remaining tickets by 1
            decrementTicketCount(selectedMovie)

            //fetch POST to create a ticket
            fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  showing_id: selectedMovieId
              })
          })
          .then(function(response) {
            return response.json();
        })
        .then(object => {
            let newMovieHTML = movieArray.map(function(movie) {
            return movieHTMLHelper(movie)
            }).join("");
            showingContainer.innerHTML = newMovieHTML
        })
        .catch(error => {
            console.error(error)
            // console.log(event.target.dataset.id)
        });// invoke a function to update the innerHTML of the card div to replace the button with the sold out text
        }
    })

    //helper method for decrementing tickets
    function decrementTicketCount(movie) {
        ++movie.tickets_sold
    }

    //helper method to find movie
    function findMovieById(input) {
        return movieArray.find(function(movie) {
            return parseInt(input) === movie.id;
        });
    }

});

//button check - probably won't have time to figure out how to look at every movie to determine if there are no tickets left right now I'm thinking a forEach statement?

//run a forEach method on the movieArray to determine if tickets are sold out. At that time update the HTML and rerender the page. Do this right after the post request.

if (selectedMovie.capacity - selectedMovie.tickets_sold === 0) {
    hideButton(selectedMovie)
}


function hideButton(movie) {
    let div = document.querySelector(`${movie.id}`)
    console.log(div)
    /// add the code to remove the buy ticket button and replace it with the sold out text
}