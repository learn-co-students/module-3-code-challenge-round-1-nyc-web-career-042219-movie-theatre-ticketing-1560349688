const theatreId = 633;
const BASE_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;

//DOM ELEMS
const showings = document.querySelector('.showings')

//EVENT LISTENERS
showings.addEventListener('click', (e) => {
    if (e.target.className === 'ui blue button') {
        let remaining = parseInt( e.target.parentElement.previousElementSibling.children[2].innerText)
        --remaining
        e.target.parentElement.previousElementSibling.children[2].innerText = `${remaining} remaining tickets`
        
        fetch(BASE_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                showing_id: 'something' //add showing_id here
            })
        })
        
    }
})

//RENDER FUNCTIONS
function ticketHtml(showing) {
    let purchaseStatus;
    let remaining = showing.capacity - showing.tickets_sold
    if (remaining>0) {
        purchaseStatus = 'Buy Ticket';
    } else {
        purchaseStatus = 'Sold Out'
    }
    let ticketCard = document.createElement('div');
    ticketCard.className = 'card';
    ticketCard.innerHTML = `
        <div class="content">
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

//INIT
function init(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(tickets => {
        tickets.showings.map(showing =>{
            showings.appendChild(ticketHtml(showing))
        })
    })
}

init();