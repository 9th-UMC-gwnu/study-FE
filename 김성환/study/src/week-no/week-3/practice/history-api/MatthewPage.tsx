import { useCurrentPath } from './Route';

export const MatthewPage = () => {
    const path = useCurrentPath(); // 경로 변경 감지 -> PUSHSTATE_EVENT, POPSTATE_EVENT를 구독해 상태를 갱신
    return <div>현재 경로: {path}</div>;
};