import User from '../../components/user/user.tsx';
import Logo from '../../components/logo/logo.tsx';
import AddReview from '../../components/add-review/add-review.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';
import {useAppSelector} from '../../hooks';
import {getFilm} from "../../store/films-process/selectors.ts";
import NotFoundError from "../../components/errors/not-found-error.tsx";


function AddReviewScreen() {
  //const params = useParams();
  const film = useAppSelector(getFilm);

  if (film === null)
    return (<NotFoundError/>)

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.posterImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Movie }/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218"
            height="327"
          />
        </div>
      </div>

      <AddReview/>

    </section>
  );
}

export default AddReviewScreen;
