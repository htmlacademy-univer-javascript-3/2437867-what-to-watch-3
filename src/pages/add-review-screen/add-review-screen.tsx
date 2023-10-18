import User from '../../components/user/user.tsx';
import Logo from '../../components/logo/logo.tsx';
import AddReview from '../../components/add-review/add-review.tsx';
import {Films} from "../../types/types.ts";
import {Link, useParams} from "react-router-dom";
import {AppRoute} from "../../consts.ts";

type AddReviewScreenProps = {
  backgroundSrc: string;
  backgroundAlt: string;
  films: Films
}

function AddReviewScreen(props: AddReviewScreenProps) {
  const params = useParams();
  const film = props.films.filter(film => film.id === params.id)[0];

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={props.backgroundSrc} alt={props.backgroundAlt}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Movie + `/${film.id}`} className="breadcrumbs__link">{film.title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterSrc} alt={film.posterAlt} width="218"
               height="327"
          />
        </div>
      </div>

      <AddReview/>

    </section>
  );
}

export default AddReviewScreen;
