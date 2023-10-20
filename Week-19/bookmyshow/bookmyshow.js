class Seat {
  constructor(name) {
    this.name = name;
    this.isBooked = false;
  }

  book() {
    this.isBooked = true;
  }

  unbook() {
    this.isBooked = false;
  }
}

class Screen {
  constructor(screenNumber, rows, cols) {
    this.screenNumber = screenNumber;
    this.seats = this.generateSeats(rows, cols);
  }

  generateSeats(rows, cols) {
    const seats = new Map();
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        const seatNumber = `${String.fromCharCode(64 + i)}${j}`;
        const seat = new Seat(seatNumber);
        seats.set(seatNumber, seat);
      }
    }
    return seats;
  }

  getAvailableSeats() {
    return new Map([...this.seats].filter(([key, value]) => !value.isBooked));
  }

  bookSeats(seatNames) {
    const bookedSeats = [];
    seatNames.forEach((name) => {
      const seat = this.seats.get(name);
      if (seat) {
        seat.book();
        bookedSeats.push(seat);
      }
    });
    return bookedSeats;
  }

  releaseSeats(seatNames) {
    seatNames.forEach((name) => {
      const seat = this.seats.get(name);
      if (seat) seat.unbook();
    });
  }

  checkHasOverlappingSeats(seatNames) {
    const overlappingSeats = [];
    seatNames.forEach((name) => {
      const seat = this.seats.get(name);
      if (seat && seat.isBooked) overlappingSeats.push(seat);
    });
    return overlappingSeats;
  }
}

class ScreenFactory {
  constructor(screenNumber, rows, cols) {
    this.screenNumber = screenNumber;
    this.rows = rows;
    this.cols = cols;
  }
  createScreen() {
    return new Screen(this.screenNumber, this.rows, this.cols);
  }
}

class Show {
  constructor(movie, startTime, price, screen) {
    this.movie = movie;
    this.startTime = getISTTime(startTime);
    this.price = price;
    this.screen = screen;
  }
}

class Movie {
  constructor(name, duration, languages, other) {
    this.name = name;
    this.duration = duration;
    this.languages = languages;
    this.other = other;
  }
}

class Theatre {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.screens = new Map();
    this.shows = new Map();
  }

  addScreen(screen) {
    this.screens.set(screen.screenNumber, screen);
  }
  addShow(show) {
    const showId =
      String(show.startTime.toJSON()) +
      show.movie.name +
      show.screen.screenNumber;
    this.shows.set(showId, show);
  }

  getAvailableShows() {
    const currentTime = getISTTime();
    console.log(currentTime);
    const availableShows = new Map(
      [...this.shows].filter(([key, value]) => {
        return value.startTime > currentTime;
      })
    );
    return availableShows;
  }

  getAvailableSeats({ movie, showTime, screen }) {
    const showId = this.getShowId(movie, showTime, screen);
    console.log(showId);
    const show = this.shows.has(showId) ? this.shows.get(showId) : false;
    if (!show) return [];
    const availableSeats = show.screen.getAvailableSeats();
    return [...availableSeats].map(([key, value]) => value);
  }

  bookTickets({ movie, showTime, screen, seatNames }) {
    const showId = this.getShowId(movie, showTime, screen);
    const show = this.shows.has(showId) ? this.shows.get(showId) : false;
    if (!show)
      throw new Error(
        `Show not available- movie: ${movie}, showTime: ${showTime}, screen: ${screen}`
      );
    const bookedSeats = show.screen.bookSeats(seatNames);
    return bookedSeats;
  }

  releaseSeats({ movie, showTime, screen, seatNames }) {
    const showId = this.getShowId(movie, showTime, screen);
    const show = this.shows.has(showId) ? this.shows.get(showId) : false;
    if (!show) return [];
    const releasedSeats = show.screen.releaseSeats(seatNames);
    return releasedSeats;
  }

  checkHasOverlappingSeats({ movie, showTime, screen, seatNames }) {
    const showId = this.getShowId(movie, showTime, screen);
    const show = this.shows.has(showId) ? this.shows.get(showId) : false;
    if (!show)
      throw new Error(
        `Show not available- movie: ${movie}, showTime: ${showTime}, screen: ${screen}`
      );
    const overlappingSeats = show.screen.checkHasOverlappingSeats(seatNames);
    if (overlappingSeats.length) return true;
    return false;
  }

  getShowId(movie, showTime, screen) {
    const ISTTime = getISTTime(showTime);
    return String(ISTTime.toJSON()) + movie + screen;
  }
}

class UserSession {
  constructor(user, { theatre, showTime, screen, movie }) {
    this.user = user;
    this.theatre = theatre;
    this.showTime = showTime;
    this.screen = screen;
    this.movie = movie;
    this.selectedSeats = [];
    this.paymentAttempts = 0;
    this.MAX_PAYMENT_ATTEMPTS = 3;
    this.isSessionClosed = false;
    this.hasOverlappingSeats = false;
  }

  selectSeats(seatNames) {
    if (!this.isSessionClosed) {
      this.selectedSeats = seatNames;
      if (this.checkHasOverlappingSeats()) {
        this.hasOverlappingSeats = true;
        return console.log(
          `Some of the seats are  already blocked by other user`
        );
      }
      this.hasOverlappingSeats = false;
      this.theatre.bookTickets({
        movie: this.movie,
        showTime: this.showTime,
        screen: this.screen,
        seatNames,
      });
      console.log(`${this.user} Selected seats: ${this.selectedSeats}`);
    } else {
      throw new Error("Session expired");
    }
  }
  releaseSeats() {
    this.theatre.releaseSeats({
      movie: this.movie,
      showTime: this.showTime,
      screen: this.screen,
      seatNames: this.selectedSeats,
    });
  }
  checkHasOverlappingSeats() {
    return this.theatre.checkHasOverlappingSeats({
      movie: this.movie,
      showTime: this.showTime,
      screen: this.screen,
      seatNames: this.selectedSeats,
    });
  }

  makePayment() {
    if (!this.isSessionClosed) {
      if (this.hasOverlappingSeats) {
        return console.log(
          `Some of the seats are  already blocked by other user`
        );
      }
      const paymentSuccess = true; //assumption-> get payment status from payment service
      if (paymentSuccess) {
        console.log(
          `Payment succeeded for ${this.user}. Selected Seats: ${this.selectedSeats}`
        );
        this.isSessionClosed = true;
      } else {
        this.paymentAttempts++;
        console.log(
          `Payment failed for ${this.user}. Remaining attempts: ${
            this.MAX_PAYMENT_ATTEMPTS - this.paymentAttempts
          }`
        );
        if (this.paymentAttempts >= this.MAX_PAYMENT_ATTEMPTS) {
          console.log(
            `Maximum payment retries reached. Releasing seats: ${this.selectedSeats}`
          );
          this.isSessionClosed = true;
          this.releaseSeats();
        }
      }
    } else {
      throw new Error("Session expired");
    }
  }
}

function getISTTime(dateTimeStr) {
  const date = dateTimeStr ? new Date(dateTimeStr) : new Date();
  const ISTOffset = 330;
  const ISTTime = new Date(date.getTime() + ISTOffset * 60 * 1000);
  return ISTTime;
}

/* theatre */
const pvr = new Theatre("PVR", "Hyderabad");
/* screens */
const screen1 = new ScreenFactory("SCREEN-1", 3, 3);
const screen2 = new ScreenFactory("SCREEN-2", 5, 5);
pvr.addScreen(screen1);
pvr.addScreen(screen2);

/* movies */
const jawan = new Movie("Jawan", 150, ["HI", "TE"]);
const mi7 = new Movie("MI7", 180, ["EN", "HI"]);

const show1 = new Show(
  jawan,
  new Date("2023-10-10T10:00"),
  100,
  pvr.screens.get("SCREEN-1").createScreen()
);
pvr.addShow(show1);

const show2 = new Show(
  jawan,
  new Date("2023-10-10T14:00"),
  100,
  pvr.screens.get("SCREEN-1").createScreen()
);
pvr.addShow(show2);

const show3 = new Show(
  mi7,
  new Date("2023-10-10T11:00"),
  250,
  pvr.screens.get("SCREEN-2").createScreen()
);
pvr.addShow(show3);

const show4 = new Show(
  jawan,
  new Date("2023-10-10T15:00"),
  90,
  pvr.screens.get("SCREEN-2").createScreen()
);
pvr.addShow(show4);

//book tickets
const john = new UserSession("john", {
  theatre: pvr,
  showTime: "2023-10-10T11:00",
  screen: "SCREEN-2",
  movie: "MI7",
});
const jane = new UserSession("jane", {
  theatre: pvr,
  showTime: "2023-10-10T11:00",
  screen: "SCREEN-2",
  movie: "MI7",
});

john.selectSeats(["A1", "A2"]);
console.log(
  pvr.getAvailableSeats({
    showTime: "2023-10-10T11:00",
    screen: "SCREEN-2",
    movie: "MI7",
  })
);
jane.selectSeats(["A1", "A2"]);
// session.makePayment();
