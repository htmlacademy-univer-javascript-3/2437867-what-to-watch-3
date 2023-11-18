import cn from 'classnames';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeGenre} from "../../store/action.ts";
type CatalogGenresProps = {
  genres: string[]
}

function CatalogGenres(props: CatalogGenresProps) {
  const selectedGenre = useAppSelector((state) => state.genre)
  const dispatch = useAppDispatch();
  return (
    <>
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {props.genres.map((genre) => (
          <li className={cn('catalog__genres-item', {'catalog__genres-item--active': genre === selectedGenre})}>
            <button className="catalog__genres-link" onClick={() => dispatch(changeGenre(genre))}>{genre}</button>
          </li>
          ))}
      </ul>
    </>
  );
}

export default CatalogGenres;