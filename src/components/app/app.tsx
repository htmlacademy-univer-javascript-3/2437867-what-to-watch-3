import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen.tsx';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen.tsx';
import {AppRoute} from '../../consts.ts';
import NotFoundError from '../errors/not-found-error.tsx';
import PlayerScreen from '../../pages/player-screen/player-screen.tsx';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen.tsx';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListScreen from '../../pages/my-list-screen/my-list-screen.tsx';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';


function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen/>
        }
        />
        <Route path={AppRoute.Login} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyListScreen/>
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Movie }/:id`} element={<MoviePageScreen/>}/>
        <Route path={`${AppRoute.Movie }/:id${AppRoute.Review}`} element={<AddReviewScreen/>}/>
        <Route path={`${AppRoute.Player }/:id`} element={<PlayerScreen/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundError/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
