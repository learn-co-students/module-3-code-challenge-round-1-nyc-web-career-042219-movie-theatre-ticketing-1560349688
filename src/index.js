const theatreId = 632
const movieURL = "https://evening-plateau-54365.herokuapp.com/theatres/632"
const movCon = document.querySelector("#showing")

var movArr = []
getMovies()


function movieMaker(move){

let tickets_left  =  move.capacity - move.tickets_sold
let buttonStatus = "Buy Ticket"
let buttonClass = "ui blue button"
  if (tickets_left <= 0){
  tickets_left = 0
  buttonStatus = "Sold Out"


}


  return `<div class="card">

     <div class="content">
      <div class="header">
        ${move.film.title}
      </div>
      <div class="meta">
        ${move.film.runtime} minutes
      </div>
      <div class="description">
        ${tickets_left}
      </div>
      <span class="ui label">
        ${move.showtime}
      </span>
    </div>
    <div class="extra content">
      <div  id="buy" data-id=${move.id}  class="ui blue button">${buttonStatus}</div>
    </div>
  </div>
`
}

function renderAllMovies(movArr){
  movCon.innerHTML = movArr.map(move=>{
  return movieMaker(move)
})
}


function getMovies(){
  fetch("https://evening-plateau-54365.herokuapp.com/theatres/632")
  .then(r=>r.json())
  .then(movies=>{
  movArr = movies.showings
 renderAllMovies(movArr)
  })
}


movCon.addEventListener("click", e=>{
  e.preventDefault()
  if (e.target.id === "buy"){
  postTicket(e)
  }
})

//
function postTicket(e){

  showing_id = parseInt(e.target.dataset.id)


  fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
    method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
                    showing_id
                  })
        }).then(r=>r.json())
          .then(r=>{
          console.log(r)
          let foundMove = movArr.find(move => {return move.id === showing_id})
          ++movArr[movArr.indexOf(foundMove)].tickets_sold
          renderAllMovies(movArr)

          })

    }
