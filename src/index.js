// console.log("checking console")
const theatreId = 629;
const showingsCards = document.querySelector(".ui cards showings")
let showings = []
const BASE_URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`



fetch(BASE_URL)
.then (response => response.json())
// .then(data => console.log(data))
.then (data => {
  showings = data.showings
  console.log(showings)
  showings.forEach(showing => {
    const div = document.createElement("div")
    let tickets_left = `${showing.capacity-showing.tickets_sold}`
    // console.log(showing)
    div.dataset.id = showing.id
    div.innerHTML = `
    <div class="card">
      <div class="content">
        <div class="header">
          ${showing.film.title}
        </div>
        <div class="meta">
          ${showing.film.runtime} minutes
        </div>
        <div class="description">
          ${tickets_left} remaining tickets
        </div>
        <span class="ui label">
          ${showing.showtime}
        </span>
      </div>
      <div class="extra content">
        <div class="ui blue button">Buy Ticket</div>
      </div>
    </div>
    `
    console.dir(div)
    // showingsCards.appendChild(div)
    //cannot for the life of me get the card to show up
    //in the page.  When I console.log my div, it's there,
    //but when I try to append to my showingsCard class,
    //I get the error message "index.js:40 Uncaught (in promise) TypeError: Cannot read property 'appendChild' of null
    //at index.js:40
    //at Array.forEach (<anonymous>)
    //at index.js:14"
  })
})

//Buy button event listener

// showingsCards.addEventListener('click', e => {
    // const showingId = event.target.dataset.id
    // const showing = showings.find(showing => {
    // return showing.id == showingId
    // if dataset.tagName === "BUTTON" {
      // let buyButtonClicked = event.target.className === "ui blue button"
    // if (buyButtonClicked) {
      // showing.tickets_sold += 1
      // ^^know showing.tickets_sold is not in scope, but this is where i'm going directionally.
      // Difficult to test anything when I cant get the cards to show up :(
//      }
//   }
// })

//Post fetch
// fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body:
//     {
//       showing_id: <add showing_id here>
//     }
//   })
//   .then(json)
//   .then(function (data) {
//     console.log('Request succeeded with JSON response', data);
//   })
//   .catch(function (error) {
//     console.log('Request failed', error);
//   });
