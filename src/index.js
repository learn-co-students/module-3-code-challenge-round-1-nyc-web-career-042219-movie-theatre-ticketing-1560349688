const MOVIE_URL = 'https://evening-plateau-54365.herokuapp.com/theatres/638';
const TICKET_URL = 'https://evening-plateau-54365.herokuapp.com/tickets/'
const theatreId = 638;

const movieContainer = document.getElementsByClassName('ui cards showings')[0]
let movieArray = [];

function fetchShows(movieContainer) {
    fetch(MOVIE_URL)
    .then(resp => resp.json())
    .then(function(theatre) {
        let movieHTML = theatre.showings.map(movie => createNewMovie(movie))
        
        movieContainer.innerHTML = movieHTML;
    })  
}

function createNewMovie(movie) {
    movieArray.push(movie);
    return `
    <div class='card'>
        <div class="content">
            <div class="header"> ${movie.film.title} </div>
            <div class="meta"> ${movie.film.runtime} minutes </div>
            <div class="description"> ${movie.capacity - movie.tickets_sold} remaining tickets </div>
            <span class="ui label"> ${movie.showtime} </span>
        </div>
        <div class="extra content">
            <div class="ui blue button" id=${movie.id}>Buy Ticket</div>
        </div>
    </div>
    `
}

function findMovie(id) {
    return movieArray.find(movie => movie.id === +id)
}
movieContainer.addEventListener('click', function(e) {
    if (e.target.className === 'ui blue button') {
        buyTicket(e);
    }
})

function buyTicket(e) {
    let movie = findMovie(e.target.id);

    fetch(TICKET_URL {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    debugger

}

fetchShows(movieContainer);