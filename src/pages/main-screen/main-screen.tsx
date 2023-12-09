import Footer from '../../components/footer/footer.tsx';
import CatalogGenres from '../../components/catalog-genres/catalog-genres.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import FilmsContainer from '../../components/films-container/films-container.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import ShowMore from '../../components/show-more/show-more.tsx';
import {AuthorizationStatus} from "../../consts.ts";
import Spinner from "../../components/spinner/spinner.tsx";
import {getFilms} from "../../store/films-process/films-process.ts";
import {
  getFavoriteFilmsCount,
  getFilmsByGenre,
  getFilmsCount,
  getGenre,
  getLoadingStatus,
  getPromoFilm
} from "../../store/films-process/selectors.ts";
import NotFoundError from "../../components/errors/not-found-error.tsx";
import {getAuthorizationStatus} from "../../store/user-process/selectors.ts";

function MainScreen() {
  const dispatch = useAppDispatch();
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const selectedGenre = useAppSelector(getGenre);
  const filmsCount = useAppSelector(getFilmsCount);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const isLoading = useAppSelector(getLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(getFilms());
  }, [selectedGenre, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return (<Spinner/>);
  }

  if (promoFilm === null) {
    return (<NotFoundError/>)
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.backgroundImage}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo/>
          <User/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.backgroundImage} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
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
                  <span className="film-card__count">{favoriteFilmsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <CatalogGenres/>
          <FilmsContainer films={filmsByGenre}/>
          {filmsByGenre.length >= filmsCount && <ShowMore/>}
        </section>

        <Footer/>
      </div>
    </>
  );

}

export default MainScreen;
