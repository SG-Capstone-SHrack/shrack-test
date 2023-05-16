import { useSetRecoilState } from 'recoil';
import { useResetRecoilState } from 'recoil';
import { alertAtom } from '_state';  //_state로부터 알림 관련 상태 받아옴!

export { useAlertActions };

function useAlertActions () {
    const realert = useResetRecoilState(alertAtom);//주어진 값 default로 리셋하는 함수 반환
    const sa = useSetRecoilState(alertAtom);//setter역할 -> 아톰 변경시키기 가능
    return {
        success: message => sa({ message, type: 'alert-success' }),  //1) 성공할 경우 : alert-success 타입으로 setter에 넣기
        error: message => sa({ message, type: 'alert-danger' }), //2) 에러일 경우 : alert-danger
        clear: realert
    }
}
