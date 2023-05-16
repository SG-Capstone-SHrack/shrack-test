import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authAtom);
    return (
        <Route {...rest} render={props => {
            if (!auth) {  //로그인 성공했을 때 페이지로 이동
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />
    );
}