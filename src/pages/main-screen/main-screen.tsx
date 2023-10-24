import Footer from '../../components/footer/footer.tsx';
import {catalogGenresTypes} from '../../consts.ts';
import CatalogGenre from '../../components/catalog-genre/catalog-genre.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import FilmsContainer from '../../components/films-container/films-container.tsx';
import {Film, Films} from '../../types/types.ts';

type MainScreenProps = {
  backgroundSrc: string;
  backgroundAlt: string;
  films: Films;
  mainFilm: Film;
  myListFilmsCount: number;
}

function MainScreen(props: MainScreenProps) {
  const mainFilm = props.mainFilm;
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={props.backgroundSrc} alt={props.backgroundAlt}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo/>
          <User/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={mainFilm.posterSrc} alt={mainFilm.posterAlt} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{mainFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{mainFilm.genre}</span>
                <span className="film-card__year">{mainFilm.year}</span>
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
                  <span className="film-card__count">{props.myListFilmsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {catalogGenresTypes.map((catalogGenre) => (
              <CatalogGenre key={catalogGenre} title={catalogGenre}
                className={catalogGenre === catalogGenresTypes[0] ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}
              />))}
          </ul>

          <FilmsContainer films={props.films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );

}

export default MainScreen;
