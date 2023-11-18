import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getFilms, resetShowMore, showMoreFilms} from './action.ts';
import {mockFilms} from '../mocks/films.ts';
import {INITIAL_FILMS_COUNT, INITIAL_GENRE} from '../consts.ts';
import {StoreState} from '../types/types.ts';

const initialState : StoreState = {
  genre: INITIAL_GENRE,
  films: mockFilms,
  filmsCount: INITIAL_FILMS_COUNT,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state) => {
      state.films = state.genre === INITIAL_GENRE ?
        mockFilms :
        mockFilms.filter((film) => film.genre === state.genre);
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(showMoreFilms, (state) => {
      state.filmsCount += INITIAL_FILMS_COUNT;
    })
    .addCase(resetShowMore, (state) => {
      state.filmsCount = INITIAL_FILMS_COUNT;
    })
});
