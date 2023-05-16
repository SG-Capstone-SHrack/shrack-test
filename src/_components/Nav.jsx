import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '_state';
import { useUserActions } from '_actions';
export { Nav };
function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();
    if (auth===0) 
        return null;
    return ( //로그인 했을 때만 창이 보이도록
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">MyPage</NavLink>
                <a onClick={userActions.logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}
