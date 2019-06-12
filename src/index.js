const theatreId = 646;
const theatreUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/646'
let movieArray = []
const showContainer = document.querySelector('#showings-container')


fetch(theatreUrl)
.then(res => res.json())
.then(function(data) {
  movieArray.push(data.showings)
  data.showings.forEach( shows => {
    showContainer.innerHTML += displayShow(shows)
  })
})
//end of fetch data

console.log(movieArray);

//rendering all shows
function displayShow(shows) {
  return `
  <div class="card">
    <div class="content">
      <div class="header">
      ${shows.film.title}
      </div>
    <div class="meta">
      Runtime: ${shows.film.runtime} Min
    </div>
    <div class="description">
      Remaining tickets :${shows.capacity - shows.tickets_sold}
    </div>
    <span class="ui label">
      Showtime: ${shows.showtime}
    </span>
  </div>
  <div class="extra content">
    <div class="ui blue button" id='${shows.id}'>Buy Ticket</div>
  </div>
</div>`
}

function buyTicket(shows) {
  let clickId = parseInt(e.target.id)
  let ticketSold = shows.tickets_sold
  let ticketCapcity = shows.capacity
  fetch(theatreUrl, {
    method: "POST",
    headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    body: JSON.stringify({
      id: clickId,
      capacity: ticketCapcity--,
      showing_id: clickId,
      tickets_sold: ticketSold++
        })
    })//end of fetch
    .then(res => res.json())
    .then(function(data) {
      displayShow(data)
    }).catch(ticketCapcity <= 0) {
      return { "error": "That showing is sold out" }
    })
}


showContainer.addEventListener('click', e => {
  let clickId = parseInt(e.target.id)

  let findShow = movieArray.map( shows => {
    shows.forEach(show => {
      show.includes(show.id)
          })
        })
        if(clickId == findShow) {
          buyTicket(shows)
        }
      })// end of eventlistener 
