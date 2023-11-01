import FilmCard from '../film-card/film-card.tsx';
import {Films} from '../../types/types.ts';

type FilmsContainerProps = {
  films: Films;
}

function FilmsContainer(props: FilmsContainerProps) {
  return (
    <div className="catalog__films-list">
      {props.films.map((film) => (
        <FilmCard key={film.id} id={film.id} posterSrc={film.posterSrc} posterAlt={film.posterAlt}
                  title={film.title} videoLink={film.video}
        />))}
    </div>
  );
}

export default FilmsContainer;
