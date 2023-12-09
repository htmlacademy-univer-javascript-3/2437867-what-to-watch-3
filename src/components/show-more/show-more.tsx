import {useAppDispatch} from '../../hooks';
import {showMoreFilms} from "../../store/films-process/films-process.ts";

function ShowMore() {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(showMoreFilms())}>Show more</button>
    </div>
  );
}

export default ShowMore;
