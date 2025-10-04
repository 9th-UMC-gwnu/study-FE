import React, { useEffect, useState, Children, isValidElement } from 'react';
import type { ReactNode, ReactElement } from 'react';

/** 커스텀 이벤트명 */
export const PUSHSTATE_EVENT = 'PUSHSTATE_EVENT';
export const POPSTATE_EVENT = 'POPSTATE_EVENT';

/** 내부 내비게이션 유틸 */
export function navigate(to: string, replace = false) {
  if (location.pathname === to) return;
  if (replace) history.replaceState(null, '', to);
  else history.pushState(null, '', to);
  // push/replace 후 라우터에게 알림
  window.dispatchEvent(new CustomEvent(PUSHSTATE_EVENT, { detail: { path: to } }));
}

/** 현재 경로 훅: PUSHSTATE/POPSTATE를 구독해 pathname 상태 갱신 */
export function useCurrentPath() {
  const [path, set_path] = useState<string>(() => location.pathname);

  useEffect(() => {
    const handle_push = (e: Event) => {
      const detail = (e as CustomEvent).detail?.path ?? location.pathname;
      set_path(detail);
    };
    const handle_pop = () => set_path(location.pathname);

    // 브라우저 기본 popstate를 우리 이벤트로 브릿지
    const bridge_popstate = () => {
      window.dispatchEvent(new CustomEvent(POPSTATE_EVENT, { detail: { path: location.pathname } }));
      handle_pop();
    };

    window.addEventListener(PUSHSTATE_EVENT, handle_push);
    window.addEventListener(POPSTATE_EVENT, handle_pop);
    window.addEventListener('popstate', bridge_popstate);

    return () => {
      window.removeEventListener(PUSHSTATE_EVENT, handle_push);
      window.removeEventListener(POPSTATE_EVENT, handle_pop);
      window.removeEventListener('popstate', bridge_popstate);
    };
  }, []);

  return path;
}

/** <Link> : a 태그 클릭을 가로채고 History API로 이동 */
type LinkProps = {
  to: string;
  replace?: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
export function Link({ to, replace = false, children, className, style }: LinkProps) {
  const on_click: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // 새 탭/중간 클릭/수정키는 기본 동작 유지
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(to, replace);
  };

  return (
    <a href={to} onClick={on_click} className={className} style={style}>
      {children}
    </a>
  );
}

/** <Route> : 매칭 정보 컨테이너(렌더는 <Routes>가 담당) */
type RouteProps = {
  path: string; // 간단히 '정확 일치'만 지원
  component: React.ComponentType<any>;
};
export function Route(_props: RouteProps) {
  return null; // 실제 렌더링은 <Routes>에서 처리
}

/** <Routes> : 자식 Route들 중 현재 경로와 매칭되는 것만 렌더 */
type RoutesProps = { children: ReactNode };
export function Routes({ children }: RoutesProps) {
  const current_path = useCurrentPath();

  // 첫 매칭 Route 1개만 렌더(필요 시 스위치 동작)
  const match = find_match(children, current_path);

  if (!match) return null;

  // <Route path="" component={C}/> -> <C/>
  const Comp = match.props.component as React.ComponentType<any>;
  return <Comp />;
}

/** 단순 경로 매칭(정확 일치). 필요하면 와일드카드/동적 파라미터로 확장 */
function find_match(children: ReactNode, current_path: string): ReactElement<RouteProps> | null {
  const list = Children.toArray(children);
  for (const child of list) {
    if (isValidElement<RouteProps>(child) && child.type === Route) {
      if (child.props.path === current_path) return child;
    }
  }
  return null;
}
