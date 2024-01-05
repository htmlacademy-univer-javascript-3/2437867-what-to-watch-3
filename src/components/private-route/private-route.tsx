import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts.ts';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus, getAuthorizationStatusLoading} from '../../store/user-process/selectors.ts';
import Spinner from '../spinner/spinner.tsx';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatusLoading = useAppSelector(getAuthorizationStatusLoading);

  if (authorizationStatusLoading) {
    return <Spinner></Spinner>;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? props.children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
