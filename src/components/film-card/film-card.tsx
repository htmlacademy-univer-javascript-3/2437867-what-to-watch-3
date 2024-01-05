import {useNavigate} from 'react-router-dom';
import {AppRoute, EXECUTION_DELAY} from '../../consts.ts';
import VideoPlayer from '../video-player/video-player.tsx';
import {useState} from 'react';
import {FilmShortInfo} from '../../types/film.ts';

type FilmCardProps = {
  film: FilmShortInfo;
}

function FilmCard({film}: FilmCardProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const onMouseEnter = () => {
    setTimer(setTimeout(() => setIsHovered(true), EXECUTION_DELAY));
  };

  const onMouseLeave = () => {
    clearTimeout(timer);
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`${AppRoute.Movie }/${film.id}`);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} onClick={handleClick}
    >
      <div className="small-film-card__image">
        {
          isHovered ?
            <VideoPlayer videoLink={film.previewVideoLink} posterSrc={film.previewImage}/> :
            <img src={film.previewImage} alt={film.name}/>
        }
      </div>
      <h3 className="small-film-card__title">
        <label className="small-film-card__link">{film.name}</label>
      </h3>
    </article>
  );
}

export default FilmCard;
