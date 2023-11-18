import FilmCard from '../film-card/film-card.tsx';
import {Films} from '../../types/types.ts';
import {useAppSelector} from '../../hooks';

type FilmsContainerProps = {
  films: Films;
}

function FilmsContainer(props: FilmsContainerProps) {
  const filmsCount = useAppSelector((state) => state.filmsCount);
  return (
    <div className="catalog__films-list">
      {props.films.slice(0, filmsCount).map((film) => (
        <FilmCard key={film.id} id={film.id} posterSrc={film.posterSrc} posterAlt={film.posterAlt}
          title={film.title} videoLink={film.video}
        />))}
    </div>
  );
}

export default FilmsContainer;
