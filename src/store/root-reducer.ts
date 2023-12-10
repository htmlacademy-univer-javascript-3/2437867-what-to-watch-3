import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../consts';
import {filmsProcess} from './films-process/films-process.ts';
import {userProcess} from './user-process/user-process.ts';
import {reviewProcess} from './review-process/review-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
});
