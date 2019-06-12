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
                <div id="buy-ticket" data-id="${movie.id}" class="ui blue button">Buy Ticket</div>
                </div>
            </div>
          `
      }

    //add event listener to movie Container
    showingContainer.addEventListener('click', function(event) {
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
            console.log(test)
        }); //this needs to trigger if movie.tickets_sold is equal to 0
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

    //helper method for when movies hit 0

    // var hidden = false;
    // function action() {
    //     hidden = !hidden;
    //     if(hidden) {
    //         document.getElementById('togglee').style.visibility = 'hidden';
    //     } else {
    //         document.getElementById('togglee').style.visibility = 'visible';
    //     }
    // }

    ///grab button
    function hideButton(movie) {
        
    }


});
