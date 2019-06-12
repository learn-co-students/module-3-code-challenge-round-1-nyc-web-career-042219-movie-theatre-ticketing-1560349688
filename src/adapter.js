class Adapter {
  static async fetchAllShowings() {
    const url = 'https://evening-plateau-54365.herokuapp.com/theatres/643';
    const r = await fetch(url);
    return r.json();
  }

  static async createTicket(id) {
    const url = 'https://evening-plateau-54365.herokuapp.com/tickets';
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ showing_id: id }),
    });
    return r.json();
  }
}
