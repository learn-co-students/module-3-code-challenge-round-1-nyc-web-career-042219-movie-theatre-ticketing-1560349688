class Controller {
  static init() {
    Adapter.fetchAllShowings().then(data => data.showings).then(this.renderShowings);
    const showingsDiv = document.getElementById('showings');
    showingsDiv.innerText = '';
    showingsDiv.addEventListener('click', this.buyTicket);
  }

  static renderShowings(showingsArray) {
    showingsArray.forEach(Controller.showing);
  }

  static showing(showingObject) {
    const showing = new Showing(showingObject);
    showing.renderShowingCard();
  }

  static buyTicket(e) {
    if (e.target.dataset.action === 'buy') {
      const showingId = e.target.parentElement.parentElement.dataset.id;
      Adapter.createTicket(showingId).then(Controller.init()); // => pessimistic render after successful post.
    }
  }
}
