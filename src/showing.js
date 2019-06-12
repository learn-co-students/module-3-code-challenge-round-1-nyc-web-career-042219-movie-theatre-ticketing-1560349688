class Showing {
  constructor({id, film, capacity, showtime, tickets_sold}) {
    this.id = id;
    this.title = film.title;
    this.runtime = film.runtime;
    this.capacity = capacity;
    this.showtime = showtime;
    this.tickets_sold = tickets_sold;
  }

  renderShowingCard() {
    const showingsDiv = document.getElementById('showings');
    const buttonHtml = (this.capacity - this.tickets_sold !== 0) ? "<div data-action='buy' class='ui blue button'>Buy Ticket</div>" : 'Sold Out';
    showingsDiv.innerHTML += `
    <div class='card' data-id='${this.id}' data-remaining='${this.capacity - this.tickets_sold}'>
      <div class='content'>
        <div class='header'>${this.title}</div>
        <div class='meta'>${this.runtime} minutes</div>
        <div class='description'>${this.capacity - this.tickets_sold} remaining tickets</div>
        <span class='ui label'>${this.showtime}</span>
      </div>
      <div class='extra-content'>
        ${buttonHtml}
      </div>
    </div>
    `;
  }
}
