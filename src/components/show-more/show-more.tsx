import {useAppDispatch, useAppSelector} from "../../hooks";
import {showMoreFilms} from "../../store/action.ts";

function ShowMore() {
  const dispatch = useAppDispatch();
  const filmsCount = useAppSelector((state) => state.filmsCount);
  const allFilmsCount = useAppSelector((state) => state.films.length);

  return (
    <>
    {
      (filmsCount < allFilmsCount) &&
      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={() => dispatch(showMoreFilms())}>Show more</button>
      </div>
    }
    </>
  );
}

export default ShowMore;
