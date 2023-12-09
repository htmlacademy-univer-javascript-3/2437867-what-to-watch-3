import FilmCard from '../film-card/film-card.tsx';
import {useAppSelector} from '../../hooks';
import {Films} from '../../types/film.ts';
import {getFilmsCount} from "../../store/films-process/selectors.ts";

type FilmsContainerProps = {
  films: Films;
}

function FilmsContainer(props: FilmsContainerProps) {
  const filmsCount = useAppSelector(getFilmsCount);
  return (
    <div className="catalog__films-list">
      {props.films.slice(0, filmsCount).map((film) => (
        <FilmCard key={film.id} film={film}/>))}
    </div>
  );
}

export default FilmsContainer;
