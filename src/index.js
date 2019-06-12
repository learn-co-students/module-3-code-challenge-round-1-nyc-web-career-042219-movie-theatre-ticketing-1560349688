const theatreId = 637;
const ticketUrl = 'https://evening-plateau-54365.herokuapp.com/tickets'
const myUrl = 'https://evening-plateau-54365.herokuapp.com/theatres/637'
const showContainer = document.querySelector('.showings')
let showingsArr = []


function fetchMovies(){
    fetch(myUrl)
    .then(res => res.json())
    .then(myTheatre => {
        console.log(myTheatre.showings)
        showingsArr = myTheatre.showings
        showingsArr.forEach(showing => {
            
            let showElement = document.createElement('div')
            showElement.innerHTML = `
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
                
                
                <div data-id='${showing.id}' class="ui blue button">Buy Ticket</div>
                </div>
            </div>
            `
            document.querySelector('.showings').appendChild(showElement)
        })
    })
}//end of fetch movies, now invoke
fetchMovies()

//post to tickets on click buy button
//add event listener
showContainer.addEventListener('click', event => {
    console.log('click',event.target.dataset.id)
    let showingId = parseInt(event.target.dataset.id)
    let showingObj = showingsArr.find(showing => {
        return showing.id === showingId
    })
    //optimistically rendering above because ticketsUrl sending 404 error?
    let remainingTag = event.target.previousElementSibling.previousElementSibling
    let remainingNum = parseInt(remainingTag.innerText)
    //conditional for sold out shows 
    if(remainingNum > 0){
    remainingTag.innerText = `${remainingNum - 1} remaining tickets`
    
    } else {
        remainingTag.innerText = `Sold Out!`
    }
    
    console.log(remainingNum)
    fetch(ticketUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            showing_id: showingId
        })
    })//end of fetch
    .then(res => res.json())
    .then(new_ticket => {
        console.log(new_ticket)
        
    })
})//end of event listener

