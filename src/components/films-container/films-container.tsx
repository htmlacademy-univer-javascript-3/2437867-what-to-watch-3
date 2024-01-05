import FilmCard from '../film-card/film-card.tsx';
import {Films} from '../../types/film.ts';

type FilmsContainerProps = {
  films: Films;
  filmsCount: number;
}

function FilmsContainer(props: FilmsContainerProps) {
  return (
    <div className="catalog__films-list">
      {props.films.slice(0, props.filmsCount).map((film) => (
        <FilmCard key={film.id} film={film}/>))}
    </div>
  );
}

export default FilmsContainer;
