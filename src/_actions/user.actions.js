import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { history, useFetchWrapper } from '_helpers';
import { authAtom, usersAtom, userAtom } from '_state';
export { useUserActions };

function useUserActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const fetchWrapper = useFetchWrapper();
    const [auth, setAuth] = useRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);

    return {
        login,
        logout,
        register,
        getAll,
        getById,
        update,
        delete: _delete,
        resetUsers: useResetRecoilState(usersAtom),
        resetUser: useResetRecoilState(userAtom)
    }

    function login({ username, password }) {
        return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
            .then(user => {
                // 페이지 고침 전 로컬스토리지에 저장
                localStorage.setItem('user', JSON.stringify(user)); //json데이터로 변경
                setAuth(user);
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.push(from);
            });
    }
    function logout() {
        //로컬스토리지에서 없애고 null 상태로 바꾸기 -> 로그인 페이지로 이동
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/account/login');
    }
    function register(user) {
        return fetchWrapper.post(`${baseUrl}/register`, user);
    }
    function getAll() {
        return fetchWrapper.get(baseUrl).then(setUsers);
    }
    function getById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
    }
    function update(id, params) { // 업데이트 하기
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(data => {
                if (id === auth?.id) {
                    const user = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    setAuth(user);
                }
                return data;
            });
    }

    function _delete(id) {  //데이터 삭제 함수
        setUsers(users => users.map(data_2 => {
            if (data_2.id === id) 
                return { ...data_2, isDeleting: true };
            return data_2;
        }));
        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                setUsers(users => users.filter(data_3 => data_3.id !== id));
                if (id === auth?.id) {
                    logout();
                }
            });
    }
}
