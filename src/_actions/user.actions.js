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
                //1) 사용자 정보 로컬 스토리지에 저장 
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                //2) 메인 홈으로 이동(main service)
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.push(from);
            });
    }

    function logout() {
        // 로그아웃 함수 : 로컬 스토리지에서 삭제 -> 로그인 페이지로 이동 
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

    function update(id, params) {
        return fetchWrapper.put(`${baseUrl}/${id}`, params)
            .then(data => {
                if (id === auth?.id) {
                    const user = { ...auth, ...params };
                    localStorage.setItem('user', JSON.stringify(user)); //로컬 스토리지 정보 업데이트
                    setAuth(user);
                }
                return data;
            });
    }

    // 회원 정보 삭제
    function _delete(id) {
        setUsers(users => users.map(data => {
            if (data.id === id) 
                return { ...data, isDeleting: true };

            return data;
        }));
        return fetchWrapper.delete(`${baseUrl}/${id}`)
            .then(() => {
                // delete -> 이후 리스트에서 아예 없애기
                setUsers(users => users.filter(x => x.id !== id));
                // 로그아웃 함수 호출
                if (id === auth?.id) { 
                    logout();
                }
            });
    }
}