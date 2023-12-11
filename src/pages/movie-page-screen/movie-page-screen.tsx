import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import {Link, useParams} from 'react-router-dom';
import FilmsContainer from '../../components/films-container/films-container.tsx';
import {AppRoute, AuthorizationStatus, SIMILAR_FILMS_COUNT} from '../../consts.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import NotFoundError from '../../components/errors/not-found-error.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import {
  getFilm,
  getLoadingStatus,
  getSimilarFilms
} from '../../store/films-process/selectors.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import MovieFavoriteList from '../../components/movie/movie-favorite-list.tsx';
import MoviePlay from '../../components/movie/movie-play.tsx';

function MoviePageScreen() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const status = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getLoadingStatus);


  useEffect(() => {
    dispatch(fetchFilmAction(params.id));
    dispatch(fetchSimilarFilmsAction(params.id));
  }, [dispatch, params]);

  if (status === AuthorizationStatus.Unknown || isLoading) {
    return (<Spinner/>);
  }

  if (film === null) {
    return (<NotFoundError/>);
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>

            <User/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.genre}</span>
              </p>

              <div className="film-card__buttons">
                <MoviePlay film={film}/>
                <MovieFavoriteList film={film}/>
                {status === AuthorizationStatus.Auth &&
                  <Link to={`${AppRoute.Movie}/${film.id}${AppRoute.Review}`} className="btn film-card__button">Add
                    review
                  </Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218"
                height="327"
              />
            </div>
            <Tabs film={film}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsContainer films={similarFilms} filmsCount={SIMILAR_FILMS_COUNT}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MoviePageScreen;
