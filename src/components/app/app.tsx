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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainScreen backgroundSrc={'img/bg-the-grand-budapest-hotel.jpg'}
            backgroundAlt={'The Grand Budapest Hotel'}
            title={'The Grand Budapest Hotel'}
            posterSrc={'img/the-grand-budapest-hotel-poster.jpg'}
            posterAlt={'The Grand Budapest Hotel poster'}
            genre={'Drama'}
            year={2014}
          />
        }
        />
        <Route path={AppRoute.Login} element={<SignInScreen/>}/>
        <Route path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Movie}
          element={
            <MoviePageScreen backgroundSrc={'img/bg-the-grand-budapest-hotel.jpg'}
              backgroundAlt={'The Grand Budapest Hotel'}
              title={'The Grand Budapest Hotel'}
              posterSrc={'img/the-grand-budapest-hotel-poster.jpg'}
              posterAlt={'The Grand Budapest Hotel poster'}
              genre={'Drama'}
              year={2014} ratingScore={'8,9'}
              ratingLevel={'Very good'}
              ratingCount={'240 ratings'}
              movieDescription={'In the 1930s, the Grand Budapest Hotel is a popular European ski resort'}
              movieDirector={'Director: Wes Anderson'}
              movieStarring={'Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other'}
            />
          }
        />
        <Route path={AppRoute.Review}
          element={
            <AddReviewScreen backgroundSrc={'img/bg-the-grand-budapest-hotel.jpg'}
              backgroundAlt={'The Grand Budapest Hotel'}
              title={'The Grand Budapest Hotel'}
              posterSrc={'img/the-grand-budapest-hotel-poster.jpg'}
              posterAlt={'The Grand Budapest Hotel poster'}
            />
          }
        />
        <Route path={AppRoute.Player} element={<PlayerScreen/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundError/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
