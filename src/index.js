//DECLARATIONS AND ASSIGNMENTS
const theatreId = 631;
const theatreURL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
const ticketURL = "https://evening-plateau-54365.herokuapp.com/tickets"
const cardDiv = document.querySelector(".cards")
let currentFilm = null;
let filmsArray = []

init()

//FETCHES
function init(){
	fetch(theatreURL)
		.then(response => response.json())
		.then(filmsData => {
			displayFilms(filmsData.showings)
			localStorageFilms(filmsData.showings)
	})
}

function createTicket(film){
	fetch(ticketURL, {
		method: 'POST',
		body: JSON.stringify({showing_id: film.id}),
		headers:{
		    'Content-Type': 'application/json',
		    'Accept': 'application/json'
	  	}
	})
		.then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));
}


//HELPERS
function displayFilms(films){
	console.log(films)
	films.forEach(film => {
		cardDiv.innerHTML += `
			<div class="card">
			  <div class="content">
			    <div class="header">
			      ${film.film.title}
			    </div>
			    <div class="meta">
			      ${film.film.runtime} minutes
			    </div>
			    <div class="description" data-id="description-${film.id}">
			      ${soldOutTickets(film)}
			    </div>
			    <span class="ui label">
			      ${film.showtime}
			    </span>
			  </div>
			  <div class="extra content">
			  	${soldOutDiv(film)}
			  </div>
			</div>
		`
	})
}

function soldOutTickets(film){
	if(film.capacity - film.tickets_sold > 0){
		return `${film.capacity - film.tickets_sold} tickets remaining`
	} else if (film.capacity - film.tickets_sold === 0){
		// console.log(document.querySelector(`[data-id='${film.id}']`))
		return "Sold Out"
	}
}

function soldOutDiv(film){
    if (film.capacity - film.tickets_sold === 0){
        return "Sold Out"
    } else {
        return `<div class="ui blue button" data-id=${film.id}>Buy Ticket</div>`
    }
}

function localStorageFilms(films){
	films.forEach(film => filmsArray.push(film))
}

function buyTicket(e){
	if (e.target.className === "ui blue button"){
		currentFilm = findOneFilm(e.target.dataset.id)
		decreaseRemainingTickets(currentFilm, e)
	}
}

function decreaseRemainingTickets(film, event){
	let ticketsLeft = document.querySelector(`[data-id='description-${film.id}']`)
	if (parseInt(ticketsLeft.innerText) > 0) {
		ticketsLeft.innerText = `${parseInt(ticketsLeft.innerText) - 1} tickets remaining`
		createTicket(currentFilm)
	} else if(parseInt(ticketsLeft.innerText) === 0 || ticketsLeft.innerText === "Sold Out") {
		ticketsLeft.innerText = "Sold Out"
		event.target.innerText = "Sold Out"
		event.target.classList.add("disabled")
	}
}

function findOneFilm(targetId){
	return filmsArray.find(film => film.id === parseInt(targetId))
}


//EVENT LISTENERS
cardDiv.addEventListener("click", buyTicket)










