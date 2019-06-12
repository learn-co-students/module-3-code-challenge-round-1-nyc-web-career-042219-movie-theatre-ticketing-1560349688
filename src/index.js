window.addEventListener('DOMContentLoaded', (event) => {



    const theatreId = 630;
    const theaterURL = 'https://evening-plateau-54365.herokuapp.com/theatres/630'

    let showingsContainer = document.querySelector('#card-showings')

    //local state
    let showingsArray = []
    let userId = null

    //functions
    //display showing

    function displayShowingsArray(array){
      showingsContainer.innerHTML = array.map(showing => {
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
      console.log(event.target.dataset.tag)
      if (event.target.dataset.tag === 'buy-btn') {
        console.log('click buy')
        let showingId = event.target.dataset.id
      }

    })



















console.log('DOM fully loaded and parsed');
});
