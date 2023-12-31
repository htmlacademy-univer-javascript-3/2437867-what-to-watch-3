import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import FilmsContainer from '../../components/films-container/films-container.tsx';
import {useAppSelector} from '../../hooks';
import {getFavoriteFilms, getFavoriteFilmsCount} from '../../store/films-process/selectors.ts';


function MyListScreen() {
  const films = useAppSelector(getFavoriteFilms);
  const filmsCount = useAppSelector(getFavoriteFilmsCount);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{filmsCount}</span></h1>
        <User/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsContainer films={films} filmsCount={filmsCount}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyListScreen;
