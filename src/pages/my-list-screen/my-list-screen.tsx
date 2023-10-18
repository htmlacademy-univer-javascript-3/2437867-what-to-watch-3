import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import User from '../../components/user/user.tsx';
import {Films} from "../../types/types.ts";
import FilmsContainer from "../../components/films-container/films-container.tsx";

type MyListScreenProps = {
  films: Films,
  myListFilmsCount: number,
}
function MyListScreen(props: MyListScreenProps) {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{props.myListFilmsCount}</span></h1>
        <User/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsContainer films={props.films}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyListScreen;
