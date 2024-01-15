import {FormEvent, useState} from 'react';
import {fetchAddReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFilm} from '../../store/films-process/selectors.ts';
import {toast} from 'react-toastify';

function AddReview() {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (text.length < 50 || text.length > 400) {
      toast.warn('Text length must be more than 50 and less than 400 characters');
      return;
    }
    if (rating === 0) {
      toast.warn('Set rating to add review');
      return;
    }
    setDisable(true);
    dispatch(fetchAddReviewAction({comment: text, filmId: film?.id, rating: rating}));
    setDisable(false);
  };

  return (
    <div className="add-review">
      <form action="" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({length: 10}).map((_, index) => (
              <>
                <input disabled={disable} className="rating__input" id={`star-${10 - index}`} type="radio" name="rating"
                       value={10 - rating} checked={rating === (10 - index)} onChange={() => setRating(10 - index)}
                />
                <label className="rating__label" htmlFor={`star-${10 - index}`}>Rating {10 - index}</label>
              </>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text"
                    placeholder="Review text" disabled={disable} value={text} onChange={(evt) => setText(evt.target.value)}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={disable}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReview;
