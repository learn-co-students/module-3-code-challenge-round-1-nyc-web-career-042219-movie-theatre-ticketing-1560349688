const THEATRE_URL = 'https://evening-plateau-54365.herokuapp.com/theatres/634'
const theatreId = 634;
const showingsDiv = document.querySelector('.ui-cards-showings')
let showingsArray = []
let targetedShowingId = null



function displayShowings(){
    let filmHTML = showingsArray.map(renderShowings)
    return showingsDiv.innerHTML = filmHTML.join('')
}

function renderShowings(showings){
    return `
    <div class="card">
        <div class="content">
            <div class="header">
                ${showings.film.title}
            </div>
            <div class="meta">
                ${showings.film.runtime} minutes
            </div>
            <div class="description">
                ${showings.capacity - showings.tickets_sold} remaining tickets
            </div>
            <span class="ui label">
                ${showings.showtime}
            </span>
            </div>
        <div class="extra content">
            <div id="buy" data-id="${showings.id}" class="ui blue button">Buy Ticket</div>
        </div>
    </div>`
}

fetch(THEATRE_URL)
.then(response => response.json())
.then(theatreInfo => {
    showingsArray = theatreInfo.showings
    displayShowings(theatreInfo.showings)
})


showingsDiv.addEventListener('click', (event) =>{
    if (event.target.id === 'buy'){
        targetedShowingId = showingsArray.find(showingObject => showingObject.id === parseInt(event.target.dataset.id))
        let tickets = event.target.parentElement.parentElement.children[0].children[2]
        let ticketCount = parseInt(event.target.parentElement.parentElement.children[0].children[2].innerText)
        tickets.innerHTML = `${--ticketCount} remaining tickets`
            if (ticketCount <= 0){
                event.target.innerHTML = 'Sold Out'
                event.target.setAttribute("disabled", true)
            }

    }

    fetch ('https://evening-plateau-54365.herokuapp.com/tickets', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        showing_id: targetedShowingId
    })
    })
    .then(response => response.json())

})