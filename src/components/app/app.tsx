import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen.tsx';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import MyListScreen from '../../pages/my-list-screen/my-list-screen.tsx';
import PlayerScreen from '../../pages/player-screen/player-screen.tsx';
import NotFoundError from '../errors/not-found-error.tsx';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen.tsx';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen.tsx';
import {Films} from '../../types/types.ts';

type AppProps = {
  backgroundSrc: string;
  backgroundAlt: string;
  myListFilmsCount: number;
  films: Films;
}

function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen backgroundSrc={props.backgroundSrc}
            backgroundAlt={props.backgroundAlt}
            films={props.films} mainFilm={props.films[0]}
            myListFilmsCount={props.myListFilmsCount}
          />
        }
        />
        <Route path={AppRoute.Login} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen films={props.films} myListFilmsCount={props.myListFilmsCount}/>
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Movie }/:id`}
          element={
            <MoviePageScreen backgroundSrc={props.backgroundSrc}
              backgroundAlt={props.backgroundAlt}
              films={props.films}
              myListFilmsCount={props.myListFilmsCount}
            />
          }
        />
        <Route path={`${AppRoute.Movie }/:id${ AppRoute.Review}`}
          element={
            <AddReviewScreen backgroundSrc={props.backgroundSrc}
              backgroundAlt={props.backgroundAlt}
              films={props.films}
            />
          }
        />
        <Route path={`${AppRoute.Player }/:id`} element={<PlayerScreen films={props.films}/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundError/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
