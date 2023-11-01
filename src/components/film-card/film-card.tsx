import {useNavigate} from 'react-router-dom';

export type FilmCardProps = {
  id: string;
  posterSrc: string;
  posterAlt: string;
  title: string;
  onMouseEnter: (x: string) => void;
  onMouseLeave: () => void;
}

function FilmCard(props: FilmCardProps) {
  const navigate = useNavigate();
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => props.onMouseEnter(props.id)}
      onMouseLeave={() => props.onMouseLeave()} onClick={() => navigate(`/films/${props.id}`)}
    >
      <div className="small-film-card__image">
        <img src={props.posterSrc}
          alt={props.posterAlt}
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link">{props.title}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
