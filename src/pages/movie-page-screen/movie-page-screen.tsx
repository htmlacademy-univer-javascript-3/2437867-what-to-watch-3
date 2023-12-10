import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import {Link, useParams} from 'react-router-dom';
import FilmsContainer from '../../components/films-container/films-container.tsx';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import NotFoundError from '../../components/errors/not-found-error.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import {
  getFavoriteFilmsCount,
  getFilm,
  getLoadingStatus,
  getSimilarFilms
} from '../../store/films-process/selectors.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';

function MoviePageScreen() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const favoritesCount = useAppSelector(getFavoriteFilmsCount);
  const status = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getLoadingStatus);


  useEffect(() => {
    dispatch(fetchFilmAction(params.id));
    dispatch(fetchSimilarFilmsAction(params.id));
  }, [dispatch, params]);

  if (film === null) {
    return (<NotFoundError/>);
  }

  if (status === AuthorizationStatus.Unknown || isLoading) {
    return (<Spinner/>);
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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoritesCount}</span>
                </button>
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

          <FilmsContainer films={similarFilms}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MoviePageScreen;
