import User from "../../components/user/user.tsx";
import Logo from "../../components/logo/logo.tsx";
import AddReview from "../../components/add-review/add-review.tsx";

type AddReviewScreenProps = {
  backgroundSrc: string,
  backgroundAlt: string,
  title: string,
  posterSrc: string,
  posterAlt: string,
}

function AddReviewScreen(props: AddReviewScreenProps) {
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={props.backgroundSrc} alt={props.backgroundAlt}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{props.title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <User/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={props.posterSrc} alt={props.posterAlt} width="218"
               height="327"/>
        </div>
      </div>

      <AddReview/>

    </section>
  );
}

export default AddReviewScreen;
