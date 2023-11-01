import {Link} from 'react-router-dom';
import {AppRoute} from "../../consts.ts";
import VideoPlayer from "../video-player/video-player.tsx";
import {useState} from "react";

export type FilmCardProps = {
  id: string;
  posterSrc: string;
  posterAlt: string;
  title: string;
  videoLink: string,
}

function FilmCard(props: FilmCardProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onMouseEnter = () => {
    setTimer(setTimeout(() => setIsHovered(true), 1000));
  }

  const onMouseLeave = () => {
    clearTimeout(timer);
    setIsHovered(false)
  }

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        {
          isHovered ?
            <VideoPlayer videoLink={props.videoLink} posterSrc={props.posterSrc}/> :
            <img src={props.posterSrc} alt={props.posterAlt}/>
        }
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Movie + `/${props.id}`} className="small-film-card__link">{props.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
