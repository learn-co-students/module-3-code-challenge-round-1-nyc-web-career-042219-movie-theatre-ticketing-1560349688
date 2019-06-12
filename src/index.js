window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    const theatreId = 645;
    // 645

    const theaterURL = "https://evening-plateau-54365.herokuapp.com/theatres/645"

    const ticketList = document.querySelector("#ticket-list")
    //console.log(ticketList);


    fetch(theaterURL)
    .then(response => response.json())
    // console log data
    .then(data => displayData(data))

    //display function
    function displayData(object) {

        object["showings"].forEach(function(element){

           console.log(element["id"]);
          // console.log(parseInt(element["capacity"] - element["tickets_sold"]))

          ticketList.innerHTML += `
          <div class="card">
          <div class="content">
          <div class="header">
          ${element["film"]["title"]}
          </div>
          <div class="meta">
          ${element["film"]["runtime"]} minutes
          </div>
          <div class="description">
          ${parseInt(element["capacity"] - element["tickets_sold"])} remaining tickets
          </div>
          <span class="ui label">
          ${element["showtime"]}
          </span>
          </div>
          <div class="extra content">
          <div id="${element["id"]}" class="ui blue button">Buy Ticket</div>
          </div>
          </div>
          `
          //close for display function forEach loop
        })

        //outer display function close bracket
    }


    ticketList.addEventListener("click", function(event){

      //console.log(event.target.id);

      let buyButtonPress = event.target.className
      //console.log(buyButtonPress);
      let purchasedTix =

      if (buyButtonPress === "ui blue button") {
        let movieId = event.target.id



          //   fetch(theaterURL + '/' + movieId, {method: 'PATCH',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json'
          //   },
          //   body: JSON.stringify({
          //   //  "tickets_sold": ++sold
          //   })
          //
          // })
          //   .then(response => response.json())
          //   .then(data => console.log(data))

          //close bracket for conditional
    }

      // end of ticket list event listener
    })




// end of Dom
});
