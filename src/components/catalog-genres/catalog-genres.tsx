import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAvailableGenres, getGenre} from '../../store/films-process/selectors.ts';
import {changeGenre} from '../../store/films-process/films-process.ts';

function CatalogGenres() {
  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector(getGenre);
  const allGenres = useAppSelector(getAvailableGenres);

  return (
    <>
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {allGenres.map((genre) => (
          <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': genre === selectedGenre})}>
            <button className="catalog__genres-link" onClick={() => dispatch(changeGenre(genre))}>{genre}</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CatalogGenres;
