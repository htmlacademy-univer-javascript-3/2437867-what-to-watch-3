import {useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm, getLoadingStatus} from '../../store/films-process/selectors.ts';
import NotFoundError from '../../components/errors/not-found-error.tsx';
import {useEffect, useRef, useState} from 'react';
import {fetchFilmAction} from '../../store/api-actions.ts';
import Spinner from '../../components/spinner/spinner.tsx';

function PlayerScreen() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoadingFilm, setIsLoadingFilm] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchFilmAction(params.id));
    if (videoRef.current !== null) {
      videoRef.current.addEventListener('loadeddata', () => setIsLoadingFilm(false));

      if (!isPlaying) {
        videoRef.current.load();
      }
    }
  }, [dispatch, params]);

  if (isLoading) {
    return (<Spinner/>);
  }

  if (film === null) {
    return (<NotFoundError/>);
  }

  const handlePlay = () => {
    console.log(videoRef.current)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleUpdateProgress = () => {
    if (videoRef.current) {
      setTimeLeft(Math.round(videoRef.current?.duration - videoRef.current?.currentTime));
      setProgress((videoRef.current?.currentTime * 100) / videoRef.current?.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const sec = seconds - (hours * 3600) - (minutes * 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

  };

  return (
    <div className="player">
      {isLoadingFilm && <Spinner/>}
      <video src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        ref={videoRef}
        onDoubleClick={handleFullScreen}
        onTimeUpdate={handleUpdateProgress}
      />

      <button type="button" className="player__exit"
        onClick={() => navigate(`${AppRoute.Movie}/${film.id}`)}
      >Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{'left': `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"></use>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
