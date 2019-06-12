const theatreId = 633;
const THEATER_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;
const TICKET_URL = 'https://evening-plateau-54365.herokuapp.com/tickets'

//DOM ELEMS
const showings = document.querySelector('.showings')
const buyBtn = document.querySelector('.button')

//EVENT LISTENERS
showings.addEventListener('click', (e) => {
    if (e.target.className === 'ui blue button') {
        //why can't i set e.target etc to variable?
        //let remainingTkts = e.target.parentElement.previousElementSibling.children[2].innerText
        let numTkts = parseInt( e.target.parentElement.previousElementSibling.children[2].innerText)
        --numTkts
        // debugger
        e.target.parentElement.previousElementSibling.children[2].innerText = `${numTkts > 0 ? numTkts : numTkts = 0} remaining tickets`
        // debugger
        fetch(TICKET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: e.target.parentElement.previousElementSibling.dataset.id
            })
        })
        .then(res => res.json())
        .then(ticket => {
            let showingId = ticket.showing_id
            if(numTkts === 0){
                console.log('disable this button')
                //find the show card with matching showing.id === showingId
                let thisCard = document.findElementByAttribut('data-id', showingId)
                //change the className of buyBtn to 'ui disabled button'
                debugger
                //change inner text to Sold Out
            }
        })
    }
})

//RENDER FUNCTIONS
function ticketHtml(showing) {
    let purchaseStatus;
    let remaining = showing.capacity - showing.tickets_sold
    if (remaining > 0) {
        purchaseStatus = 'Buy Ticket';
    } else {
        // debugger
        // buyBtn.className = "ui disabled button"
        purchaseStatus = 'Sold Out'
    }
    let ticketCard = document.createElement('div');
    ticketCard.className = 'card';
    ticketCard.innerHTML = `
        <div class="content" data-id='${showing.id}'>
            <div class="header">
                ${showing.film.title}
            </div>
            <div class="meta">
                ${showing.film.runtime} minutes
            </div>
            <div class="description">
                ${remaining} remaining tickets
            </div>
            <span class="ui label">
                ${showing.showtime}
            </span>
        </div>
        <div class="extra content">
            <div class="ui blue button">${purchaseStatus}</div>
        </div>
    `
    return ticketCard
}

// refactor diable button render here
// function disableButton() {
// }

//INIT
function init(){
    fetch(THEATER_URL)
    .then(res => res.json())
    .then(tickets => {
        tickets.showings.map(showing =>{
            showings.appendChild(ticketHtml(showing))
        })
    })
}

init();