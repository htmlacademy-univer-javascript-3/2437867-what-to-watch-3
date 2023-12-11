import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilmsCount} from '../../store/films-process/selectors.ts';
import {Film, FilmPromo} from '../../types/film.ts';
import {useEffect} from 'react';
import {fetchChangeFavoriteFilmsAction, fetchFavoriteFilmsAction} from '../../store/api-actions.ts';
import {getAuthorizationStatus} from "../../store/user-process/selectors.ts";
import {AuthorizationStatus} from "../../consts.ts";

type MovieFavoriteListProps = {
  film: Film | FilmPromo;
}

function MovieFavoriteList(props: MovieFavoriteListProps) {
  const dispatch = useAppDispatch();
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const film = props.film;

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch, film.isFavorite]);

  const handleChangeFilmStatus = () => {
    dispatch(fetchChangeFavoriteFilmsAction({filmId: film.id, status: Number(!film.isFavorite)}));
  };

  return (
    <button className="btn btn--list film-card__button" type="button"
      onClick={handleChangeFilmStatus}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {film.isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{authStatus == AuthorizationStatus.Auth ? favoriteFilmsCount: 0}</span>
    </button>
  );
}

export default MovieFavoriteList;
