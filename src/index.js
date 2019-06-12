const theatreId = 628;
const SHOWINGS_URL = "https://evening-plateau-54365.herokuapp.com/theatres/628"
const TICKET_URL = "https://evening-plateau-54365.herokuapp.com/tickets"
var showingsArr =[]
document.addEventListener("DOMContentLoaded", ()=>{
    //DOM elements
   const showingContainer = document.querySelector("#card-container")
   //Event Listeners
   showingContainer.addEventListener('click', (e)=> {
       if(e.target.dataset.type === "buy-btn"){
           buyTicket(e.target.dataset.id)
       }
   })
   //fetches
   function fetchShowings(){
       fetch(SHOWINGS_URL)
       .then(r => r.json())
       .then(data => {
           showingsArr = data.showings
          displayShowings(showingsArr);
       })
   }
   fetchShowings();

   function buyTicket(showing_id){
    fetch(TICKET_URL,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({showing_id})
    }).then(r => r.json())
    .then(ticket => {
        if(ticket.showing_id){
            updateIndex = showingsArr.findIndex(showing => showing.id === ticket.showing_id)
            showingsArr[updateIndex].tickets_sold++;
            return displayShowings(showingsArr)
        }
    })}
   //functions
   function displayShowings(showings){
       showingContainer.innerHTML = showings.map(showing => {
           if(showing.capacity - showing.tickets_sold > 0) {
               return `
           <div class="card">
            <div class="content">
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
              <div data-id=${showing.id} data-type="buy-btn" class="ui blue button">Buy Ticket</div>
            </div>
           </div>
           `
       }
       else{
        return `
        <div class="card">
         <div class="content">
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
           <div data-id=${showing.id}>Sold Out</div>
         </div>
        </div>
        `
       }
   }).join("")
}
})