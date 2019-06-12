const theatreId = 635;
BASE_URL = "https://evening-plateau-54365.herokuapp.com"

document.addEventListener("DOMContentLoaded", () => {
  console.log("hello mibaby")
  const showingsDiv = document.querySelector("#showings")
  let allShowings = []

  // initialize page with movies
  function initialize() {
    fetch(`${BASE_URL}/theatres/${theatreId}`)
    .then(r => r.json())
    .then(renderShowings)
    .then(console.log("hello mihoney"))
  }
  initialize()

  // turn movie data into html and add to dom
  // add showings to state array
  function renderShowings(movieData){
    console.log("hello my ragtime gaallllll")
    movieData.showings.forEach(showing => {
      let showingHTML = createCard(showing)
      showingsDiv.innerHTML += showingHTML
      allShowings.push(showing)
    })
    console.log("all showings:")
    console.log(allShowings)
  }

  // convert showing object to html
  function createCard(showing) {
    console.log("cards")
    const runtime = showing.film.runtime
    const title = showing.film.title
    const showtime = showing.showtime
    const remainingTickets = showing.capacity - showing.tickets_sold

    // i wanted to have the conditional logic inside of the html below
    // but couldn't quite get that to work correctly
    if (remainingTickets > 0) {
      return `
      <div class="card">
        <div class="content">
          <div class="header">
            ${title}
          </div>
          <div class="meta">
            ${runtime} minutes
          </div>
          <div class="description" id="${showing.id}-remaining-tickets">
            ${remainingTickets} remaining tickets
          </div>
          <span class="ui label">
            ${showtime}
          </span>
        </div>
        <div class="extra content">
          <div class="ui blue button" id="buy-ticket" data-id="${showing.id}">Buy Ticket</div>
        </div>
      </div>
      `
    } else {
      return `
      <div class="card">
        <div class="content">
          <div class="header">
            ${title}
          </div>
          <div class="meta">
            ${runtime} minutes
          </div>
          <div class="description" id="${showing.id}-remaining-tickets">
            ${remainingTickets} remaining tickets
          </div>
          <span class="ui label">
            ${showtime}
          </span>
        </div>
        <div class="extra content">
          <h3>Sold Out</h3>
        </div>
      </div>
      `
    }
  }

  // listen for click on buy ticket button
  showingsDiv.addEventListener("click", event => {
    // get button
    if (event.target.id === "buy-ticket") {
      // get showing id
      let showingId = parseInt(event.target.dataset.id, 10)
      let currentShowing = allShowings.find(showing => showing.id === showingId)
      const buttonDiv = event.target.parentNode
      const remainingTicketsDiv = document.getElementById(`${showingId}-remaining-tickets`)
      let currentTickets = remainingTicketsDiv.innerText.split(" ")[0]
      currentShowing.tickets_sold += 1

      // make sure there are tickets
      if (currentTickets > 0) {
        // decrement ticket number in dom
        remainingTicketsDiv.innerText = `${--currentTickets} remaining tickets`

        // remove button if no tickets left
        if (currentTickets === 0) {
          buttonDiv.innerHTML = "<h3>Sold Out</h3>"
        }

        // post ticket to server
        fetch(`${BASE_URL}/tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify ({ showing_id: showingId })
        })
        .then(r => r.json())
        .then(console.log)
      }
    }
  })

})
