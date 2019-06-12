const theatreId = 648;
const theatreUrl = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`
let films = []
//super confusing, maybe call this movies instead. or filmsArray.
const card = document.querySelector('.showings')

//fetch get for data
fetch(theatreUrl)
  .then(r => r.json())
  .then(data => {
    console.log(data.showings)
    films = data.showings
    films.forEach(data => {
      card.appendChild(displayShowings(films))
    })
  })//end of fetch get

const displayShowings = (films) => {
    const li = document.createElement('li')
    // console.log(typeof films)//films is an object, i need an array
    // console.log(Object.values(films))
    films.forEach(film => {
      //maybe instead a forEach I could do a for..in since it'll be looking For x In Object(films, evidently)
      //for (the-thing-i-want in films){

    }
      // console.log(film.title)
      li.innerHTML = `
      <div class="card">
        <div class="content">
          <div class="header">
            ${film.film.title}
          </div>
          <div class="meta">
            (Runtime) minutes
          </div>
          <div class="description">
            (Num Tickets) remaining tickets
          </div>
          <span class="ui label">
            ${film.showtime}
          </span>
        </div>
        <div class="extra content">
          <div class="ui blue button">Buy Ticket</div>
        </div>
      </div>

      <!-- please  -->
      ${film.film.title}
      <p>${film.showtime}</p>
      <br>
      `
    })//end of my forEach on films
//I'm getting a film title but theyre all the same film title...
    return li
}//end of displayShowings


//super confused on the nested object within film
//i set films to an array so i could have the data and iterate through to get what I need but its somehow an object now * * would try to use for..in but the time is up

//after i'd figure out what is going on with showing the movies correctly
//id want to set up an eventListener on a button I'd have to make for buying tickets
//then I'd want to check my event target and probably assign a dataset-id
//so then i could compare the id of the movie with the dataset-id *would need to make a variable maybe for the datasetid depending on how wordy itll be
//then on the click action id want to make another fetch but for POST
//i would post to `https://evening-plateau-54365.herokuapp.com/tickets`
//i think disabling the buy ticket button would be some css togle?

//
// <div class="card">
//   <div class="content">
//     <div class="header">
//       (Film Title)
//     </div>
//     <div class="meta">
//       (Runtime) minutes
//     </div>
//     <div class="description">
//       (Num Tickets) remaining tickets
//     </div>
//     <span class="ui label">
//       (Showtime)
//     </span>
//   </div>
//   <div class="extra content">
//     <div class="ui blue button">Buy Ticket</div>
//   </div>
// </div>

//seeing this at the end of the readme at the last 15 minutes, a major bummer

//id want to move around how my code would be read because,
//having all that html in my displayShowings would make it weird to put an eventListener on
//I would probably either...put it in the fetch or in the HTML. Unless...
//if I call my displayShowings const => function in the fetch but Id need to check it loads fully first
//because otherwise if it's not fully loaded by the time JS reads my button eventListener it'll go,
//"hey youre telling me to do something on something that isnt there == undefined"
//more or less the fetch for POST, I'd shamelessly put it under my button evenListener so that if the button was clicked and,
//the coniditional rings true then this would happen
//but it would be better practice to give it it's own function and then just call it under that if conditional on the button click


fetch('https://evening-plateau-54365.herokuapp.com/tickets', {
  method: 'POST'
  body: JSON.stringify(data aka the keys for the new object we're posting up to our db)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }//end of headers
}).then(r => r.json())
  .then(data => {
    console.log(data)
    //always console.log the returned data to see what you have to work with
  })//end of POST fetch
