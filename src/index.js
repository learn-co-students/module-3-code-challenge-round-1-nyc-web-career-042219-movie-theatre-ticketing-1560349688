window.addEventListener('DOMContentLoaded', (event) => {



    const theatreId = 630;
    const theaterURL = 'https://evening-plateau-54365.herokuapp.com/theatres/630'

    let showingsContainer = document.querySelector('#card-showings')

    //local state
    let showingsArray = []
    let userId = null

    //functions

    // find showing

    function showingFind(showingId){
      let foundShowing = showingsArray.find(showing => showing.id === parseInt(showingId))
      return foundShowing
    }
    //display showing

    function displayShowingsArray(array){
      showingsContainer.innerHTML = array.map(showing => {
        // //come back to this
        // access tickets sold, subtract from capacity
        // let showingCapacity = `"20 - ${showing.film[tickets_sold]}"`
        return`
          <div class="card">
            <div class="content">
                <div class="header">
                  ${showing.film.title}
                </div>
                <div class="meta">
                  ${showing.film.runtime} minutes
                </div>
                <span class="ui label">
                  ${showing.showtime}
                </span>
                <div class="description">
                  ${showing.capacity} remaining tickets
                </div>
              </div>
              <div class="extra content">
                <div class="ui blue button" data-id="${showing.id}" data-tag="buy-btn">Buy Ticket</div>
              </div>
            </div>
          `
      }
      ).join('')
    }

    //fetch
    //initial
    function fetchShowings(){
      return fetch(theaterURL)
      .then(res => res.json())
      .then(res => {
        showingsArray = res.showings
        console.log(showingsArray)
        displayShowingsArray(showingsArray)
      });
    }
    fetchShowings()

    //event listeners
    showingsContainer.addEventListener("click", event =>{
      if (event.target.dataset.tag === 'buy-btn') {
        // find showing
        // post ticket buy event
        // manipulate dom to subtract one ticket
        let showingId = event.target.dataset.id
        console.log(showingId)
        let showingObject = showingFind(showingId)
        let showingCard = event.target.parentElement.parentElement
        let showingCardTicketsRemaining = showingCard.children[0].children[3]
        let showingCardTicketsRemainingHTML = showingCard.children[0].children[3].innerHTML
        console.log(showingCardTicketsRemainingHTML)
        let tickets = `${showingObject.capacity}`
        let ticketsRemain = `${--tickets}`
        showingCardTicketsRemaining.innerHTML = `
              ${ticketsRemain} remaining tickets
        `
        // make post after this
      }

    })



















console.log('DOM fully loaded and parsed');
});
