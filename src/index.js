const theatreId = 641;

const showingContainer = document.querySelector(".item")


let showingsArray = []


  showingContainer.addEventListener('click', e => {
    const button = event.target.dataset.id
    debugger
    const ticketId = e.target.dataset.id
    const showingTarget = showingsArray.showings.find(showing => {
    return showing.id === parseInt(ticketId)
    })
    console.log(showingTarget)
    let remainingTickets = (showingTarget.capacity - showingTarget.tickets_sold)
      if (remainingTickets === 0) {
        button.disabled
      } else (remainingTickets >= 1) {

      }
})


  function renderShowtimes(tickets){
    tickets.showings.forEach(showing => {
      const div = document.createElement('div')
        div.innerHTML =`
        <div class="card">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime} minutes
        </div>
        <div class="description">
          ${showing.capacity - showing.tickets_sold} remaining tickets
        </div>
        <span class="ui label">
          ${showing.showtime}
        </span>
      </div>
      <div class="extra content">
        <div data-id="${showing.id}" class="ui blue button">Buy Ticket</div>
      </div>
      </div>
        `
        showingContainer.appendChild(div)
    })
  }

  function fetchTickets() {
    return fetch('https://evening-plateau-54365.herokuapp.com/theatres/641')
      .then(rsp => rsp.json())
      .then(tickets => {
        showingsArray = tickets
        renderShowtimes(tickets)
      })
  }




  fetchTickets()
