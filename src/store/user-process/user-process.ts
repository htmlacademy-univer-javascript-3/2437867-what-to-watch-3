import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../consts.ts';
import {UserProcess} from '../../types/state.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';

const initialState : UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizationStatusLoading: false,
  user: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatusLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.authorizationStatusLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizationStatusLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

