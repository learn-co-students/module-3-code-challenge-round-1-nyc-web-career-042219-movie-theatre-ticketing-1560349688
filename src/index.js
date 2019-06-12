const theatreId = 633;
const THEATER_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;
const TICKET_URL = 'https://evening-plateau-54365.herokuapp.com/tickets'
let SHOWINGS_ARR = []

//DOM ELEMS
const showings = document.querySelector('.showings')
// const buyBtn = document.querySelector('.button')

//EVENT LISTENERS
showings.addEventListener('click', (e) => {
    if (e.target.className === 'ui blue button') {
        const showingCard = e.target.parentElement.previousElementSibling
        const clickedBtn = showingCard.nextElementSibling.firstElementChild
        let numTkts = parseInt(showingCard.children[2].innerText)
        --numTkts
        if(numTkts <= 0) {
            numTkts = 0;
            clickedBtn.className = 'ui disabled button'
        }
        showingCard.children[2].innerText = `${numTkts} remaining tickets`
        fetch(TICKET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: showingCard.dataset.id
            })
        })
    }
})

//RENDER FUNCTIONS
function ticketHtml(showing) {
    let purchaseStatus;
    let btnClass;
    let remaining = showing.capacity - showing.tickets_sold
    if (remaining > 0) {
        purchaseStatus = 'Buy Ticket';
        btnClass = 'ui blue button';
    } else {
        purchaseStatus = 'Sold Out'
        btnClass = 'ui disabled button'
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
            <div class="${btnClass}">${purchaseStatus}</div>
        </div>
    `
    return ticketCard
}

//INIT
function init(){
    fetch(THEATER_URL)
    .then(res => res.json())
    .then(tickets => {
        SHOWINGS_ARR = tickets.showings
        SHOWINGS_ARR.map(showing =>{
            showings.appendChild(ticketHtml(showing))
        })
    })
}

init();