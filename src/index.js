document.addEventListener('DOMContentLoaded', () => {
  console.log('%cLoaded', 'color: cyan')


//-------- DOM ELEMENTS
  const THEATRE_URL = 'https://evening-plateau-54365.herokuapp.com/theatres/644'

  const moviesContainer = document.querySelector('#movie-showings')
  const movieCard = document.querySelector('description')


//-------- LOCAL STATE
  const theatreId = 644;
  let showings = [];


//-------- RENDER METHODS
//***** Kept getting an error of unexpected token { for line 18?? Spent a lot of time trying to refactor...
  // renderShowings(showings) {
  //   showings.map (showing => {
  //     const card = document.createElement('card');
  //     card.innerHTML = `
  //     <div class="card">
  //       <div class="content">
  //         <div class="header">
  //           (Film Title)
  //         </div>
  //         <div class="meta">
  //           (Runtime) minutes
  //         </div>
  //         <div class="description">
  //           (Num Tickets) remaining tickets
  //         </div>
  //         <span class="ui label">
  //           (Showtime)
  //         </span>
  //       </div>
  //       <div class="extra content">
  //         <div class="ui blue button">Buy Ticket</div>
  //       </div>
  //     </div>
  //     `
  //     moviesContainer.appendChild(card)
  // })
  //     renderShowings();
  // }

//-------- EVENT LISTENERS
  moviesContainer.addEventListener('click', event => {
    const movieId = parseInt(event.target.dataset.id)
    if (event.target.className === 'ui blue button') {
      console.log(event.target.parentNode.previousElementSibling[3])
      //got deep in the weeds getting the "remaining tickets" sibling.
      }
  })


//-------- FETCHES
  function fetchTheatres() {
    fetch(THEATRE_URL)
      .then(response => response.json())
      .then(showingsData => {
        showings = showingsData["showings"]
        console.log(showings)
         showings.map (showing => {
          const card = document.createElement('card');
          card.innerHTML =  `
          <div data-id="${showing.id}" class="card">
            <div class="content">
              <div class="header">
                ${showing['film'].title}
              </div>
              <div class="meta">
                ${showing['film'].runtime} minutes
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
          moviesContainer.appendChild(card)
      }).join('')
      })
    }


  fetchTheatres();
})//END DOM LISTENER
