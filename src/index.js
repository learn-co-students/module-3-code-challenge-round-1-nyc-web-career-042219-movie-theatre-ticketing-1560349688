window.addEventListener('DOMContentLoaded', (event) => {
  const theatreId = 640;
  const movieurl = 'https://evening-plateau-54365.herokuapp.com/theatres/640'
  const moviecontainer = document.querySelector('#cards')
  let allmovie = []

  fetch(movieurl)
  .then(r => r.json())
  .then(e => {
    allmovie = e.showings
    e.showings.map(show =>{

      moviecontainer.innerHTML += `
        <div class="card">
          <div class="content">
            <div class="header">
              ${show.film.title}
            </div>
            <div class="meta">
              ${show.film.runtime} minutes
            </div>
            <div class="description">
              ${show.capacity - show.tickets_sold} remaining tickets
            </div>
            <span class="ui label">
              ${show.showtime}
            </span>
          </div>
          <div class="extra content">
            <div data-id = ${show.id} data-class='button' class="ui blue button">Buy Ticket</div>
          </div>
        </div>
      `
    })
  })

  moviecontainer.addEventListener('click', e=>{
    if (e.target.dataset.class === 'button'){
      let selected =  allmovie.find(x => x.id == e.target.dataset.id)
      selected.tickets_sold += 1
      selected.showing_id = theatreId
      console.log(selected);
      fetch('https://evening-plateau-54365.herokuapp.com/tickets' + `${selected.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        keys:{
            showing_id: theatreId
          },
        body: JSON.stringify(selected)
      })
    }
    moviecontainer.innerHTML = ""
    allmovie.map(show =>{
      if (show.tickets_sold >= 20){
        show.tickets_sold = 20
        moviecontainer.innerHTML += `

          <div class="card">
            <div class="content">
              <div class="header">
                ${show.film.title}
              </div>
              <div class="meta">
                ${show.film.runtime} minutes
              </div>
              <div class="description">
                ${show.capacity - show.tickets_sold} remaining tickets
              </div>
              <span class="ui label">
                ${show.showtime}
              </span>
            </div>
            <div class="extra content">
              <div data-id = ${show.id} data-class='button'>Sold Out</div>
            </div>
          </div>
        `
      }else {

        moviecontainer.innerHTML += `

          <div class="card">
            <div class="content">
              <div class="header">
                ${show.film.title}
              </div>
              <div class="meta">
                ${show.film.runtime} minutes
              </div>
              <div class="description">
                ${show.capacity - show.tickets_sold} remaining tickets
              </div>
              <span class="ui label">
                ${show.showtime}
              </span>
            </div>
            <div class="extra content">
              <div data-id = ${show.id} data-class='button' class="ui blue button">Buy Ticket</div>
            </div>
          </div>
        `
      }
    })

  })

});
