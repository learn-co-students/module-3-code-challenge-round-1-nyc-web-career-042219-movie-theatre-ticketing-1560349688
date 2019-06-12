const theatreId = 622;

const ticket_url = 'https://evening-plateau-54365.herokuapp.com/theatres/622'

const ticketsDiv = document.querySelector('.showings')

let ticketsArray =[]
// console.log('yaaay, im in server')


//  fetch to get all tickets

function fetchTichets(){
 fetch('https://evening-plateau-54365.herokuapp.com/theatres/622')
    .then(response => response.json())
    .then(showData => {
        ticketsArray= showData
        showData.showings.forEach(renderAllShow)})
}
     


// render all shows
function renderAllShow(show) {

  ticketsDiv.innerHTML += `
                          <div class="card">
                            <div class="content">
                              <div class="header">
                                ${show.film.title}
                              </div>
                              <div class="meta">
                                ${show.film.runtime}
                              </div>   
                              <span class="ui label">                                                             
                                <span id="${show.id}">${((show.capacity) - (show.tickets_sold))}</span> remaining tickets
                              </span>
                              <div class="description">
                                ${show.showtime}
                              </div>
                            </div>
                            <div class="extra content">
                              <div data-id = "${show.id}"class="ui blue button">Buy Ticket</div>
                            </div>
                          </div>
                      `
//   make condition to show sold out & disabled
  if (((show.capacity) - (show.tickets_sold)) === 0) {
    // find the button assoc. with the ticket/showing
    const button = document.querySelector(`[data-id="${show.id}"]`)
//    disabled button
    button.classList.add('disabled')
    // The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".
    button.innerText = "SOLD OUT"
  }

}

// event listener for ticketsDiv
 ticketsDiv.addEventListener("click", buyTicket)

    function buyTicket(event) {
      // console.log('clicked', event)
     if (event.target.classList.contains('button')) {
    //    debugger;
    //   set target to const id
    // parseInt to show number and not string
       const id = parseInt(event.target.dataset.id)
      
    //POST Fetch
       fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
         },
         body: JSON.stringify({
           showing_id: id
         })
       })
       .then(response => response.json())
       .then(ticket => {

           return updateTicketInfo(ticket)
  
       })
     }
}




// helper functon to update ticket data
function updateTicketInfo(ticket) {
  // count tickets
  const span = document.getElementById(`${ticket.showing_id}`)
  // console.log("ticket", span);
  span.innerText = parseInt(span.innerText) - 1
  //reduce the ticket count
  if (span.innerText === "0") {
    
    const button = document.querySelector(`[data-id="${ticket.showing_id}"]`)

    //    disabled button
    button.classList.add('disabled')
    // The 'Buy Ticket' button should be disabled on sold out showings, and the text should change to "sold out".
    button.innerText = "SOLD OUT"
  }
   
}





fetchTichets();

