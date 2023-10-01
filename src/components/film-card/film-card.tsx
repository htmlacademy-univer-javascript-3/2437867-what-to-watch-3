export type FilmCardProps = {
  posterSrc: string,
  posterAlt: string,
  title: string
}

function FilmCard(props: FilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.posterSrc}
             alt={props.posterAlt}/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{props.title}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
