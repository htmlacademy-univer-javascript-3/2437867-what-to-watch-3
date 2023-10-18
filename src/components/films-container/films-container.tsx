import FilmCard from "../film-card/film-card.tsx";
import {useState} from "react";
import {Films} from "../../types/types.ts";

type FilmsContainerProps = {
  films: Films
}

function FilmsContainer(props: FilmsContainerProps) {
  const [currentFilm, setCurrentFilm] = useState<string | null>(null);
  console.log(currentFilm);
  return (
    <div className="catalog__films-list">
      {props.films.map((film) => (
        <FilmCard key={film.id} id={film.id} posterSrc={film.posterSrc} posterAlt={film.posterAlt}
                  title={film.title} onMouseEnter={setCurrentFilm} onMouseLeave={() => setCurrentFilm(null)}
        />))}
    </div>
  );
}

export default FilmsContainer;
