import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen.tsx';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import NotFoundError from '../errors/not-found-error.tsx';
import PlayerScreen from '../../pages/player-screen/player-screen.tsx';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen.tsx';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListScreen from '../../pages/my-list-screen/my-list-screen.tsx';
import {useAppSelector} from '../../hooks';
import Spinner from '../spinner/spinner.tsx';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';


function App() {
  const isLoading = useAppSelector((state) => state.isLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return (<Spinner/>);
  }

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
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListScreen/>
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Movie }/:id`} element={<MoviePageScreen/>}/>
        <Route path={`${AppRoute.Movie }/:id${ AppRoute.Review}`} element={<AddReviewScreen/>}/>
        <Route path={`${AppRoute.Player }/:id`} element={<PlayerScreen/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundError/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
