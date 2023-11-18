export const catalogGenresTypes = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thrillers'];
export const INITIAL_GENRE = 'All genres';
export const INITIAL_FILMS_COUNT = 8;

export const EXECUTION_DELAY = 1000;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Login = '/login',
  Main = '/',
  MyList = '/mylist',
  Movie = '/films',
  Review = '/review',
  Player = '/player',
  NotFound = '*',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}
