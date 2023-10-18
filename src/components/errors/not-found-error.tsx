import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts.ts';

function NotFoundError() {
  return (
    <section>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Main}>Вернуться на главную страницу</Link>
    </section>

  );
}

export default NotFoundError;
