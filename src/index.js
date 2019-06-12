const theatreId = 638;
const MOVIE_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;
const TICKET_URL = 'https://evening-plateau-54365.herokuapp.com/tickets/';

const movieContainer = document.getElementsByClassName('ui cards showings')[0];

function fetchShows(movieContainer) {
    fetch(MOVIE_URL)
    .then(resp => resp.json())
    .then(function(theatre) {
        let movieHTML = theatre.showings.map(movie => createNewMovie(movie))
        
        movieContainer.innerHTML = movieHTML;
    });
}

function createNewMovie(movie) {
    return `
    <div class='card'>
        <div class="content">
            <div class="header"> ${movie.film.title} </div>
            <div class="meta"> ${movie.film.runtime} minutes </div>
            <div class="description"> ${movie.capacity - movie.tickets_sold} remaining tickets </div>
            <span class="ui label"> ${movie.showtime} </span>
        </div>
        <div class="extra content">
            ${checkSoldOut(movie)}
        </div>
    </div>
    `
}

function checkSoldOut(movie) {
    return ((movie.capacity - movie.tickets_sold) <= 0) ? 'Sold Out' : `<div class="ui blue button" id=${movie.id}>Buy Ticket</div>`;
}

movieContainer.addEventListener('click', function(e) {
    if (e.target.className === 'ui blue button')
        buyTicket(e);
})

function buyTicket(e) {
    let showing_id = +e.target.id;
    let tixsDescription = e.target.offsetParent.getElementsByClassName('description')[0]
    let tixsLeft = +tixsDescription.innerText.split(' ')[0]

    fetch(TICKET_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ showing_id })
    })
    
    tixsLeft--;
    tixsDescription.innerHTML = `${tixsLeft} remaining tickets`;
    if(tixsLeft === 0)
        e.target.parentElement.innerHTML = 'Sold Out';
}

fetchShows(movieContainer);