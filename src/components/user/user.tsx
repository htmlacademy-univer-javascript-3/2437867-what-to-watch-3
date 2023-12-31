import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {getAuthorizationStatus, getUser} from '../../store/user-process/selectors.ts';

function User() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" onClick={() => navigate(AppRoute.MyList)}/>
          </div>
        </li>
        <li className="user-block__item">
          <Link
            className="user-block__link"
            to={AppRoute.Main}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >Sign out
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <div className="user-block">
        <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
      </div>
    );
  }
}

export default User;
