import User from '../../components/user/user.tsx';
import Logo from '../../components/logo/logo.tsx';
import AddReview from '../../components/add-review/add-review.tsx';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm, getLoadingStatus} from '../../store/films-process/selectors.ts';
import NotFoundError from '../../components/errors/not-found-error.tsx';
import {useEffect} from 'react';
import {fetchFilmAction} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';


function AddReviewScreen() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchFilmAction(params.id));
  }, [dispatch, params]);

  if (isLoading) {
    return (<Spinner/>);
  }

  if (film === null) {
    return (<NotFoundError/>);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
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
